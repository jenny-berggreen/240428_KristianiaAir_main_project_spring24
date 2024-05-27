const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        app: './js/app.js',
        auth: './js/auth.js',
        booking: './js/booking.js',
        buttonRedirects: './js/button-redirects.js',
        destinations: './js/destinations.js',
        fetchCountries: './js/fetch-countries.js',
        firebase: './js/firebase.js',
        loginValidation: './js/login-validation.js',
        myPage: './js/my-page.js',
        signupValidation: './js/signup-validation.js',
        tickets: './js/tickets.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    watch: process.env.NODE_ENV !== 'production',
    plugins: [
        new Dotenv({
            path: './.env',
            systemvars: true,
        })
    ]
};



