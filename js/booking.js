console.log('Booking script loaded:', new Date());

import { saveTicketToFirestore } from './tickets';
import { fetchAndDisplayCountries, fetchAndCheckCountries } from './fetch-countries';
import { removeErrorMessage, updateTotal } from './shared';

// GET ELEMENTS FROM THE DOM
const searchInput = document.querySelector('.search-input');
const dropdown = document.querySelector('.dropdown-list');
const cityInput = document.querySelector('.city-input');
const departureInput = document.querySelector('.departure-input');
const returnInput = document.querySelector('.return-input');
const travelersInput = document.querySelector('.travelers-input');

const countryLabel = document.querySelector('label[for="country"]');
const cityLabel = document.querySelector('label[for="city"]');
const departureLabel = document.querySelector('label[for="departure"]');
const returnLabel = document.querySelector('label[for="return"]');
const travelersLabel = document.querySelector('label[for="travelers"]');

const countryDetails = document.querySelector('.details-value--country');
const cityDetails = document.querySelector('.details-value--city');
const departureDetails = document.querySelector('.details-value--departure');
const returnDetails = document.querySelector('.details-value--return');
const travelersDetails = document.querySelector('.details-value--travelers');
const totalDetails = document.querySelector('.details-value--total');

const bookingForm = document.querySelector('.booking-form-container');
const bookButton = document.querySelector('.book-button');

// INSERT INTO SELECT
for(let i = 1; i <= 15; i++) {
    let option = document.createElement('option');
    option.textContent = i;
    travelersInput.append(option);
}

// SET AND DISPLAY TOTAL INITIAL VALUE
let total = 0;
totalDetails.textContent = `kr ${total}`;

// EVENT LISTENERS
// country
searchInput.addEventListener('input', async () => {
    removeErrorMessage(searchInput);

    if(!searchInput.value) {
        countryDetails.textContent = '';
        updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
    } else {
        await fetchAndCheckCountries(searchInput.value, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
        await fetchAndDisplayCountries(searchInput.value);
    }
});

dropdown.addEventListener('click', function(e) {
    if (e.target.classList.contains('dropdown-item')) {
        const clickedCountry = e.target.textContent;
        countryDetails.textContent = clickedCountry;
        updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
        
        removeErrorMessage(searchInput);
    }
});

// hide dropdown at click outside of input
document.addEventListener('click', function() {
    dropdown.style.display = 'none';
});

// city
cityInput.addEventListener('blur', function() {
    cityDetails.textContent = this.value;
    updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
    removeErrorMessage(cityInput);
});

// departure
departureInput.addEventListener('input', function() {
    departureDetails.textContent = this.value;
    updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
    removeErrorMessage(departureInput);
});

// return
returnInput.addEventListener('input', function() {
    returnDetails.textContent = this.value;
    updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
    removeErrorMessage(returnInput);
});

// travelers
travelersDetails.textContent = travelersInput.value; // display summary value as 1
travelersInput.addEventListener('input', function() {
    travelersDetails.textContent = this.value;
    updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
});

// book button
bookButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // ---------------------- FORM VALIDATION ----------------------
    let valid = false;

    // remove existing required spans
    const existingRequiredSpans = document.querySelectorAll('.required-span');
    existingRequiredSpans.forEach(span => {
        span.remove();
    });

    // check if input fields are empty
    if(!searchInput.value || !cityInput.value || !departureInput.value || !returnInput.value) {
        
        // iterate through the inputs to find the ones that dont satisfy the conditions
        const inputs = [searchInput, cityInput, departureInput, returnInput];
        const labels = [countryLabel, cityLabel, departureLabel, returnLabel];

        inputs.forEach(input => {
            if(!input.value) {
                let inputName = input.name;
                labels.forEach(label => {
                    const labelFor = label.getAttribute('for');
                    if(inputName === labelFor) {
                        const requiredSpan = document.createElement('span');
                        requiredSpan.classList.add('required-span');
                        requiredSpan.textContent = ' Required!';
                        requiredSpan.style.color = 'red';
                        label.append(requiredSpan);
                    }
                });
            }
        });

        // check if input value is valid country name
        if(searchInput.value) {
            await fetchAndCheckCountries(searchInput.value, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
        }
    } else {
        // check if input value is valid country name
        await fetchAndCheckCountries(searchInput.value, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);

        // check if there are no error messages
        const errorMessageSpans = document.querySelectorAll('.required-span');
        if (errorMessageSpans.length === 0) {
            valid = true;
        }
    }
    
    // ---------------------- END OF FORM VALIDATION ----------------------

    // ticket object
    const ticket = {};

    if(valid) {
        ticket.country = countryDetails.textContent;
        ticket.city = cityDetails.textContent;
        ticket.departure = departureDetails.textContent;
        ticket.return = returnDetails.textContent;
        ticket.travelers = travelersDetails.textContent;
        ticket.total = totalDetails.textContent;
        console.log(ticket);

        // save ticket to Firestore
        await saveTicketToFirestore(ticket);

        // reset
        bookingForm.reset();

        const details = [countryDetails, cityDetails, departureDetails, returnDetails, travelersDetails];
        details.forEach(detail => {
            detail.textContent = '';
        });
        
        updateTotal(countryDetails, cityDetails, departureDetails, returnDetails, travelersInput, totalDetails);
    }
});
