<?php

    $to = $_POST['to'];
    $subject = $_POST['subject'];
    $txt = $_POST['txt'];
    $headers .= 'From: <noreply.digitalarmy@nlng.com>' . "\r\n";
    $headers .= $_POST['cc'] . "\r\n";

    if(mail($to,$subject,$txt,$headers)){
        echo json_encode(array("statusCode"=>200));
    }
    else{
        echo json_encode(array("statusCode"=>201));
    }

?>