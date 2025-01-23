> **Register an account.**
> Login with their credentials.
> Forgot Password functionality (sends a reset password link to the email).
> Reset Password functionality (allows changing the old password to a new one).
> Use JWT (JSON Web Tokens) for session management and cookie-based authentication.
> Access the Home component only if logged in (using an Angular Auth Guard).

> Tech Stack
> **Backend**
> Node.js and Express.js for server-side development.
> MongoDB with Mongoose for database management (used for storing user data and roles).
> JWT (JSON Web Token) for authentication.
> bcryptjs for password hashing.
> cookie-parser for parsing cookies.
> nodemailer for sending email (used for password reset functionality).
> dotenv for environment variable management.
> CORS for enabling cross-origin resource sharing.
> Morgan for HTTP request logging.
> Rate Limiter add for prevent Attacks

> _Frontend Setup_

1. Install Dependencies
   Navigate to the frontend directory and install the required dependencies:

npm install 2. Configuration
Ensure you have the Angular environment set up for the application. Update the API URLs in your api.urls.ts file for making HTTP requests.

3. Running the Frontend
   After installing the dependencies, you can run the frontend using the Angular CLI:

ng serve
This will start the Angular development server on http://localhost:4200.

4. Angular Routes
   /login: Login page.
   /register: Registration page.
   /forget-password: Page to request a password reset link.
   /reset/:token: Page to reset the password using the provided token.
   /home: Protected home page (can only be accessed after logging in).

5. Auth Guard
   The Auth Guard is used to protect routes like /home, ensuring that users who are not logged in cannot access it.
   How to Run the Project
   Run the Backend Server: Follow the steps in the Backend Setup section.
   Run the Frontend Application: Follow the steps in the Frontend Setup section.
   Once both servers are running, you can open the frontend application in your browser at http://localhost:4200.

> _Backend Setup_

1. Install Dependencies
   Make sure you have Node.js installed. Then, navigate to the backend directory and install the required dependencies:

npm install 2. Environment Variables
Create a .env file in the root of your backend project and configure the following environment variables:

makefile
MONGODB_URI=mongodb+srv://<your_mongo_connection_string>
JWT_SECRETKEY=your_secret_key_for_jwt
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
LIVE_URL=http://your_application_url (for generating reset password links)

3. Starting the Backend Server
   After installing the dependencies and setting up the environment variables, run the backend server:

npm run dev
This will start the server using nodemon, which will automatically restart when there are code changes.

4. API Endpoints
   POST /register: Registers a new user.
   POST /login: Logs in the user (returns a JWT token and sets it in the cookie).
   POST /send-email: Sends a reset password link to the user's email.
   POST /reset-password: Resets the password using the provided token.
   GET /home: Protected route to access the home page (requires JWT authentication).
