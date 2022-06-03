<?php

    include('connection.php');
    //para registrar la session o cookie o lo que sea en la bbdd

    if(isset())



?>

<?php
    $a = session_id();
    if(empty($a))
        session_start();
        $a = session_id();
    //echo "<br />session_id(): " . $a

    $sql="EXEC insertUser " + $a;
    $result = sqlsrv_query($con, $sql);

    if(!$result) {
    $result = sqlsrv_query($con, $sql);
        die('Query failed'. sqlsrv_error($connection));
    }
?>