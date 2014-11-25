<?php
/*
 * Reading Data from Redmine website (redmine.sis.uta.fi/projects/metrics)
 */
require_once 'vendor/autoload.php';

$client = new Redmine\Client('https://redmine.sis.uta.fi', '0561bd402d6d292e14179b0131d8f0f59070e0a4');

$count_workh = $client->api('time_entry')->all()['total_count'];

$working_hours = $client->api('time_entry')->all([
    'limit' => $count_workh
]);


?>