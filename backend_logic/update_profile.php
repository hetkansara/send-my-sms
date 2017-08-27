<?php
    $username = $_GET['username'];
    $new_username = $_GET['new_username'];
    $pass = $_GET['password'];
    $password = md5($pass);
    $package = $_GET['package'];
    if(strlen($package)==0)
        $package = 0;
    $new_pass = $_GET['new_password'];
    $confirm_pass = $_GET['confirm_password'];
    $message = $_GET['message'];
    $sql = "SELECT * FROM `users_master` WHERE `username` = '".$username."'";
    $result = mysqli_query($connection, $sql);
    $data =  mysqli_fetch_array($result,MYSQLI_BOTH);

    if($data['password']==$password)
    {	
        if(strlen($new_pass)>0){
            if(strlen($new_pass)<8){
                $response['success'] = false;
                $response['message'] = "New password must be atlest 8 characters long!";
            }
            else{
                if($new_pass!=$confirm_pass){
                    $response['success'] = false;
                    $response['message'] = "New password and confirm password does not match!";
                }
                else{
                    if(strlen($new_username)<3){
                        $response['success'] = false;
                        $response['message'] = "Username must be atlest 3 characters long!";
                    }
                    else{
                        $sql = "UPDATE `users_master` SET `username`='".$new_username."',`password`='".md5($new_pass)."',`message`='".$message."',`package`= `package`+".$package." WHERE `username` = '".$username."'";
                        $result = mysqli_query($connection, $sql);
                        if($result){
                            $sql = "SELECT * FROM `users_master` WHERE `username` = '".$new_username."'";
                            $result = mysqli_query($connection, $sql);
                            $data =  mysqli_fetch_array($result,MYSQLI_BOTH);
                            $response['username'] = $data['username'];
                            $response['api_key'] = md5($data['api_key']);
                            $response['success'] = true;
                            $response['message'] = "Profile updated!";
                        }
                    }
                }
            }
        }
        else{
            if(strlen($new_username)<3){
                $response['success'] = false;
                $response['message'] = "Username must be atlest 3 characters long!";
            }
            else{
                $sql = "UPDATE `users_master` SET `username`='".$new_username."',`message`='".$message."',`package`= `package`+".$package." WHERE `username` = '".$username."'";
                $result = mysqli_query($connection, $sql);
                if($result){
                    $sql = "SELECT * FROM `users_master` WHERE `username` = '".$new_username."'";
                    $result = mysqli_query($connection, $sql);
                    $data =  mysqli_fetch_array($result,MYSQLI_BOTH);
                    $response['username'] = $data['username'];
                    $response['api_key'] = md5($data['api_key']);
                    $response['success'] = true;
                    $response['message'] = "Profile updated!";
                }
            }
        }
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Incorrect old Password!";
    }
    echo json_encode($response);
?>