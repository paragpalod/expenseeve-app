# expenseeve-app

A expense management react application to compliment with the [expenseeve-api](https://github.com/paragpalod/expenseeve-api)  backend.

All the information related to Api and app is provided in this file, directory structure of APi is provided in [expenseeve-api](https://github.com/paragpalod/expenseeve-api)
# Features Completed
--------------
## Signup, Login and Logout 

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
9. after validating the username & password user is logged in and depending on the total budget key he will be reditrected to home (If total budget is set) or settings(If total budget is not set).
10. **Logout** option is provided in sidebar

## Settings (Total budget update & Category Create,Read,Delete)

![Image for Settings](https://user-images.githubusercontent.com/61429014/80963948-9f916580-8e2d-11ea-8f75-30170eb688e9.png)

1. User can update his total budget and create categories on this page
2. User can deete perticular category by clicking delete button provided in actions column
3. User can find thea activation status of category in ststus column , background color of row and red color of row text
4. user can restore the caegory by clicking restore button

## Home (Expense CRUD, Budget overview, Category wise split)

![Image For home](https://user-images.githubusercontent.com/61429014/80965552-54c51d00-8e30-11ea-86d3-63814ea00581.png)

1. In first row I added two charts one is doughnut chart and other is pie chart which givers the info about how much money is spent how much percent is spent and category wise spending
2. if there are more than five categories table will be shown instead as shown in below screenshot

![Image For home 2](https://user-images.githubusercontent.com/61429014/80965841-e7fe5280-8e30-11ea-95da-01cf6d1a6bd8.png)

3. Add expenses button is provided in second row a modal with form will be shown
4. expense has four fields category dropdow, Item name, Amount, Data
5. after creating the expense it will be updated in the expense table below the button
6. In exoense table Edit option is provided for every entry when edit button is pressed update expense form on modal will be shown with prepulated values this form is the same as add expense from both forms are shown below

#### Add Expence Modal

![Add  expenses](https://user-images.githubusercontent.com/61429014/80966408-1892bc00-8e32-11ea-80e7-a9e8d867d7ee.png)

#### Update Expense Modal

![Update Expense](https://user-images.githubusercontent.com/61429014/80966508-45df6a00-8e32-11ea-870f-b67ba5d1daca.png)

7. Delete option is provided in action column for every entry if delete is pressed a action confimation modal like below will popup for confimation this will happen  for restore to this is same functionality like delete and restore category

#### Confirmation Modal

![Confirmation modal](https://user-images.githubusercontent.com/61429014/80966605-6e676400-8e32-11ea-85e4-cfb7b31d29ad.png)

8. After deleting expense that row will become rey and status will become inactive to show user that this entry is deleted
user can restore the entry using restore button

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
