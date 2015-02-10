<?php
/*Shahzad Choudhary 99707
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 7.2.2015
This file serves to add new Facebook groups and their members to the DB.*/
set_include_path ("../Composer/files/facebook/php-sdk-v4/facebook-facebook-php-sdk-v4-e2dc662");
include "autoload.php";
include('../Login/db_connection.php');
use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\GraphObject;
error_reporting(E_ALL);
session_start();

if ((!isset($_GET["addgroup"])) || (!isset($_SESSION["token"])))
  header("Location:login.php");
$id=$_GET["addgroup"];
FacebookSession::setDefaultApplication('777065655684035', '3648579cf4a413d1dfe490304456cd4c');
$session = new FacebookSession($_SESSION["token"]);
$request = new FacebookRequest($session, 'GET', "/".$id);
try{$response = $request->execute();}
catch (Exception $e)
{echo 'Caught exception: ',  $e->getMessage(), "\n";}
$graphObject = $response->getGraphObject(GraphUser::className());
$outcome=$graphObject->getProperty('name');

$result=mysqli_query($con,"INSERT INTO facebook_group (fgroup_id, group_name) VALUES (".$id.
",'".mysqli_real_escape_string($con,$outcome)."')"); //fills facebook_group...

$request = new FacebookRequest($session, 'GET', "/".$id."/members");
try{$response = $request->execute();}
catch (Exception $e)
{echo 'Caught exception: ',  $e->getMessage(), "\n";}
$graphObject = $response->getGraphObject(GraphUser::className());
$outcome=$graphObject->getProperty('data')->asArray();
foreach ($outcome as $i)
{
  $query="INSERT INTO facebook_member (member_name,fmember_id) VALUES ('".mysqli_real_escape_string($con,$i->name)."',".$i->id.")"; //...then facebook_member...
  $result=mysqli_query($con,$query); //but NOT the link_table; see update.php
}
mysqli_close($con);
echo "Updated successfully"; //overly optimistic
?>