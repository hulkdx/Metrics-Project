<?php

/*From email:
- Server name 'db2.sis.uta.fi'
- Database name 'metricsmonitoring'
- User name 'metricsmonitoring'
- Password 'azHscyDA28KbZQQJ'*/

$hostname = "db2.sis.uta.fi";
$db_name = "metricsmonitoring";
$usrname = "metricsmonitoring";
$password = "azHscyDA28KbZQQJ";
$con = mysqli_connect($hostname, $usrname, $password, $db_name);

?>