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
	var $request_format = 'json';
}

$id = 0;

$time = new Time_entries();
$times = $time -> get('/time_entries/'.urlencode($id).'.json');;

echo $times->hours;

?>