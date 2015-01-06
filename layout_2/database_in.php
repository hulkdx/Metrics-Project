<?php

include('../Login/db_connection.php');

$json = file_get_contents('php://input');
$decoded_json = json_decode($json);

// Check connection
if (mysqli_connect_errno($con)) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

else {

	$report_id = intval($decoded_json->otherinfo[0]->reportid);
	$project_id = intval($decoded_json->otherinfo[0]->projectid);
	$number_of_week = 3;
	$schedule_status = "";
	$working_hours = 434;
	$changes_in_project_plan = "";
	
	$created_on = $decoded_json->otherinfo[0]->time;
	$updated_on = $created_on;
	$project_name = $decoded_json->otherinfo[0]->project_name;
	$description = $decoded_json->otherinfo[0]->description;
	$project_phase = $decoded_json->otherinfo[0]->phase;
	$things_to_mention = $decoded_json->otherinfo[0]->additional;

	$project_manager = mysqli_real_escape_string($con,json_encode($decoded_json->managers));
	$completed_tasks = mysqli_real_escape_string($con,json_encode($decoded_json->completed_tasks));
	$task_for_nextweek = mysqli_real_escape_string($con,json_encode($decoded_json->tasks_next));
	$next_milestone = mysqli_real_escape_string($con,json_encode($decoded_json->milestone));
	$requirements = mysqli_real_escape_string($con,json_encode($decoded_json->requirements));
	$unit_testcases = mysqli_real_escape_string($con,json_encode($decoded_json->unit_test));
	$other_testcases = mysqli_real_escape_string($con,json_encode($decoded_json->other_test));
	$code_revisions = mysqli_real_escape_string($con,json_encode($decoded_json->revisions));
	$problems = mysqli_real_escape_string($con,json_encode($decoded_json->problems));
	$workinghours = mysqli_real_escape_string($con,json_encode($decoded_json->workinghours));
	
	$status = "Active";
	$version = "1.0.3";
	
	$query = "INSERT INTO `weekly_report`(`report_id`, `project_id`, `number_of_week`, `project_manager`, `project_phase`,
		`completed_tasks`, `task_for_nextweek`, `schedule_status`, `next_milestone`, `working_hours`, `requirements`, `unit_testcases`,
		`other_testcases`, `code_revisions`, `problems`, `changes_in_project_plan`, `things_to_mention`)
	VALUES ($report_id,$project_id, $number_of_week, '$project_manager', '$project_phase', '$completed_tasks', '$task_for_nextweek', '$schedule_status',
		'$next_milestone', '$workinghours', '$requirements', '$unit_testcases', '$other_testcases', '$code_revisions', '$problems', '$changes_in_project_plan', '$things_to_mention');";
	
	$query .= "INSERT INTO `project`(`project_id`, `project_name`, `created_on`, `updated_on`, `status`, `version`, `discription`)
	VALUES($project_id, '$project_name','$created_on','$updated_on','$status','$version', '$description');";	
	
	if(!mysqli_multi_query($con, $query)){
		//print_r(error_get_last());
		die('Could not enter data: ' . mysql_error());
	}else{
	
	};

};

mysqli_close($con);

?>
