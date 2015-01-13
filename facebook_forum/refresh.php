<?php

/*From email:
- Server name 'db2.sis.uta.fi'
- Database name 'metricsmonitoring'
- User name 'metricsmonitoring'
- Password 'azHscyDA28KbZQQJ'*/

error_reporting(E_ALL);
//Replace with true settings above
$hostname = "localhost";
$db_name = "metrics";
$usrname = "root";
$password = "";
$con = mysqli_connect($hostname, $usrname, $password, $db_name);
$id=$_GET["id"];
$result=mysqli_query($con,"SELECT member_name FROM facebook_member WHERE group_id=".$id);
echo "<option>Everyone</option>";
while ($r=mysqli_fetch_array($result))
{
  echo "<option>".$r[0]."</option>";
}  
mysqli_close($con);
?>