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
		return "General"
	}
	else {
		return ""
	}
}
 
function processUser(data){
	current["user"] = data;
}

function processUsers(data){
	current["users"] = data;
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

function getPoints(userName){
	for (var i = 0; i < current["users"].length; i++){
		if (lowCase(userName) == lowCase(current["users"][i].UserName)){
			return current["users"][i].Tot_Points;
		}
	}
}

function getID(UserName){
	return '<input id="' + UserName + '" type="checkbox">'; 
}

function processMembers(data){
	current["members"] = data;

	var memberList = "";
	var memberCount = 0
	var commOptions = '<select id="comList" onchange="changeComm()">';
	var commOptions2 = '<select id="comList2" onchange="changeComm2()">';

	for (var i = 0; i < data.length; i++){
		if (lowCase(current["user"]) == lowCase(data[i].UserName) && data[i].Role == "Admin"){
			var selComm = data[i].Community;
			break;
		}
	}
	current["myComm"] = [];
	for (var i = 0; i < data.length; i++){
		if (lowCase(current["user"]) == lowCase(data[i].UserName) && data[i].Role == "Admin"){
			commOptions = commOptions + '<option>' + data[i].Community + '</option>';
			commOptions2 = commOptions2 + '<option>' + data[i].Community + '</option>';
			current["myComm"].push(data[i].Community)
		}
	}
	current["selComm"] = selComm;
	document.getElementById("commOptions").innerHTML = commOptions + '</select>';
	document.getElementById("commOptions2").innerHTML = commOptions2 + '</select>';
	document.getElementById("selComm").innerHTML = selComm;

	current["table3"] = $('#comMembers').DataTable({
		//"fixedHeader": { header: true,},
		deferLoading:true,
		"bPaginate": false,
		"autoWidth": false,
		dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
		buttons: [
			{ extend: 'excel', text: 'Export  to Excel' }
			//'copy', 'csv', 'excel', 'pdf', 'print'
		],
		"data": data,
		select:"single",
	  	"columns": [
			{ 'data': 'UserName', "sTitle": "<input type='checkbox' id='selectAll' onchange='selectAll()'></input>", render: getID },
			{ 'data': 'id' },
			{ 'data': 'UserName', title: 'Name', width:'300px', render: getNames },
			{ 'data': 'Community', title:'Community'},
			{ 'data': 'UserName', title:'E-Mail', width:'300px', render: getEmail },
			{ 'data': 'Tot_Points', title:'Total Points', width:'100px' },
			{ 'data': 'Tot_Points', title:'Level', width:'150px', render: getRank },
			{ 'data': 'UserName' },
		],
		columnDefs: [
			//{ type: 'date', 'targets': [4] },
			{ "targets": [0,1,3,7], "visible": false },
			{ "bSortable": false, "aTargets": [ 0,1,2,3 ] }
		],
		'searchCols': [
		//{ 'sSearch': lowCase(current["user"]) },
			null,
			null,
			null,
			{ 'sSearch': selComm },
			null,
			null,
			//{ 'sSearch': 'Approved' },
		],
		"order": [[0, 'asc']],
	});

	for (var i = 0; i < data.length; i++){
		if (lowCase(current["user"]) == lowCase(data[i].UserName) && data[i].Role == "Admin"){
			document.getElementById("error").style.display = 'none';
			document.getElementById('container').style.display='block';
			document.getElementById('loading').style.display='none';
			break;
		}
		else{
			document.getElementById("error").style.display = 'block';
			document.getElementById('container').style.display='none';
			document.getElementById('loading').style.display='none';
		}
	}
}

function approvePoints2(){
	var countRow = 0;
	var Points_Earned = document.getElementById("Points_Earned2").value;
	var awardReason = document.getElementById("awardReason").value;
	if (Points_Earned == '' || Points_Earned == 0) {
		alert("Points awarded cannot be empty or equal to zero")
	}
	else{
		current["table3"].column(7).visible(true);
		current["table3"].rows({search:'applied'}).every( function ( rowIdx, tableLoop, rowLoop ) {
			var cells = [];
			var rowNode = this.node();
			$(rowNode).find("td:visible").each(function (){
				var cellData = $(this).text();
				cells.push(cellData);    					
			});
			if(document.getElementById(cells[5]).checked == true){
				countRow = countRow + 1;
				var Tot_Points = parseFloat(getPoints(cells[5])) + parseFloat(Points_Earned);
				var postElement1 = "UPDATE Army_Users SET Tot_Points = '" + Tot_Points + "' WHERE UserName = '" + lowCase(cells[5]) + "'";
				var postElement2 = "UPDATE Army_Membership SET Tot_Points = '" + Tot_Points + "' WHERE UserName = '" + lowCase(cells[5]) + "'";
				var postElement3 = "INSERT INTO Army_Achievements VALUES ('" + formatDate(new Date()) + "','" + formatDate(new Date()) + "','" + toTitleCase(current["user"]) + "','" + lowCase(cells[5]) 
					+ "','" + "Points Awarded" + "','" + current["selComm"] + "','" + awardReason + "','" + "" + "','" + formatDate(new Date()) + "','Approved','" + formatDate(new Date()) + "','" + Points_Earned + "','','')";

				var postElement = postElement1 + "; " + postElement2 + "; " + postElement3;
				postDB(postElement);

				var to = getEmail(cells[5]);
				var cc = "";
				//var to = 'abimbola.salami@nlng.com';
				//var cc = 'Cc: ' + getEmail(current["user"]);
				var subject = "Points Awarded";
				var txt = 'Dear ' + toTitleCase(cells[4]) + '\n\nCongratulations! You have been awarded ' + Points_Earned + ' points by the ' + current["selComm"] + ' community for the reason - ' + awardReason + '.\n\nVisit the link below to view your profile. \n\n' + 'http://wapp-bny.nlng.net/digitalarmy/index.html \n\n' + 'Regards\nDigital Army';
				sendMail (to,subject,txt,cc)
			}
		});
		if(countRow > 0){
			alert(Points_Earned + " point(s) have been awarded to " + countRow + " member(s)")
			current["table3"].column(0).visible(false);
			location.reload();
		}
		else{
			alert("No selection has been made")
		}
		current["table3"].column(7).visible(false);
	}
}
function showCol0(){
	document.getElementById('btn1').style.display='none';
	document.getElementById('btn2').style.display='block';
	document.getElementById('btn3').style.display='block';
	current["table3"].column(0).visible(true);
}
function hideCol0(){
	document.getElementById('btn1').style.display='block'; 
	document.getElementById('btn2').style.display='none'; 
	document.getElementById('btn3').style.display='none';
	current["table3"].column(0).visible(false);
}

function selectAll(){
	current["table3"].column(7).visible(true);
	current["table3"].rows({search:'applied'}).every( function ( rowIdx, tableLoop, rowLoop ) {
		var cells = [];
		var rowNode = this.node();
		$(rowNode).find("td:visible").each(function (){
			var cellData = $(this).text();
			cells.push(cellData);    					
		});
		if (document.getElementById("selectAll").checked == true){
			document.getElementById(cells[5]).checked = true;
		}
		else{
			document.getElementById(cells[5]).checked = false;
		}
		

	});
	current["table3"].column(7).visible(false);
}

function changeComm(){
	var d = document.getElementById("comList");
	var selComm = d.options[d.selectedIndex].text;
	document.getElementById("selComm").innerHTML = selComm;
	current["table3"].columns(3).search(selComm, true, false, true).draw();
}

function changeComm2(){
	var d = document.getElementById("comList2");
	var selComm = d.options[d.selectedIndex].text;
	document.getElementById("selComm").innerHTML = selComm;
	current["table"].columns(2).search(selComm, true, false, true).draw();
}

function showEvid(Evidence){
	if (Evidence != ""){
		return '<a href="php/uploads/evidence/' + Evidence + '"  target="_blank"> View Evidence</a>';
	}
	else{
		return "";
	}
}

function processAchievements(data){
	current["achievements"] = data;

	var notifyCount = 0;

	for(var j = 0; j < data.length; j++) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].Community == current["myComm"][j] && data[i].Status == "Pending"){
				notifyCount = notifyCount + 1;
			}
		}
	}

	if (notifyCount > 0){
		document.getElementById('notify').innerHTML=notifyCount;
		document.getElementById('notify').style.display='block';
	}

	current["table"] = $('#pendingList').DataTable({
		//"fixedHeader": { header: true,},
		deferLoading:true,
		paging: false,
		"autoWidth": false,
		dom: 'rt<"bottom"lp><"clear">',
		buttons: [
			//{ extend: 'excel', text: 'Export  to Excel' }
			//'copy', 'csv', 'excel', 'pdf', 'print'
		],
		"data": data,
		select:"single",
	  	"columns": [
			{ 'data': 'UserName', title: 'Name', width:'200px', render: getNames },
			{ 'data': 'Achievement', title:'Achievement', width:'300px'},
			{ 'data': 'Community', title:'Community'},
			{ 'data': 'Achievement_Details', title:'Details', width:'200px'},
			{ 'data': 'Achievement_Desc', title:'Description', width:'300px'},
			{ 'data': 'Date_Achieve', title:'Date Achieved', width:'100px'},
			{ 'data': 'Evidence', title:'Evidence', width:'100px', render: showEvid },
			{ 'data': 'Points_Earned', title:'Points', width:'100px'},
			{ 'data': 'Status'},
			{ 'data': 'id' },
			{ 'data': 'UserName' },
			{ "mData": null,
				"bSortable": false,
				"mRender": function (o) { return '<i class="editRow" title="Approve"><button id="editRow" style="cursor: pointer; background:#007C4B; color:white; width:50px;">&#10004;</button></i>&nbsp;<i class="delRow" title="Decline"><button id="editRow" style="cursor: pointer; background:red; color:white; width:50px;">&#10006;</button></i>'; },
				width:"200px",
				title:"Action"
			},
		],
		columnDefs: [
			{ type: 'date', 'targets': [4] },
			{ "targets": [2,8,9,10], "visible": false },
			{ "bSortable": false, "aTargets": [ 0,1,2,3 ] }
		],
		'searchCols': [
		null,
		null,
		{ 'sSearch': current["selComm"] },
		null,
		null,
		null,
		null,
		null,
		{ 'sSearch': 'Pending' },
		],
		"order": [[4, 'desc']],
	});

	//Approve Row
    $('#pendingList tbody').on('click', 'i.editRow', function () {
		    	
    	currentRowCollection = {};
    	    
    	current["table"].column(2).visible(true);  
    	current["table"].column(8).visible(true);
		current["table"].column(9).visible(true);
		current["table"].column(10).visible(true);
    	
        var $row = $(this).closest("tr");
        
        var $tds1 = $row.find("td:eq(1)"); 
		var $tds2 = $row.find("td:eq(2)"); 
		var $tds3 = $row.find("td:eq(3)"); 
		var $tds7 = $row.find("td:eq(7)"); 
		var $tds9 = $row.find("td:eq(9)");
		var $tds10 = $row.find("td:eq(10)");
 
		$.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["Achievement"] = txt;
        });
		$.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["Community"] = txt;
        });
		$.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["Achievement_Details"] = txt;
        });
		$.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["Points_Earned"] = txt;
        });
        $.each($tds9, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });
		$.each($tds10, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["UserName"] = txt;
        });            
                  
    	current["table"].column(2).visible(false);
    	current["table"].column(8).visible(false);
		current["table"].column(9).visible(false);
		current["table"].column(10).visible(false);

		document.getElementById("Points_Earned").value = currentRowCollection["Points_Earned"];

		document.getElementById('id03').style.display='block';
	});

	$('#pendingList tbody').on('click', 'i.delRow', function () {
		    	
    	currentRowCollection = {};
    	    
    	current["table"].column(2).visible(true);  
    	current["table"].column(8).visible(true);
		current["table"].column(9).visible(true);
		current["table"].column(10).visible(true);
    	
        var $row = $(this).closest("tr");
        
		var $tds1 = $row.find("td:eq(1)"); 
		var $tds2 = $row.find("td:eq(2)"); 
        var $tds7 = $row.find("td:eq(7)"); 
		var $tds9 = $row.find("td:eq(9)");
		var $tds10 = $row.find("td:eq(10)");
		
		$.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["Achievement"] = txt;
        });
		$.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["Community"] = txt;
        });
		$.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["Points_Earned"] = txt;
        });
        $.each($tds9, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });
		$.each($tds10, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["UserName"] = txt;
        });            
                  
    	current["table"].column(2).visible(false);
    	current["table"].column(8).visible(false);
		current["table"].column(9).visible(false);
		current["table"].column(10).visible(false);

		document.getElementById("Points_Earned").value = currentRowCollection["Points_Earned"];

		document.getElementById('id02').style.display='block';
	});
}

