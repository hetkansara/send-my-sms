<?php
    $api_key = urlencode(get_api_key());
    
    // Prepare data for POST request
    $data = array('apikey' => $api_key);

    // Send the POST request with cURL
    echo post_curl($data, 'https://api.textlocal.in/get_history_api/');
?>