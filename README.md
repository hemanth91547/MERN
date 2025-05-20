# MERN Authentication System

## **Project Description**

This project is a MERN stack application providing a secure user authentication system. Users can register, log in, log out, and manage resources with role-based access control. The backend is built with Node.js and Express.js, while the frontend is developed using React and styled with Bootstrap. Data is securely stored in MongoDB, and passwords are hashed using `bcrypt`. JWT (JSON Web Tokens) is used for authentication and authorization.


## **Setup Instructions**

1. **Clone the Repository**:
   git clone <repository_url>
   cd MERN-auth-system

2. **Install Dependencies:**
  Backend:
     cd server
     npm install
  Frontend:
     cd ../client
     npm install
3.**Configure Environment Variables:**
    Create a .env file in the server/ directory and add the following:
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
   
4.**Run the Application:**
      Backend:
        cd server
        npm start
      Frontend:
        cd ../client
        npm start
5.**Access the App**: Open http://localhost:3000 in your browser.


##**API Endpoints Documentation**
1.**Auth Routes**
    Register a User
          URL: /api/auth/register
          Method: POST
          Payload:
          json
          {
            "username": "exampleuser",
            "email": "example@example.com",
            "password": "password123"
          }
          Response:
          json
          {
            "message": "User registered successfully"
          }
    Login a User

      URL: /api/auth/login
      Method: POST
      Payload:
      json
      {
        "email": "example@example.com",
        "password": "password123"
      }
      Response:
      json
      {
        "token": "jwt_token",
        "user": {
          "username": "exampleuser",
          "email": "example@example.com",
          "role": "user"
        }
      }
      
   Logout a User
      URL: /api/auth/logout
      Method: POST
      Description: Clears the client-side token to log out the user.

      
##**Features**
 1.User Registration: Securely register new users with hashed passwords.
 2.User Login: Authenticate users using email and password, and provide JWT tokens.
 3.User Logout: Invalidate the session by removing the token.
 4.Resource Management: Role-based access control to manage user resources.
 5.Error Handling: Comprehensive error handling for better user experience.
 6.Security: Passwords hashed using bcrypt and data secured with JWT.


