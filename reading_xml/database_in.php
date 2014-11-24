<?php

// DB NAME
$DATABASE_NAME = "metrics";

// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

// Check connection
if (mysqli_connect_errno($con)) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

else {

//Weekly report
	$report_id = (int)$_POST["report_id"];
	$project_id = (int)$_POST["project_id"];
	$number_of_week = $_POST["number_of_week"];
	$project_manager = $_POST["project_manager"];
	$project_phase = $_POST["project_phase"];
	$completed_tasks = $_POST["completed_tasks"];
	$task_for_nextweek = $_POST["task_for_nextweek"];
	$schedule_status = $_POST["schedule_status"];
	$next_milestone = $_POST["next_milestone"];
	$working_hours = $_POST["working_hours"];
	$requirements = $_POST["requirements"];
	$unit_testcases = $_POST["unit_testcases"];
	$other_testcases = $_POST["other_testcases"];
	$code_revisions = $_POST["code_revisions"];
	$problems = $_POST["problems"];
	$changes_in_project_plan = $_POST["changes_in_project_plan"];
	$things_to_mention = $_POST["things_to_mention"];
	
//Individual data
	$work_id = (int)$_POST["work_id"];
	$member_id = (int)$_POST["member_id"];
	$description = $_POST["description"];
	$hours = $_POST["hours"];
	$date = $_POST["date"];
	
//Project data
	$project_name = $_POST["project_name"];
	$created_on = $_POST["created_on"];
	$updated_on = $_POST["updated_on"];
	$status = $_POST["status"];
	$version = $_POST["version"];
	
//Member data
	$account = $_POST["account"];
	$password = $_POST["password"];
	$first_name = $_POST["first_name"];
	$level_of_privileges = $_POST["level_of_privileges"];
	$email = $_POST["email"];
	$phonenumber = $_POST["phonenumber"];
    
	mysqli_select_db($con,$DATABASE_NAME);

	//weekly report data
	$query = "INSERT INTO `weekly_report`(`report_id`, `project_id`, `number_of_week`, `project_manager`, `project_phase`,
		`completed_tasks`, `task_for_nextweek`, `schedule_status`, `next_milestone`, `working_hours`, `requirements`, `unit_testcases`,
		`other_testcases`, `code_revisions`, `problems`, `changes_in_project_plan`, `things_to_mention`)
	VALUES ($report_id,$project_id, $number_of_week, '$project_manager', '$project_phase', '$completed_tasks', '$task_for_nextweek', '$schedule_status',
		'$next_milestone', '$working_hours', '$requirements', '$unit_testcases', '$other_testcases', '$code_revisions', '$problems', '$changes_in_project_plan', '$things_to_mention');";
	
	//individual data	
	$query .= "INSERT INTO `individual_work`(`work_id`, `project_id`, `member_id`, `description`, `hours`, `date`, `problems`)
	VALUES($work_id, $project_id, $member_id,'$description','$hours','','problemo');";
	
	//project data	
	$query .= "INSERT INTO `project`(`project_id`, `project_name`, `created_on`, `updated_on`, `status`, `version`, `discription`)
	VALUES('$project_id', '$project_name','$created_on','$updated_on','$status','$version', 'project desc');";

	//member data
	$query .= "INSERT INTO `member`(`member_id`, `account`, `password`, `first_name`, `last_name`, `level_of_priviledges`, `email`, `phonenumber`)
	VALUES(1, '$account','$password','$first_name', 'Last name', '$level_of_privileges','$email','$phonenumber')";

	//mysqli_multi_query
	if (!mysqli_multi_query($con, $query)){
		echo "failure ";
		print_r(error_get_last());
		die('Could not enter data: ' . mysql_error());
	} else {
		echo "success";
	};	

mysqli_close($con);	 
};

?>
