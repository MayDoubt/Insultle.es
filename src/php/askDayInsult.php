<?php

    // Create connection
    if ((include 'connection.php') == TRUE) {
        $con = include 'connection.php';
        echo 'Connection to DB OK';
    }

    if($con) {

        // Se genera la vista cogiendo una palabra y añadiendo
        // una columna con un número generado aleatorio, se ordena
        // por ese número aleatorio y nos quedamos con el top1
        // Esta vista se crea nueva siempre que se llame a este fichero
        $sql="DECLARE @sql VARCHAR(200)
    
        SELECT @sql='CREATE OR ALTER VIEW getRandomInsult 
        AS SELECT TOP 1 insult, CAST(RAND(CHECKSUM(NEWID())) * 300 as INT) randomNumber 
        FROM insults WHERE len(insult)=5 ORDER BY randomNumber DESC'

        EXEC (@sql)";
        $result = sqlsrv_query($con, $sql);

        if(!$result) {
            $result = sqlsrv_query($con, $sql);
                die('First query failed'. sqlsrv_errors($connection));
            }

        $sql="SELECT UPPER(dbo.dayWord(getDate()))";
        $result = sqlsrv_query($con, $sql);

        if(!$result) {
        $result = sqlsrv_query($con, $sql);
            die('Query failed'. sqlsrv_errors($connection));
        }

        $row=sqlsrv_fetch_array($result);
	        echo $row['insult'];
		    sqlsrv_close($con);

    } else {
        die ('No pudo conectarse: ' . sqlsrv_errors());
    }
?>