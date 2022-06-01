<?php

    // Create connection
    $srv = "sqlserver";
    $opc = array(
        "Database"=>"INSULTLE",
        "UID"=>"sa",
        "PWD"=>"12345Ab##"
    );

    $con = sqlsrv_connect($srv,$opc) or
        die(print_r(sqlsrv_errors(), true));

    if($con) {

    $sql="SELECT TOP 1 UPPER(insult) as insult FROM insults WHERE LEN(insult)=5";
    $result = sqlsrv_query($con, $sql);

    if(!$result) {
    $result = sqlsrv_query($con, $sql);
        die('Query failed'. sqlsrv_error($connection));
    }

    $row=sqlsrv_fetch_array($result);
	        echo $row['insult'];
		    sqlsrv_close($con);

    }
?>