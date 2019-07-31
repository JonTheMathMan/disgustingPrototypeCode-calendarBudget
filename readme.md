# calendarBudget

This is pretty disgusting code. Still a work in progress. Really screws the code to try to do this in the browser without any requests to a backend. Should make an electron app or c++/c# app, so that the code can be prettier, faster, and cross-platform in the electron app case.

TODO:
- Make a calendar program that can create income or expense events that have category tags and account name tags.
- Have a setting that lets you choose what UI feature shows when the program starts (Default should maybe be create new event).
- Support repeating events: 
	- same day of the month or year
	- every integer days, weeks, months, years, so forth...
- view events and events data by category tag(s), account(s), and selected start-stop dates
- Save calendar events data as a json file through browser saving.
	[stackoverflow example](https://stackoverflow.com/questions/16329293/save-json-string-to-client-pc-using-html5-api)
	```javascript
	var data = {a:1, b:2, c:3};
	var json = JSON.stringify(data);
	var blob = new Blob([json], {type: "application/json"});
	var url  = URL.createObjectURL(blob);
	
	var a = document.createElement('a');
	a.download    = "backup.json";
	a.href        = url;
	a.textContent = "Download backup.json";

	```
	```javascript
	function saveAsFile(link, content, filename) {
		var blob = new Blob([content], {type: "text/text"});
		var url  = URL.createObjectURL(blob);

		// update link to new 'url'
		link.download    = filename + ".txt";
		link.href        = url;
	}

	saveAsFile(this, "YourContent", "HelloWorldFile");
	```
- Read calendar events data from the saved json file.
