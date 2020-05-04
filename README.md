# expenseeve-app

A expense management react application to compliment with the [expenseeve-api](github.com/paragpalod/expenseeve-api)  backend.

Tasks Completed
--------------
Following tasks have been completed in the give Assignment:
![Image](https://user-images.githubusercontent.com/61429014/80960880-635b0680-8e27-11ea-91e0-db16e3f2c9a9.png)
1. If new user Signup option has been provided .
2. Retrieves them for display on the page. 
3. Add a new column to the table displaying the VAT amount for each expense.
4. Calculate the VAT client-side as the user enters a new expense, before they save the expense to the database.
4. Added a README to contain instructions on how to build and run the app.

APIs are exposed on /api/* path. For example to get stored expensed send a get request on http://localhost:8080/api/expenses

Platform
--------------
I have used Ubuntu 14.04 64 Bit for development and testing. Eclipse and Sublime text have been used as IDEs.

Technologies/Libraries Used
--------------

1. Java (1.8.0_25)
2. MySQL (5.5.46)
3. Dropwizard (0.9.1)
4. Flyway (3.2.1)
5. jsonassert (1.3.0)
6. Maven (3.0.5)

Pre-requisites
--------------
Java, MySQL and Maven should be installed

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


Note
--------------
I have updated **src/main/resources/assets/src/js/apps/codingtest/expenses/expenses-controller.js** and **src/main/resources/assets/src/js/apps/codingtest/partials/expenses-content.html**. Hence you may need to rebuild client bundle if deploying in other than development mode.

Follow these steps to rebuild client bundle.

`cd src/main/resources/assets`  
`gulp build` (You may need to insrall gulp, npm if it is not already installed. Execute `npm install gulp -g` and `npm install` to install node modules dependencies before executing this command)
