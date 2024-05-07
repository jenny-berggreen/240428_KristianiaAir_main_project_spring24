// import firebaseConfig from "./firebaseConfig";
// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// import {validateSignUpForm} from './signup-validation';
// import {validateLoginForm} from './login-validation';

// // INITIALIZE FIREBASE
// initializeApp(firebaseConfig);

// // INITIALIZE AUTH SERVICE
// const authService = getAuth();

// GET ELEMENTS FROM THE DOM
// login form
const loginForm = document.querySelector('.form-container--login');
const emailLabelLogin = document.querySelector('label[for="email"]');
const emailInputLogin = document.querySelector('.email-input--login');
const passwordInputLogin = document.querySelector('.password-input--login');
const passwordLabelLogin = document.querySelector('label[for="password"]');
const openSignupButton = document.querySelector('.open-signup-button');
const loginButton = document.querySelector('.login-button');

// signup form
const signupForm = document.querySelector('.form-container--signup');
const emailLabelSignup = document.querySelector('label[for="email-signup"]');
const emailInputSignup = document.querySelector('.email-input--signup');
const passwordLabelSignup = document.querySelector('label[for="password-signup"]');
const passwordInputSignup = document.querySelector('.password-input--signup');
const openLoginButton = document.querySelector('.open-login-button');
const signupButton = document.querySelector('.signup-button');

// open / close forms
openSignupButton.addEventListener('click', (e) => {
	e.preventDefault();

	loginForm.style.display = 'none';
	signupForm.style.display = 'flex';
});

openLoginButton.addEventListener('click', (e) => {
	e.preventDefault();

	loginForm.style.display = 'flex';
	signupForm.style.display = 'none';
});

// HANDLE SIGN UP ACTION
const signUpUser= () => {
	const {signUpValidStatus} = validateSignUpForm(
		emailInputSignup,
		passwordInputSignup
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
		})
		.then((err) => console.log(err.message));
	};
};

signupButton.addEventListener('click', (e) => {
	e.preventDefault();

	signUpUser();
});
