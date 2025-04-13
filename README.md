
# Book Review Application (Node.js & Express.js)

## Overview
This project is a back-end RESTful web service for an online book review application, built using Node.js and Express.js.

It allows users to:
- View a list of available books.
- Search books by ISBN, author, or title.
- Register as a new user.
- Login securely using JWT-based authentication.
- Add, modify, or delete their own book reviews.

This application is part of the Coursera course:  
*Developing Back-End Apps with Node.js and Express.*

## Features
### Public Routes (No Login Required)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Get all books |
| `/isbn/:isbn` | GET | Get book details by ISBN |
| `/author/:author` | GET | Get books by author |
| `/title/:title` | GET | Get books by title |
| `/review/:isbn` | GET | Get reviews for a book |

### User Routes (Requires Login)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register` | POST | Register a new user |
| `/customer/login` | POST | Login with username & password |
| `/customer/auth/review/:isbn` | PUT | Add or modify review |
| `/customer/auth/review/:isbn` | DELETE | Delete own review |

## Technologies Used
- Node.js  
- Express.js  
- JWT (JSON Web Tokens) for Authentication  
- Promises and Async/Await for Asynchronous Operations  
- Postman / curl for API Testing  

## Setup Instructions

### 1. Clone Repository
```
git clone https://github.com/Louie-AL/expressBookReviews.git
cd expressBookReviews/final_project
```

### 2. Install Dependencies
```
npm install
```

### 3. Run the Server
```
node index.js
```

Server will run at:  
```
http://localhost:5000/
```

## Project Structure
```
/final_project/
├── index.js               # Main entry point
├── booksdb.js             # Book database
├── router/
│   ├── general.js         # Public routes
│   ├── auth_users.js      # Authenticated user routes
└── package.json           # Dependencies
```

## Notes
- Authentication is handled using JWT with session storage.
- Promises and Async/Await are used for Tasks 10-13 (getting books data).
- Tested locally using curl and Postman.

## Author
Luis Alonso  
Cornell University — Spring 2025  
For the IBM / Coursera Course: *Developing Back-End Apps with Node.js and Express*
