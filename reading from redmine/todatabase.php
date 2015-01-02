<?php
include "redmine_working_hours.php";

// DB NAME
$DATABASE_NAME = "metrics";

// Set the maximum execution time to 5min
ini_set('max_execution_time', 300);

// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

// Check for connection
if (mysqli_connect_errno($con)) {
	die("Connection failed: " . $conn -> connect_error);
}

mysql_select_db($DATABASE_NAME);

// Tell user that the process is started
echo '<script language="javascript">document.getElementById("headerinfo").innerHTML="Downloading Projects..."</script>';

// FOR Projects in redmine (Project table)
for ($i = 0; $i < $count_project; $i++) {
	$project_id = $project['projects'][$i]['id'];
	$project_name = $project['projects'][$i]['name'];
	$created_on = $project['projects'][$i]['created_on'];
	$updated_on = $project['projects'][$i]['updated_on'];
	$discription = $project['projects'][$i]['description'];
	// What is status and version?
	$status = '';
	$version = '';
	$query = "INSERT INTO `project`(`project_id`, `project_name`, `created_on`, `updated_on`, `status`, `version`, `discription`) VALUES ($project_id,'$project_name', '$created_on', '$updated_on', '$status', '$version', '$discription');";

	if (!mysqli_query($con, $query)) {
	} else {

	};

	// Progress bar
	$percent = intval($i / $count_project * 100) . "%";
	// Javascript for updating the progress bar and information
	echo '<script language="javascript">
	    document.getElementById("progress").innerHTML="<div style=\"width:' . $percent . ';background-color:#ddd;\">&nbsp;</div>";
	    document.getElementById("information").innerHTML="' . $i . ' row(s) processed.";
	    </script>';
	// This is for the buffer achieve the minimum size in order to flush data
	echo str_repeat(' ', 1024 * 64);
	// Send output to browser immediately
	flush();
};
// Tell user that the process is completed
echo '<script language="javascript">document.getElementById("information").innerHTML="Process is done..."</script>';

// Tell user that the process is started
echo '<script language="javascript">document.getElementById("headerinfo").innerHTML="Downloading requirements..."</script>';

// FOR Issue in redmine (requirement table)
for ($i = 0; $i < $count_issue; $i++) {
	$status = $issue['issues'][$i]['tracker']['name'];
	// if issue state is feature or support its requirement:
	if (($status == "Feature") || ($status == "Support")) {
		$requirement_id = $issue['issues'][$i]['id'];
		$project_id = $issue['issues'][$i]['project']['id'];
		$description = $issue['issues'][$i]['description'];
		$date = $issue['issues'][$i]['start_date'];
		// TODO what is required_working_hours?
		$required_working_hours = '';
		//TODO Maybe its better to add some name?
		
		$description = mysql_real_escape_string($description);

		$query = "INSERT INTO `requirement`(`requirement_id`, `project_id`, `description`, `required_working_hours`, `date`) VALUES ('$requirement_id', '$project_id', '$description', '$required_working_hours', '$date');";

		if (!mysqli_query($con, $query)) {
			
		} else {
			
		};

		// Progress bar
		$percent = intval($i / $count_issue * 100) . "%";
		// Javascript for updating the progress bar and information
		echo '<script language="javascript">
	    document.getElementById("progress").innerHTML="<div style=\"width:' . $percent . ';background-color:#ddd;\">&nbsp;</div>";
	    document.getElementById("information").innerHTML="' . $i . ' row(s) processed.";
	    </script>';
		// This is for the buffer achieve the minimum size in order to flush data
		echo str_repeat(' ', 1024 * 64);
		// Send output to browser immediately
		flush();
	}
};
// Tell user that the process is completed
echo '<script language="javascript">document.getElementById("information").innerHTML="Process is done..."</script>';

// Tell user that the process is started
echo '<script language="javascript">document.getElementById("headerinfo").innerHTML="Processing individual working hours..."</script>';

// For Time_entry in redmine (individual_work table) TODO Its slow
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

	// Insert into table
	$query = "INSERT INTO `individual_work`(`work_id`, `project_id`, `member_id`, `description`, `hours`, `date`, `issue_id`) VALUES ($work_id,$project_id,$member_id,'',$hours,'$date','$issue_id')";

	if (!mysqli_query($con, $query)) {

	} else {

	};

	// Progress bar
	$percent = intval($i / $count_workh * 100) . "%";
	// Javascript for updating the progress bar and information
	echo '<script language="javascript">
	    document.getElementById("progress").innerHTML="<div style=\"width:' . $percent . ';background-color:#ddd;\">&nbsp;</div>";
	    document.getElementById("information").innerHTML="' . $i . ' row(s) processed.";
	    </script>';
	// This is for the buffer achieve the minimum size in order to flush data
	echo str_repeat(' ', 1024 * 64);
	// Send output to browser immediately
	flush();
};
// Tell user that the process is completed
echo '<script language="javascript">document.getElementById("information").innerHTML=""</script>';
echo '<script language="javascript">document.getElementById("headerinfo").innerHTML="Process is done..."</script>';

mysqli_close($con);
?>
