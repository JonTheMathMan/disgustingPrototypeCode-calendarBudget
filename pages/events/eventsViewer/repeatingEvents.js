function eventHasRepeatsInDateWindow(eventOb, startDate, endDate) {
    if (eventOb.repeatIntervalType == undefined) {
        return [false, 0, []];
    }

    var missingIntervalValue = (eventOb.repeatIntervalValue == undefined ||
        eventOb.repeatIntervalValue == 0 ||
        eventOb.repeatIntervalValue == "0" ||
        eventOb.repeatIntervalValue == "");

    var startTime = startDate.getTime();
    var endTime = endDate.getTime();
    var eventObDate = new Date(eventOb.date);
    var eventObTime = eventObDate.getTime();


    var commonArgs = [eventObDate, eventObTime, startDate, endDate, startTime];

    if (eventObTime > endTime) {
        return [false, 0, []];
    }

    switch (eventOb.repeatIntervalType) {
        case "daily":
            return getRepeatedDays(commonArgs, false, 1);
        case "weekly - every same day of the week":
            return getRepeatedDays(commonArgs, false, 7);
        case "monthly - same day of the month":
            return getRepeatedMonths(commonArgs, false, 1);
        case "interval - every N days":
            return getRepeatedDays(commonArgs, missingIntervalValue, eventOb.repeatIntervalValue);
        case "interval - every N weeks":
            return getRepeatedDays(commonArgs, missingIntervalValue, eventOb.repeatIntervalValue * 7);
        case "interval - every N Months on the same day of the month":
            return getRepeatedMonths(commonArgs, missingIntervalValue, eventOb.repeatIntervalValue);
    }
    return [false, 0, []];
}

function getRepeatedDays(commonArgs, missingIntervalValue, repeatIntervalValue) {
    if (missingIntervalValue) {
        return [false, 0, []];
    }
    var [eventObDate, eventObTime, startDate, endDate, startTime] = commonArgs;
    if (eventObTime <= startTime) {
        var moduloStart = getDaysDiff(eventObDate, startDate) % repeatIntervalValue;
        var inverseModuloStart = repeatIntervalValue - moduloStart;
        var moduloDiff = moduloStart == 0 ? getDaysDiff(startDate, endDate) : getDaysDiff(startDate, endDate) - inverseModuloStart;
        if (moduloDiff < 0) {
            // first occurance after start date is also after end date
            return [false, 0, []];
        }
        var occurrences = Math.floor(moduloDiff / repeatIntervalValue) + 1;
        if (moduloStart == 0) {
            var firstOccurranceDate = new Date(startDate.toDateString());
        } else {
            var firstOccurranceDate = addDaysAsNewDate(startDate, inverseModuloStart);
        }
        var datesRepeated = [firstOccurranceDate];
        for (var i = 1; i < occurrences; i++) {
            datesRepeated.push(addDaysAsNewDate(firstOccurranceDate, i * repeatIntervalValue));
        }
        return [true, occurrences, datesRepeated];
    }
    // event time is within time window
    var eventObDateDiff = getDaysDiff(startDate, endDate) - getDaysDiff(startDate, eventObDate);
    var occurrences = Math.floor(eventObDateDiff / repeatIntervalValue) + 1;
    var datesRepeated = [eventObDate];
    for (var i = 1; i < occurrences; i++) {
        datesRepeated.push(addDaysAsNewDate(eventObDate, i * repeatIntervalValue));
    }
    return [true, occurrences, datesRepeated];
}

