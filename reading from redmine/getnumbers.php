<?php
/*
Mohammad Jafarzadeh Rezvan
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
-------------------------------
Counting all the needed data from redmine using Redmine Api
from = (redmine.sis.uta.fi/projects/metrics)
API accsses code = 0561bd402d6d292e14179b0131d8f0f59070e0a4;
 */

require_once 'vendor/autoload.php';

include "../Login/db_connection.php";

// Create a new instance of object from The API
$client = new Redmine\Client('https://redmine.sis.uta.fi', '0561bd402d6d292e14179b0131d8f0f59070e0a4');

// Count how many are in the database
// Create connection
$con = mysqli_connect($hostname, $usrname, $password, $db_name);
// Check for connection
if (mysqli_connect_errno($con)) {
	die("Connection failed: " . $conn -> connect_error);
}

// Working hours
mysqli_select_db($con, $db_name);
$query = "SELECT COUNT('work_id') FROM `individual_work`";
$result = $con -> query($query);
$row = $result -> fetch_assoc();
$count_workh_localdb = $row["COUNT('work_id')"];

// Issue
$query = "SELECT COUNT('requirement_id') FROM `requirement`";
$result = $con -> query($query);
$row = $result -> fetch_assoc();
$count_issue_localdb = $row["COUNT('requirement_id')"];

// Projects
$query = "SELECT COUNT('project_id') FROM `project`";
$result = $con -> query($query);
$row = $result -> fetch_assoc();
$count_project_localdb = $row["COUNT('project_id')"];

// count working hours in redmine
$count_workh = $client->api('time_entry');
$count_workh = $count_workh->all();
$count_workh = $count_workh['total_count'];

// count Issues in redmine
$count_issue = $client->api('issue');
$count_issue = $count_issue->all();
$count_issue = $count_issue['total_count'];

// count Projects in redmine
$count_project = $client->api('project');
$count_project = $count_project->all();
$count_project = $count_project['total_count'];


?>