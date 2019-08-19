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
        for (var key in budgetData.events[index]) {
            table.innerHTML += "<tr><th>" + key + "</th><td>" + budgetData.events[index][key] + "</td></tr>";
        }
        eView.appendChild(table);
        eventsView.appendChild(eView);
    }
}