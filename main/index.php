<?php
	include('../Login/login.php'); // Includes Login Script
?>

<!doctype html>

<html>

	<head>

		<Title>Login</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
		<script src="scripts/jquery-1.11.1.min.js"></script>
		<script src="scripts/metrics-elements-1.0.0.js"></script>
		<script src="scripts/index.js"></script>
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


				<div id="public">
					<select id="publicCB" name="publicComboBox">
						<script>
							createOptions();
						</script>
					</select>
					<button name="public" onclick="publicClicked()">
						Public Page
					</button>
				</div>
			</div>

			<script>
				createFooter();
			</script>

		</div>

	</body>

</html>
