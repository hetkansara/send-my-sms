<?php
    $api_key = urlencode(get_api_key());
    
    // Group details
    $name = $_POST['group_text'];

    // Prepare data for POST request
    $data = array('apikey' => $api_key, 'name' => $name);

    // Send the POST request with cURL
    echo post_curl($data, 'https://api.textlocal.in/create_group/');
?>