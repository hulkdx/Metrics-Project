<?php
session_start();

if (strpos($_SERVER['REQUEST_URI'],"code=")===FALSE) //First run through the script
{
  if (isset($_SESSION["token"]))
    header("Location:initialization.php");
  //Change localhost to actual server address
  else
    header("Location:"."https://www.facebook.com/dialog/oauth?client_id=777065655684035&response_type=code&redirect_uri=".rawurlencode("http://localhost/Metrics/facebook_forum/login.php"));
  exit();
}
else //Second run, coming back from the Facebook login page
{
  $str="https://graph.facebook.com/oauth/access_token";
  //Change localhost to actual server address
  $str2="?client_id=777065655684035&redirect_uri=http://localhost/Metrics/facebook_forum/login.php&client_secret=3648579cf4a413d1dfe490304456cd4c&code=".substr($_SERVER['REQUEST_URI'],strpos($_SERVER['REQUEST_URI'],"code=")+5);
//substr(string,pos)-copy fragment of string from pos position until the end
  $ch = curl_init($str.$str2);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,FALSE);
  $data = curl_exec($ch);
  curl_close($ch);
  $_SESSION["token"]=substr($data,strpos($data,"token=")+6,strpos($data,"&expires")-strpos($data,"token=")-6);
  header("Location:initialization.php");
  exit();
}
?>