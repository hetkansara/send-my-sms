<?php

    /**
     * Checks if action parameter of current request
     */
    function is_action($action){
        
        return empty($_REQUEST['action']) ? false : 
            $_REQUEST['action'] === $action ? true : false ;
    }

    /**
     * Send POST curl request to API and returns response
     */
    function post_curl($data, $url){
        
        // Send the POST request with cURL
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        
        // Process your response here
        return $response;
    }

    /**
        * Checks if current user is logged in or not
        */
    function user_logged_in($api_key_hash, $database_api_key){
        
        if(md5($database_api_key) == $api_key_hash)
        {
            return true;
        }

        return false;
    }

    /**
        * Gets api key of current user
        */
    function get_api_key(){
        
        include('connection.php');

        $request_api_key_hash = $_REQUEST['api_key'];
        $user = $_REQUEST['username'];
        
        $sql = "SELECT * FROM `users_master` WHERE `username` = '".$user."'";
        
        $result = mysqli_query($connection, $sql);
        $database =  mysqli_fetch_array($result,MYSQLI_BOTH);
        
        // Checks if user is logged in
        if(user_logged_in($request_api_key_hash, $database['api_key']))
        {
            return $database['api_key'];
        }

        // If user is not logged in
        $response['warnings'] = array(array("message"=>"Unable to login with given credentials"));
        $response['status'] = "failure";
        
        echo json_encode($response);
        
        die();
    }
?>