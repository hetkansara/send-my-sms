<?php
	//TODO: update comments
	require __DIR__ . '/vendor/autoload.php';
	
	$dotenv = new Dotenv\Dotenv(__DIR__);
	$dotenv->load();

	include 'connection.php';
	include 'backend_logic/utils.php';

	/**
	 * Checks user authentication
	 */
	if(is_action('login'))
	{	
		include 'backend_logic/login.php';
	}

	/**
	 * Sends "SMS Package" and "Default SMS Template" of user
	 */
	else if(is_action('get_package_template'))
	{	
		include 'backend_logic/sms_package.php';
	}
	/**
	 * Sends SMS to given contacts
	 */
	else if(is_action('send_sms'))
	{	
		include 'backend_logic/send_sms.php';
	}

	/**
	 * Sends sms with dynamic arguments - i.e.
	 * Hello {Name}. Data of dynamic message is 
	 * found in corrosponding CSV file
	 */
	else if(is_action('send_dynamic_sms'))
	{	
		include 'backend_logic/send_dynamic_sms.php';
	}

	/**
	 * Returns SMS balance of user
	 */
	else if(is_action('get_remaining_sms'))
	{
		include 'backend_logic/get_remaining_sms.php';
	}

	/**
	 * Returns SMS history of user 
	 */
	else if(is_action('get_message_history'))
	{
		include 'backend_logic/get_message_history.php';
	}

	/**
	 * Updates user profile
	 * TODO: convert it to POST request
	 */
	else if(is_action('update_profile'))
	{
		include 'backend_logic/update_profile.php';
	}

	/**
	 * Adds contacts from CSV file
	 */
	else if(is_action('add_contacts'))
	{
		include 'backend_logic/add_contacts.php';
	}

	/**
	 * Adds group
	 */
	else if(is_action('add_group'))
	{
		include 'backend_logic/add_group.php';
	}

	/**
	 * Returns all groups
	 */
	else if(is_action('get_groups'))
	{
		include 'backend_logic/get_groups.php';
	}

	/**
	 * Deletes selected groups
	 */
	else if(is_action('delete_groups'))
	{
		include 'backend_logic/delete_groups.php';
	}

	/**
	 * Returns all groups and its contacts
	 */
	else if(is_action('get_groups_and_contacts'))
	{
		include 'backend_logic/get_contacts.php';
	}

	/**
	 * Deletes selected contacts
	 */
	else if(is_action('delete_contacts'))
	{
		include 'backend_logic/delete_contacts.php';
	}
?>