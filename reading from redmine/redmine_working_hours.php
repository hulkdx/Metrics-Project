<?php
/*
Mohammad Jafarzadeh Rezvan
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
-------------------------------
Reading Data from Redmine website
 */
include('getnumbers.php');

/* TODO ERROR CHECKING HERE
// Difference of these 2 count
$count_workh = $count_workh - $count_workh_localdb;
// Check if its negative
if ($count_workh < 0){
	// TODO it should be changed.
	$count_workh = -1 * $count_workh;
}*/

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