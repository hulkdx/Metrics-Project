<?php
session_start();
if ((!is_numeric($_SESSION["group"])) || (strlen($_SESSION["group"])!=15))
 die("Make sure that the group ID is a 15-digit string.");
set_include_path ("C:\Users\omistaja\AppData\Local\Composer\\files\\facebook\php-sdk-v4\\facebook-facebook-php-sdk-v4-e2dc662");
include "autoload.php";
use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\GraphObject;
FacebookSession::setDefaultApplication('777065655684035', '3648579cf4a413d1dfe490304456cd4c');
$session = new FacebookSession($_SESSION["token"]);
$request = new FacebookRequest(
  $session,
  'GET',
  "/".$_SESSION["group"]."/feed?since=".$_SESSION["fromdate"]);
try{$response = $request->execute();}
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
$graphObject = $response->getGraphObject(GraphUser::className());
$temp=$graphObject->getProperty('data')->asArray();
$arr=array();
$cnt=count($temp);

//To get the max creation time and sorting the creation times in an array
for ($i=0; $i<$cnt; $i++)
  $arr[$i]=$temp[$i]->created_time;
sort($arr);
//To get the maximum created
$max=$temp[0]->created_time;
for ($i=0; $i<$cnt; $i++)  
if ($max<$temp[$i]->created_time) $max=$temp[$i]->created_time;

//To get the most recent post which will be at index [0]
$Name=$temp[0]->from->name;

echo "<i>Most Recently Updated Post by:</i> <b>" .$Name. "</b>";
echo "<i><br><br>Most Recent Post Updated time:</i> <b>".date_format(date_create_from_format('Y-m-d\TH:i:sO', $max), 'r'). "</b>";
echo "<i><br><br>Total Number of Posts:</i> <b> ".$cnt. "</b>";
echo "<i><br><br> Last ".min($_SESSION["count"],$cnt)." Posts: <br><br>";

//To get the number of last posts that user wants to see
for ($k=$cnt-min($_SESSION["count"],$cnt); $k<$cnt;)
{
echo $k." ".date_format(date_create_from_format('Y-m-d\TH:i:sO', $arr[$k]), 'r')."<br>" ;
 $k++;
}
echo "</i><br> <b>Entire Feed Content</b><br>";
var_dump($temp);
?>