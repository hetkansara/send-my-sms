<?php
	require __DIR__ . '/vendor/autoload.php';
	
	$dotenv = new Dotenv\Dotenv(__DIR__);
	$dotenv->load();

	include('connection.php');

	/**
	 * Checks user authentication
	 */
	if(isset($_GET['login_button']))
	{	
		$uname = $_GET['username'];
		$pass = $_GET['password'];
		$password = md5($pass);

		$sql = "SELECT * FROM `users_master` WHERE `username` = '".$uname."'";
		$result = mysqli_query($connection, $sql);
		$data =  mysqli_fetch_array($result,MYSQLI_BOTH);

		if($data['password']==$password)
		{	
			$response['success'] = true;
			$response['message'] = "Login Sucessful!";
			$response['username'] = $data['username'];
			$response['api_key'] = md5($data['api_key']);
		}
		else
		{
			$response['success'] = false;
			$response['message'] = "Incorrect Username OR Password!";
		}
		echo json_encode($response);
	}

	/**
	 * Sends "SMS Package" and "Default SMS Template" of user
	 */
	else if(isset($_GET['get_content']))
	{	
		$uname = $_GET['username'];

		$sql = "SELECT * FROM `users_master` WHERE `username` = '".$uname."'";
		
		$result = mysqli_query($connection, $sql);
		$data =  mysqli_fetch_array($result,MYSQLI_BOTH);
		
		$response['success'] = true;
		$response['message'] = $data['message'];
		$response['package'] = $data['package'];

		echo json_encode($response);
	}
	/**
	 * Sends SMS to given contacts
	 */
	else if(isset($_POST['send_SMS']))
	{	
		$uname = $_POST['username'];
		$apikey = $_POST['api_key'];	
		$sql = "SELECT * FROM `users_master` WHERE `username` = '".$uname."'";
		$result = mysqli_query($connection, $sql);
		$data =  mysqli_fetch_array($result,MYSQLI_BOTH);

		if(md5($data['api_key'])==$apikey)
		{
		
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

			// Account details
			$apiKey = urlencode($data['api_key']);

			// Message details
			$sender = urlencode('TXTLCL');
			$message = rawurlencode($message);
			$custom = $uname;
			$numbers = implode(',', $all_numbers);

			// Prepare data for POST request
			$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message,'custom' => $custom);

			// Send the POST request with cURL
			$ch = curl_init('https://api.textlocal.in/send/');
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$response = curl_exec($ch);
			curl_close($ch);

			// Process your response here
			echo $response;
		}
		else{
			$response['warnings'] = array(array("message"=>"Invalid Credentials! Please Re-Login to fix that issue"));
			$response['status'] = "failure";
			echo json_encode($response);
		}
	}

	/**
	 * Sends sms with dynamic arguments - i.e.
	 * Hello {Name}. Data of dynamic message is 
	 * found in corrosponding CSV file
	 */
	else if(isset($_POST['send_SMS_Dynamic']))
	{	
		$uname = $_POST['username'];
		$apikey = $_POST['api_key'];	
		$sql = "SELECT * FROM `users_master` WHERE `username` = '".$uname."'";
		$result = mysqli_query($connection, $sql);
		$data =  mysqli_fetch_array($result,MYSQLI_BOTH);

		if(md5($data['api_key'])==$apikey)
		{
			$api_key = $data['api_key'];
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
				$ch = curl_init('https://api.textlocal.in/bulk_json/');
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$response = curl_exec($ch);
				curl_close($ch);
				 
				echo $response;
		    }
		}
		else{
			$response['warnings'] = array(array("message"=>"Unable to login with given credentials"));
			$response['status'] = "failure";
			echo json_encode($response);
		}
	}

	/**
	 * Returns SMS balance of user
	 */
	else if(isset($_GET['get_SMS_Balance'])){

		$api_key = urlencode(get_api_key());
		
		// Prepare data for POST request
		$data = array('apikey' => $api_key);

		// Send the POST request with cURL
		$ch = curl_init('https://api.textlocal.in/balance/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);

		// Process your response here
		echo $response;

	}

	/**
	 * Returns SMS history of user 
	 */
	else if(isset($_GET['get_SMS'])){

		$api_key = urlencode(get_api_key());
		
		// Prepare data for POST request
		$data = array('apikey' => $api_key);

		// Send the POST request with cURL
		$ch = curl_init('https://api.textlocal.in/get_history_api/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);

		// Process your response here
		echo $response;

	}

	/**
	 * Updates user profile
	 * TODO: convert it to POST request
	 */
	else if(isset($_GET['profile']))
	{
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
	}

	/**
	 * Adds contacts from CSV file
	 */
	else if(isset($_POST['addContacts']))
	{
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
				$ch = curl_init('https://api.textlocal.in/create_contacts_bulk/');
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$response = curl_exec($ch);
				curl_close($ch);
				
				// Process your response here
				echo $response;
			}
		}
		else{
			$error = array("message"=>"Please select the Group!");
			$response = array("errors" => array($error));
			echo json_encode($response);
		}
		
	}

	/**
	 * Adds group
	 */
	else if(isset($_POST['addGroup']))
	{
		$api_key = urlencode(get_api_key());

		// Group details
		$name = $_POST['group_text'];

		// Prepare data for POST request
		$data = array('apikey' => $api_key, 'name' => $name);

		// Send the POST request with cURL
		$ch = curl_init('https://api.textlocal.in/create_group/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);

		// Process your response here
		echo $response;
	}

	/**
	 * Returns all groups
	 */
	else if(isset($_GET['get_Groups']))
	{
		$api_key = urlencode(get_api_key());	

		// Prepare data for POST request
		$data = array('apikey' => $api_key);

		// Send the POST request with cURL
		$ch = curl_init('https://api.textlocal.in/get_groups/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);

		// Process your response here
		echo $response;
	}

	/**
	 * Deletes selected groups
	 */
	else if(isset($_POST['delete_Groups']))
	{
		$api_key = urlencode(get_api_key());
		
		for ($i=0;$i<count($groups);$i++)
		{

			// Prepare data for POST request
			$data = array('apikey' => $api_key, 'group_id' => $groups[$i]);

			// Send the POST request with cURL
			$ch = curl_init('https://api.textlocal.in/delete_group/');
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$response = curl_exec($ch);
			curl_close($ch);

			// Process your response here
			echo $response;
		}
	}

	/**
	 * Returns all groups and its contacts
	 */
	else if(isset($_GET['get_Contacts']))
	{
		$api_key = urlencode(get_api_key());	

		// Prepare data for POST request
		$data = array('apikey' => $api_key);

		// Send the POST request with cURL
		$ch = curl_init('https://api.textlocal.in/get_groups/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);
		$contacts = array();

		$groups = json_decode($response, true);
		$groups = $groups['groups'];
		
		for ($i=0;$i<count($groups);$i++)
		{
			// Prepare data for POST request
			$data = array('apikey' => $api_key, 'group_id' => $groups[$i]['id']);
			
			// Send the POST request with cURL
			$ch = curl_init('https://api.textlocal.in/get_contacts/');
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$response = curl_exec($ch);
			curl_close($ch);
			$contacts1 = json_decode($response, true);
			$contacts1 = $contacts1['contacts'];
			for ($j=0;$j<count($contacts1);$j++)
			{
				$contacts1[$j]['group_id'] = $groups[$i]['id'];
				$contacts1[$j]['group_name'] = $groups[$i]['name'];
				array_push($contacts,$contacts1[$j]);
			}
		}
		echo json_encode($contacts);
	}

	/**
	 * Deletes selected contacts
	 */
	else if(isset($_POST['delete_Contacts']))
	{
		$group_id = $_POST['group_selected'];
		$contacts = $_POST['contacts'];	
	
		$api_key = urlencode(get_api_key());	
		
		for ($i=0;$i<count($contacts);$i++)
		{

			// Prepare data for POST request
			$data = array('apikey' => $api_key, 'group_id' => $group_id, 'number' => $contacts[$i]);
			
			// Send the POST request with cURL
			$ch = curl_init('https://api.textlocal.in/delete_contact/');
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$response = curl_exec($ch);
			curl_close($ch);
			
			// Process your response here
			echo $response;
		}
	}

	else{}
	
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
		
		$request_api_key_hash = $_REQUEST['api_key'];
		$user = $_REQUEST['username'];
		
		$sql = "SELECT * FROM `users_master` WHERE `username` = '".$uname."'";
		
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