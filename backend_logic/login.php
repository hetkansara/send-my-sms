<?php
    $uname = $_GET['username'];
    $pass = $_GET['password'];
    $password = md5($pass);

    $sql = "SELECT * FROM `users_master` WHERE `username` = '".$uname."'";
    $result = mysqli_query($connection, $sql);
    $data =  mysqli_fetch_array($result,MYSQLI_BOTH);

    if($data['password']==$password)
    {	
        $response['success'] = true;
        $response['message'] = "Login Sucessful!";
        $response['username'] = $data['username'];
        $response['api_key'] = md5($data['api_key']);
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Incorrect Username OR Password!";
    }
    echo json_encode($response);
?>