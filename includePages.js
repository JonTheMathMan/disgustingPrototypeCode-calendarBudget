function includePages() {
  document.getElementById("loadJSONPage").innerHTML = loadJSONHtml;
  document.getElementById("calendarPage").innerHTML = calendarHtml;
  document.getElementById("newEventPage").innerHTML = eventMakerHtml;
  document.getElementById("eventsViewerPage").innerHTML = eventsViewerHtml;
}
includePages();