function initialise()
{
	setupAjax();
}
function setupAjax()
{
	// Refresh the lecturer list when it is clicked
	var menu = document.getElementById("menu");
	var menuItems=menu.getElementsByTagName("li");

	menuItems[0].onclick=function() {requestData("toptracks.json",loadtoptracks); notSearch=false; doubleClickPlayCount=false;
	doubleClickListeners=false;};
	menuItems[1].onclick=function() {requestData("topartists.json",loadtopartists); notSearch=false; doubleClickPlayCount=false;
	doubleClickListeners=false;};
	menuItems[2].onclick=function()	{requestData("events.xml",loadevents); doubleClickPlayCount=false;
	doubleClickListeners=false;};
	
	searchFeature();
	
	var actions=document.getElementById("actions");
	actions.style.display="none";

	var sortPlayCount = document.getElementById("playcount");
	sortPlayCount.onclick = function() { sortByPlayCount(); };
	var sortListeners = document.getElementById("listeners");
	sortListeners.onclick = function() { sortByListeners(); };
	
}
var tracksClicked=true;
function hideContents()
{
	var contents=document.getElementsByClassName("content");
	for(var i=0;i<contents.length;i++)
	{
		contents[i].style.display="none";
	}
	var table=document.getElementById("page").style.display="block";
}
function showContents()
{
	var contents=document.getElementsByClassName("content");
	for(var i=0;i<contents.length;i++)
	{
		contents[i].style.display="block";
		contents[i].style.height="300";
	}
	var table=document.getElementById("page").style.display="none";
	var tablesSearch=document.getElementsByClassName("searchTable");
	for(var i=0;i<tablesSearch.length;i++)
	{
		while (tablesSearch[i].childNodes.length > 0) {
		tablesSearch[i].removeChild(tablesSearch[i].firstChild);
		}
	}
	var buttons=document.getElementsByClassName("linkContent");
	for(var i=0;i<buttons.length;i++)
	{
		buttons[i].style.marginLeft="50%";
	}
}
// Global array to store item info
var items = [];
// Load the items data and put it in the table
function loadtoptracks(xmlhttp)
{
	items=[];
	if(notSearch==false)
		hideContents();
	// Extract the list of items from JSON
	var jsonDoc = JSON.parse(xmlhttp.responseText);
	
	var jsonTracks = jsonDoc.tracks.track;
	//console.log(jsonTracks);
	
	// Loop through the items
	for (var i = 0; i < jsonTracks.length; i++) {
	
		//Extract basic info about each item
		var trackArtistName = jsonTracks[i].artist.namework;
		var trackArtistURL=jsonTracks[i].artist.url;
		var trackTitle = jsonTracks[i].namework;
		var trackTitleURL=jsonTracks[i].url;
		var trackListeners = jsonTracks[i].listeners;
		var trackPlayCount = parseInt(jsonTracks[i].playcount);
		
		// Create an object to store info about the item
		var track = {
			artist : trackArtistName,
			artisturl:trackArtistURL,
			title : trackTitle,
			songurl: trackTitleURL,
			listeners : trackListeners,
			playcount : trackPlayCount,
		};
		
		// And add to the (global)list of items
		items.push(track);
	}
	
	// Refresh the table
	if(notSearch==false)
	{
		var actions=document.getElementById("actions");
		actions.style.display="block";
		fillTableTopTracks();
	}
	else searchTrack(); 
	
}

