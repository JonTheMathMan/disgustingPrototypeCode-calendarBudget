var loadJSONHtml = `<div id="inputBox"><form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
<h2>Json File</h2>
 <input type='file' id='fileinput'>
 <input type='button' value='Submit' onclick='loadFile();'>
</form>
<p id="fileLoadedMsg">File Not Loaded</p></div>
<style>
    #inputBox {
        background-color:gray;
        width: 50%;
        margin-left: 25%;
        box-shadow: -10px 10px 15px;
    }
</style>`;