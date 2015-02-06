<?php
	include('../Login/session.php');
?>
<!doctype html>

<html>

	<head>
		<Title>Project Main</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
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
					createHeader("Latest", 0);
				</script>

				<div class="databox_wide">
					<script>
						getLatest();
					</script>
				</div>

			</div>

			<script>
				createFooter();
			</script>

		</div>

	</body>

</html>

<?php
include('../reading from redmine/todatabase.php');
?>