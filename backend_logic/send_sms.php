<?php
    $api_key = urlencode(get_api_key());
    
    if($_POST['numbers']==''){
        $all_numbers = array();
    }
    else{
        $all_numbers = explode(',',$_POST['numbers']);
    }

    // Extracts selected contact's numbers and add it to
    // all_numbers array
    if(isset($_POST['contacts'])){
        $contacts = $_POST['contacts'];
        for ($j=0;$j<count($contacts);$j++)
        {
            array_push($all_numbers,$contacts[$j]);
        }
    }

    // Message template
    $message = $_POST['message'];

    // Message details
    $sender = urlencode('TXTLCL');
    $message = rawurlencode($message);
    $custom = $_POST['username'];
    $numbers = implode(',', $all_numbers);

    // Prepare data for POST request
    $data = array('apikey' => $api_key, 'numbers' => $numbers, "sender" => $sender, "message" => $message,'custom' => $custom);

    // Send the POST request with cURL
    echo post_curl($data, 'https://api.textlocal.in/send/');
?>