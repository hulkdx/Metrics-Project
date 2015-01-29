<?php
	include('../Login/login.php'); // Includes Login Script
?>

<!doctype html>

<html>

	<head>

		<Title>Login</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
		<script src="scripts/SiteElements.js"></script>
	</head>

	<body>
		<div id="wrapper">

			<script>
				createTop();
			</script>

			<div id="loginform">
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
						<span><?php echo $error; ?></span>
					</ol>
					<div id="logb">
						<button name="submit">
							Login
						</button>
						<button name="register">
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