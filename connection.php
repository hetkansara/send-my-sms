<?php

	/**
	 * Gets database host
	 */
	$host = getenv('HOST');
	
	/**
	 * Gets database name
	 */
	$database = getenv('DATABASE');
	
	/**
	 * Gets database user
	 */
	$user = getenv('USER');
	
	/**
	 * Gets database password
	 */
	$password = getenv('PASSWORD');
	
	$connection = mysqli_connect(
		$host,
		$user,
		$password,
		$database
	) or die("Error " . mysqli_error($connection));

?>