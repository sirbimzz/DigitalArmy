$.ajax({
	url : 'php/getUser.php', // your php file
	type : 'GET', // type of the HTTP request
	cache: false,
	success : function(data){
		var obj = data.split('\\');
		var userName = obj[1];
		processUser(userName);
		$.ajax({
			url : 'php/getUsers.php', // your php file
			type : 'GET', // type of the HTTP request
			cache: false,
			success : function(data){
			   var obj = jQuery.parseJSON(data);
			   processUsers(obj);
			   $.ajax({
					url : 'php/getMembers.php', // your php file
					type : 'GET', // type of the HTTP request
					cache: false,
					success : function(data){
						var obj = jQuery.parseJSON(data);
						processMembers(obj);
						$.ajax({
							url : 'php/getAchievements.php', // your php file
							type : 'GET', // type of the HTTP request
							cache: false,
							success : function(data){
							   var obj = jQuery.parseJSON(data);
							   processAchievements(obj);
							}
						});
					}
				});
			}
		});
	}
});