function sortEvents() {
     budgetData.events.sort(function(a, b){
        var aTimestamp = new Date(a.date).getTime();
        var bTimestamp = new Date(b.date).getTime();
        console.log("atimestamp", aTimestamp);
        console.log("btimestap", bTimestamp);
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

function showEvents() {
    sortEvents();
    var eventsView = document.getElementById("eventsList");
    for (var i = 0; i < eventsView.children.length; i++) {
        eventsView.removeChild(eventsView.children[i]);
    }
    for (var index in budgetData.events) {
        var eView = document.createElement("div");
        var table = document.createElement("table");
        table.style = "border:solid;border-width:2;width:50%;";
        for (var key in budgetData.events[index]) {
            if (key === "eventID") {
                continue;
            }
            table.innerHTML += "<tr><th>" + camelcaseToTitle(key) + "</th><td>" + budgetData.events[index][key] + "</td></tr>";
        }
        eView.appendChild(table);
        eventsView.appendChild(eView);
    }
}

// converts camelcase to title with spaces "eyeOfTheTiger" -> "Eye Of The Tiger"
function camelcaseToTitle(text) {
    var result = text.replace( /([A-Z])/g, " $1");
    var result2 = result.replace(/(^[a-z])/, result.match(/(^[a-z])/)[0].toUpperCase());
    return result2;
}