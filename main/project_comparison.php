<?php
	include('../Login/session.php');
?>
<!doctype html>

<html>

	<head>
    
    	<Title>Project Main</title>
        <link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
	<script src="scripts/metrics-elements-1.0.0.js"></script>
	<script src="scripts/jquery-1.11.1.min.js"></script>	
	<style type="text/css">
	${demo.css}
	</style>
    </head>
 
    
    <body>
	<script src="scripts/highcharts/js/highcharts.js"></script>
    <div id="wrapper">
    	
	<script>
	createTop("<?php Print($user_check); ?>");
	createNavig();
	</script>
	   
        <div id="maincontent">
	  
	<script>
	createHeader("Compare Metrics", 0);
        </script>
          
        <div class="databox_wide">
		<div style="width: 100%; height: 210px;">
			<div style="float: left;">
			<form name="projectForm" method="post" action="">
				<select id="projectlist" name="projectlist" multiple="multiple" onchange="" style="height: 200px; width: 250px;">
				</select>
			</form>
			</div>
			
			<div style="float: left; width: 500px; height: 200px; padding-left: 10px;">
				
				<div style="float: left; width: 100%; height: 20px; padding-left: 10px; margin-top: 10px;">
					<input type="button" title="Show total working hours of selected project" onClick="getSelectedOptions(3)" value="Total hours"/>
					<input type="button" title="Show individual working hours of selected project" onClick="getSelectedOptions(1)" value="Individual total hours"/>
					<input type="button" title="Show monthly working hours of selected project" onClick="getSelectedOptions(0)" value="Monthly total hours"/>
					<input type="button" title="Show project's requirements" onClick="getSelectedOptions(4)" value="Requirements"/>
				</div>
				<br/><br/><br/>
				<div style="float: left; width: 100%; height: 20px; padding-left: 10px; margin-top: 10px;">
					<input class="typebtn" title="Convert series to spline" type="button" onClick="change('spline')" value="" style="background-image: url('images/tospline.jpg');"/>
					<input class="typebtn" title="Convert series to line" type="button" onClick="change('line')" value="" style="background-image: url('images/toline.jpg');"/>
					<input class="typebtn" title="Convert series to column" type="button" onClick="change('column')" value="" style="background-image: url('images/tocolumn.jpg');"/>
					<input class="typebtn" title="Remove series" type="button" onClick="removeSeries()" value="" style="background-image: url('images/remove.jpg');"/><br/><br/>
					<input class="typebtn" type="checkbox" id="affectall" checked="checked"/><label for="affectall" style="font-size: 8pt; color: gray;">Affect All Series</label>
				</div>
			</div>
		</div>
		
		
		<br>
		<div id="container"></div>
        </div>	
  
        </div>
    
	<script src="scripts/metrics-makedata-1.0.0.js"></script>
	<script src="scripts/metrics-makechart-1.0.0.js"></script>
	<script>
	getProjectList(1);
	createChart("column", "Hours", "Member", "container", "");
	createFooter();
	</script>
	
    </div>
              
</body>

</html>