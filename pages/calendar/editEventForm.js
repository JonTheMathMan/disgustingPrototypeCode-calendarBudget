function getEditForm() {
    var editForm = document.createElement("form");
    var dateEntry = document.createElement("div");
    var repeatIntervalType = document.createElement("select");
    var calendarName = document.createElement("select");
    var newCalendarName = document.createElement("input");
    var accountName = document.createElement("select");
    var newAccountName = document.createElement("input");
    var categoryTag = document.createElement("select");
    var newCategoryTag = document.createElement("input");
    var amount = document.createElement("input");
    var memo = document.createElement("input");
    var notes = document.createElement("input");

    editForm.refreshOptions = function() {
        getFormSelectOptions(repeatIntervalType, budgetData.repeatEventOptions);
        getFormSelectOptions(calendarName, budgetData.calendars);
        getFormSelectOptions(accountName, budgetData.accounts);
        getFormSelectOptions(categoryTag, budgetData.categories);
    }
    editForm.refreshOptions();
    
    editForm.appendChild(dateEntry)
    editForm.appendChild(repeatIntervalType)
    editForm.appendChild(calendarName)
    editForm.appendChild(newCalendarName)
    editForm.appendChild(accountName)
    editForm.appendChild(newAccountName)
    editForm.appendChild(categoryTag)
    editForm.appendChild(newCategoryTag)
    editForm.appendChild(amount)
    editForm.appendChild(memo)
    editForm.appendChild(notes)
    return editForm;
}

function getFormSelectOptions(selectEl, options) {
    for (var childIndex = selectEl.children.length; childIndex>0; childIndex--) {
        selectEl.removeChild(selectEl.children[childIndex-1]);
    }
    let opt = document.createElement("option");
    opt.innerText = "select an option";
    selectEl.appendChild(opt);
    if (typeof options == "object" && !Array.isArray(options)) {
        for (var optI = 0; optI < Object.keys(options).length; optI++) {
            let opt = document.createElement("option");
            opt.innerText = Object.keys(options)[optI];
            selectEl.appendChild(opt);
        }
        return;
    }
    for (var optI = 0; optI < options.length; optI++) {
        let opt = document.createElement("option");
        opt.innerText = options[optI];
        selectEl.appendChild(opt);
    }
}

/*
date
repeatIntervalType
repeatIntervalValue
calendarName
newCalendarName
accountName
newAccountName
categoryTag
newCategoryTag
amount
memo
notes
*/