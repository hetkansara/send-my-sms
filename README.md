# SendMySMS

**SendMySMS** is a side project that I made during my college time. It allows registered users to send SMS in various ways to single person or a group of people.

## Index
TODO

## Features/Functionalities
 * Send Bulk SMS
 * Send Dynamic SMS
 * CRUD Contacts(with bulk CSV upload)
 * CRUD Contact Group
 * View Message History
 * Reporting of SMS usage

## Link to Demo
TODO

## External Libraries/API used
TODO

## Structure of Project
TODO

## Features/Functionalities explaination
### Send Bulk SMS

 * User can send a single SMS to multiple people or [Contact Group(s)](#crud-contact-group)

### Send Dynamic SMS

 * Users can specify a message template and message for it will be generated dynamically from CSV file. i.e.

```
Hello {parent_name} your ward has scored {marks} in {subject}
```

Now a CSV file should be uploaded with it with following structure:

| Contact | parent_name | marks | subject |
| ------- | ----------- | ----- | ------- |
| 9999999999 | Steve | 35 | Maths |
| 8888888888 | Mark | 42 | Science |

It will send out following 2 SMS:

>- To: 9999999999
>- Message: Hello Steve your ward has scored 35 in Maths

>- To: 8888888888
>- Message: Hello Mark your ward has scored 42 in Science

### CRUD Contact Group

* User can create a contact group. It can include many contacts. 
* You can also create it by a CSV file.
* You can send a particular SMS to the whole group.

### View Message History

* You can also view your message history i.e. all the messages you've sent in past.
* You can also search it using various parameters such as date, message content, contact number etc...

### Reporting of SMS usage

* You can visualize your SMS usage through the dashboard provided

## Screenshots

### Dashboard
![Dashboard](http://i.imgur.com/mYrRBB9.png)

### Send SMS
![Send SMS](http://i.imgur.com/CoYwqJc.png)

### Dynamic SMS
![Dynamic SMS](http://i.imgur.com/8e8oAtK.png)

### Groups and Contacts
![Groups and Contacts](http://i.imgur.com/2eVIhxC.png)

### Message History
![Message History](http://i.imgur.com/X5qtryD.png)