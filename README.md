
### Testing Google reCAPTCHA Integration And Google-Oauth2  with Frontend and Backend & Implementing `useForm` Hook

To ensure the effectiveness of Google reCAPTCHA and improve your form handling practices, follow these steps:

#### 1. **Testing Google reCAPTCHA Integration:**

   **Frontend:**
   - Integrate the Google reCAPTCHA widget into your frontend application.
   - Verify that the reCAPTCHA challenge appears correctly on your forms.
   - Ensure that users can complete the reCAPTCHA challenge and that the token is included in form submissions.

   **Backend:**
   - Check that your backend correctly receives the reCAPTCHA token from the frontend.
   - Confirm that the backend makes a request to Google’s reCAPTCHA verification API using the correct secret key and token.
   - Ensure the backend properly handles the verification response and returns appropriate success or error messages based on the result.

#### 2. **Implementing `useForm` Hook for Practice:**

   **Setup:**
   - Create a custom `useForm` hook to manage form state and handle form submissions.
   - Use the hook to simplify form handling by managing input values, validation, and submission logic in a reusable manner.

   **Implementation:**
   - Initialize form state and validation rules within the hook.
   - Provide functions to handle input changes, form submission, and validation.
   - Ensure the hook integrates well with your frontend components and provides a smooth user experience.

   **Testing:**
   - Test the `useForm` hook to ensure it correctly manages form state and handles form submissions.
   - Validate that the hook integrates seamlessly with the reCAPTCHA functionality and other form elements.
#### 3. Google OAuth2 Integration
   - This Node.js application features Google OAuth2 authentication, enabling secure user login via Google accounts. 
   - The integration uses Google's OAuth2.0 credentials to authenticate users. 
   - Upon successful login, an index.html page is generated dynamically, displaying user-specific information retrieved from Google's services. 
   - This implementation ensures a seamless and secure authentication process for users, leveraging Google's robust authentication infrastructure.

By following these steps, you will ensure both a robust Google reCAPTCHA integration, Google-Oauth2 and effective form handling using a custom `useForm` hook. This approach will enhance your form security and user experience while practicing advanced form management techniques.


#### reCAPTCHA 
Client side:

import ReCAPTCHA from 'react-google-recaptcha';

  function onChange(value: any) {
   console.log(value);
  }

  <ReCAPTCHA
    style={{display: 'inline-block'}}
    sitekey={secrete_site_key}
    onChange={onChange}
    ref={recaptchaRef}
  />
Server side:

const { valueReCapcha } = req.body;

const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.BackEndSecret}&response=${valueReCapcha}`);

const data = response.data;

#### Google Oauth2
Cient side:
<a href="auth/google"> login with Login </a>

Server side:
1: auth.js file

2:
import express from 'express';

import 'dotenv/config';

import session from 'express-session';

import passport from 'passport';

import { fileURLToPath } from 'url';

import path from 'path';

import './controllers/auth.js';

const app = express();

const PORT = process.env.PORT || 4001;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


app.use(passport.initialize());
app.use(passport.session());


// Static files
app.use(express.static(path.join(__dirname, './index.html')));


// Authentication check middleware
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}


// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);


app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
  })
);


app.get('/auth/google/failure', (req, res) => {
  res.send('Something went wrong!');
});


app.get('/auth/protected', isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  res.send(`Hello ${name}`);
});


app.use('/auth/logout', (req, res) => {
  req.session.destroy();
  res.send('See you again!');
});


app.use('/auth/google/success', (req, res) => {
  res.send('Login successfully!');
});


