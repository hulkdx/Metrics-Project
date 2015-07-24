<!doctype html>

<html>

	<head>

		<Title>Public Page</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
		<script src="scripts/metrics-elements-1.0.0.js"></script>
		<script src="scripts/jquery-1.11.1.min.js"></script>
	</head>

	<body>
		<div id="wrapper">

			<script>
				createTop();
			</script>

			<div id="publicform">
			<script>
				createListForPublic();
			</script>

					<ol>
						<li>
							<label>Project Name:</label>
							<input type="text" id="project_name">
						</li>
						<li>
							<label>Created On :</label>
							<input type="text" id="created_on">
						</li>
                        <li>
                            <label>Updated On   :</label>
							<input type="text" id="updated_on">
                        </li>
                        <li>
                            <label>Status       :</label>
							<input type="text" id="status">
                        </li>
                        <li>
                            <label>Version      :</label>
							<input type="text" id="version">
						</li>
						<li>
							<label>Description      :</label>
							<input type="text" id="desc">
						</li>
                        <li>
                            <label>Total Hours      :</label>
                            <input type="text" id="hours">
                        </li>
					</ol>
			</div>

			<script>
				createFooter();
			</script>

		</div>

	</body>

</html>
