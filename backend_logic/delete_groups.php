<?php
    $api_key = urlencode(get_api_key());
    $groups = $_POST['groups'];
    for ($i=0;$i<count($groups);$i++)
    {
        // Prepare data for POST request
        $data = array('apikey' => $api_key, 'group_id' => $groups[$i]);

        // Send the POST request with cURL
        echo post_curl($data, 'https://api.textlocal.in/delete_group/');
    }
?>