<?php

include('db_connection.php');

if(isset($_GET["id"]))
{
    /* Retrive the Information
       needed for public page*/

    // Create connection
    $con = mysqli_connect($hostname, $usrname, $password, $db_name);

    // Check connection
    if (mysqli_connect_errno($con)) {
        die("Connection failed: " . $conn -> connect_error);
    }

    $id = $_GET["id"];

    // Query
    $query = "SELECT * FROM `project` WHERE (`project_id` = '$id');";
    $result_project = mysqli_query($con, $query);
    $row_project = mysqli_fetch_array($result_project);
	$project = array(
	    "project_id" => $row_project['project_id'],
	    "project_name" => $row_project['project_name'],
	    "created_on" => $row_project['created_on'],
	    "updated_on" => $row_project['updated_on'],
	    "status" => $row_project['status'],
	    "version" => $row_project['version'],
	    "description" => $row_project['discription']
	);

    $project["working_hours"] = 0;

    $query = "SELECT `hours` FROM `individual_work` WHERE (`project_id` = '$id');";
    $result_project = mysqli_query($con, $query);
    while ($row_project = mysqli_fetch_array($result_project)) {
	       $project["working_hours"] += $row_project['hours'];
    }



    echo json_encode($project);
}

?>
