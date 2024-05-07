import firebaseConfig from "./firebaseConfig";
import {initializeApp} from 'firebase/app';
import {
	getAuth, 
	createUserWithEmailAndPassword, 
	signOut, 
	signInWithEmailAndPassword, 
	onAuthStateChanged
} from 'firebase/auth';

import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore';

// GET ELEMENTS FROM THE DOM
const openSignupButton = document.querySelector('.open-signup-button');
const openLoginButton = document.querySelector('.open-login-button');
const loginForm = document.querySelector('.form-container--login');
const signupForm = document.querySelector('.form-container--signup');

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
