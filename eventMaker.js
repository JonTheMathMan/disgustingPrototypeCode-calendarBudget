function createCalendarEvent() {
	var eventFields = document.getElementsByClassName("createCalendarEvent");
	var eventEntry = {};
	for(var i=0;i<eventFields.length;i++) {
		eventEntry[eventFields[i].id] = eventFields[i].value;
	}
	console.log(JSON.stringify(eventEntry));
}