var testCasesRepeatingDays = [];

var testCasesRepeatingMonths = [];

/* 
repeat types are
[
					"daily",
					"weekly - every same day of the week",
					"monthly - same day of the month",
					"interval - every N days",
					"interval - every N weeks",
					"interval - every N Months on the same day of the month"
				]
*/

var testName_Days = {
    // daily
    "daily_window_after":{repeatType:"daily", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 17), endDate: new Date(2019, 07, 19)},
    "daily_window_cover":{repeatType:"daily", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 13), endDate: new Date(2019, 07, 17)},
    "daily_window_before":{repeatType:"daily", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 10), endDate: new Date(2019, 07, 13)},
    "daily_window_start":{repeatType:"daily", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 17)},
    "daily_window_end":{repeatType:"daily", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 13), endDate: new Date(2019, 07, 15)},
    "daily_window_sameday":{repeatType:"daily", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 15)},
    // weekly - every same day of the week
    "weekly - every same day of the week_window_after":{repeatType:"weekly - every same day of the week", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 18), endDate: new Date(2019, 08, 10)},
    "weekly - every same day of the week_window_after_but_before_first_occurrence":{repeatType:"weekly - every same day of the week", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 18), endDate: new Date(2019, 07, 21)},
    "weekly - every same day of the week_window_cover":{repeatType:"weekly - every same day of the week", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 10), endDate: new Date(2019, 07, 25)},
    "weekly - every same day of the week_window_before":{repeatType:"weekly - every same day of the week", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 01), endDate: new Date(2019, 07, 13)},
    "weekly - every same day of the week_window_start":{repeatType:"weekly - every same day of the week", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 25)},
    "weekly - every same day of the week_window_end":{repeatType:"weekly - every same day of the week", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 01), endDate: new Date(2019, 07, 15)},
    "weekly - every same day of the week_window_sameday":{repeatType:"weekly - every same day of the week", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 15)},
    // interval - every N days
    "interval - every N days_window_after":{repeatType:"interval - every N days", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 16), endDate: new Date(2019, 07, 25)},
    "interval - every N days_window_after_but_before_first_occurrence":{repeatType:"interval - every N days", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 16), endDate: new Date(2019, 07, 17)},
    "interval - every N days_window_cover":{repeatType:"interval - every N days", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 10), endDate: new Date(2019, 07, 22)},
    "interval - every N days_window_before":{repeatType:"interval - every N days", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 07), endDate: new Date(2019, 07, 13)},
    "interval - every N days_window_start":{repeatType:"interval - every N days", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 20)},
    "interval - every N days_window_end":{repeatType:"interval - every N days", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 10), endDate: new Date(2019, 07, 15)},
    "interval - every N days_window_sameday":{repeatType:"interval - every N days", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 15)},
    // interval - every N weeks
    "interval - every N weeks_window_after":{repeatType:"interval - every N weeks", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 22), endDate: new Date(2019, 09, 30)},
    "interval - every N weeks_window_after_but_before_first_occurrence":{repeatType:"interval - every N weeks", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 21), endDate: new Date(2019, 08, 01)},
    "interval - every N weeks_window_cover":{repeatType:"interval - every N weeks", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 09, 30)},
    "interval - every N weeks_window_before":{repeatType:"interval - every N weeks", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 07, 01)},
    "interval - every N weeks_window_start":{repeatType:"interval - every N weeks", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 08, 30)},
    "interval - every N weeks_window_end":{repeatType:"interval - every N weeks", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 07, 15)},
    "interval - every N weeks_window_sameday":{repeatType:"interval - every N weeks", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 15)}
};

