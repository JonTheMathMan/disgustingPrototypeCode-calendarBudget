var eventMakerHtml = `<div id="createEventContainer" style="background-color:lightgreen;position:relative;">
            <p>Date:</p>
            <textarea disabled=true class="createCalendarEvent" id="date"></textarea>
            <p>Repeat Interval Type:</p>
            <div class="createCalendarEvent eventDropdown" id="repeatIntervalType"></div>
            <p>Repeat Interval Value:</p>
            <textarea disabled=true class="createCalendarEvent" id="repeatIntervalValue"></textarea>
            <p>Account Name:</p>
            <div class="createCalendarEvent eventDropdown" id="accountName"></div>
            <p>New Account Name:</p>
            <textarea class="createCalendarEvent" id="newAccountName"></textarea>
            <p>Category Tag:</p>
            <div class="createCalendarEvent eventDropdown" id="categoryTag"></div>
            <p>New Category Tag:</p>
            <textarea class="createCalendarEvent" id="newCategoryTag"></textarea>
            <p>Amount:</p>
            <textarea class="createCalendarEvent" id="amount"></textarea>
            <p>Memo:</p>
            <textarea class="createCalendarEvent" id="memo"></textarea>
            <br/>
            <br/>
            <a id="saveFile"><button onclick="createCalendarEvent()">Create Event</button></a>
        </div>`;