<?php
	include('../Login/register.php'); // Includes Register Script
?>

<!doctype html>

<html>

	<head>
		<Title>Register</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
		<script src="scripts/metrics-elements-1.0.0.js"></script>
	</head>

	<body>
		<div id="wrapper">

			<div id="registerform">
				<form method="post" action="" name="logform" id="login">

					<ol>
						<li>
							<label for="username">Username:</label>
							<input type="text" name="uname">
						</li>
						<li>
							<label for="password">Password :</label>
							<input type="password" name="pass">
						</li>

						<li>
							<label for="firstname">First Name:</label>
							<input type="text" name="fname">
						</li>

						<li>
							<label for="lastname">Last Name:</label>
							<input type="text" name="lname">
						</li>
						
						<li>
							<label for="emailz">Email:</label>
							<input type="text" name="email">
						</li>
						
						<li>
							<label for="phonenumebr">Phone Number:</label>
							<input type="text" name="pnumb">
						</li>
						<span></span>
					</ol>
					<div id="logb">
						<button name="reg">
							Register
						</button>

					</div>

				</form>
			</div>

			<script>
				createFooter();
			</script>

		</div>

	</body>

</html>