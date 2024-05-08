import firebaseConfig from './firebaseConfig.js'
import {initializeApp} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import {validateSignupForm} from './signup-validation.js';
import {validateLoginForm} from './login-validation.js';

// INITIALIZE FIREBASE
initializeApp(firebaseConfig);

// // INITIALIZE AUTH SERVICE
const authService = getAuth();

// GET ELEMENTS FROM THE DOM
// login form
const loginForm = document.querySelector('.form-container--login');
const emailLabelLogin = document.querySelector('label[for="email"]');
const emailInputLogin = document.querySelector('.email-input--login');
const passwordInputLogin = document.querySelector('.password-input--login');
const passwordLabelLogin = document.querySelector('label[for="password"]');
const openSignupButton = document.querySelector('.open-signup-button');

// signup form
const signupForm = document.querySelector('.form-container--signup');
const emailLabelSignup = document.querySelector('label[for="email-signup"]');
const emailInputSignup = document.querySelector('.email-input--signup');
const passwordLabelSignup = document.querySelector('label[for="password-signup"]');
const passwordInputSignup = document.querySelector('.password-input--signup');
const openLoginButton = document.querySelector('.open-login-button');

// buttons
const loginButton = document.querySelector('.login-button');
const signupButton = document.querySelector('.signup-button');
const signoutButton = document.querySelector('.signout-button');

// EVENT LISTENERS
if(openSignupButton) {
	openSignupButton.addEventListener('click', (e) => {
		e.preventDefault();
	
		loginForm.style.display = 'none';
		signupForm.style.display = 'flex';
	});
}

if(openLoginButton) {
	openLoginButton.addEventListener('click', (e) => {
		e.preventDefault();
	
		loginForm.style.display = 'flex';
		signupForm.style.display = 'none';
	});
}

if(signupButton) {
	signupButton.addEventListener('click', (e) => {
		e.preventDefault();
	
		signUpUser();
	});
}

if(loginButton) {
	loginButton.addEventListener('click', (e) => {
		e.preventDefault();
	
		logInUser();
	});
}

if(signoutButton) {
	signoutButton.addEventListener('click', () => {
		signOutUser();
	});
}

// HANDLE SIGN UP ACTION
const signUpUser= () => {
	const {signUpValidStatus} = validateSignupForm(
		emailInputSignup,
		passwordInputSignup,
		emailLabelSignup,
		passwordLabelSignup
	);

	if (!signUpValidStatus()) {
		return;
	} else {
		const newUser = {
			signUpEmail: emailInputSignup.value.trim(),
			signUpPassword: passwordInputSignup.value.trim()
		}

		createUserWithEmailAndPassword(authService, newUser.signUpEmail, newUser.signUpPassword)
		.then(() => {
			signupForm.reset();
			checkAuthStateAndRender();
			console.log('User signed up');
		})
		.catch((err) => console.log(err.message));
	};
};

// HANDLE LOG IN ACTION
const logInUser = () => {
	const {signUpValidStatus} = validateSignupForm(
		emailInputLogin,
		passwordInputLogin,
		emailLabelLogin,
		passwordLabelLogin
	);

	if (!signUpValidStatus()) {
		return;
	} else {
		const email = emailInputLogin.value.trim();
		const password = passwordInputLogin.value.trim();

		signInWithEmailAndPassword(authService, email, password)
		.then(() => {
			loginForm.reset();
			checkAuthStateAndRender();
			console.log('User logged in');
		})
		.catch((err) => console.log(err.message));
	};
};

// HANDLE SIGN OUT ACTION
const signOutUser = () => {
	signOut(authService)
	.then(() => {
		checkAuthStateAndRender();
		console.log('signed out');
	})
	.catch((error) => {
		console.log(error.message);
	})
};

// CHECK AUTH STATE AND RENDER

function checkAuthStateAndRender() {
	onAuthStateChanged(authService, (user) => {
		if(user) {
			console.log('logged in');
			window.location.href = '/pages/home.html';
		} else {
			console.log('logged out');
			window.location.href = '/dist/index.html';
		}
	})
};

//checkAuthStateAndRender();