[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/qBr6G7dS)

# Web Programming course 2023 - Final Project - Marketplace

## Link to deployed render page https://marketplace-2azd.onrender.com/

# PROJECT SUMMARY
The final project of the web programming course involved building an online marketplace where users could post items for sale. The project required building both the front-end and back-end of the application using React, Node, and a SQL database, and deploying it.

The result is a functional marketplace app with a React front-end, Node.js back-end, and MySQL database. Users, whether logged in or not, can view and search for articles by keywords. Logged-in users are able to post articles for sale, delete their articles, and contact other users about their articles. They can also retrieve forgotten passwords and delete their accounts from the database. The app is deployed using Render, making it accessible to users. Overall, the project provides valuable experience in developing a full-stack application and deploying it to a cloud service.


# Installation instructions

Clone the repo or download .zip.


Before running the commands you must create .env file for the backend and frontend. Inside the backend .env file you will need:


```MYSQL_HOST='localhost'

MYSQL_USERNAME='root'

MYSQL_PASSWORD='example'

MYSQL_DATABASE='example_database'

JWT_KEY='my-key'

JWT_SECRET ='my-secret'

NEWPASSWORD_URL='http://127.0.0.1:5173/#/newpassword'
```
Frontend .env file

```
VITE_API_URL= 'http://localhost:5000'
```


The following is for the OAUTH protocol, without these all email related functions will cause error.
Here is great tutorial for this https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9

```
EMAIL_USERNAME='Here you should put an gmail address '
CLIENT_ID = 'your unique client id'
CLIENT_SECRET = 'your unique client secret'
REFRESH_TOKEN = 'your unique client refresh_token'
```



### docker commands:

 Note that you must have docker running first
 
 ```
docker compose up -d
 ```
 
 ### start the backend:
 
 ```
cd backend
 ```
 
 ```
npm install
 ```
 
 ```
npm run dev
 ```

### start the frontend

 ```
cd frontend
 ```
 
 ```
npm install
 ```
 
 ```
npm run dev
 ```

 
