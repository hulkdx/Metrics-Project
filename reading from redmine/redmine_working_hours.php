<?php
/*
 * Reading Data from Redmine website (redmine.sis.uta.fi/projects/metrics)
 */
require_once 'vendor/autoload.php';

$client = new Redmine\Client('https://redmine.sis.uta.fi', '0561bd402d6d292e14179b0131d8f0f59070e0a4');

// Count how many are in the database
// DB NAME
$DATABASE_NAME = "metrics";
// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);
// Check for connection
if (mysqli_connect_errno($con)) {
	die("Connection failed: " . $conn -> connect_error);
}
// Working hours
mysql_select_db($DATABASE_NAME);
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

// count individual working hours in redmine
$count_workh = $client->api('time_entry')->all()['total_count'];
// count Issues in redmine
$count_issue = $client->api('issue')->all()['total_count'];
// count Projects in redmine
$count_project = $client->api('project')->all()['total_count'];

// Difference of these 2 count
$count_workh = $count_workh - $count_workh_localdb;
// Check if its negative
if ($count_workh < 0){
	// TODO
	$count_workh = -1 * $count_workh;
}

// individual working hours
$working_hours = $client->api('time_entry')->all([
    'limit' => $count_workh
]);

// Issue
$issue = $client->api('issue')->all([
    'limit' => $count_issue
]);

// Project
$project = $client->api('project')->all([
    'limit' => $count_project
]);
?>