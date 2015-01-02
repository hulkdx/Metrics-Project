<?php
/*
 * Reading Data from Redmine website (redmine.sis.uta.fi/projects/metrics)
 */
include('getnumbers.php');

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