<?php
    $group_id = $_POST['group_selected'];
    $contacts = $_POST['contacts'];	

    $api_key = urlencode(get_api_key());	
    
    for ($i=0;$i<count($contacts);$i++)
    {
        // Prepare data for POST request
        $data = array('apikey' => $api_key, 'group_id' => $group_id, 'number' => $contacts[$i]);
        
        // Send the POST request with cURL
        echo post_curl($data, 'https://api.textlocal.in/delete_contact/');
    }
?>