<?php
    $api_key = get_api_key();
    
    $sql = "SELECT * FROM `users_master` WHERE `api_key` = '".$api_key."'";
    
    $result = mysqli_query($connection, $sql);
    $data =  mysqli_fetch_array($result,MYSQLI_BOTH);
    
    $response['success'] = true;
    $response['message'] = $data['message'];
    $response['package'] = $data['package'];

    echo json_encode($response);
?>