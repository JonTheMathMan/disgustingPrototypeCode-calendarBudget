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
document.getElementById("viewMonthName").innerHTML = viewMonth.toDateString().slice(3,8) + viewMonth.getFullYear();
showDays();
function prevMonth() {
	viewMonth.setMonth(viewMonth.getMonth()-1);
	document.getElementById("viewMonthName").innerHTML = viewMonth.toDateString().slice(3,8) + viewMonth.getFullYear();
	showDays();
}
function nextMonth() {
	viewMonth.setMonth(viewMonth.getMonth()+1);
	document.getElementById("viewMonthName").innerHTML = viewMonth.toDateString().slice(3,8) + viewMonth.getFullYear();
	showDays();
}
function showDays(){
	var daysOfMonthContainer = document.getElementById("daysOfMonthContainer");
	if (daysOfMonthContainer.firstElementChild != null) {
		daysOfMonthContainer.removeChild(daysOfMonthContainer.firstElementChild);
	}
	var dayBoxesContainer = document.createElement("div");
	for(var i=0; i<getMonthLength(viewMonth.getMonth(), viewMonth.getFullYear()); i++) {

		var dayBox = document.createElement("div");
		dayBox.className = "dayBox";
		dayBox.style.left = 120 * (i % 7);
		dayBox.style.top = 120 * Math.floor(i/7);
		dayBox.innerHTML = i+1;
		dayBox.dateDayNumber = i+1;
		dayBox.getDate = function(){return this.dateDayNumber;};
		dayBox.onclick = function(){alert(this.getDate());};
		dayBoxesContainer.appendChild(dayBox);
	}
	daysOfMonthContainer.appendChild(dayBoxesContainer);
}