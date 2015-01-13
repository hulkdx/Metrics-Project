<?php
/*
Tommi Tuominen 99710
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
Here are the functions used for getting data from
the database.
----------------------
TODO:
Optimization? Dynamic creation of objects?
*/

$project_id = (int)$_POST["id"];
$querytype = (int)$_POST["querytype"];
$operation = (int)$_POST["operation"];

include('../Login/db_connection.php');

//Check connection
if (mysqli_connect_errno($con)) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}else{
    mysqli_select_db($con,$db_name);

    //Type 0 is used for echoing whole tables
    if($querytype == 0){
	echoResults($operation, $project_id, $con, "*", "1", "");
    }  
    
    //Type 1 is for chart data
    else if($querytype == 1){
	getDataForCharts($project_id, $con);
    }     
  
}

/* Use this function for echoing results from a certain query */
/* json_encoding is used for creation of objects understandable by js */
function echoResults($operation, $project_id, $con, $scope, $where, $equal){
    if($operation == 0){
	echo json_encode(getWeeklyReports($project_id, $con, $scope, $where, $equal));
    }else if($operation == 1){
	echo json_encode(getProjects($project_id, $con, $scope, $where, $equal));
    }else if($operation == 2){
	echo json_encode(getParticipation($project_id, $con, $scope, $where, $equal));	
    }else if($operation == 3){
	echo json_encode(getIndividual($project_id, $con, $scope, $where, $equal));
    }  
}

/*----------------------------------------------

    GET DATA FROM WEEKLY_REPORT TABLE

-----------------------------------------------*/     
function getWeeklyReports($project_id, $con, $scope, $where, $equal){
    
	$sql_weeklyreport = "SELECT ".$scope." FROM `weekly_report` WHERE ".$where."".$equal;
	$result_weekly = mysqli_query($con, $sql_weeklyreport);
	$num_of_projects = mysqli_num_rows($result_weekly);
	
	if($num_of_projects != null || $num_of_projects != 0){
	        
	    while ($row_weekly = mysqli_fetch_array($result_weekly)) {
		
		$weeklyreport = array(
		    "project_id" => $row_weekly['project_id'],
		    "project_manager" => $row_weekly['project_manager'],
		    "project_phase" => $row_weekly['project_phase'],
		    "completed_tasks" => $row_weekly['completed_tasks'],
		    "task_for_nextweek" => $row_weekly['task_for_nextweek'],
		    "schedule_status" => $row_weekly['schedule_status'],
		    "next_milestone" => $row_weekly['next_milestone'],
		    "working_hours" => $row_weekly['working_hours'],
		    "requirements" => $row_weekly['requirements'],
		    "unit_testcases" => $row_weekly['unit_testcases'],
		    "other_testcases" => $row_weekly['other_testcases'],
		    "code_revisions" => $row_weekly['code_revisions'],
		    "problems" => $row_weekly['problems'],
		    "changes_in_project_plan" => $row_weekly['changes_in_project_plan'],
		    "things_to_mention" => $row_weekly['things_to_mention']
		);
		$weeklyreport_table[] = $weeklyreport;
	    }
    
	    return $weeklyreport_table;
	}else{
	    return 0;
	}
	
}

/*----------------------------------------------

    GET DATA FROM PROJECT TABLE

-----------------------------------------------*/
function getProjects($project_id, $con, $scope, $where, $equal){
    $sql_project = "SELECT ".$scope." FROM `project` WHERE ".$where."".$equal;
    $result_project = mysqli_query($con, $sql_project);
    
    $project_table = array();

    while ($row_project = mysqli_fetch_array($result_project)) {
	$project = array(
	    "project_id" => $row_project['project_id'],
	    "project_name" => $row_project['project_name'],
	    "created_on" => $row_project['created_on'],
	    "updated_on" => $row_project['updated_on'],
	    "status" => $row_project['status'],
	    "version" => $row_project['version'],
	    "description" => $row_project['discription']
	);
	$project_table[] = $project;
    }
    
    return $project_table;  
}