// Refresh the items table using the info in the 'items' array
function fillTableTopTracks()
{
	tracksClicked=true;
	// Get the (existing) table
	var table = document.getElementById("page");
	
	// Clear any existing contents
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
	}
	
	// Add a row for each item
	for (var i = 0; i < items.length; i++) {
		// New row
		var tr = document.createElement("tr");

		var trNum = document.createElement("tr");
		var tdNum = document.createElement("td");

		var divNum=document.createElement("div");
		divNum.innerHTML=i+1;
		divNum.style.marginLeft= "50%";
		divNum.style.width= "200";
		tdNum.style.backgroundColor= "#CCC";
		tdNum.appendChild(divNum);

		trNum.appendChild(tdNum);
		// Left hand cell, containing image
		var td1 = document.createElement("td");
		//var img = document.createElement("img");
		//img.setAttribute("src", items[i].imgUrl);
		//td1.appendChild(img);
		
		// Right hand cell, containing item details
		var td2 = document.createElement("td");
		
		// Title
		var divTitle = document.createElement("div");
		divTitle.id="divSong";
		var linkSong = document.createElement("a");
		linkSong.setAttribute("href", items[i].songurl);
		linkSong.innerHTML = items[i].title;
		divTitle.appendChild(linkSong);
		td1.appendChild(divTitle);

		// Artist
		var divArtist = document.createElement("div");
		divArtist.id="divArtist";
		var linkArtist = document.createElement("a");
		linkArtist.setAttribute("href", items[i].artisturl);
		divArtist.innerHTML = "Artist: "+items[i].artist;
		divArtist.appendChild(linkArtist);
		td1.appendChild(divArtist);

		//Listeners
		var divListeners = document.createElement("div");
		divListeners.id="divListeners";
		divListeners.innerHTML = "Listeners: "+items[i].listeners;
		td1.appendChild(divListeners);

		//PlayCount
		var divPlayCount = document.createElement("div");
		divPlayCount.id="divPlays";
		divPlayCount.innerHTML = "Playcount: "+items[i].playcount;
		td2.appendChild(divPlayCount);

		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(trNum);
		table.appendChild(tr);
		table.style.marginLeft="20%";
	}
}
function loadtopartists(xmlhttp)
{
	items=[];
	if(notSearch==false)
		hideContents();
	// Extract the list of items from JSON
	var jsonDoc = JSON.parse(xmlhttp.responseText);
	
	var jsonArtists = jsonDoc.artists.artist;
	//console.log(jsonTracks);
	
	// Loop through the items
	for (var i = 0; i < jsonArtists.length; i++) {
	
		//Extract basic info about each item
		var ArtistName = jsonArtists[i].namework;
		var ArtistImage=jsonArtists[i].image[3].url;
		var ArtistListeners = jsonArtists[i].listeners;
		var ArtistURL=jsonArtists[i].url;
		var ArtistPlayCount = parseInt(jsonArtists[i].playcount);
		
		// Create an object to store info about the item
		var artist = {
			artist : ArtistName,
			artisturl:ArtistURL,
			image : ArtistImage,
			listeners : ArtistListeners,
			playcount : ArtistPlayCount,
		};
		
		// And add to the (global)list of items
		items.push(artist);
	}
	
	// Refresh the table
	if(notSearch==false)
	{
		var actions=document.getElementById("actions");
		actions.style.display="block";
		fillTableTopArtists();
	}
	else searchArtist(); 
}