function approvePoints(){
	var Points_Earned = document.getElementById("Points_Earned").value;
	var Tot_Points = parseFloat(getPoints(currentRowCollection["UserName"])) + parseFloat(Points_Earned);
	var achievList = ['Capability Building','Competitions','Digital Solution Delivery','Influencer of the Week'];
	var achievList2 = ['Event Attendance'];
	var lowScore = [2,5,5,1];
	var highScore = [30,30,30,5];
	var actualScore = [2];

	var errorMsg = "";
	for(var i = 0; i < achievList.length; i++) {
		if (currentRowCollection["Achievement"] == achievList[i] && (Points_Earned < lowScore[i] || Points_Earned > highScore[i])){
			errorMsg = "Points for " + achievList[i] + " cannot be less than " + lowScore[i] + " or more than " + highScore[i];
		}
	}
	for(var i = 0; i < achievList2.length; i++) {
		if (currentRowCollection["Achievement"] == achievList2[i] && Points_Earned != actualScore[i]){
			errorMsg = "Points for " + achievList2[i] + " must be " + actualScore[i];
		}
	}
	if (currentRowCollection["Achievement"] == "Organizing of Event" && currentRowCollection["Achievement_Details"] == "Active Organizing Committee" && Points_Earned != 7){
		errorMsg = "Points for Organizing of Event - Active Organizing Committee must be 7";
	}
	else if (currentRowCollection["Achievement"] == "Organizing of Event" && currentRowCollection["Achievement_Details"] == "Coordinator/ Leader of Event" && (Points_Earned < 10 || Points_Earned > 20)){
		errorMsg = "Points for Organizing of Event - Coordinator/ Leader of Event cannot be less than 10 or more than 20";
	}
	else if (currentRowCollection["Achievement"] == "Organizing of Event" && currentRowCollection["Achievement_Details"] == "Presented a Topic" && (Points_Earned < 5 || Points_Earned > 20)){
		errorMsg = "Points for Organizing of Event - Presented a Topic cannot be less than 5 or more than 20";
	}

	if (Points_Earned == '' || Points_Earned == 0) {
		alert("Points awarded cannot be empty or equal to zero")
	}
	else if (errorMsg != ""){
		alert(errorMsg);
	}
	else {
		var postElement1 = "UPDATE Army_Users SET Tot_Points = '" + Tot_Points + "' WHERE UserName = '" + lowCase(currentRowCollection["UserName"]) + "'";
		var postElement2 = "UPDATE Army_Achievements SET Points_Earned = '" + Points_Earned + "', Status = 'Approved', Date_Approved = '" + formatDate(new Date()) + 
			"', UpdatedBy = '" + toTitleCase(current["user"]) + "' WHERE id = '" + currentRowCollection["id"] + "'";
		var postElement3 = "UPDATE Army_Membership SET Tot_Points = '" + Tot_Points + "' WHERE UserName = '" + lowCase(currentRowCollection["UserName"]) + "'";

		var postElement = postElement1 + "; " + postElement2 + "; " + postElement3;
		postDB (postElement);

		var cc = "";
		for(var i = 0; i < current["members"].length; i++) {
			if (current["members"][i].Community == currentRowCollection["Community"] && current["members"][i].Role == 'Admin') {
				var cc = cc + getEmail(current["members"][i].UserName) + ', ';
			}
		}
		//var cc = "abimbola.salami@nlng.com";
		if(cc != ""){
			var cc = 'Cc: ' + cc;
		}
		var to = getEmail(currentRowCollection["UserName"]);
		var subject = "Points Claim Approved";
		var txt = 'Dear ' + toTitleCase(currentRowCollection["UserName"]) + '\n\nCongratulations! Your points claim request for ' + currentRowCollection["Achievement"] + ' has been approved successfully by ' + toTitleCase(current["user"]) + 
			' and you have been awarded ' + Points_Earned + ' points.\n\nVisit the link below to view your profile. \n\n' + 'http://wapp-bny.nlng.net/digitalarmy/index.html \n\n' + 'Regards\nDigital Army';

		sendMail (to,subject,txt,cc);
		alert("Request has been approved successfully");
		location.reload();
	}
}

