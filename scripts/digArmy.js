var current = null;
current = {};

function lowCase(str) {
	var splitStr = str.toLowerCase().split('.');
	for (var i = 0; i < splitStr.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		splitStr[i] = splitStr[i].substring(0).toLowerCase();     
	}
	// Directly return the joined string
	return splitStr.join('.'); 
}
const lowerCaseList = ["of", "and"]
function toTitleCase(str) {
	return str.replace(
	  /\p{L}+/gu,
	  function(txt) {
		if (str.indexOf(txt) !== 0 && lowerCaseList.includes(txt.toLowerCase())) {
		  return txt.toLowerCase();
		}
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  }
	);
  }
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function sort_by_key(array, key){
	return array.sort(function(a, b){
		var x = a[key]; var y = b[key];
		return ((y < x) ? -1 : ((y > x) ? 1 : 0));
		//return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

function getRank(points){
	if (parseFloat(points) >= 0 && parseFloat(points) <= 40){
		return "Private"
	}
	else if (parseFloat(points) >= 41 && parseFloat(points) <= 90){
		return "Corporal"
	}
	else if (parseFloat(points) >= 91 && parseFloat(points) <= 150){
		return "Sergeant"
	}
	else if (parseFloat(points) >= 151 && parseFloat(points) <= 350){
		return "Lieutenant"
	}
	else if (parseFloat(points) >= 351 && parseFloat(points) <= 800){
		return "Captain"
	}
	else if (parseFloat(points) >= 801 && parseFloat(points) <= 1200){
		return "Major"
	}
	else if (parseFloat(points) >= 1201 && parseFloat(points) <= 1800){
		return "Colonel"
	}
	else if (parseFloat(points) >= 1801 && parseFloat(points) <= 2600){
		return "Brigadier General"
	}
	else if (parseFloat(points) >= 2601 && parseFloat(points) <= 3600){
		return "Major General"
	}
	else if (parseFloat(points) >= 3601){
		return "Lieut. Gen."
	}
	else {
		return ""
	}
}

function getRank2(points){
	if (parseFloat(points) >= 0 && parseFloat(points) <= 40){
		return "Private-41-Corporal"
	}
	else if (parseFloat(points) >= 41 && parseFloat(points) <= 90){
		return "Corporal-91-Sergeant"
	}
	else if (parseFloat(points) >= 91 && parseFloat(points) <= 150){
		return "Sergeant-151-Lieutenant"
	}
	else if (parseFloat(points) >= 151 && parseFloat(points) <= 350){
		return "Lieutenant-351-Captain"
	}
	else if (parseFloat(points) >= 351 && parseFloat(points) <= 800){
		return "Captain-801-Major"
	}
	else if (parseFloat(points) >= 801 && parseFloat(points) <= 1200){
		return "Major-1201-Colonel"
	}
	else if (parseFloat(points) >= 1201 && parseFloat(points) <= 1800){
		return "Colonel-1801-Brigadier General"
	}
	else if (parseFloat(points) >= 1801 && parseFloat(points) <= 2600){
		return "Brigadier General-2601-Major General"
	}
	else if (parseFloat(points) >= 2601 && parseFloat(points) <= 3600){
		return "Major General-3601-General"
	}
	else if (parseFloat(points) >= 3601){
		return "Lieut. Gen."
	}
	else {
		return ""
	}
}
 
function processUser(data){
	current["user"] = data;
}

function processUsers(data){
	var userFound = ''
	current["users"] = data;
	for (var i = 0; i < data.length; i++){
		if (lowCase(current["user"]) == lowCase(data[i].UserName)){
			document.getElementById("fullName").innerHTML = data[i].FirstName + ' ' + data[i].LastName;
			document.getElementById("armyRank").innerHTML = (getRank2(data[i].Tot_Points)).split('-')[0];
			document.getElementById("totPoints").innerHTML = data[i].Tot_Points;
			document.getElementById("totPoints2").innerHTML = data[i].Tot_Points;
			var pointGap = parseFloat((getRank2(data[i].Tot_Points)).split('-')[1]) - parseFloat(data[i].Tot_Points);
			//document.getElementById("toolTip").innerHTML = pointGap + ' points to reach ' + (getRank2(data[i].Tot_Points)).split('-')[2];
			loadinput(parseFloat(data[i].Tot_Points)*100/parseFloat((getRank2(data[i].Tot_Points)).split('-')[1]));
			if (data[i].ProfilePhoto != ""){
				var ProfilePhoto = "php/uploads/ProfilePhotos/" + data[i].ProfilePhoto;
			}
			else{
				var ProfilePhoto = "resources/ProfilePhotos/Default.Photo.jpg";
			}
			document.getElementById("profilePhoto").src = ProfilePhoto + "?" + new Date().getTime();
			document.getElementById("profilePhoto2").src = ProfilePhoto + "?" + new Date().getTime();
			document.getElementById('emblem').style.backgroundImage = "url('resources/" + (getRank2(data[i].Tot_Points)).split('-')[0] + "_emblem.jpg')";
			document.getElementById("armyProgress").title = pointGap + ' points to reach ' + (getRank2(data[i].Tot_Points)).split('-')[2];
			document.getElementById("barTitle").innerHTML = pointGap + ' points to reach ' + (getRank2(data[i].Tot_Points)).split('-')[2];
			document.getElementById("barTitle2").innerHTML = 3600 - parseFloat(data[i].Tot_Points) + ' points to reach Lieut. Gen.';

			current["FirstName"] = data[i].FirstName;
			current["LastName"] = data[i].LastName;
			current["EMail"] = data[i].EMail;

			var ranks = ['Private','Corporal','Sergeant','Lieutenant','Captain','Major','Colonel','Brigadier General','Major General','Lieut. Gen.']
			for (var j = 0; j < ranks.length; j++){
				var thisID = j+1
				document.getElementById('step' + thisID).style.backgroundColor = 'green';
				if (ranks[j] == (getRank2(data[i].Tot_Points)).split('-')[0]) {
					document.getElementById('pos' + thisID).style.display = 'block';
					document.getElementById('here' + thisID).style.display = 'block';
					document.getElementById('step' + thisID).style.backgroundColor = 'blue';
					break;
				}

			} 
			userFound = 'YES';
		}
	}
	if(userFound == 'YES'){
		document.getElementById('id06').style.display='none';
		document.getElementById('container').style.display='block';
		document.getElementById('loading').style.display='none';
	}
	else{
		document.getElementById("firstName2").value = toTitleCase(current["user"].split(".")[0]);
		document.getElementById("lastName2").value = toTitleCase(current["user"].split(".")[1]);
		document.getElementById("eMail2").value = lowCase(current["user"]) + "@nlng.com";
		document.getElementById('id06').style.display='block';
		document.getElementById('container').style.display='none';
		document.getElementById('loading').style.display='none';
	}
}

function getNames(userName){
	for (var i = 0; i < current["users"].length; i++){
		if (lowCase(userName) == lowCase(current["users"][i].UserName)){
			return current["users"][i].FirstName + ' ' + current["users"][i].LastName;
		}
	}
}
function getEmail(userName){
	for (var i = 0; i < current["users"].length; i++){
		if (lowCase(userName) == lowCase(current["users"][i].UserName)){
			return current["users"][i].EMail;
		}
	}
}

function processMembers(data){
	current["members"] = data;
	var memberList = "";
	var memberCount = 0
	var commOptions = '<select id="comList" onchange="changeComm()">';

	for (var i = 0; i < data.length; i++){
		if (lowCase(current["user"]) == lowCase(data[i].UserName) && data[i].Role == "Admin"){
			document.getElementById("adminIcon").style.display = 'block';
		}
	}

	for (var i = 0; i < data.length; i++){
		if (lowCase(current["user"]) == lowCase(data[i].UserName)){
			memberList = memberList + '<i class="fas fa-user" style="color: green;"></i>&nbsp;<span style="color: grey; font-size: 10pt;">' + data[i].Community + '</span><br>'
			commOptions = commOptions + '<option>' + data[i].Community + '</option>'
			memberCount = memberCount + 1;
		}
	}
	if(memberCount > 0){
		document.getElementById("memberList").innerHTML = memberList;
		document.getElementById("commOptions").innerHTML = commOptions + '</select>';
	}
	else{
		document.getElementById("memberList").innerHTML = 'You are not a member of any Community';
		document.getElementById("commOptions").innerHTML = '';
	}

	var comm_list = ['Digital Army','Agile COP','Analytics COP','DCC','Hackathon','ICC']
	var rankList = ""

	var thisdata = {};
    var thisArray = [];
	for (var i = 0; i < data.length; i++){
		thisdata.UserName = data[i].UserName;
		thisdata.Community = data[i].Community;
		thisdata.Tot_Points = parseFloat(data[i].Tot_Points);
		thisArray.push({...thisdata})
	}
	thisArray = sort_by_key(thisArray, 'Tot_Points');

	var commData = [];

	for (var c = 0; c < comm_list.length; c++){
		var thisdata = {};
    	current[comm_list[c]] = [];
		var thisId = 0;
		
		for (var i = 0; i < thisArray.length; i++){
			if (thisArray[i].Community == comm_list[c]){
				thisId = thisId + 1;
				/*if(i > 0 && thisArray[i].Tot_Points == thisArray[i-1].Tot_Points && thisArray[i].Community == thisArray[i-1].Community){
					thisdata.id = thisId - 1;
				}
				else{
					thisdata.id = thisId
				}*/
				thisdata.id = thisId
				thisdata.UserName = thisArray[i].UserName;
				thisdata.Community = thisArray[i].Community;
				thisdata.Tot_Points = thisArray[i].Tot_Points;
				current[comm_list[c]].push({...thisdata})
				commData.push({...thisdata})
			}
		}
		for (var i = 0; i < current[comm_list[c]].length; i++){
			if (lowCase(current["user"]) == lowCase(current[comm_list[c]][i].UserName)){
				thisRank = i+1;
				current["pos_" + comm_list[c]] = thisRank;
				rankList = rankList + '<div style="width: 220px; height: 65px; border: 0px solid black; margin-top: 10px; float: left; margin-left: 30px; padding-top: 20px;">' +
                '<div style="float: left; height: 75px;"><i style="color: green" class="fas fa-kaaba"></i></div>&nbsp;<span>' + comm_list[c] + 
				'</span><br><span style="color: grey;">&nbsp;' + current[comm_list[c]][i].id + ' out of ' + current[comm_list[c]].length + '</span></div>'
			}
		}
		for (var i = 0; i < current['Digital Army'].length; i++){
			if (lowCase(current["user"]) == lowCase(current["Digital Army"][i].UserName)){
				current["dRank"] = current["Digital Army"][i].id;
			}
		}
	}
	if(memberCount > 0){
		document.getElementById("rankList").innerHTML = rankList;
	}
	else{
		document.getElementById("rankList").innerHTML = 'No ranking to report';
	}

	current["table3"] = $('#memberRank').DataTable({
		"rowCallback": function( row, data ) {
			if(lowCase(data.UserName) == lowCase(current["user"])){$('td', row).addClass('highlightRow')}
		},
		//"fixedHeader": { header: true,},
		deferLoading:true,
		//paging: false,
		"autoWidth": false,
		dom: 'rt<"bottom"lp><"clear">',
		buttons: [
			//{ extend: 'excel', text: 'Export  to Excel' }
			//'copy', 'csv', 'excel', 'pdf', 'print'
		],
		"data": commData,
		select:"single",
	  	"columns": [
		  { 'data': 'id', title:'Rank', width:'50px'},
		  { 'data': 'UserName', title: 'Name', width:'300px', render: getNames },
		  { 'data': 'Community', title:'Community'},
		  { 'data': 'Tot_Points', title:'Total Points', width:'100px' },
		  { 'data': 'Tot_Points', title:'Level', width:'100px', render: getRank },
		],
		columnDefs: [
			//{ type: 'date', 'targets': [4] },
			{ "targets": [2], "visible": false },
			{ "bSortable": false, "aTargets": [ 0,1,2,3 ] }
		],
		'searchCols': [
		//{ 'sSearch': lowCase(current["user"]) },
			null,
			null,
			{ 'sSearch': 'Digital Army' },
			null,
			//{ 'sSearch': 'Approved' },
		],
		"order": [[0, 'asc']],
	});
	current["table3"].page( (Math.ceil(current["dRank"]/10))-1 ).draw( 'page' );
}

function changeComm(){
	var d = document.getElementById("comList");
	var selComm = d.options[d.selectedIndex].text;
	current["table3"].columns(2).search(selComm, true, false, true).draw();
	current["table3"].page( (Math.ceil(current["pos_" + selComm]/10))-1 ).draw( 'page' );
}
function changeTool(){
	var d = document.getElementById("toolList");
	var toolList = d.options[d.selectedIndex].text;
	current["table4"].columns(2).search(toolList, true, false, true).draw();
	console.log(toolList)
}

function processAchievements(data){
	current["achievements"] = data;

	current["currId"] = parseInt(data[data.length-1].id) + 1;

	var achievList = ['Capability Building','Competitions','Digital Solution Delivery','Event Attendance','Influencer of the Week','Organizing of Event','Joining a COP']
	var achievList2 = ['Course(s) Completed','Competition(s) Won','Solution(s) Delivered','Event(s) Attended','Influence(s) Won','Event(s) Organized','Community(s) Joined']
	var achievList3 = ['Completed the course - ','Won a competition - ','Delivered a solution - ','Attended an event - ','Influencer of the week on ','Organized an event as ','Joined the ']

	var recentAct = '';
	var actCount = 0;
	for (var i = 0; i < data.length; i++){
		for (var a = 0; a < achievList.length; a++){
			if (data[data.length-1-i].Achievement == achievList[a] && data[data.length-1-i].Status == "Approved" && lowCase(data[data.length-1-i].UserName) == lowCase(current["user"])){
				actCount = actCount + 1;
				if (data[data.length-1-i].Achievement == 'Joining a COP'){
					recentAct = recentAct + '<i style="color: green; font-size:12pt;" class="fas fa-calendar-check"></i><span style="color: grey; font-size: 8pt;">&nbsp;' + achievList3[a] + data[data.length-1-i].Community + '</span><br>'
				}
				else{
					recentAct = recentAct + '<i style="color: green; font-size:12pt;" class="fas fa-calendar-check"></i><span style="color: grey; font-size: 8pt;">&nbsp;' + achievList3[a] + data[data.length-1-i].Achievement_Details + '</span><br>'
				}
			}
			if (actCount == 5){
				break;
			}
		}
	}
	if(recentAct != ""){
		document.getElementById("recentAct").innerHTML = recentAct;
	}
	else{
		document.getElementById("recentAct").innerHTML = '<br>No recent activities';
	}

	var achieveList = "";
	for (var a = 0; a < achievList.length; a++){
		var achievCount = 0;
		for (var i = 0; i < data.length; i++){
			if (data[i].Achievement == achievList[a] && data[i].Status == "Approved" && lowCase(data[i].UserName) == lowCase(current["user"])){
				achievCount = achievCount + 1;
			}
		}
		if(achievCount > 0){
			achieveList = achieveList + '<div style="width: 220px; height: 65px; border: 0px solid black; margin-top: 10px; float: left; margin-left: 35px; padding-top: 20px;">' + 		
			'<i class="fas fa-medal" style="color: green; font-size: 18pt;"></i><span>&nbsp;' + achievCount + ' ' +  achievList2[a] + '</span></div>';
		}
	}
	if(achieveList != ""){
		document.getElementById("achieveList").innerHTML = achieveList;
	}
	else{
		document.getElementById("achieveList").innerHTML = '<br>No achievements to report';
	}

	var tool_list = ['A# .NET','C++','C# (C Sharp)','C3','Cisco','dBase','Excel','Fortran','Google Apps Script','HTML','Java','JavaScript','Matlab','Pascal','PHP','PI Vision','Power Apps','Power BI','Python','SQL','Ultimus','VBA']

	var rankTools = ""

	var thisdata = {};
    var thisArray = [];
	for (var i = 0; i < data.length; i++){
		if(data[i].Digital_Tool != ""){
			thisdata.UserName = data[i].UserName;
			thisdata.Digital_Tool = data[i].Digital_Tool;
			thisdata.Points_Earned = parseFloat(data[i].Points_Earned);
			thisdata.Status = data[i].Status;
			thisArray.push({...thisdata})
		}
	}
	var thisdata = {};
    var thisArray2 = [];
	for (var i = 0; i < thisArray.length; i++){
		var found = "NO"
		for (var j = 0; j < thisArray2.length; j++){
			if(thisArray[i].UserName == thisArray2[j].UserName && thisArray[i].Digital_Tool == thisArray2[j].Digital_Tool){
				var found = "YES";
				var Points_Earned = thisArray2[j].Points_Earned
				thisArray2[j].Points_Earned = Points_Earned + thisArray[i].Points_Earned
				break;
			}
			else{
				var found = "NO"
			}
		}
		if(found == "NO"){
			thisdata.UserName = thisArray[i].UserName;
			thisdata.Digital_Tool = thisArray[i].Digital_Tool;
			thisdata.Points_Earned = parseFloat(thisArray[i].Points_Earned);
			thisdata.Status = thisArray[i].Status;
			thisArray2.push({...thisdata})
		}
	}
	thisArray2 = sort_by_key(thisArray2, 'Points_Earned');

	var toolOptions = '<select id="toolList" onchange="changeTool()">';
	var toolCount = 0;
	var toolArray = [];

	for (var i = 0; i < tool_list.length; i++){
		for (var j = 0; j < thisArray2.length; j++){
			if (tool_list[i] == thisArray2[j].Digital_Tool){
				toolOptions = toolOptions + '<option>' + tool_list[i] + '</option>'
				toolCount = toolCount + 1;
				toolArray.push(tool_list[i])
			}
		}
	}
	
	if(toolCount > 0){
		document.getElementById("toolOptions").innerHTML = toolOptions + '</select>';
	}
	else{
		document.getElementById("toolOptions").innerHTML = '';
	}

	var toolData = [];

	for (var c = 0; c < tool_list.length; c++){
		var thisdata = {};
    	current[tool_list[c]] = [];
		var thisId = 0;
		
		for (var i = 0; i < thisArray2.length; i++){
			if (thisArray2[i].Digital_Tool == tool_list[c]){
				thisId = thisId + 1;
				thisdata.id = thisId
				thisdata.UserName = thisArray2[i].UserName;
				thisdata.Digital_Tool = thisArray2[i].Digital_Tool;
				thisdata.Tot_Points = thisArray2[i].Points_Earned;
				thisdata.Status = thisArray2[i].Status;
				current[tool_list[c]].push({...thisdata})
				toolData.push({...thisdata})
			}
		}
	}

	current["table4"] = $('#toolRank').DataTable({
		//"fixedHeader": { header: true,},
		deferLoading:true,
		//paging: false,
		"autoWidth": false,
		dom: 'rt<"bottom"lp><"clear">',
		buttons: [
			//{ extend: 'excel', text: 'Export  to Excel' }
			//'copy', 'csv', 'excel', 'pdf', 'print'
		],
		"data": toolData,
		select:"single",
	  	"columns": [
		  { 'data': 'id', title:'Rank', width:'50px'},
		  { 'data': 'UserName', title: 'Name', width:'300px', render: getNames },
		  { 'data': 'Digital_Tool', title:'Digital Tool', width:'100px' },
		  { 'data': 'Tot_Points', title:'Total Points', width:'100px'},
		  { 'data': 'Status'},
		],
		columnDefs: [
			//{ type: 'date', 'targets': [4] },
			{ "targets": [4], "visible": false },
			{ "bSortable": false, "aTargets": [ 0,1,2,3 ] }
		],
		'searchCols': [
		//{ 'sSearch': lowCase(current["user"]) },
			null,
			null,
			{ 'sSearch': toolArray[0] },
			null,
			{ 'sSearch': 'Approved' },
		],
		"order": [[0, 'asc']],
	});

	var table = $('#achieveDetails').DataTable({
		//"fixedHeader": { header: true,},
		deferLoading:true,
		//paging: false,
		"autoWidth": false,
		dom: 'rt<"bottom"lp><"clear">',
		buttons: [
			//{ extend: 'excel', text: 'Export  to Excel' }
			//'copy', 'csv', 'excel', 'pdf', 'print'
		],
		"data": data,
		select:"single",
	  "columns": [
		  { 'data': 'UserName'},
		  { 'data': 'Achievement', title:'Achievement', width:'300px'},
		  { 'data': 'Community', title:'Community', width:'150px'},
		  { 'data': 'Achievement_Details', title:'Details', width:'200px'},
		  { 'data': 'Date_Achieve', title:'Date Achieved', width:'100px'},
		  { 'data': 'Points_Earned', title:'Points Earned', width:'100px'},
		  { 'data': 'Status'},
		],
		columnDefs: [
			{ type: 'date', 'targets': [4] },
			{ "targets": [0,6], "visible": false },
			{ "bSortable": false, "aTargets": [ 0,1,2,3 ] }
		],
		'searchCols': [
		{ 'sSearch': lowCase(current["user"]) },
		null,
		null,
		null,
		null,
		null,
		{ 'sSearch': 'Approved' },
		],
		"order": [[4, 'desc']],
	});

	var table2 = $('#achieveDetails2').DataTable({
		//"fixedHeader": { header: true,},
		deferLoading:true,
		//paging: false,
		"autoWidth": false,
		dom: 'rt<"bottom"lp><"clear">',
		buttons: [
			//{ extend: 'excel', text: 'Export  to Excel' }
			//'copy', 'csv', 'excel', 'pdf', 'print'
		],
		"data": data,
		select:"single",
		"columns": [
			{ 'data': 'UserName'},
			{ 'data': 'Achievement', title:'Achievement', width:'300px'},
			{ 'data': 'Community', title:'Community', width:'150px'},
			{ 'data': 'Achievement_Details', title:'Details', width:'200px'},
			{ 'data': 'Date_Achieve', title:'Date Achieved', width:'100px'},
			{ 'data': 'Points_Earned', title:'Points', width:'100px'},
			{ 'data': 'Status'},
		],
		columnDefs: [
			{ type: 'date', 'targets': [4] },
			{ "targets": [0,5,6], "visible": false },
			{ "bSortable": false, "aTargets": [ 0,1,2,3 ] }
		],
		'searchCols': [
			{ 'sSearch': lowCase(current["user"]) },
			null,
			null,
			null,
			null,
			null,
			{ 'sSearch': 'Pending' },
		],
		"order": [[4, 'desc']],
	});
}

function joinComm(){
	var a = document.getElementById("Community3");
    var Community = a.options[a.selectedIndex].text;
	var memberFound = "";
	for (var i = 0; i < current["members"].length; i++){
		if (lowCase(current["user"]) == lowCase(current["members"][i].UserName) && Community == current["members"][i].Community){
			memberFound = "YES";
			break;
		}
	}
	if(memberFound == "YES"){
		alert("You already belong to this Community!")
	}
	else if (Community == "Make a Selection"){
		alert("Please make a selection")
	}
	else{
		for (var i = 0; i < current["users"].length; i++){
			if (lowCase(current["user"]) == lowCase(current["users"][i].UserName)){
				var Tot_Points = parseFloat(current["users"][i].Tot_Points)
			}
		}
		Tot_Points = Tot_Points + 5;
	
		var postElement1 = "UPDATE Army_Users SET Tot_Points = '" + Tot_Points + "' WHERE UserName = '" + lowCase(current["user"]) + "'";
		var postElement2 = "INSERT INTO Army_Membership VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','Sys_Admin','" + lowCase(current["user"]) 
			+ "','" + Community + "','Member','" + Tot_Points + "')";
		var postElement3 = "UPDATE Army_Membership SET Tot_Points = '" + Tot_Points + "' WHERE UserName = '" + lowCase(current["user"]) + "'";
		var postElement4 = "INSERT INTO Army_Achievements VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','Sys_Admin','" + lowCase(current["user"]) 
			+ "','Joining a COP','" + Community + "','','','" + formatDate(new Date()) + "','Approved','" + formatDate(new Date()) + "','5','','','')";
	
		var postElement = postElement1 + "; " + postElement2 + "; " + postElement3 + "; " + postElement4;
		postDB (postElement);

		var cc = "";
		for(var i = 0; i < current["members"].length; i++) {
			if (current["members"][i].Community == Community && current["members"][i].Role == 'Admin') {
				var cc = cc + getEmail(current["members"][i].UserName) + ', ';
			}
		}
		//var cc = "abimbola.salami@nlng.com";
		if(cc != ""){
			var cc = 'Cc: ' + cc;
		}
		var to = getEmail(current["user"]);
		var subject = "New Community Joined";
		var txt = 'Dear ' + toTitleCase(current["user"]) + '\n\nCongratulations! You have successfully joined the ' + Community + ' community and have been awarded 5 points.\n\nVisit the link below to view your profile. \n\n' + 'http://wapp-bny.nlng.net/digitalarmy/index.html \n\n' + 'Regards\nDigital Army';

		sendMail (to,subject,txt,cc);
		alert("Commnunity joined successfully!")
		location.reload();
	}
}

function submitClaim(){
	var a = document.getElementById("Achievement");
    var Achievement = a.options[a.selectedIndex].text;
	var Evidence = 'Evidence' + myCookies.currId;

	var Course = document.getElementById("Course").value;
	var b = document.getElementById("Competition");
    var Competition = b.options[b.selectedIndex].text;
	var Project = document.getElementById("Project").value;
	var c = document.getElementById("Event");
    var Event = c.options[c.selectedIndex].text;
	var d = document.getElementById("Role");
    var Role = d.options[d.selectedIndex].text;
	var e = document.getElementById("Platform");
    var Platform = e.options[e.selectedIndex].text;

	var f = document.getElementById("Community");
    var Community = f.options[f.selectedIndex].text;
	var Details = document.getElementById("Details").value;
	var Date_Achieve = formatDate(document.getElementById("Date_Achieve").value);
	var Achievement_Desc = document.getElementById("Achievement_Desc").value;
	var g = document.getElementById("Digital_Tool");
    var Digital_Tool = g.options[g.selectedIndex].text;

	if (Achievement == "Capability Building"){
		var Achievement_Details = Course;
		var Ponts_Earned = '';
		var Competition = '';
		var Event = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Competitions"){
		var Achievement_Details = Competition;
		var Ponts_Earned = '';
		var Event = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Digital Solution Delivery"){
		var Achievement_Details = Project;
		var Ponts_Earned = ''
		var Competition = '';
		var Event = '';
		var Role = '';
		var Platform = '';
	}
	else if (Achievement == "Event Attendance"){
		var Achievement_Details = Event;
		var Ponts_Earned = 2
		var Competition = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Influencer of the Week"){
		var Achievement_Details = Platform;
		var Ponts_Earned = 5
		var Competition = '';
		var Event = '';
		var Role = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Organizing of Event"){
		var Achievement_Details = Role;
		var Ponts_Earned = '';
		var Competition = '';
		var Event = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Others"){
		var Achievement_Details = Details;
		var Ponts_Earned = '';
		var Competition = '';
		var Event = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}

	if (Achievement == 'Make a Selection' || Competition == 'Make a Selection' || Event == 'Make a Selection' || Role == 'Make a Selection' || Platform == 'Make a Selection' || Community == 'Make a Selection' || Digital_Tool == 'Make a Selection') {
		alert("Please make a selection from the drop-down")
	}
	else if(Date_Achieve == 'NaN-NaN-NaN') {
		alert("Please enter date of achievement")
	}
	else if (Achievement == "Capability Building" && Course == ""){
		alert("Please enter the course completed")
	}
	else if (Achievement == "Digital Solution Delivery" && Project == ""){
		alert("Please enter the project title")
	}
	else if (Achievement == "Others" && Details == ""){
		alert("Please enter details of the achievement")
	}
	else{
		var memberFound = "";
		for (var i = 0; i < current["members"].length; i++){
			if (lowCase(current["user"]) == lowCase(current["members"][i].UserName) && Community == current["members"][i].Community){
				memberFound = "YES";
				break;
			}
		}
		if(memberFound == "YES" || Community == "Others"){
			var postElement = "INSERT INTO Army_Achievements VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','Sys_Admin','" + lowCase(current["user"]) 
				+ "','" + Achievement + "','" + Community + "','" + Achievement_Details+ "','" + Achievement_Desc + "','" + Date_Achieve + "','Pending','','" + Ponts_Earned + "','','" + Digital_Tool + "','')";

			postDB(postElement);

			var to = "";
			for(var i = 0; i < current["members"].length; i++) {
				if (current["members"][i].Community == Community && current["members"][i].Role == 'Admin') {
					var to = to + getEmail(current["members"][i].UserName) + ', ';
				}
			}
			//var to = 'abimbola.salami@nlng.com';
			var cc = 'Cc: ' + getEmail(current["user"]);
			var subject = "Points Claim Pending Approval";
			var txt = 'Dear ' + Community + ' Admin' + '\n\nA points claim request from ' + toTitleCase(current["user"]) + ' is awaiting your approval with details below.\n\n' + 
				Achievement + ' (' + Achievement_Details + ')\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/digitalarmy/approve.html \n\n' + 'Regards\nDigital Army';
			sendMail (to,subject,txt,cc)
			//document.getElementById("Community4").innerHTML = Community;
			current['to'] = to;
			current['Community'] = Community;
			current['Achievement'] = Achievement + " - " + Achievement_Details;
			document.getElementById('id01').style.display='none';
			document.getElementById('id07').style.display='block';
			alert("Request has be submitted successfully!")
			//location.reload();
		}
		else{
			alert("You are not a member of the selected community. Kindly join before claiming point.")
		}
	}
}

function sendEvidence(){
	window.open('mailto:'+ current['to'] + '?subject=' + current['Community'] + ' Evidence: ' + current['Achievement'] + '&body=Evidence Attached.');
	location.reload();
}

function submitProfile(){
	var FirstName = document.getElementById("firstName2").value;
	var LastName = document.getElementById("lastName2").value;
	var EMail = document.getElementById("eMail2").value;
	var Tot_Points = 5;
	var Community = "Digital Army";

	var postElement1 = "INSERT INTO Army_Users VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','Sys_Admin','" + lowCase(current["user"]) 
		+ "','" + FirstName + "','" + LastName + "','" + Tot_Points + "','" + EMail + "','" + current["photoName"] + "')";
	var postElement2 = "INSERT INTO Army_Membership VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','Sys_Admin','" + lowCase(current["user"]) 
		+ "','" + Community + "','Member','" + Tot_Points + "')";
	var postElement3 = "INSERT INTO Army_Achievements VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','Sys_Admin','" + lowCase(current["user"]) 
		+ "','Joining a COP','" + Community + "','','','" + formatDate(new Date()) + "','Approved','" + formatDate(new Date()) + "','5','','','')";

	var postElement = postElement1 + "; " + postElement2 + "; " + postElement3
	postDB(postElement);
	alert("Congratulations! You have earned 5 points for joining the Army");
	//location.reload();
	document.getElementById('id04').style.display='none';
	document.getElementById('id08').style.display='block';
}

function updateProfile(){
	var FirstName = document.getElementById("firstName2").value;
	var LastName = document.getElementById("lastName2").value;
	var EMail = document.getElementById("eMail2").value;

	var postElement = "UPDATE Army_Users SET FirstName = '" + FirstName + "', LastName = '" + LastName + "', EMail = '" + EMail + "' WHERE UserName = '" + lowCase(current['user']) + "'";
	postDB(postElement);
	alert("Profile updated successfully");
	location.reload();
}

function showProfile(){
	document.getElementById('id04').style.display='block';
	document.getElementById('regTxt').style.display='none';
	document.getElementById('editTxt').style.display='none';
	document.getElementById('profTxt').style.display='block';
	document.getElementById('editBtn').style.display='block';
	document.getElementById('confirmTxt').style.display='none';
	document.getElementById('sumBtn').style.display='none';
	document.getElementById('phoBtn').style.display='none';
	document.getElementById('updBtn').style.display='none';
	document.getElementById('close1').style.display='block';
	document.getElementById('fName1').style.display='none';
	document.getElementById('fName2').style.display='block';
	document.getElementById('lName1').style.display='none';
	document.getElementById('lName2').style.display='block';
	document.getElementById('mail1').style.display='none';
	document.getElementById('mail2').style.display='block';
	document.getElementById("fName2").innerHTML = current["FirstName"];
	document.getElementById("lName2").innerHTML = current["LastName"];
	document.getElementById("mail2").innerHTML = current["EMail"];
}

function editProfile(){
	document.getElementById('editTxt').style.display='block';
	document.getElementById('profTxt').style.display='none';
	document.getElementById('editBtn').style.display='none';
	document.getElementById('updBtn').style.display='block';
	//document.getElementById('phoBtn').style.display='block';
	document.getElementById('fName1').style.display='block';
	document.getElementById('lName1').style.display='block';
	document.getElementById('mail1').style.display='block';
	document.getElementById('fName2').style.display='none';
	document.getElementById('lName2').style.display='none';
	document.getElementById('mail2').style.display='none';
	document.getElementById("firstName2").value = current["FirstName"];
	document.getElementById("lastName2").value = current["LastName"];
	document.getElementById("eMail2").value = current["EMail"];
}

function changePhoto(){
	document.getElementById('id04').style.display='none';
	document.getElementById('id08').style.display='block';
}

function show01() {
	var d = document.getElementById("Achievement");
	var daAchieve = d.options[d.selectedIndex].text;
	if (daAchieve == "Capability Building") {
		$('#r01').show();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();$('#r14').hide();
	}
    else if (daAchieve == "Competitions") {
		$('#r01').hide();$('#r02').show();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();$('#r14').hide();
	}
    else if (daAchieve == "Digital Solution Delivery") {
		$('#r01').hide();$('#r02').hide();$('#r03').show();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();$('#r14').show();
	}
    else if (daAchieve == "Event Attendance") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').show();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();$('#r14').hide();
	}
    else if (daAchieve == "Organizing of Event") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').show();$('#r06').hide();$('#r07').show();$('#r08').hide();$('#r14').hide();
	}
    else if (daAchieve == "Influencer of the Week") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').show();$('#r07').show();$('#r08').hide();$('#r14').hide();
	}
    else if (daAchieve == "Joining a CoP") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();$('#r14').hide();
	}
	else if (daAchieve == "Others") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').show();$('#r14').hide();
	}
	else {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();$('#r14').hide();
	}	
}

