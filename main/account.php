<?php
	include('../Login/session.php');
?>
<!doctype html>

<html>

	<head>
    
    	<Title>Account Information</title>
         <link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
        <script src="scripts/SiteElements.js"></script> 
    </head>

    
    <body>
    <div id="wrapper">
    	
	<script>
	createTop();
	createNavig();	
	</script>
            
        <div id="maincontent">
            
	<script>
	createHeader("Account Information",0);
	</script>
	
	<div id="accountform">
               	<form method="post" action="" name="accountform" id="account">
                  
		<ol>
		      <li>
		      <label for="username">Username:</label>
		      <input type="text" name="uname" style="float: right;">
		      </li>  
		      <li>
		      <label for="password">Old Password:</label>
		      <input type="text" name="pass" style="float: right;">
		      </li>
		      <li>
		      <label for="password">New Password:</label>
		      <input type="text" name="pass" style="float: right;">
		      </li>		      
		      <li>
		      <label for="password">Contact email:</label>
		      <input type="text" name="email" style="float: right;">
		      </li>		      
		</ol>
                  <div id="logb">
			<button>Submit</button>
                  </div>
                  
                </form>
	</div>
              
        </div>
            
	<script>
	createFooter();
	</script>
	
    </div>
                
</body>

</html>