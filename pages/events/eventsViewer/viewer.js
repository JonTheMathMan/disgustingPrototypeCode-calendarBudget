function sortEvents() {
    budgetData.events.sort(function (a, b) {
        var aTimestamp = new Date(budgetData.eventsMap[a].date).getTime();
        var bTimestamp = new Date(budgetData.eventsMap[b].date).getTime();
        // console.log("atimestamp", aTimestamp);
        // console.log("btimestap", bTimestamp);
        // don't swap
        if (bTimestamp > aTimestamp) {
            return -1;
        }
        // do swap
        if (aTimestamp > bTimestamp) {
            return 1;
        }
        // stay unchanged
        return 0;
    });
}

// create filter elements in a function to control variable scope
function createFilterHeader(textValue) {
    var newHeader = document.createElement("h4");
    newHeader.innerText = textValue;
    return newHeader;
}
function createFilterElements() {
    var filterContainer = document.getElementById("eventsFilters");
    
    // events start
    filterContainer.appendChild(createFilterHeader("Start Date"));
    var eventsStart = document.createElement("div");
    eventsStart.id = "eventsStart";
    getNewCalendarView(eventsStart, false);
    filterContainer.appendChild(eventsStart);

    // events end
    filterContainer.appendChild(createFilterHeader("End Date"));
    var eventsEnd = document.createElement("div");
    eventsEnd.id = "eventsEnd";
    getNewCalendarView(eventsEnd, false);
    filterContainer.appendChild(eventsEnd);

    // TODO checkbox (only show repeating events )

    // calendar name
    filterContainer.appendChild(createFilterHeader("Calendar Name"));
    var calendarNameFilter = document.createElement("div");
    calendarNameFilter.id = "calendarNameFilter";
    filterContainer.appendChild(calendarNameFilter);
    if (budgetData.calendars !== undefined && Object.keys(budgetData.calendars).length > 0) {
        convertToMultiSelectDropdownElement(calendarNameFilter, budgetData.calendars);
    } else {
        convertToMultiSelectDropdownElement(calendarNameFilter, ["no dropdown options"]);
    }

    // account name
    filterContainer.appendChild(createFilterHeader("Account Name"));
    var accountNameFilter = document.createElement("div");
    accountNameFilter.id = "accountNameFilter";
    filterContainer.appendChild(accountNameFilter);
    if (budgetData.accounts !== undefined && Object.keys(budgetData.accounts).length > 0) {
        convertToMultiSelectDropdownElement(accountNameFilter, budgetData.accounts);
    } else {
        convertToMultiSelectDropdownElement(accountNameFilter, ["no dropdown options"]);
    }

    // category tag
    filterContainer.appendChild(createFilterHeader("Category Tag"));
    var categoryTagFilter = document.createElement("div");
    categoryTagFilter.id = "categoryTagFilter";
    filterContainer.appendChild(categoryTagFilter);
    if (budgetData.categories !== undefined && Object.keys(budgetData.categories).length > 0) {
        convertToMultiSelectDropdownElement(categoryTagFilter, budgetData.categories);
    } else {
        convertToMultiSelectDropdownElement(categoryTagFilter, ["no dropdown options"]);
    }
}
createFilterElements();

function updateFilterDropdowns() {
    var calendarName = document.getElementById("calendarNameFilter");
    if (budgetData.calendars !== undefined && Object.keys(budgetData.calendars).length > 0) {
        convertToMultiSelectDropdownElement(calendarName, budgetData.calendars);
    } else {
        convertToMultiSelectDropdownElement(calendarName, ["no dropdown options"]);
    }

    var accountName = document.getElementById("accountNameFilter");
    if (budgetData.accounts !== undefined && Object.keys(budgetData.accounts).length > 0) {
        convertToMultiSelectDropdownElement(accountName, budgetData.accounts);
    } else {
        convertToMultiSelectDropdownElement(accountName, ["no dropdown options"]);
    }

    var categoryTag = document.getElementById("categoryTagFilter");
    if (budgetData.categories !== undefined && Object.keys(budgetData.categories).length > 0) {
        convertToMultiSelectDropdownElement(categoryTag, budgetData.categories);
    } else {
        convertToMultiSelectDropdownElement(categoryTag, ["no dropdown options"]);
    }
}

function showEvents() {
    sortEvents();

    // remove previously shown events
    var eventsView = document.getElementById("eventsList");
    for (var i = eventsView.children.length-1; i > -1; i--) {
        eventsView.removeChild(eventsView.children[i]);
    }

    // filters
    var startDate = document.getElementById("eventsStart").selectedDate;
    var endDate = document.getElementById("eventsEnd").selectedDate;
    if (startDate != undefined && endDate != undefined && startDate.getTime() > endDate.getTime()) {
        alert("start date is after end date");
        return;
    }
    var calendarNames = document.getElementById("calendarNameFilter").selectedFields;
    var accountNames = document.getElementById("accountNameFilter").selectedFields;
    var categoryTags = document.getElementById("categoryTagFilter").selectedFields;

    // filter and show events from budget data
    var eventsValueTotal = 0;
    for (var index in budgetData.events) {
        var eventOb = budgetData.eventsMap[budgetData.events[index]];

        // filtering
        var eventObDate = new Date(eventOb.date);
        if (startDate != undefined && endDate != undefined) {
            var [repeatsInTimeWindow, occurrences, occurrenceDates] = eventHasRepeatsInDateWindow(eventOb, startDate, endDate);
        } else {
            var [repeatsInTimeWindow, occurrences, occurrenceDates] = [false, 0, []];
        }

        if (startDate != undefined && eventObDate.getTime() < startDate.getTime() && !repeatsInTimeWindow) {
            // date is before start date
            continue;
        }
        if (endDate != undefined && eventObDate.getTime() > endDate.getTime() && !repeatsInTimeWindow) {
            // date is after end date
            continue;
        }

        if (calendarNames != undefined && calendarNames.length > 0 && !calendarNames.includes(eventOb.calendarName)) {
                // does not match selected filter value
                continue;
        }
        if (accountNames != undefined && accountNames.length > 0 && !accountNames.includes(eventOb.accountName)) {
                // does not match selected filter value
                continue;
        }
        if (categoryTags != undefined && categoryTags.length > 0 && !categoryTags.includes(eventOb.categoryTag)) {
                // does not match selected filter value
                continue;
        }

        // calculate events total
        if (!repeatsInTimeWindow) {
            eventsValueTotal += !isNaN(Number(eventOb.amount)) ? Number(eventOb.amount) : 0;
        } else {
            eventsValueTotal += !isNaN(Number(eventOb.amount)) ? Number(eventOb.amount) * occurrences : 0;
        }

        // displaying
        var eView = document.createElement("div");
        var table = document.createElement("table");
        table.style = "border:solid;border-width:2;width:50%;";
        for (var key in eventOb) {
            if (key === "eventID") {
                continue;
            }
            if (eventOb[key] == undefined) {
                continue;
            }
            appendLeftHeaderTableRow(table, camelcaseToTitle(key), eventOb[key]);
        }
        if (repeatsInTimeWindow) {
            appendLeftHeaderTableRow(table, "Dates", occurrenceDates);
        }
        eView.appendChild(table);
        eventsView.appendChild(eView);
    }
    // display events total
    document.getElementById("eventsValueTotal").innerText = eventsValueTotal.toFixed(2);
}