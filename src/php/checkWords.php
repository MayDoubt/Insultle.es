<?php

    // Create connection
    if ((include 'connection.php') == TRUE) {
        $con = include 'connection.php';
        echo 'Connection to DB OK';
    }

    if($con) {
        $word = $_POST['guess'];

        if(!empty($word)) {
            $sql="SELECT UPPER(dbo.checkWord("$word"))";
            $result = sqlsrv_query($con, $sql);

            if(!$result) {
                die('Query failed'. sqlsrv_errors($connection));
            }

            echo $result;
        }
    } else {
        die ('No pudo conectarse: ' . sqlsrv_errors());
    }
?>