/*----------------------------------------------

    GET DATA FROM PARTICIPATION TABLE (and name from member table)

-----------------------------------------------*/
function getParticipation($project_id, $con, $scope, $where, $equal){
    $sql_participation = "SELECT ".$scope." FROM `participation` WHERE ".$where."".$equal;
    $result_participation = mysqli_query($con, $sql_participation);
    
    $num_of_rows = mysqli_num_rows($result_participation);
	
    if($num_of_rows != null || $num_of_rows != 0){    
    
      $participation_table = array();
   
      while ($row_participation = mysqli_fetch_array($result_participation)) {
	  
	  $participation = array(
	      "participation_id" => $row_participation['participation_id'],
	      "project_id" => $row_participation['project_id'],
	      "member_id" => $row_participation['member_id'],
	      "role" => $row_participation['role'],
	      "starting_date" => $row_participation['starting_date'],
	      "ending_date" => $row_participation['ending_date'],
	      "first_name" => getMember($row_participation['member_id'], 0, $con),
	      "last_name" => getMember($row_participation['member_id'], 1, $con)	    
	  );
	  $participation_table[] = $participation;
      }
      
      return $participation_table;
    }
    
    else{
	
	return 0;
    }
    
}

/*----------------------------------------------

    GET FIRST_NAME AND LAST_NAME FROM MEMBER TABLE

-----------------------------------------------*/
function getMember($memberid, $x, $con){
    
    if($x == 0){
	$sql_getName = "SELECT `first_name` FROM `member` WHERE `member_id` = ".$memberid;
	
	if ($result_getName = mysqli_query($con, $sql_getName)) {
	    $row_getName = mysqli_fetch_assoc($result_getName);
	    return $row_getName['first_name'];
	}
    }else{
	$sql_getName = "SELECT `last_name` FROM `member` WHERE `member_id` = ".$memberid;
	
	if ($result_getName = mysqli_query($con, $sql_getName)) {
	    $row_getName = mysqli_fetch_assoc($result_getName);
	    return $row_getName['last_name'];
	}	
    } 
}

/*----------------------------------------------

    GET DATA FROM REQUIREMENTS TABLE

-----------------------------------------------*/
function getRequirements($project_id, $con, $scope, $where, $equal){
    $sql_requirements = "SELECT ".$scope." FROM `requirement` WHERE ".$where."".$equal;
    $result_requirements = mysqli_query($con, $sql_requirements);
    
    $requirements_table = array();
 
    while ($row_requirements = mysqli_fetch_array($result_requirements)) {
	
	$requirements = array(
	    "requirement_id" => $row_requirements['requirement_id'],
	    "project_id" => $row_requirements['project_id'],
	    "description" => $row_requirements['description'],
	    "required_working_hours" => $row_requirements['required_working_hours'],
	    "date" => $row_requirements['date']   
	);
	$requirements_table[] = $requirements;
    }
    
    return $requirements_table;   
}

/*----------------------------------------------

    GET DATA FROM INDIVIDUAL_WORK TABLE

-----------------------------------------------*/
function getIndividual($project_id, $con, $scope, $where, $equal){
    $sql_individual = "SELECT ".$scope." FROM `individual_work` WHERE ".$where."".$equal;
    $result_individual = mysqli_query($con, $sql_individual);
    
    $individual_table = array();
    
    $num_of_rows = mysqli_num_rows($result_individual);
    
    if($num_of_rows != null || $num_of_rows != 0){
	    
	while ($row_individual = mysqli_fetch_array($result_individual)){
	    
	    $individual = array(
		"work_id" => $row_individual['work_id'],
		"project_id" => $row_individual['project_id'],
		"member_id" => $row_individual['member_id'],
		"description" => $row_individual['description'],
		"hours" => $row_individual['hours'],
		"date" => $row_individual['date'],
		"problems" => $row_individual['issue_id']
	    );
	    $individual_table[] = $individual;
	}    
	
	return $individual_table;
    }else{
	return 0;
    }
}


function individualHours($project_id, $con, $scope, $where, $equal){
    
    $sql = "SELECT ".$scope." FROM `individual_work` WHERE ".$where."".$equal;
    $result = mysqli_query($con, $sql_individual);
    
    $table = array();
     
    while ($row = mysqli_fetch_array($result)){
	
    }
    
    sort($numbers);
    
    
    
    return $totalhours;
}

/*----------------------------------------------

    GET DATA FOR CHARTS
    
-----------------------------------------------*/
function getDataForCharts($project_id, $con){
	
	$mega = array(
	    "weekly_report" => getWeeklyReports($project_id, $con, "*", "`project_id`", " = ".$project_id),
	    "project" => getProjects($project_id, $con, "*", "project_id", " = ".$project_id),
	    "participation" => getParticipation($project_id, $con, "*", "project_id", " = ".$project_id),
	    "individual" => getIndividual($project_id, $con, "*", "project_id", " = ".$project_id),
	    "requirement" => getRequirements($project_id, $con, "*", "project_id", " = ".$project_id)
	);
	
	echo json_encode($mega);
}


mysqli_close($con);
?>