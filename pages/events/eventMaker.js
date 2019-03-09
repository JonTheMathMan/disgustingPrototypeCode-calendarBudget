function createCalendarEvent() {
	var eventFields = document.getElementsByClassName("createCalendarEvent");
	var eventEntry = {};
	eventEntry["eventID"] = Date.now();
	var emptyValues = ["select an option", "no dropdown options", ""]
	for(var i=0;i<eventFields.length;i++) {
		eventEntry[eventFields[i].id] = emptyValues.includes(eventFields[i].textContent) ? undefined : eventFields[i].textContent;
		eventEntry[eventFields[i].id] = emptyValues.includes(eventFields[i].value) ? undefined : eventFields[i].value;
	}
	alert("Calendar Events Budget:\n\nSaving file to browser downloads folder.\nIf you are on a phone,\n\t it is reccomended that the downloads folder be set to a path on the SD card in the browser settings.");
	var a = document.getElementById("saveFile");
	a.download    = "budgetEvents.json";
	a.href        = URL.createObjectURL(new Blob([JSON.stringify(eventEntry)], {type: "application/json"}));
}