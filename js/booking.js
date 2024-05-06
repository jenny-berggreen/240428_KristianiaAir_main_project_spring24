// GET ELEMENTS FROM THE DOM
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

// FUNCTION TO UPDATE AND DISPLAY TOTAL VALUE
const updateTotal = () => {
    total = 0;

	// country
    if (countryDetails.textContent !== '') {
        total += 500;
    }

	// city
    if (cityDetails.textContent !== '') {
        total += 100;
    }

	// departure / return
    if (departureDetails.textContent !== '' && returnDetails.textContent !== '') {
        const departureDate = new Date(departureInput.value);
        const returnDate = new Date(returnInput.value);
        const travelTime = Math.ceil((returnDate - departureDate) / (1000 * 3600 * 24)); // Calculate travel time in days and round it up
        total += travelTime * 100;
    }

	// travelers  
	const numTravelers = parseInt(travelersInput.value);
	total *= numTravelers;

    // Update total details
	totalDetails.textContent = `kr ${total}`;
};


// DISPLAY DETAILS IN SUMMARY
// country
dropdown.addEventListener('click', function(e) {
    if (e.target.classList.contains('dropdown-item')) {
        const clickedCountry = e.target.textContent;
        countryDetails.textContent = clickedCountry;
		updateTotal();
		
		removeErrorMessage(searchInput);
    }
});

searchInput.addEventListener('change', function() {
	if(!searchInput.value) {
		countryDetails.textContent = '';
		updateTotal();
	}
})

// city
cityInput.addEventListener('blur', function() {
	cityDetails.textContent = this.value;
	updateTotal();
	removeErrorMessage(cityInput);
})

// departure
departureInput.addEventListener('input', function() {
	departureDetails.textContent = this.value;
	updateTotal();
	removeErrorMessage(departureInput);
})

// return
returnInput.addEventListener('input', function() {
	returnDetails.textContent = this.value;
	updateTotal();
	removeErrorMessage(returnInput);
})

// travelers
travelersDetails.textContent = travelersInput.value; // display summary value as 1
travelersInput.addEventListener('input', function() {
	travelersDetails.textContent = this.value;
	updateTotal();
})

// FUNCTION TO REMOVE ERROR MESSAGE FOR A SPECIFIC INPUT FIELD
function removeErrorMessage(input) {
    const inputName = input.name;
    const label = document.querySelector(`label[for="${inputName}"]`);
    const existingRequiredSpan = label.querySelector('.required-span');
    if (existingRequiredSpan) {
        existingRequiredSpan.remove();
    }
}

bookButton.addEventListener('click', (e) => {
	e.preventDefault();

	// ---------------------- FORM VALIDATION ----------------------

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
						requiredSpan.classList.add('required-span'); // add a class to identify required spans
						requiredSpan.textContent = ' Required!';
						requiredSpan.style.color = 'red';
						label.append(requiredSpan); // append the span next to the label

					}
				})
			}

		});

		return;
	}
	
	// ---------------------- END OF FORM VALIDATION ----------------------
})