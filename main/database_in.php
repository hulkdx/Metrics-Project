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
	$schedule_status = " ";
	$working_hours = 434;
	$changes_in_project_plan = " ";
	
	$created_on = $decoded_json->otherinfo[0]->time;
	$updated_on = $created_on;
	$project_name = $decoded_json->otherinfo[0]->project_name;
	$description = $decoded_json->otherinfo[0]->description;
	$project_phase = $decoded_json->otherinfo[0]->phase;
    $passed_unit_testcases = $decoded_json->otherinfo[0]->passed_unit_test;
	$passed_other_testcases = $decoded_json->otherinfo[0]->passed_other_test;
    $total_unit_testcases = $decoded_json->otherinfo[0]->total_unit_test;
	$total_other_testcases = $decoded_json->otherinfo[0]->total_other_test;
	$things_to_mention = $decoded_json->otherinfo[0]->additional;
	$requirements = $decoded_json->requirements;
	$project_manager = $decoded_json->managers;
	//$project_manager = mysqli_real_escape_string($con,json_encode($decoded_json->managers));
	$completed_tasks = mysqli_real_escape_string($con,json_encode($decoded_json->completed_tasks));
	$task_for_nextweek = mysqli_real_escape_string($con,json_encode($decoded_json->tasks_next));
	$next_milestone = mysqli_real_escape_string($con,json_encode($decoded_json->milestone));
	//$requirements = mysqli_real_escape_string($con,json_encode($decoded_json->requirements));
	
	$code_revisions = mysqli_real_escape_string($con,json_encode($decoded_json->revisions));
	$problems = mysqli_real_escape_string($con,json_encode($decoded_json->problems));
	$workinghours = mysqli_real_escape_string($con,json_encode($decoded_json->workinghours));
	
	$status = "Active";
	$version = "1.0.3";
	
	$query = "INSERT INTO `weekly_report`(`report_id`, `project_id`, `number_of_week`, `project_phase`,
		`completed_tasks`, `task_for_nextweek`, `schedule_status`, `next_milestone`, `working_hours`, `passed_unit_testcases`,`total_unit_testcases`,
		`passed_other_testcases`,`total_other_testcases`, `code_revisions`, `problems`, `changes_in_project_plan`, `things_to_mention`)
	VALUES ($report_id,$project_id, $number_of_week, '$project_phase', '$completed_tasks', '$task_for_nextweek', '$schedule_status',
		'$next_milestone', '$workinghours', $passed_unit_testcases,$total_unit_testcases, $passed_other_testcases,$total_other_testcases, '$code_revisions', '$problems', '$changes_in_project_plan', '$things_to_mention');";
	
	$query .= "INSERT INTO `project`(`project_id`, `project_name`, `created_on`, `updated_on`, `status`, `version`, `discription`)
	VALUES($project_id, '$project_name','$created_on','$updated_on','$status','$version', '$description');";	


	if(!mysqli_multi_query($con, $query)){
		//print_r(error_get_last());
		//die('Could not enter data: ' . mysql_error());
	}else{
	
	};
    for($i=0;$i<count($requirements);$i++){
        
	    $query_1 = "INSERT INTO `weekly_report_requirement`(`project_id`, `report_id`, `requirement_name`,  `requirement_status`)VALUES($project_id, $report_id,'" . $requirements[$i]->name . "'," . $requirements[$i]->status .");";
        mysqli_query($con, $query_1);
    }
    for($i=0;$i<count($project_manager);$i++){
        $query_2 = "INSERT INTO `weekly_report_manager`(`project_id`, `report_id`, `manager_name`,  `manager_email`)
	    VALUES($project_id, $report_id,'" . $project_manager[$i]->name . "','" . $project_manager[$i]->email . "');";
	    

       mysqli_query($con, $query_2);
    }
};

mysqli_close($con);

?>
