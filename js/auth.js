import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { validateSignupForm } from './signup-validation';
import { validateLoginForm } from './login-validation';

// HANDLE SIGN UP ACTION
const signUpUser = (emailInputSignup, passwordInputSignup, emailLabelSignup, passwordLabelSignup) => {
    const { signUpValidStatus } = validateSignupForm(
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
        };

        createUserWithEmailAndPassword(auth, newUser.signUpEmail, newUser.signUpPassword)
            .then(() => {
                document.querySelector('.form-container--signup').reset();
                checkAuthStateAndRender();
                console.log('User signed up');
            })
            .catch((err) => console.log(err.message));
    }
};

// HANDLE LOG IN ACTION
const logInUser = (emailInputLogin, passwordInputLogin, emailLabelLogin, passwordLabelLogin) => {
    const { loginValidStatus } = validateLoginForm(
        emailInputLogin,
        passwordInputLogin,
        emailLabelLogin,
        passwordLabelLogin
    );

    if (!loginValidStatus()) {
        return;
    } else {
        const email = emailInputLogin.value.trim();
        const password = passwordInputLogin.value.trim();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                document.querySelector('.form-container--login').reset();
                checkAuthStateAndRender();
                console.log('User logged in');
            })
            .catch((err) => console.log(err.message));
    }
};

// HANDLE SIGN OUT ACTION
const signOutUser = () => {
    signOut(auth)
        .then(() => {
            checkAuthStateAndRender();
            console.log('signed out');
        })
        .catch((error) => {
            console.log(error.message);
        });
};

// CHECK AUTH STATE AND RENDER
const checkAuthStateAndRender = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('logged in');
            window.location.href = '/pages/home.html';
        } else {
            console.log('logged out');
            window.location.href = '/index.html';
        }
    });
};

export { signUpUser, logInUser, signOutUser, checkAuthStateAndRender };
