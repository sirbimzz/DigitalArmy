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
function capsCase(str) {
	var splitStr = str.toUpperCase().split('.');
	for (var i = 0; i < splitStr.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		splitStr[i] = splitStr[i].substring(0).toUpperCase();     
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

function getPhoto(userName){
	for (var i = 0; i < current["users"].length; i++){
		if (lowCase(userName) == lowCase(current["users"][i].UserName)){
			return current["users"][i].ProfilePhoto;
		}
	}
}

function processMembers(data){
	current["members"] = data;
	
	var memberList = "";
	var memberCount = 0
	var commOptions = '<select id="comList" onchange="changeComm()">';

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
	}
	var leaderList = "";
	for (var i = 0; i < current["Digital Army"].length; i++){
		var ProfilePhoto = getPhoto(current["Digital Army"][i].UserName);
		if (ProfilePhoto != ""){
			var ProfilePhoto = getPhoto(current["Digital Army"][i].UserName);
		}
		else{
			var ProfilePhoto = "Default.Photo.jpg";
		}
		leaderList = leaderList + '<div style="width: 1275px; height: 60px; margin-top: 30px;">' + 
			'<div style="width: 150px; background-color: white; height: 60px; text-align: center; padding-top: 15px; float: left; margin-left: 15px;">' + current["Digital Army"][i].id + '</div>' +
			'<div class="rankBox"><div style="float: left; width: 100px; border-bottom-left-radius: 50px; border-top-left-radius: 50px;"><div class="smallCircle"></div>' +
			'<img src="php/uploads/ProfilePhotos/' + ProfilePhoto + "?" + new Date().getTime() + '" alt="Photo" style="height: 68px; width:68px; margin-top: -126px; margin-left: 6px;"></div>' +
			'<div style="float: left; width: 400px;">' + capsCase(getNames(current["Digital Army"][i].UserName)) + '</div></div>' +
			'<div style="width: 150px; background-color: white; height: 60px; text-align: center; padding-top: 15px; float: left; margin-left: 15px;">' + current["Digital Army"][i].Tot_Points + '</div>' +
			'<div style="width: 400px; background-color: white; height: 60px; text-align: left; padding-top: 15px; float: left; margin-left: 15px;">' +
			'<div style="float: left; width: 20px; height: 60px;"></div><div style="float: left; width: 300px;">' + capsCase(getRank(current["Digital Army"][i].Tot_Points)) + '</div>' + 
			'<div style="float: left; width: 80px;">' + 
			'<img id="emb" src="resources/' + getRank(current["Digital Army"][i].Tot_Points) + '_emb.jpg" alt="Photo" style="height: 50px; width:50px; margin-top: -10px; margin-left: 0px;">' +
			'</div></div></div>'
	}
	
	document.getElementById("leaderList").innerHTML = leaderList;
	document.getElementById('container').style.display='block';
	document.getElementById('loading').style.display='none';
	
	/*if(memberCount > 0){
		document.getElementById("rankList").innerHTML = rankList;
	}
	else{
		document.getElementById("rankList").innerHTML = 'No ranking to report';
	}*/
}

function processAchievements(data){
	current["achievements"] = data;
}

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