<?php
/*
 * Reading Data from Redmine website (redmine.sis.uta.fi/projects/metrics)
 */
$SITE_FORMAT = 'https://';
$SITE_NAME = 'redmine.sis.uta.fi/';
$SITE_API = '0561bd402d6d292e14179b0131d8f0f59070e0a4';

define('FORMAT', $SITE_FORMAT . $SITE_API . ':1@' . $SITE_NAME);

require_once ('lib\ActiveResource.php');

class Issue extends ActiveResource {

	var $site = FORMAT;
	var $request_format = 'xml';
}

class Time_entries extends ActiveResource {
	var $site = FORMAT;
	var $request_format = 'xml';
}

// create a new issue
$issue = new Issue();
$issues = $issue -> find('all');

$time = new Time_entries();
$times = $time -> find('all');

// get Issues from Redmine Database
for ($i = 0, $count = count($issues); $i < $count; $i++) {
	$projectId[$i] = intval($issues[$i] -> project['id']);
	$status[$i] = (string)$issues[$i] -> status['name'];
	$start_time[$i] = (string)$issues[$i] -> start_date;
	$desc[$i] = (string)$issues[$i] -> description;
};

// get Working hours from Redmine Database
for ($i = 0, $count = count($times); $i < $count; $i++) {
	$projectIdT[$i] = intval($times[$i] -> project['id']);
	$working_hours[$i] = (string)$times[$i] -> hours;
};

?>