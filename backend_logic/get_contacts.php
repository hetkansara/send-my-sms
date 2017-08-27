<?php
    $api_key = urlencode(get_api_key());	

    // Prepare data for POST request
    $data = array('apikey' => $api_key);

    $contacts = array();
    $groups = json_decode(post_curl($data, 'https://api.textlocal.in/get_groups/'), true);
    $groups = $groups['groups'];
    
    for ($i=0;$i<count($groups);$i++)
    {
        // Prepare data for POST request
        $data = array('apikey' => $api_key, 'group_id' => $groups[$i]['id']);
        
        $contacts1 = json_decode(post_curl($data, 'https://api.textlocal.in/get_contacts/'), true);
        $contacts1 = $contacts1['contacts'];
        
        for ($j=0;$j<count($contacts1);$j++)
        {
            $contacts1[$j]['group_id'] = $groups[$i]['id'];
            $contacts1[$j]['group_name'] = $groups[$i]['name'];
            array_push($contacts,$contacts1[$j]);
        }
    }
    echo json_encode($contacts);
?>