function getRepeatedMonths(commonArgs, missingIntervalValue, repeatIntervalValue) {
    if (missingIntervalValue) {
        return [false, 0, []];
    }
    var [eventObDate, eventObTime, startDate, endDate, startTime] = commonArgs;
    if (eventObTime < startTime) {
        var moduloStart = getMonthsDiff(eventObDate, startDate) % repeatIntervalValue;
        var moduloEnd = getMonthsDiff(eventObDate, endDate) % repeatIntervalValue;
        var inverseModuloStart = repeatIntervalValue - moduloStart;
        var includeStartMonth = eventObDate.getDate() >= startDate.getDate() && moduloStart == 0;
        var includeEndMonth = eventObDate.getDate() <= endDate.getDate() && moduloEnd == 0;
        var firstRepeatedDate = includeStartMonth ? new Date(startDate.toDateString()) : addMonthsAsNewDate(startDate, inverseModuloStart);
        firstRepeatedDate.setDate(eventObDate.getDate());
        if (firstRepeatedDate.getTime() > endDate.getTime()) {
            // modulo start date is after end date
            return [false, 0, []];
        }
        if (includeStartMonth && includeEndMonth) {
            var occurrences = Math.floor(getMonthsDiff(startDate, endDate) / repeatIntervalValue) + 1;
            var datesRepeated = [firstRepeatedDate];
            for (var i = 1; i < occurrences; i++) {
                datesRepeated.push(addMonthsAsNewDate(firstRepeatedDate, i * repeatIntervalValue));
            }
            return [true, occurrences, datesRepeated];
        }
        if (includeStartMonth || includeEndMonth) {
            var occurrences = Math.floor((getMonthsDiff(startDate, endDate) - inverseModuloStart) / repeatIntervalValue) + 1;
            var datesRepeated = [firstRepeatedDate];
            for (var i = 1; i < occurrences; i++) {
                datesRepeated.push(addMonthsAsNewDate(firstRepeatedDate, i * repeatIntervalValue));
            }
            return [true, occurrences, datesRepeated];
        }
        // !inlcludeStartMonth && !includeEndMonth (repeats are within time window but not in the start or end months)
        var occurrences = Math.floor((getMonthsDiff(startDate, endDate) - 1 - inverseModuloStart) / repeatIntervalValue) + 1;
        var datesRepeated = [firstRepeatedDate];
        for (var i = 1; i < occurrences; i++) {
            datesRepeated.push(addMonthsAsNewDate(firstRepeatedDate, i * repeatIntervalValue));
        }
        return [true, occurrences, datesRepeated];
    }
    // event time is within time window
    var moduloEnd = getMonthsDiff(eventObDate, endDate) % repeatIntervalValue;
    var includeEndMonth = eventObDate.getDate() <= endDate.getDate() && moduloEnd == 0;
    var firstRepeatedDate = new Date(eventObDate.toDateString());
    // include eventObDate month and endDate month
    if (includeEndMonth) {
        var occurrences = Math.floor(getMonthsDiff(eventObDate, endDate) / repeatIntervalValue) + 1;
        var datesRepeated = [firstRepeatedDate];
        for (var i = 1; i < occurrences; i++) {
            datesRepeated.push(addMonthsAsNewDate(firstRepeatedDate, i * repeatIntervalValue));
        }
        if (occurrences == 0) {
            return [false, 0, []];
        }
        return [true, occurrences, datesRepeated];
    }
    // only include eventObDate month and repeats before the endDate month
    var occurrences = Math.floor((getMonthsDiff(eventObDate, endDate) - 1) / repeatIntervalValue) + 1;
    var datesRepeated = [firstRepeatedDate];
    for (var i = 1; i < occurrences; i++) {
        datesRepeated.push(addMonthsAsNewDate(firstRepeatedDate, i * repeatIntervalValue));
    }
    return [true, occurrences, datesRepeated];
}

function getMonthLength(monthInt, fullYearInt) {
    if (isNaN(monthInt)) {
        alert("getMonthLength monthInt is NaN value is", monthInt);
        return;
    }
    if (isNaN(monthInt)) {
        alert("getMonthLength fullYearInt is NaN value is", fullYearInt);
        return;
    }
	switch (monthInt) {
		case 1:
			if (fullYearInt % 4 === 0) {
				return 29;
			}
			return 28;
		case 3:
		case 5:
		case 8:
		case 10:
			return 30;
	}
	return 31;
}

function getYearDayCount(fullYearInt, monthInt, dateOfMonth) {
    if (isNaN(monthInt)) {
        alert("getYearDayCount monthInt is NaN value is", monthInt);
        return;
    }
    if (isNaN(fullYearInt)) {
        alert("getYearDayCount fullYearInt is NaN value is", fullYearInt);
        return;
    }
    if (isNaN(dateOfMonth)) {
        alert("getYearDayCount dateOfMonth is NaN value is", dateOfMonth);
        return;
    }

    var count = 0;
    for (var i = 0; i<monthInt; i++){
        count += getMonthLength(i, fullYearInt);
    }
    count += dateOfMonth;
    return count;
}

function getDaysDiff(startDate, endDate) {
    var yearsDiff = endDate.getFullYear() - startDate.getFullYear();
    if (yearsDiff>0) {
        // different callendar years (2019, 2020)
        var startDateYearLength = startDate.getFullYear() % 4 == 0 ? 366 : 365;
        var betweenYearsDayCount = 0;
        for (var i = startDate.getFullYear()+1; i<endDate.getFullYear(); i++) {
            if (i % 4 == 0) {
                betweenYearsDayCount += 366;
            } else {
                betweenYearsDayCount += 365;
            }
        }
        return startDateYearLength - getYearDayCount(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) + betweenYearsDayCount + getYearDayCount(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    }
    // same calendar year (2019)
    return getYearDayCount(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - getYearDayCount(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
}

function getWeeksDiff(startDate, endDate) {
    return Math.floor(getDaysDiff(startDate, endDate) / 7);
}

function getMonthsDiff(startDate, endDate) {
    var yearsDiff = endDate.getFullYear() - startDate.getFullYear();
    if (yearsDiff > 0) {
        // different callendar years (2019, 2020)
        return (12 - startDate.getMonth()) + (yearsDiff - 1) * 12 + endDate.getMonth();
    }
    // same calendar year (2019)
    return endDate.getMonth() - startDate.getMonth();
}

function addDaysAsNewDate(givenDate, daysToAdd) {
    var newDate = new Date(givenDate.toDateString());
    newDate.setDate(givenDate.getDate() + daysToAdd);
    return newDate;
}

function addMonthsAsNewDate(givenDate, monthsToAdd) {
    var newDate = new Date(givenDate.toDateString())
    newDate.setMonth(newDate.getMonth() + monthsToAdd);
    return newDate;
}

function testDateDiffs() {
    var startDate = new Date(2017, 01, 01);
    var endDate = new Date(2020, 01, 01);

    console.log(getDaysDiff(startDate, endDate));
    console.log(getWeeksDiff(startDate, endDate));
    console.log(getMonthsDiff(startDate, endDate));
}
// testDateDiffs();

