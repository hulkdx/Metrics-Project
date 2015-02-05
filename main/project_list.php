<?php
    include('../Login/session.php');	
?>	

<!doctype html>

<html>
<head>
	
<Title>Project List</title>
 <link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
 <script src="scripts/jquery-1.11.1.min.js"></script>
 <script src="scripts/metrics-elements-1.0.0.js"></script>
 <script src="scripts/metrics-makedata-1.0.0.js"></script>
</head>

<body>
    <div id="wrapper">
    	
	<script>
	createTop("<?php Print($user_check); ?>");
	createNavig();	
	</script>  
	
            
        <div id="maincontent">
            
	<script>
	createHeader("Project List", 1);
	</script>
                
	<div class="databox_wide" id="projectlistbox">
	<script>
	getProjectList(0);
	</script> 
        </div>	
  
        </div>
    
	<br><br>
	<script>
	createFooter();
	</script>
	
    </div>
    
</body>

</html>