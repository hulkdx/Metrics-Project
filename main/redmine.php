<?php
include('../Login/session.php');
include('../reading from redmine/getnumbers.php');
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
					createHeader("Redmine", 0);
				</script>

				<div class="Main Body">
					<p style="text-align: left;">
						<span style="line-height: 14.2857151031494px; font-size: 16px; font-weight: bold;">Individual_work :</span>
					</p>
					<p style="text-align: left;">
						already imported in local database : <?php print($count_workh_localdb); ?>
					</p>
					<p style="text-align: left;">
						numbers of data in redmine database : <?php print($count_workh); ?>
					</p>

					<br />

					<p style="text-align: left;">
					<p>
						<span style="line-height: 14.2857151031494px; font-size: 16px; font-weight: bold;">Requirements :</span>
					</p>
					<p>
						already imported in local database : <?php print($count_issue_localdb); ?>
					</p>
					<p>
						numbers of data in redmine database : <?php print($count_issue); ?>
					</p>
					<p>
						<br />
					</p>
					<p>
					<p>
						<span style="line-height: 14.2857151031494px; font-size: 16px; font-weight: bold;">Projects :</span>
					</p>
					<p>
						already imported in local database : <?php print($count_project_localdb); ?>
					</p>
					<p>
						numbers of data in redmine database : <?php print($count_project); ?>
					</p>
					<br />
					<button name="submit" onclick="reload()">
						Import
					</button>

					<script>
						function reload() {
							location.reload();
						}
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