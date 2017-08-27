<?php
    $api_key = urlencode(get_api_key());

    $file = $_FILES['fileToUpload']['tmp_name'];
    $handle = fopen($file, "r");
    if ($file == NULL) {
        
    }
    else {
        $counter = 0;
        $headers = array();

        // Global message array. All sms and its numbers to be sent will be stored here
        $messages = array();
        
        // Read the dynamic message data CSV file
        while(($data = fgetcsv($handle, 2000, ",")) !== false)
        {
            // Initialize the headers from CSV file
            if($counter==0){
                while(isset($data[$counter])){
                    $headers[$data[$counter]] = $counter;
                    $counter++;
                }
            }

            // Replace the Template with our data
            else{
                $message = $_POST['message'];
                foreach ($headers as $key => $value){
                    $message = str_replace("{".$key."}",$data[$value],$message);
                }

                $msg = array(
                        'number' => $data[$headers["Contact"]],
                        'text' => rawurlencode($message)
                    );
                array_push($messages,$msg);
            }
        }
        $messages = array('messages'=>$messages);
        $data = array(
            'apikey' => $api_key,
            'data' => json_encode($messages),
            'custom' => $uname
        );
        
        // Send the POST request to send sms from api
        echo post_curl($data, 'https://api.textlocal.in/bulk_json/');
    }
?>