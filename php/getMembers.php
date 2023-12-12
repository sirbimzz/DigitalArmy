<?php 
include 'config/conn.php';

  $query = 'SELECT * FROM Army_Membership';   
  $stmt = $conn->query( $query );
  $data = $stmt->fetchAll( PDO::FETCH_ASSOC );

  echo json_encode($data);

?>