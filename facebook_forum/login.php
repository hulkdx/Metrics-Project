<?php

function errorCheck()
{
  $msg="";
  if ((!is_numeric($_POST["group"])) || (strlen($_POST["group"])!=15))
    $msg="Make sure that the group ID is a 15-digit string.";
  if ((!is_numeric($_POST["count"])) || ($_POST["count"]<=0))
    $msg="Make sure that the recent posts count is a positive integer.";
  if (($_POST["fromdate"]>$_POST["todate"]) && ($_POST["todate"]!=""))
   $msg="The dates are in the wrong order.";  
  return $msg;
}

session_start();
//TODO: Try checking for a token here. See if that speeds things up.
if (strpos($_SERVER['REQUEST_URI'],"code=")===FALSE)
{
  $err=errorCheck();
  if ($err!="")
    die($err);
  $_SESSION=$_POST;
  //Change localhost to actual server address
  header("Location:"."https://www.facebook.com/dialog/oauth?client_id=777065655684035&response_type=code&redirect_uri=".rawurlencode("http://localhost/login.php"));
}
else 
{
  $str="https://graph.facebook.com/oauth/access_token";
  //Change localhost to actual server address
  $str2="?client_id=777065655684035&redirect_uri=http://localhost/login.php&client_secret=3648579cf4a413d1dfe490304456cd4c&code=".substr($_SERVER['REQUEST_URI'],strpos($_SERVER['REQUEST_URI'],"code=")+5);
//substr(string,pos)-copy fragment of string from pos position until the end
  $ch = curl_init($str.$str2);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_URL, $str.$str2);
  curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,FALSE);
  $data = curl_exec($ch);
  curl_close($ch);
  $_SESSION["token"]=substr($data,strpos($data,"token=")+6,strpos($data,"&expires")-strpos($data,"token=")-6);
  //Change localhost to actual server address
  header("Location:http://localhost/Initialization.php");
}
?>