for ($i = 0, $count = count($issues); $i < $count; $i++) {
	// first time of looping
	if (($i - 1) == -1) {
		$projectId[$i] = $issues[$i] -> project['id'];
		$status[$i] = $issues[$i] -> status['name'];
	}
	// second and more
	else {
		$projectId[$i] = $issues[$i] -> project['id'];
		echo "projectId[i] =".$projectId[$i];
		echo "\n<br />\n<br />";
		echo "projectId[i-1] =".$projectId[$i-1];
		echo "\n<br />\n<br />";
		// checking the current id is the same as prev id
		if ($projectId[$i] = $projectId[$i-1]){
			echo "yea";
			echo "\n<br />\n<br />";
		}
	}
};