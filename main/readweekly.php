<?php
    include('../Login/session.php');
?>
<!doctype html>
<html lang="en">
<head>
<meta charset = "UTF-8" />
<meta name="viewport" content="width=device-width" />

<title>Reading Weekly Reports</title>

<!--CSS-->
<link rel="stylesheet" type="text/css" media="screen" href="css/readreport.css">
<link href="css/style.css" rel="stylesheet" type="text/css" media="screen">

<!--JavaScript-->
<script src="scripts/jquery-1.11.1.min.js"></script>
<script src="scripts/metrics-elements-1.0.0.js"></script>


</head>

<body>

    <div id="wrapper">

	<script>
	createTop("<?php Print($user_check); ?>");
	createNavig();
	</script>


        <div id="maincontent">

    	    <script>
    	    createHeader("Read from weekly report", 2);
    	    </script>

    	    <div class="databox_wide">

        		<div id="weeklymain">
        		    <div id="handledContents"></div>
        		</div>

    	    </div>

        </div>

	<script>
	createFooter();
	</script>

    </div>

    <script src="scripts/read_weeklyreport.js"> </script>
</body>
</html>
