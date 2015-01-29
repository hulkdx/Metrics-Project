<?php

/*From email:
- Server name 'db2.sis.uta.fi'
- Database name 'metricsmonitoring'
- User name 'metricsmonitoring'
- Password 'azHscyDA28KbZQQJ'*/

$hostname = "localhost";
$db_name = "metrics";
$usrname = "root";
$password = "";
$con = mysqli_connect($hostname, $usrname, $password, $db_name);
mysqli_set_charset($con, "utf8");
?>