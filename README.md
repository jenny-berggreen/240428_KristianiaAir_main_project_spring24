# KristianiaAir - Main assignment

This project is a website for a fictive airline where the user can make an account, view some destinations, book a trip, and view their booked trips. The functionality is divided into smaller modules, the script files are bundled with Webpack, and forms are validated. The site adapts to different screen sizes.

## Firebase
* Users have to sign up for an account which stores their user email and password in firebase. This information is checked and verified the next time the user tries to log in. It is the auth.js file that handles the sign up, log in and log out logic.
* The tickets.js file contains functions for saving/storing booking tickets to firestore and retrieving them. A call to the saving function happens after successfully booking a trip in booking.js. When going to 'My page', a call to the retrieving function happens, which gets the stored tickets from firestore and displays them on the page. 
* !Important! Be patient when waiting for the tickets to appear on 'My page', it might take some time.

## API
* The project uses the REST Countries API to display a dropdown menu of countries when typing in the countries input field on the booking page. 
* The fetch-countries.js file contains functions for fetching data from the API, displaying it in the dropdown, and checking if the input value is a valid country name. 

## Sorting and filtering
* Users can sort the destinations alphabetically (A-Z or Z-A) or by price (lowest-highest or highest-lowest).
* Users can filter the destinations by popular, beach or city destinations.

## Environment variables
* Sensitive information, such as the Firebase API key, is obfuscated in the source code to hide it from public eyes.

## Other
* You might get directed to a "Dangerous website" page when opening the netlify link. In Chrome, click on "details", and "Go to this unsecured website". I suspect that it has to do with the site asking for email and password at log in. 

https://kristianiaair-main-project-spring24.netlify.app 




