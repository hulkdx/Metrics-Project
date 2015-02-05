<?php
set_include_path ("..\\Composer\\files\\facebook\php-sdk-v4\\facebook-facebook-php-sdk-v4-e2dc662");
include "autoload.php";
include('../Login/db_connection.php');
use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\GraphObject;
error_reporting(E_ALL);
session_start();

if ((!isset($_GET["group"])) || (!isset($_SESSION["token"])))
  header("Location:login.php");
FacebookSession::setDefaultApplication('777065655684035', '3648579cf4a413d1dfe490304456cd4c');
$session = new FacebookSession($_SESSION["token"]);
$request = new FacebookRequest($session, 'GET',
  "/".$_GET["group"]."/members");
try{$response = $request->execute();}
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
$graphObject = $response->getGraphObject(GraphUser::className());
$outcome=$graphObject->getProperty('data')->asArray();

$id=$_GET["group"];
$query="SELECT group_id FROM facebook_group WHERE fgroup_id=".$id." LIMIT 1";
$result=mysqli_query($con,$query);
if ($result)
  $id=mysqli_fetch_array($result)[0];

mysqli_query($con,"DELETE FROM link_table WHERE group_id=".$id);

$query="SELECT member_id FROM facebook_member WHERE member_name IN (";
foreach ($outcome as $i)
  $query=$query."'".mysqli_real_escape_string($con,$i->name)."',";
$query=substr($query,0,count($query)-2).")";
$result=mysqli_query($con,$query);

$query="INSERT INTO link_table (group_id, member_id) VALUES ";
while ($r=mysqli_fetch_array($result))
  $query=$query."(".$id.",".$r[0]."), ";
$query=substr($query,0,count($query)-3);
$result=mysqli_query($con,$query);
	
mysqli_close($con);
if ($result==TRUE) echo "Updated successfully";
else echo "Did not update (is the group added to DB?)";
?>