var testName_Months = {
    // monthly - same day of the month
"monthly - same day of the month_window_after_include_both":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 08, 10), endDate: new Date(2019, 10, 30)},
"monthly - same day of the month_window_after_include_start":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 08, 10), endDate: new Date(2019, 10, 10)},
"monthly - same day of the month_window_after_include_end":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 08, 20), endDate: new Date(2019, 10, 30)},
"monthly - same day of the month_window_after_include_neither":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 08, 20), endDate: new Date(2019, 11, 10)},
"monthly - same day of the month_window_after_but_before_first_occurrence":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 08, 20), endDate: new Date(2019, 09, 10)},
"monthly - same day of the month_window_cover_include_both":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 04, 10), endDate: new Date(2019, 10, 30)},
"monthly - same day of the month_window_cover_include_start":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 10, 10)},
"monthly - same day of the month_window_cover_include_end":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 20), endDate: new Date(2019, 09, 30)},
"monthly - same day of the month_window_cover_include_neither":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 09, 10)},
"monthly - same day of the month_window_before":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 07, 01)},
"monthly - same day of the month_window_start":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 09, 30)},
"monthly - same day of the month_window_end":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 07, 15)},
"monthly - same day of the month_window_sameday":{repeatType:"monthly - same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 15)},
// interval - every N Months on the same day of the month
"interval - every N Months on the same day of the month_window_after_include_both":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 10, 10), endDate: new Date(2020, 04, 30)},
"interval - every N Months on the same day of the month_window_after_include_start":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 10, 10), endDate: new Date(2020, 04, 10)},
"interval - every N Months on the same day of the month_window_after_include_end":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 11, 10), endDate: new Date(2020, 04, 30)},
"interval - every N Months on the same day of the month_window_after_include_neither":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 11, 10), endDate: new Date(2020, 06, 30)},
"interval - every N Months on the same day of the month_window_after_but_before_first_occurrence":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 11, 10), endDate: new Date(2020, 00, 30)},
"interval - every N Months on the same day of the month_window_cover_include_both":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 10), endDate: new Date(2020, 04, 30)},
"interval - every N Months on the same day of the month_window_cover_include_start":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 04, 10), endDate: new Date(2020, 04, 10)},
"interval - every N Months on the same day of the month_window_cover_include_end":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 04, 10), endDate: new Date(2020, 04, 30)},
"interval - every N Months on the same day of the month_window_cover_include_neither":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2020, 00, 30)},
"interval - every N Months on the same day of the month_window_before":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 05, 10), endDate: new Date(2019, 07, 01)},
"interval - every N Months on the same day of the month_window_start":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 11, 30)},
"interval - every N Months on the same day of the month_window_end":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 02, 10), endDate: new Date(2019, 07, 15)},
"interval - every N Months on the same day of the month_window_sameday":{repeatType:"interval - every N Months on the same day of the month", eventDate:new Date(2019, 07, 15), startDate:new Date(2019, 07, 15), endDate: new Date(2019, 07, 15)}
};

function buildTestCasesDays() {
    for (var key in testName_Days) {
        var testNameDateMap = testName_Days[key];
        var testCase = {
            name: key,
            eventOb: {
                repeatIntervalType: testNameDateMap.repeatType,
                date: testNameDateMap.eventDate.toDateString()
            },
            eventDate: testNameDateMap.eventDate,
            startDate: testNameDateMap.startDate,
            endDate: testNameDateMap.endDate
        };

        if(key.startsWith("interval")) {
            testCase.eventOb.repeatIntervalValue = 3;
        }

        testCasesRepeatingDays.push(testCase);
    }
}
// buildTestCasesDays();

function buildTestCasesMonths() {
    for (var key in testName_Months) {
        var testNameDateMap = testName_Months[key];
        var testCase = {
            name: key,
            eventOb: {
                repeatIntervalType: testNameDateMap.repeatType,
                date: testNameDateMap.eventDate.toDateString()
            },
            eventDate: testNameDateMap.eventDate,
            startDate: testNameDateMap.startDate,
            endDate: testNameDateMap.endDate
        };

        if(key.startsWith("interval")) {
            testCase.eventOb.repeatIntervalValue = 3;
        }

        testCasesRepeatingMonths.push(testCase);
    }
}
// buildTestCasesMonths();

function testRepeatingEvents_Days() {
    for (var i=0; i<testCasesRepeatingDays.length; i++) {
        var [hasRepeatEvents, numOccurrences, dates] = eventHasRepeatsInDateWindow(
            testCasesRepeatingDays[i].eventOb, 
            testCasesRepeatingDays[i].startDate,
            testCasesRepeatingDays[i].endDate
            );
        console.log(
            "name", testCasesRepeatingDays[i].name, "\n",
            "eventDate", testCasesRepeatingDays[i].eventDate, "\n",
            "startDate", testCasesRepeatingDays[i].startDate, "\n",
            "endDate", testCasesRepeatingDays[i].endDate, "\n",
            "hasRepeatEvents", hasRepeatEvents, "\n",
            "numOccurrences", numOccurrences, "\n",
            "dates", dates, "\n"
        );
    }
}
// testRepeatingEvents_Days();

function testRepeatingEvents_Months() {
    for (var i=0; i<testCasesRepeatingMonths.length; i++) {
        var [hasRepeatEvents, numOccurrences, dates] = eventHasRepeatsInDateWindow(
            testCasesRepeatingMonths[i].eventOb, 
            testCasesRepeatingMonths[i].startDate,
            testCasesRepeatingMonths[i].endDate
            );
        console.log(
            "name", testCasesRepeatingMonths[i].name, "\n",
            "eventDate", testCasesRepeatingMonths[i].eventDate, "\n",
            "startDate", testCasesRepeatingMonths[i].startDate, "\n",
            "endDate", testCasesRepeatingMonths[i].endDate, "\n",
            "hasRepeatEvents", hasRepeatEvents, "\n",
            "numOccurrences", numOccurrences, "\n",
            "dates", dates, "\n"
        );
    }
}
// testRepeatingEvents_Months();