function declinePoints(){
	var Points_Earned = 0;
	var Decline_Reason = document.getElementById("Decline_Reason").value;

	if (Decline_Reason == ''){
		alert("Kindly state a reason why claim is declined")
	}
	else{
		var postElement = "UPDATE Army_Achievements SET Points_Earned = '" + Points_Earned + "', Status = 'Declined', Date_Approved = '" + formatDate(new Date()) + 
		"', Decline_Reason = '" + Decline_Reason + "', UpdatedBy = '" + toTitleCase(current["user"]) + "' WHERE id = '" + currentRowCollection["id"] + "'";

		postDB (postElement);

		var cc = "";
		for(var i = 0; i < current["members"].length; i++) {
			if (current["members"][i].Community == currentRowCollection["Community"] && current["members"][i].Role == 'Admin') {
				var cc = cc + getEmail(current["members"][i].UserName) + ', ';
			}
		}
		//var cc = "abimbola.salami@nlng.com";
		if(cc != ""){
			var cc = 'Cc: ' + cc;
		}
		var to = getEmail(currentRowCollection["UserName"]);
		var subject = "Points Claim Declined";
		var txt = 'Dear ' + toTitleCase(currentRowCollection["UserName"]) + '\n\nYour points claim request for ' + currentRowCollection["Achievement"] + ' has been declined by ' + toTitleCase(current["user"]) + 
			' for the reason below:\n\n- ' + Decline_Reason + '\n\nVisit the link below to view your profile. \n\n' + 'http://wapp-bny.nlng.net/digitalarmy/index.html \n\n' + 'Regards\nDigital Army';

		sendMail (to,subject,txt,cc);
		alert("Request has been declined auccessfully")

		location.reload();
	}
}

function show01() {
	var d = document.getElementById("Achievement");
	var daAchieve = d.options[d.selectedIndex].text;
	if (daAchieve == "Capability Building") {
		$('#r01').show();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();
	}
    else if (daAchieve == "Competitions") {
		$('#r01').hide();$('#r02').show();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();
	}
    else if (daAchieve == "Digital Solution Delivery") {
		$('#r01').hide();$('#r02').hide();$('#r03').show();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();
	}
    else if (daAchieve == "Event Attendance") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').show();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();
	}
    else if (daAchieve == "Organizing of Event") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').show();$('#r06').hide();$('#r07').show();$('#r08').hide();
	}
    else if (daAchieve == "Influencer of the Week") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').show();$('#r07').show();$('#r08').hide();
	}
    else if (daAchieve == "Joining a CoP") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();
	}
	else if (daAchieve == "Others") {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').show();
	}
	else {
		$('#r01').hide();$('#r02').hide();$('#r03').hide();$('#r04').hide();$('#r05').hide();$('#r06').hide();$('#r07').show();$('#r08').hide();
	}	
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