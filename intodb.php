<?php

// Create connection
$con=mysqli_connect("localhost","root","","metrics");

// Check connection
if (mysqli_connect_errno($con)){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
    $time = mysql_real_escape_string($_POST["time"]);
    $from = mysql_real_escape_string($_POST["from"]);
    $heading = mysql_real_escape_string($_POST["heading"]);
    $body = mysql_real_escape_string($_POST["body"]);    

    mysql_select_db('metrics');
    
    $query = "INSERT INTO `mockup`(`time`, `from`, `heading`, `body`) VALUES ('$time','$from','$heading','$body');";
    
    if (!mysqli_query($con,$query)) {
    die('Error: ' . mysqli_error($con));
    }
    echo "1 record added";
    
    mysqli_close($con);
?> 