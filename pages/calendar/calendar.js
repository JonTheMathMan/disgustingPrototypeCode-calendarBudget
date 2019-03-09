function getMonthLength(monthInt, fullYearInt){
	switch (monthInt) {
		case 1:
			if(fullYearInt % 4 === 0) {
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

var currentDate = new Date();
var viewMonth = new Date();
viewMonth.setDate(1);
document.getElementById("viewMonthName").textContent = viewMonth.toDateString().slice(3,8) + viewMonth.getFullYear();
showDays();
function prevMonth() {
	viewMonth.setMonth(viewMonth.getMonth()-1);
	document.getElementById("viewMonthName").textContent = viewMonth.toDateString().slice(3,8) + viewMonth.getFullYear();
	showDays();
}
function nextMonth() {
	viewMonth.setMonth(viewMonth.getMonth()+1);
	document.getElementById("viewMonthName").textContent = viewMonth.toDateString().slice(3,8) + viewMonth.getFullYear();
	showDays();
}
function showDays(){
	var daysOfMonthContainer = document.getElementById("daysOfMonthContainer");
	for (var expectedChildren = 0; expectedChildren < 2; expectedChildren++) {
		if (daysOfMonthContainer.firstElementChild !== null) {
			daysOfMonthContainer.removeChild(daysOfMonthContainer.firstElementChild);
		}
	}

	// container divs
	var weekDayHeadersContainer = document.createElement("div");
	var dayBoxesContainer = document.createElement("div");
	var dayBoxesAbsolutePositionWrapper = document.createElement("div");


	// styling - div position variables
	var dayOftheWeek = viewMonth.getDay();
	var weekShift;
	var cyclePeriod = 101;
	var marginSide = 10;

	// container divs properties
	weekDayHeadersContainer.id = "weekDayHeaders";
	weekDayHeadersContainer.style.height = 10;
	dayBoxesContainer.id = "dayBoxesContainer";
	dayBoxesAbsolutePositionWrapper.style.position = "absolute";

	// day of the week column headers
	var weekDayNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	for (var weekDayIndex in weekDayNames){
		var weekDayHeader = document.createElement("div");
		weekDayHeader.style.position = "absolute";
		weekDayHeader.style.left = cyclePeriod * weekDayIndex + marginSide;
		weekDayHeader.style.width = cyclePeriod;
		weekDayHeader.style.textAlign = "center";
		weekDayHeader.textContent = weekDayNames[weekDayIndex];
		weekDayHeadersContainer.appendChild(weekDayHeader);
	}
	daysOfMonthContainer.appendChild(weekDayHeadersContainer);

	// dayBoxes
	for(var i=0; i<getMonthLength(viewMonth.getMonth(), viewMonth.getFullYear()); i++) {
		weekShift = i+dayOftheWeek;
		var dayBox = document.createElement("div");
		dayBox.className = "dayBox";
		dayBox.style.left = cyclePeriod * (weekShift % 7) + marginSide;
		dayBox.style.top = cyclePeriod * Math.floor(weekShift/7) + marginSide;
		dayBoxesContainer.style.height = cyclePeriod * Math.floor(weekShift/7) + cyclePeriod + 2 * marginSide;
		dayBox.textContent = i+1;
		dayBox.dateDayNumber = i+1;
		dayBox.getDate = function(){return this.dateDayNumber;};
		dayBox.onmouseover = function(){
			this.textContent += " Add Event?";
		};
		dayBox.onmouseleave = function(){
			this.textContent = this.getDate();
		};
		dayBox.onclick = function(){
			viewMonth.setDate(this.getDate());
			document.getElementById("date").value = viewMonth.toDateString();
			document.getElementById("calendarPage").hidden = true;
			document.getElementById("newEventPage").hidden = false;
			selectedPage = "newEventPage";
		};
		dayBoxesAbsolutePositionWrapper.appendChild(dayBox);
	}
	dayBoxesContainer.appendChild(dayBoxesAbsolutePositionWrapper);
	daysOfMonthContainer.appendChild(dayBoxesContainer);
}