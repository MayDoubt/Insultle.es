<?php

	//Create connection
	$srv = "sqlserver";
	$opc = array(
		"Database" => "INSULTLE",
		"UID" => "sa",
		"PWD" => "12345Ab##"
	);
	
	$con = sqlsrv_connect($srv, $opc) or
        die(print_r(sqlsrv_errors(), true));

?>