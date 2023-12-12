<?php
$target_dir = "uploads/ProfilePhotos/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    //echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
/*if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}*/

// Check file size
if ($_FILES["fileToUpload"]["size"] > 1000000) {
  echo '<script>alert("File is too large")</script>';
  header("Location: http://wapp-bny.nlng.net/digitalarmy/index.html");
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo '<script>alert("Only JPG, JPEG, PNG & GIF files are allowed")</script>';
  header("Location: http://wapp-bny.nlng.net/digitalarmy/index.html");
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo '<script>alert("Sorry, your file was not uploaded")</script>';
  header("Location: http://wapp-bny.nlng.net/digitalarmy/index.html");
// if everything is ok, try to upload file
} else {
  //$rawBaseName = pathinfo($target_file, PATHINFO_FILENAME );
  $extension = pathinfo($target_file, PATHINFO_EXTENSION );

  $currUser = $_SERVER['AUTH_USER'];
  $rawBaseName = explode("\\",$currUser)[1];
  $target_file = $rawBaseName . '.' . $extension;
  
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "uploads/ProfilePhotos/".$target_file)) {

    include 'config/conn.php';

    $sql = "UPDATE Army_Users SET ProfilePhoto = '$target_file' WHERE UserName = '$rawBaseName'";
    if ($conn->query( $sql )) {} 
    else {}

    echo '<script>alert("Profile photo uploaded successfully")</script>';

    header("Location: http://wapp-bny.nlng.net/digitalarmy/index.html");
  } else {
    echo "Sorry, there was an error uploading your file.";
    header("Location: http://wapp-bny.nlng.net/digitalarmy/index.html");
  }
}
?>