function expLadder(){
	document.getElementById('ladderBtn1').style.display='none';
	document.getElementById('ladderBtn2').style.display='block';
	document.getElementById('ladder').style.display='block';
	document.getElementById('container').style.width='1670px';
}
function colLadder(){
	document.getElementById('ladderBtn1').style.display='block';
	document.getElementById('ladderBtn2').style.display='none';
	document.getElementById('ladder').style.display='none';
	document.getElementById('container').style.width='1210px';
}

/*
function show01() {
	var RecordDate = formatDate(new Date());
	var UserName = lowCase(current["user"]);
	var a = document.getElementById("r09");
	var Achievement = a.options[a.selectedIndex].text;
	var b = document.getElementById("Community");
	var Community = b.options[b.selectedIndex].text;
	var currData = formatDate(document.getElementById(thisID).value);
	if (currData == 'NaN-NaN-NaN'){
		postElement = postElement + "'',"
	}
	else{
		postElement = postElement + "'" + currData + "',"
	}
}
*/
function formatDate(data, type, row) {
    var d = new Date(data),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    //return [day, month, year].join('/');
    return [year, month, day].join('-');
}

$(function() {
    $("h1").lettering();
  });

$(document).ready(function(){


	var element = $("#armyPhoto"); // global variable
	var getCanvas; // global variable
		
	/*$("#btn-Preview-Image").on('click', function () {
			html2canvas(element, {
			onrendered: function (canvas) {
				$("#previewImage").append(canvas);
				getCanvas = canvas;
				}
			});
	});*/

	$("#btn-Convert-Html2Image").on('click', function () {
		html2canvas(element, {
			onrendered: function (canvas) {
			$("#previewImage").append(canvas);
			getCanvas = canvas;
			}
		});

		var imgageData = getCanvas.toDataURL("image/jpeg");
		// Now browser starts downloading it instead of just showing it
		var newData = imgageData.replace(/^data:image\/jpeg/, "data:application/octet-stream");
		$("#btn-Convert-Html2Image").attr("download", "your_pic_name.png").attr("href", newData);
	});

});

