function setupAjax1()
{
	requestData("events.xml",loadEvents);
}
function hideContents()
{
	var contents=document.getElementsByClassName("content");
	for(var i=0;i<contents.length;i++)
	{
		contents[i].style.display="none";
	}
	var table=document.getElementById("page").style.display="block";
}
var items=[];
function loadEvents(xmlhttp)
{
	items=[];
	var table = document.getElementById("page");
	hideContents();
	// Clear any existing contents
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
	}
	var xmldoc = xmlhttp.responseXML;
	var events = xmldoc.getElementsByTagName("event");
	for (var i = 0; i < events.length; i++)
	{
		//Extract basic info about each item
		var EventArtists = events[i].getElementsByTagName("artist");
		var EventDate=events[i].getElementsByTagName("startDate")[0];
		var EventTags = events[i].getElementsByTagName("tag");
		var EventURL=events[i].getElementsByTagName("url")[1];
		// Add a row for each item
		var tr = document.createElement("tr");

		var td1 = document.createElement("td");
		// Right hand cell, containing item details
		var td2 = document.createElement("td");
		
		// Title
		var divArtists = document.createElement("div");
		divArtists.innerHTML = "The artists for this event are: ";
		for(var j=0;j<EventArtists.length;j++)
			divArtists.innerHTML += EventArtists[j].firstChild.data + "; ";
		td1.appendChild(divArtists);

		//URL
		var divLink = document.createElement("div");
		var linkEvent = document.createElement("a");
		linkEvent.setAttribute("href", EventURL.firstChild.data);
		linkEvent.innerHTML = "Click here for redirecting to the event page";
		divLink.appendChild(linkEvent);
		td2.appendChild(divLink);
		
		//Date
		var divDate = document.createElement("div");
		divDate.innerHTML = "Tbe date for this event is: "+EventDate.firstChild.data;
		td1.appendChild(divDate);

		//Tags
		var divTags = document.createElement("div");
		divTags.innerHTML = "Tags: ";
		for(var j=1;j<EventTags.length;j++)
			divTags.innerHTML += EventTags[j].firstChild.data + "; ";
		td1.appendChild(divTags);

		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
		
	}
}
