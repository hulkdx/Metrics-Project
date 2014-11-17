<?php

include "redmine.php";

// DB NAME
$DATABASE_NAME = "redmine";

// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

// Check connection
if (mysqli_connect_errno($con)) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// Varibles from Redmine.php
else {
	mysql_select_db($DATABASE_NAME);

	for ($i = 0; $i < $projects_count; $i++) {
		// TODO status? version?
		$query = "INSERT INTO `project`(`project_id`, `project_name`, `created_on`, `updated_on`, `status`, `version`, `discription`) VALUES ($projectIdP[$i],'$projectName[$i]', '$projectCreatedOn[$i]', '$projectUpdatedOn[$i]', '', '', '$projectDesc[$i]');";

		if (!mysqli_query($con, $query)) {
			// TODO Duplicated Error
			//die('Error: ' . mysqli_error($con));
		} else {
			// TODO remove
			echo "added successfully";
			echo $projectIdP[$i];
			echo $projectName[$i];
			echo $projectCreatedOn[$i];
			echo $projectUpdatedOn[$i];
			echo $projectDesc[$i];

		};
	};

	// FOR Issue in redmine
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

	/*
	 // FOR Time_entries in Redmine
	 for ($i = 0; $i < $count_times; $i++) {
	 $thisProjectIdT = mysql_real_escape_string($projectIdT[$i]);
	 $thisWorking_hours = mysql_real_escape_string($working_hours[$i]);

	 //echo $thisProjectIdT;
	 //echo $thisWorking_hours;

	 //$TABLE_NAME = "";
	 //$query = "INSERT INTO '$TABLE_NAME'() VALUES ('$thisProjectIdT', '$thisWorking_hours');";

	 //if (!mysqli_query($con, $query)) {
	 //	die('Error: ' . mysqli_error($con));
	 //}
	 //echo "1 record added";
	 };*/

	 mysqli_close($con);
};
?>
