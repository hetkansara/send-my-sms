<?php
    $api_key = urlencode(get_api_key());
    
    if(isset($_POST['group_selcted']))
    {
        $group_id = $_POST['group_selcted'];
        $file = $_FILES['fileToUpload']['tmp_name'];
        $handle = fopen($file, "r");
        if ($file == NULL) {
            
        }
        else {
            $contacts = new ArrayObject();
            $row=0;
            while(($data = fgetcsv($handle, 2000, ",")) !== false)
            {
                $num = count($data);
                if($row==0){
                    $row++;
                    continue;
                }
                if(!isset($data[0]))
                    continue;
                if(!isset($data[2]))
                    continue;
                if(!isset($data[1]))
                    $data[1] = '';
                $rowData = array('number' => $data[2], 'first_name' => $data[0], 'last_name' => $data[1]);
                $contacts->append($rowData);
                
            }
            // Prepare data for POST request
            $data = array('apikey' => $api_key, 'group_id' => $group_id, 'contacts' => json_encode($contacts));
         
            // Send the POST request with cURL
            echo post_curl($data, 'https://api.textlocal.in/create_contacts_bulk/');
        }
    }
    else{
        $error = array("message"=>"Please select the Group!");
        $response = array("errors" => array($error));
        echo json_encode($response);
    }
?>