<?php
	require __DIR__ . '/vendor/autoload.php';
	
	$dotenv = new Dotenv\Dotenv(__DIR__);
	$dotenv->load();

	include 'connection.php';
	include 'backend_logic/utils.php';

	/**
	 * Checks user authentication
	 */
	if(isset($_GET['login_button']))
	{	
		include 'backend_logic/login.php';
	}

	/**
	 * Sends "SMS Package" and "Default SMS Template" of user
	 */
	else if(isset($_GET['get_content']))
	{	
		include 'backend_logic/sms_package.php';
	}
	/**
	 * Sends SMS to given contacts
	 */
	else if(isset($_POST['send_SMS']))
	{	
		include 'backend_logic/send_sms.php';
	}

	/**
	 * Sends sms with dynamic arguments - i.e.
	 * Hello {Name}. Data of dynamic message is 
	 * found in corrosponding CSV file
	 */
	else if(isset($_POST['send_SMS_Dynamic']))
	{	
		include 'backend_logic/send_dynamic_sms.php';
	}

	/**
	 * Returns SMS balance of user
	 */
	else if(isset($_GET['get_SMS_Balance']))
	{
		include 'backend_logic/get_remaining_sms.php';
	}

	/**
	 * Returns SMS history of user 
	 */
	else if(isset($_GET['get_SMS']))
	{
		include 'backend_logic/get_message_history.php';
	}

	/**
	 * Updates user profile
	 * TODO: convert it to POST request
	 */
	else if(isset($_GET['update_profile']))
	{
		include 'backend_logic/update_profile.php';
	}

	/**
	 * Adds contacts from CSV file
	 */
	else if(isset($_POST['addContacts']))
	{
		include 'backend_logic/add_contacts.php';
	}

	/**
	 * Adds group
	 */
	else if(isset($_POST['addGroup']))
	{
		include 'backend_logic/add_group.php';
	}

	/**
	 * Returns all groups
	 */
	else if(isset($_GET['get_Groups']))
	{
		include 'backend_logic/get_groups.php';
	}

	/**
	 * Deletes selected groups
	 */
	else if(isset($_POST['delete_Groups']))
	{
		include 'backend_logic/delete_groups.php';
	}

	/**
	 * Returns all groups and its contacts
	 */
	else if(isset($_GET['get_Contacts']))
	{
		include 'backend_logic/get_contacts.php';
	}

	/**
	 * Deletes selected contacts
	 */
	else if(isset($_POST['delete_Contacts']))
	{
		include 'backend_logic/delete_contacts.php';
	}

	else{}
?>