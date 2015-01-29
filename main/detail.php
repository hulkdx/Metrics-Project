<?php
include('../Login/session.php');
include('../Login/db_connection.php');

$projectid = $_GET["id"];

if (mysqli_connect_errno($con)) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}else{
	mysqli_select_db($con,$db_name);
	
	$sql = "SELECT `project_name`, `discription` FROM `project` WHERE `project_id` = $projectid";
	$result = mysqli_query($con, $sql);
	
	$row = mysqli_fetch_array($result);
	
	$projectname = $row['project_name'];
	$description = $row['discription'];
}

mysqli_close($con);	
?>
<!doctype html>

<html>

	<head>
    
    	<Title>Project Detail</title>
        <link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
        <script src="scripts/SiteElements.js"></script>
	<script src="scripts/jquery-1.11.1.min.js"></script>
	<script src="scripts/comparison.js"></script>
	<script src="scripts/highcharts/js/highcharts.js"></script>
    </head>
    
    <body>

    <div id="wrapper">
	
	<script>
	createTop("<?php Print($user_check); ?>");
	createNavig();	
	</script>
            
         <div id="maincontent">
 
	<script>
	//getData(<?php $projectid ?>, operation, querytype, value, containername)
	createHeader("<?php echo $projectname;?>", 0);
	</script>
                	
		<div id="description">
			<?php echo $description;?>
		</div>

                  <div class="databox_small">
			<div id="container2" style="margin:0px; min-width: 300px; width: 100%; height: 100%; margin: 0 auto">adsads</div>
                  </div>

                  <div class="databox_small">
			<div id="container" style="margin:0px; min-width: 300px; width: 100%; height: 100%; margin: 0 auto"></div>
                  </div>
   
                  <div class="databox_small">
                      <h2>Requirements</h2>
		      <div id="reqbox" style="margin-top: 20px;">
			
		      </div>
                  </div>
   
                  <div class="databox_small">
                      <h2>Test Cases</h2>
		      <div id="testbox" style="margin-top: 20px;">
			
		      </div>
                  </div>

                  <div class="databox_small">
                      <h2>Number of Code Revision</h2>
		      <div id="revisionbox" style="margin-top: 20px;">
			
		      </div>
                  </div>
                
                  <div class="databox_small">
                      <h2>Commits to Version Control</h2>
                      <p>obj6</p>
                  </div>
		  
          </div>
	 
        <script src="scripts/MakeChart.js"></script>   
	<script>
	CreateChart("bar", "x label", "y label", "container2", "Individual hours");
	CreateChart("spline", "x label", "y label", "container", "Total hours");
	getData(<?php echo $projectid;?>,0,1,2,"container");
	createFooter();
	</script>
	
    </div>
                
</body>

</html>