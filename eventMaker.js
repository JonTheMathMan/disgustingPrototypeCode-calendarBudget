function createCalendarEvent(submit) {
	var eventFields = document.getElementsByClassName("createCalendarEvent");
	var eventEntry = {};
	eventEntry["eventID"] = Date.now();
	var emptyValues = ["select an option", "no dropdown options", ""]
	for(var i=0;i<eventFields.length;i++) {
		eventEntry[eventFields[i].id] = emptyValues.includes(eventFields[i].textContent) ? undefined : eventFields[i].textContent;
		eventEntry[eventFields[i].id] = emptyValues.includes(eventFields[i].value) ? undefined : eventFields[i].value;
	}
	console.log(JSON.stringify(eventEntry));
}