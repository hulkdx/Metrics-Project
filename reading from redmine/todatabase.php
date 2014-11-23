<?php

include "redmine.php";
include "redmine_working_hours.php";

// DB NAME
$DATABASE_NAME = "metrics";

// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

// Check connection
if (mysqli_connect_errno($con)) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// Varibles from Redmine.php
else {
	mysql_select_db($DATABASE_NAME);

	// FOR Projects in redmine (Project table)
	for ($i = 0; $i < $projects_count; $i++) {
		// TODO status? version?
		$query = "INSERT INTO `project`(`project_id`, `project_name`, `created_on`, `updated_on`, `status`, `version`, `discription`) VALUES ($projectIdP[$i],'$projectName[$i]', '$projectCreatedOn[$i]', '$projectUpdatedOn[$i]', '', '', '$projectDesc[$i]');";

		if (!mysqli_query($con, $query)) {
			// TODO Duplicated Error
			//die('Error: ' . mysqli_error($con));
		} else {
			// TODO if its correct
			echo "added successfully";
		};
	};

	// FOR Issue in redmine (requirement table)
	for ($i = 0; $i < $count_issue; $i++) {
		// if issue state is feature or support its requirement:
		if (($status[$i] == "Feature") || ($status[$i] == "Support")) {
			// TODO required_working_hours?
			$query = "INSERT INTO `requirement`(`requirement_id`, `project_id`, `description`, `required_working_hours`, `date`) VALUES ('$reqId[$i]', '$projectId[$i]', '$desc[$i]', '', '$start_time[$i]');";

			if (!mysqli_query($con, $query)) {
				// TODO Duplicated Error
				//	die('Error: ' . mysqli_error($con));
			} else {
				// TODO remove
				echo "added successfully";
			};
		}
	};

	// FOR Time_entry in redmine (individual_work table) TODO Its slow
	for ($i = 0; $i < $count_workh; $i++) {
		$work_id = $working_hours['time_entries'][$i]['id'];
		$project_id = $working_hours['time_entries'][$i]['project']['id'];
		$member_id = $working_hours['time_entries'][$i]['user']['id'];
		$hours = $working_hours['time_entries'][$i]['hours'];
		$date = $working_hours['time_entries'][$i]['spent_on'];

		//TODO change problem to issue_id
		if (isset($working_hours['time_entries'][$i]['issue'])) {
			$issue_id = $working_hours['time_entries'][$i]['issue']['id'];
		} else {
			$issue_id = '';
		};
		// TODO REMOVE Description from table

		// Insert into table
		$query = "INSERT INTO `individual_work`(`work_id`, `project_id`, `member_id`, `description`, `hours`, `date`, `problems`) VALUES ($work_id,$project_id,$member_id,'',$hours,'$date','$issue_id')";

		if (!mysqli_query($con, $query)) {
			// TODO Duplicated Error
			//	die('Error: ' . mysqli_error($con));
		} else {
			// TODO remove
			echo "added successfully";
		};
	};

	mysqli_close($con);
};
?>
