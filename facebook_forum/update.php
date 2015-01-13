<?php

/*From email:
- Server name 'db2.sis.uta.fi'
- Database name 'metricsmonitoring'
- User name 'metricsmonitoring'
- Password 'azHscyDA28KbZQQJ'*/
//Replace with actual path to Facebook SDK
set_include_path ("Composer\\files\\facebook\php-sdk-v4\\facebook-facebook-php-sdk-v4-e2dc662");
include "autoload.php";
use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\GraphObject;

error_reporting(E_ALL);
session_start();
FacebookSession::setDefaultApplication('777065655684035', '3648579cf4a413d1dfe490304456cd4c');
$session = new FacebookSession($_SESSION["token"]);
$request = new FacebookRequest($session, 'GET',
  "/".$_POST["group"]."/members");
try{$response = $request->execute();}
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
$graphObject = $response->getGraphObject(GraphUser::className());
$outcome=$graphObject->getProperty('data')->asArray();

//Replace with true settings above
$hostname = "localhost";
$db_name = "metrics";
$usrname = "root";
$password = "";
$con = mysqli_connect($hostname, $usrname, $password, $db_name);
$id=$_POST["group"];
mysqli_query($con,"DELETE FROM facebook_member WHERE group_id=".$id);
$query="INSERT INTO facebook_member (member_id, member_name, group_id) VALUES ";
foreach ($outcome as $i)
  $query=$query."(".$i->id.",'".$i->name."',".$id."), ";
$query=substr($query,0,count($query)-3);
mysqli_query($con,$query);	
mysqli_close($con);
//Assuming these files are still in the same folder
header("Location:Initialization.html");
?>