function loadinput(score) {
	var gap = 100 - score
	var scoreWidth = score*100/(score+gap)
	var elem = document.getElementById("armyBar");   
	var width = 0;
	var id = setInterval(frame, 10);
	function frame() {
	  if (width >= scoreWidth) {
		clearInterval(id);
	  } else {
		width++; 
		elem.style.width = width + '%'; 
		//elem.innerHTML = (width * 1)  + '%';
	  }
	}
}

function submitClaimm(){
	var a = document.getElementById("Achievement");
    var Achievement = a.options[a.selectedIndex].text;

	var Course = document.getElementById("Course").value;
	var b = document.getElementById("Competition");
    var Competition = b.options[b.selectedIndex].text;
	var Project = document.getElementById("Project").value;
	var c = document.getElementById("Event");
    var Event = c.options[c.selectedIndex].text;
	var d = document.getElementById("Role");
    var Role = d.options[d.selectedIndex].text;
	var e = document.getElementById("Platform");
    var Platform = e.options[e.selectedIndex].text;

	var f = document.getElementById("Community");
    var Community = f.options[f.selectedIndex].text;
	var Details = document.getElementById("Details").value;
	var Date_Achieve = formatDate(document.getElementById("Date_Achieve").value);
	var Achievement_Desc = document.getElementById("Achievement_Desc").value;
	var g = document.getElementById("Digital_Tool");
    var Digital_Tool = g.options[g.selectedIndex].text;

	if (Achievement == "Capability Building"){
		var Achievement_Details = Course;
		var Ponts_Earned = '';
		var Competition = '';
		var Event = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Competitions"){
		var Achievement_Details = Competition;
		var Ponts_Earned = '';
		var Event = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Digital Solution Delivery"){
		var Achievement_Details = Project;
		var Ponts_Earned = ''
		var Competition = '';
		var Event = '';
		var Role = '';
		var Platform = '';
	}
	else if (Achievement == "Event Attendance"){
		var Achievement_Details = Event;
		var Ponts_Earned = 2
		var Competition = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Influencer of the Week"){
		var Achievement_Details = Platform;
		var Ponts_Earned = 5
		var Competition = '';
		var Event = '';
		var Role = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Organizing of Event"){
		var Achievement_Details = Role;
		var Ponts_Earned = '';
		var Competition = '';
		var Event = '';
		var Platform = '';
		var Digital_Tool = '';
	}
	else if (Achievement == "Others"){
		var Achievement_Details = Details;
		var Ponts_Earned = '';
		var Competition = '';
		var Event = '';
		var Role = '';
		var Platform = '';
		var Digital_Tool = '';
	}

	if (Achievement == 'Make a Selection' || Competition == 'Make a Selection' || Event == 'Make a Selection' || Role == 'Make a Selection' || Platform == 'Make a Selection' || Community == 'Make a Selection' || Digital_Tool == 'Make a Selection') {
		alert("Please make a selection from the drop-down")
	}
	else if(Date_Achieve == 'NaN-NaN-NaN') {
		alert("Please enter date of achievement")
	}
	else if (Achievement == "Capability Building" && Course == ""){
		alert("Please enter the course completed")
	}
	else if (Achievement == "Digital Solution Delivery" && Project == ""){
		alert("Please enter the project title")
	}
	else if (Achievement == "Others" && Details == ""){
		alert("Please enter details of the achievement")
	}
	else{
		var memberFound = "";
		for (var i = 0; i < current["members"].length; i++){
			if (lowCase(current["user"]) == lowCase(current["members"][i].UserName) && Community == current["members"][i].Community){
				memberFound = "YES";
				break;
			}
		}
		if(memberFound == "YES" || Community == "Others"){
			var postElement = "INSERT INTO Army_Achievements VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','Sys_Admin','" + lowCase(current["user"]) 
				+ "','" + Achievement + "','" + Community + "','" + Achievement_Details+ "','" + Achievement_Desc + "','" + Date_Achieve + "','Pending','','" + Ponts_Earned + "','','" + Digital_Tool+ "','" + current["fileName"] + "')";

			postDB(postElement);

			var to = "";
			for(var i = 0; i < current["members"].length; i++) {
				if (current["members"][i].Community == Community && current["members"][i].Role == 'Admin') {
					var to = to + getEmail(current["members"][i].UserName) + ', ';
				}
			}
			//var to = 'abimbola.salami@nlng.com';
			var cc = 'Cc: ' + getEmail(current["user"]);
			var subject = "Points Claim Pending Approval";
			var txt = 'Dear ' + Community + ' Admin' + '\n\nA points claim request from ' + toTitleCase(current["user"]) + ' is awaiting your approval with details below.\n\n' + 
				Achievement + ' (' + Achievement_Details + ')\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/digitalarmy/approve.html \n\n' + 'Regards\nDigital Army';
			sendMail (to,subject,txt,cc)
			document.getElementById("Community4").innerHTML = Community;
			current['to'] = to;
			current['Community'] = Community;
			current['Achievement'] = Achievement + " - " + Achievement_Details;
			//document.getElementById('id01').style.display='none';
			//document.getElementById('id07').style.display='block';
			alert("Request has be submitted successfully!")
			location.reload();
		}
		else{
			alert("You are not a member of the selected community. Kindly join before claiming point.")
		}
	}
}

var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
}
  
var myCookies = getCookies();