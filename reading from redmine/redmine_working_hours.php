<?php
/*
 * Reading Data from Redmine website (redmine.sis.uta.fi/projects/metrics)
 */
require_once 'vendor/autoload.php';

$client = new Redmine\Client('https://redmine.sis.uta.fi', '0561bd402d6d292e14179b0131d8f0f59070e0a4');

// individual working hours
$count_workh = $client->api('time_entry')->all()['total_count'];
$working_hours = $client->api('time_entry')->all([
    'limit' => $count_workh
]);

// Issue
$count_issue = $client->api('issue')->all()['total_count'];
$issue = $client->api('issue')->all([
    'limit' => $count_issue
]);

// Project
$count_project = $client->api('project')->all()['total_count'];
$project = $client->api('project')->all([
    'limit' => $count_project
]);

//print_r($issue);
?>