// Refresh the items table using the info in the 'items' array
function fillTableTopArtists()
{
	tracksClicked=false;
	// Get the (existing) table
	var table = document.getElementById("page");
	
	// Clear any existing contents
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
	}
	
	// Add a row for each item
	for (var i = 0; i < items.length; i++) {
		// New row
		var tr = document.createElement("tr");

		var trNum = document.createElement("tr");
		var tdNum = document.createElement("td");

		var divNum=document.createElement("div");
		divNum.innerHTML=i+1;
		divNum.style.marginLeft= "50%";
		divNum.style.width= "200";
		tdNum.style.backgroundColor= "#CCC";
		tdNum.appendChild(divNum);

		trNum.appendChild(tdNum);
		// Left hand cell, containing image
		var td1 = document.createElement("td");
		var img = document.createElement("img");
		img.setAttribute("src", items[i].image);
		td1.appendChild(img);
		
		// Right hand cell, containing item details
		var td2 = document.createElement("td");
		
		// Title
		var divTitle = document.createElement("div");
		divTitle.id="divArtist";
		var linkArtist = document.createElement("a");
		linkArtist.setAttribute("href", items[i].artisturl);
		linkArtist.innerHTML = items[i].artist;
		divTitle.appendChild(linkArtist);
		td2.appendChild(divTitle);

		//Listeners
		var divListeners = document.createElement("div");
		divListeners.id="divListeners";
		divListeners.innerHTML = "Listeners: "+items[i].listeners;
		td1.appendChild(divListeners);

		//PlayCount
		var divPlayCount = document.createElement("div");
		divPlayCount.id="divPlays";
		divPlayCount.innerHTML = "Playcount: "+items[i].playcount;
		td1.appendChild(divPlayCount);

		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(trNum);
		table.appendChild(tr);
		table.style.marginLeft="20%";
	}
}
function requestData(url, callBack)
{
	// Create a new XMLHttpRequest object
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			callBack(xmlhttp);
		}
	}
	// Open the object with the filename
	xmlhttp.open("POST", url, true);
	// Send the request
	xmlhttp.send(null);
}
function loadevents(xmlhttp)
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
		divArtists.id="divArtist";
		divArtists.innerHTML = "The artists for this event are: ";
		for(var j=0;j<EventArtists.length;j++)
		{	
			if(j==0)
				divArtists.innerHTML += "<b> <big>"+EventArtists[j].firstChild.data + "</b></big>; ";
			else if (j==EventArtists.length-1)
				divArtists.innerHTML += EventArtists[j].firstChild.data;
			else
				divArtists.innerHTML += EventArtists[j].firstChild.data + "; ";
		}
		td1.appendChild(divArtists);

		//URL
		var divLink = document.createElement("div");
		divLink.id="divURL";
		var linkEvent = document.createElement("a");
		linkEvent.setAttribute("href", EventURL.firstChild.data);
		linkEvent.innerHTML = "Click here for redirecting to the event page";
		divLink.appendChild(linkEvent);
		td2.appendChild(divLink);
		
		//Date
		var divDate = document.createElement("div");
		divDate.id="divDate";
		divDate.innerHTML = "The date for this event is: "+EventDate.firstChild.data;
		td1.appendChild(divDate);

		//Tags
		var divTags = document.createElement("div");
		divTags.id="divTag";
		divTags.innerHTML = "<b>Tags</b>: ";
		var divTag = document.createElement("div");
		for(var j=1;j<EventTags.length;j++)
		{
			divTags.innerHTML += "<br> </br>" + EventTags[j].firstChild.data;
		}
		td1.appendChild(divTags);

		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);	
		table.style.marginLeft="0%";
	}
	var actions=document.getElementById("actions");
	actions.style.display="none";
}
notSearch=false;
function searchFeature()
{
	var linkContents=document.getElementsByClassName("linkContent");
	linkContents[0].onclick=function() {
						notSearch=true;
						requestData("toptracks.json",loadtoptracks);
					   };
	linkContents[1].onclick=function() {
						notSearch=true;
						requestData("topartists.json",loadtopartists);
					   };
	linkContents[2].onclick=function() {
						requestData("events.xml",searchEvent);
					   };				   
}
function searchTrack()
{
	var check=false;
	var correct=false;
	var table=document.getElementsByClassName("searchTable")[0];
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
		}
	var searchItem=prompt();
	for(var i=0;i<items.length;i++)
	{
		check=false;
		if(searchItem == items[i].title || searchItem == items[i].artist || searchItem == items[i].listeners || searchItem == items[i].playcount)
			check=true;
		if(check==true)
			{
		correct=true;
		var tr = document.createElement("tr");

		var trNum = document.createElement("tr");
		var tdNum = document.createElement("td");

		var divNum=document.createElement("div");
		divNum.innerHTML=i+1;

		divNum.style.marginLeft= "50%";
		divNum.style.width= "200";
		tdNum.style.backgroundColor= "#CCC";
		tdNum.appendChild(divNum);


		trNum.appendChild(tdNum);
		// Left hand cell, containing image
		var td1 = document.createElement("td");
		
		// Right hand cell, containing item details
		var td2 = document.createElement("td");
		
		// Title
		var divTitle = document.createElement("div");
		divTitle.id="divSong";
		var linkSong = document.createElement("a");
		linkSong.setAttribute("href", items[i].songurl);
		linkSong.innerHTML = items[i].title;
		divTitle.appendChild(linkSong);
		td1.appendChild(divTitle);

		// Artist
		var divArtist = document.createElement("div");
		divArtist.id="divArtist";
		var linkArtist = document.createElement("a");
		linkArtist.setAttribute("href", items[i].artisturl);
		divArtist.innerHTML = "Artist: "+items[i].artist;
		divArtist.appendChild(linkArtist);
		td1.appendChild(divArtist);

		//Listeners
		var divListeners = document.createElement("div");
		divListeners.id="divListeners";
		divListeners.innerHTML = "Listeners: "+items[i].listeners;
		td1.appendChild(divListeners);

		//PlayCount
		var divPlayCount = document.createElement("div");
		divPlayCount.id="divPlays";
		divPlayCount.innerHTML = "Playcount: "+items[i].playcount;
		td2.appendChild(divPlayCount);

		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(trNum);
		table.appendChild(tr);
			document.getElementsByClassName("content")[0].style.height="auto";
			}		
	}
	document.getElementById("toptracksButton").style.marginLeft="0%";

}
function searchArtist()
{
	var check=false;
	var table=document.getElementsByClassName("searchTable")[1];
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
		}
	var searchItem=prompt();
	for(var i=0;i<items.length;i++)
	{
		check=false;
		if(searchItem == items[i].artist || searchItem == items[i].listeners || searchItem == items[i].playcount)
			check=true;
		if(check==true)
		{
			var tr = document.createElement("tr");

		var trNum = document.createElement("tr");
		var tdNum = document.createElement("td");

		var divNum=document.createElement("div");
		divNum.innerHTML=i+1;
		divNum.style.marginLeft= "50%";
		divNum.style.width= "200";
		tdNum.style.backgroundColor= "#CCC";
		tdNum.appendChild(divNum);

		trNum.appendChild(tdNum);
		// Left hand cell, containing image
		var td1 = document.createElement("td");
		var img = document.createElement("img");
		img.setAttribute("src", items[i].image);
		td1.appendChild(img);
		
		// Right hand cell, containing item details
		var td2 = document.createElement("td");
		
		// Title
		var divTitle = document.createElement("div");
		divTitle.id="divArtist";
		var linkArtist = document.createElement("a");
		linkArtist.setAttribute("href", items[i].artisturl);
		linkArtist.innerHTML = items[i].artist;
		divTitle.appendChild(linkArtist);
		td2.appendChild(divTitle);

		//Listeners
		var divListeners = document.createElement("div");
		divListeners.id="divListeners";
		divListeners.innerHTML = "Listeners: "+items[i].listeners;
		td1.appendChild(divListeners);

		//PlayCount
		var divPlayCount = document.createElement("div");
		divPlayCount.id="divPlays";
		divPlayCount.innerHTML = "Playcount: "+items[i].playcount;
		td1.appendChild(divPlayCount);

		tr.appendChild(td1);

		tr.appendChild(td2);
		table.appendChild(trNum);
		table.appendChild(tr);
		document.getElementsByClassName("content")[1].style.height="auto";
		}
	}
		document.getElementById("topartistsButton").style.marginLeft="0%";
		
}
function searchEvent(xmlhttp)
{
	var check=false;
	var table=document.getElementsByClassName("searchTable")[2];
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
		}
	var searchItem=prompt();
	var xmldoc = xmlhttp.responseXML;
	var events = xmldoc.getElementsByTagName("event");
	for (var i = 0; i < events.length; i++)
	{
		check=false;
		//Extract basic info about each item
		var EventArtists = events[i].getElementsByTagName("artist");
		var EventDate=events[i].getElementsByTagName("startDate")[0];
		var EventTags = events[i].getElementsByTagName("tag");
		var EventURL=events[i].getElementsByTagName("url")[1];
		// Add a row for each item
		for(var j=0;j<EventArtists.length;j++)
			if(EventArtists[j].firstChild.data == searchItem)
				check=true;
		for(var j=1;j<EventTags.length;j++)
			if(EventTags[j].firstChild.data == searchItem)
				check=true;
		
		if(searchItem==EventURL.firstChild.data || searchItem==EventDate.firstChild.data)
			check=true;
		if(check==true)
		{
		var tr = document.createElement("tr");

		var td1 = document.createElement("td");
		// Right hand cell, containing item details
		var td2 = document.createElement("td");
		
		// Title
		var divArtists = document.createElement("div");
		divArtists.id="divArtist";
		divArtists.innerHTML = "The artists for this event are: ";
		for(var j=0;j<EventArtists.length;j++)
		{	
			if(j==0)
				divArtists.innerHTML += "<b> <big>"+EventArtists[j].firstChild.data + "</b></big>; ";
			else if (j==EventArtists.length-1)
				divArtists.innerHTML += EventArtists[j].firstChild.data;
			else
				divArtists.innerHTML += EventArtists[j].firstChild.data + "; ";
		}
		td1.appendChild(divArtists);

		//URL
		var divLink = document.createElement("div");
		divLink.id="divURL";
		var linkEvent = document.createElement("a");
		linkEvent.setAttribute("href", EventURL.firstChild.data);
		linkEvent.innerHTML = "Click here for redirecting to the event page";
		divLink.appendChild(linkEvent);
		td2.appendChild(divLink);
		
		//Date
		var divDate = document.createElement("div");
		divDate.id="divDate";
		divDate.innerHTML = "The date for this event is: "+EventDate.firstChild.data;
		td1.appendChild(divDate);

		//Tags
		var divTags = document.createElement("div");
		divTags.id="divTag";
		divTags.innerHTML = "<b>Tags</b>: ";
		var divTag = document.createElement("div");
		for(var j=1;j<EventTags.length;j++)
		{
			divTags.innerHTML += "<br> </br>" + EventTags[j].firstChild.data;
		}
		td1.appendChild(divTags);

		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);	
		table.style.marginLeft="0%";
		document.getElementsByClassName("content")[2].style.height="auto";
		}
	}
	document.getElementById("eventsButton").style.marginLeft="85%";
}
var doubleClickPlayCount=false;
var doubleClickListeners=false;
function sortByPlayCount()
{
	if(doubleClickPlayCount==false)
	items.sort( function(a,b) { if (a.playcount < b.playcount) return -1; else return 1; } );
	else
	items.sort( function(a,b) { if (a.playcount > b.playcount) return -1; else return 1; } );
	if(tracksClicked==true)
		fillTableTopTracks();
	else 
		fillTableTopArtists();
	if(doubleClickPlayCount==false)
		doubleClickPlayCount=true;
	else doubleClickPlayCount=false;
}
function sortByListeners()
{
	if(doubleClickListeners==false)
	items.sort( function(a,b) { if (a.listeners < b.listeners) return -1; else return 1; } );
	else
		items.sort( function(a,b) { if (a.listeners > b.listeners) return -1; else return 1; } );
	if(tracksClicked==true)
		fillTableTopTracks();
	else 
		fillTableTopArtists();
	if(doubleClickListeners==false)
		doubleClickListeners=true;
	else doubleClickListeners=false;
}
