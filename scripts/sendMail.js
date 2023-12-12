function sendMail (to,subject,txt,cc) {
    $.ajax({
        url: "php/sendMail.php",
        type: "POST",
        cache: false,
        data: {
            to: to,
            subject: subject,
            txt: txt,
            cc: cc                        
        },
        success: function(dataResult){
            //var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Mail Notification Sent!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Mail Not Sent.");
            }
            
        }
    });
}