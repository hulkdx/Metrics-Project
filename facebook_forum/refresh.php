<?php
/*Shahzad Choudhary 99707
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 7.2.2015
This file serves to retrieve recorded members of a particular Facebook group from the DB.*/
error_reporting(E_ALL);
include('../Login/db_connection.php');

$id=$_GET["id"];
$result=mysqli_query($con,"SELECT member_name FROM facebook_member
INNER JOIN link_table ON facebook_member.member_id=link_table.member_id
INNER JOIN facebook_group ON link_table.group_id=facebook_group.group_id
WHERE facebook_group.group_id=(SELECT group_id FROM facebook_group WHERE fgroup_id=".$id." LIMIT 1)");

echo "<option>Everyone</option>";
while ($r=mysqli_fetch_array($result))
  echo "<option>".$r[0]."</option>"; //assumed to go to a <select> dropdown 
mysqli_close($con);
?>