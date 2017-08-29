# SendMySMS

**SendMySMS** is a side project that I made during my college time. It allows registered users to send SMS in various ways to single person or a group of people.

## Index
 * [Setup Instruction](#setup-instruction)
 * [Features/Functionalities](#featuresfunctionalities)
 * [Link to Demo](#link-to-demo)
 * [External Libraries/API used](#external-librariesapi-used)
   * [Frontend](#frontend)
   * [Backend](#backend)
   * [External API](#external-api)
 * [Features/Functionalities explaination](#featuresfunctionalities-explaination)
   * [Send Bulk SMS](#send-bulk-sms)
   * [Send Dynamic SMS](#send-dynamic-sms)
   * [CRUD Contact Group](#crud-contact-group)
   * [View Message History](#view-message-history)
   * [Reporting of SMS usage](#reporting-of-sms-usage)
 * [Structure of Project](#structure-of-projectcode-organization)
 * [Screenshots](#screenshots)

## Setup Instruction
1. Open terminal and navigate to project folder.
3. Run `composer install`.
2. Run `npm install`.
2. Run `npm build`.
3. Copy `.env.example` to `.env` and set values of the variables.

## Features/Functionalities
 * Send Bulk SMS
 * Send Dynamic SMS
 * CRUD Contacts(with bulk CSV upload)
 * CRUD Contact Group
 * View Message History
 * Reporting of SMS usage

## Link to Demo
You can find demo link [here](http://sendmysms.netau.net)

[Demo Video](http://gph.is/2x0ByH9)

**Credentials**

> `username`: demo
> 
> `password`: demo

## External Libraries/API used
### Frontend
 * [AngularJS](https://angularjs.org/)
 * [Webpack](https://webpack.github.io/)
 * [jQuery](http://jquery.com/)
 * [Plotly](https://plot.ly)
 * [Toastr](https://github.com/CodeSeven/toastr)
### Backend
 * [phpdotenv](https://github.com/vlucas/phpdotenv)
### External API
 * [Textlocal](https://www.textlocal.in)

## Structure of Project(Code Organization)

### Dependencies
All frontend dependencies are managed through `npm` and all backend dependencies are managed through `composer`.

### Frontend
`index.html` contains is the main file. All html templates are located in `templates` folder.

All Javascipt files are at `assets/js` folder.
All controllers are located in `assets/js/controller` folder.
All services are located in `assets/js/services` folder.

There are many Javascript files which are bundled together with `Webpack`, which combines all of them and outputs a `app.bundle.js` which is included in `index.html`.

### Backend
All the backend logic is divided into small parts which are stored in `backend_logic` folder. All ajax request from frontend are handled by `request_handler.php`. According to current requeest, that particular pieceof logic is included from appropriate files in `backend_logic`.

## Features/Functionalities explaination
### Send Bulk SMS

 * User can send a single SMS to multiple people or [Contact Group(s)](#crud-contact-group)

### Send Dynamic SMS

 * Users can specify a message template and message for it will be generated dynamically from CSV file.

**Example**
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
![Message History](http://i.imgur.com/zFWb6EJ.png)