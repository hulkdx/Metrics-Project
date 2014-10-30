<?php
/*
 * Reading Data from Redmine API
 */

require_once ('lib\ActiveResource.php');

class Issue extends ActiveResource {
	var $site = 'https://0561bd402d6d292e14179b0131d8f0f59070e0a4:123456@redmine.sis.uta.fi/';
	var $request_format = 'xml';
	// REQUIRED!

	public function all(array $params = array()) {
		return $this -> retrieveAll('/issues.json', $params);
	}

}

// create a new issue
$issue = new Issue();
$issues = $issue -> find('all');

// get Issues from Redmine Database
for ($i = 0, $count = count($issues); $i < $count; $i++) {
	$projectId[$i] = intval($issues[$i] -> project['id']);
	$status[$i] = (string)$issues[$i] -> status['name'];
};


// get Working hours from Redmine Database

?>