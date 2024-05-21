import { signUpUser, logInUser, signOutUser } from './auth';

// GET ELEMENTS FROM THE DOM
const loginForm = document.querySelector('.form-container--login');
const emailLabelLogin = document.querySelector('label[for="email"]');
const emailInputLogin = document.querySelector('.email-input--login');
const passwordInputLogin = document.querySelector('.password-input--login');
const passwordLabelLogin = document.querySelector('label[for="password"]');
const openSignupButton = document.querySelector('.open-signup-button');

const signupForm = document.querySelector('.form-container--signup');
const emailLabelSignup = document.querySelector('label[for="email-signup"]');
const emailInputSignup = document.querySelector('.email-input--signup');
const passwordLabelSignup = document.querySelector('label[for="password-signup"]');
const passwordInputSignup = document.querySelector('.password-input--signup');
const openLoginButton = document.querySelector('.open-login-button');

const loginButton = document.querySelector('.login-button');
const signupButton = document.querySelector('.signup-button');
const signoutButton = document.querySelector('.signout-button');

// EVENT LISTENERS
if (openSignupButton) {
    openSignupButton.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
    });
}

if (openLoginButton) {
    openLoginButton.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
    });
}

if (signupButton) {
    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        signUpUser(emailInputSignup, passwordInputSignup, emailLabelSignup, passwordLabelSignup);
    });
}

if (loginButton) {
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        logInUser(emailInputLogin, passwordInputLogin, emailLabelLogin, passwordLabelLogin);
    });
}

if (signoutButton) {
    signoutButton.addEventListener('click', () => {
        signOutUser();
    });
}