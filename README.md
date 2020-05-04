# expenseeve-app

A expense management react application to compliment with the [expenseeve-api](github.com/paragpalod/expenseeve-api)  backend.

# Features Completed
--------------
## Signup and Login

![Image of Signup](https://user-images.githubusercontent.com/61429014/80961331-5b4f9680-8e28-11ea-8137-c62fbf653a63.png)

1. Signup application is provided for new user on login page above is the image of signup page
2. there are four fields name, username, password and confirm password (total budget will be provided by user on first login
3. Every field in signup form has field validation
    - all fields must me filled
    - username ,password should be atleast 6 charactor long
    - confirm password should match password
4. After successful Signup a succes screen will be shown and a option for go to login is provided for easy navigation screenshot provided below

![Image for Signup Successful](https://user-images.githubusercontent.com/61429014/80961954-a918ce80-8e29-11ea-9c4a-c6886e61adc4.png)

5. After Clicking on go to login user is redireted to login

![Image For login](https://user-images.githubusercontent.com/61429014/80963411-81773580-8e2c-11ea-86eb-a91799067ba1.png)

6. There are three field in Login form Username, password, rememberme
7. If user selects remember me option his session will be available for all the tabs in current browser utill the token is expired if user does not come back to the application for three consecutive days user's session token will be expired and user will be logged out
8. if user does not select remember me user session will be valid for that tab only after user closes tab or browser user will be looged out
7. after validating the username & password user is logged in and depending on the total budget key he will be reditrected to home (If total budget is set) or settings(If total budget is not set).

## Settings


Platform and Editor
--------------
I have used Fedora 31 workstation (64 bit) for development and testing. I used Atom text editor.

Technologies/Libraries Used
--------------

1. JavaScript
2. React Js
3. MongoDb
4. Node Js
5. Bootstrap
6. Hapi Js

Instructions
--------------
Please follow these instructions for building and running the application.

Clone existing git repository to download the solution and change directory to `expense-manager`

`git clone https://github.com/sanketmeghani/expense-manager.git`    
`cd expense-manager`

Edit **config/flyway-development.properties** (configuration file for flyway) to update following properties with database configuration

**flyway.user** - Database username  
**flyway.password** - Database user password  
**flyway.schemas** - Database schema name  
**flyway.url** - MySQL JDBC URL

Edit **config/application-development.yml** (configuration file for dropwizard) to update following properties with database configuration

**database.user** - Database username  
**database.password** - Database user password  
**database.url** - MySQL JDBC URL with database schema name  

Run following maven command to create database and schemas

`mvn compile flyway:migrate -Dflyway.configFile=config/flyway-development.properties`

Execute following maven command to run test cases

`mvn clean test`

Executed following maven command to build and package application as a fat executable jar

`mvn clean package`

Execute following command to deploy application on localhost

`java -jar target/expense-manager-1.0.jar server config/application-development.yml`

Server logs are available in **log/application.log** and request logs are available in **log/access.log**  

Application could be accessed by visting [http://localhost:8080](http://localhost:8080)
