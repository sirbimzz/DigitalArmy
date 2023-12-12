<?php
$target_dir = "uploads/evidence/";
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
    //echo "File is not an image.";
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
&& $imageFileType != "gif" && $imageFileType != "pdf" ) {
  echo '<script>alert("Only JPG, JPEG, PNG, GIF & PDF files are allowed")</script>';
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

  $currUser = explode("\\",$_SERVER['AUTH_USER'])[1];

  include 'config/conn.php';
  $query = 'SELECT * FROM Army_Achievements';   
  $stmt = $conn->query( $query );
  $data = $stmt->fetchAll( PDO::FETCH_ASSOC );

  $currId = array_values($data)[count($data)-1]['id'];

  $rawBaseName = "Evidence";
  $target_file = $rawBaseName . $currId . '.' . $extension;

  $sql = "UPDATE Army_Achievements SET Evidence = '$target_file' WHERE id = $currId";
  if ($conn->query( $sql )) {} 
  else {}
  
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "uploads/evidence/".$target_file)) {

    echo '<script>alert("File Uploaded successfully")</script>';
    header("Location: http://wapp-bny.nlng.net/digitalarmy/index.html");
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>
