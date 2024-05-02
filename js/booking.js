// GET ELEMENTS FROM THE DOM
const countryInput = document.querySelector('.search-input');
const cityInput = document.querySelector('.city-input');
const departureInput = document.querySelector('.departure-input');
const returnInput = document.querySelector('.return-input');
const travelersInput = document.querySelector('.travelers-input');
const dropdownItems = document.querySelectorAll('.dropdown-item');

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
for(let i = 0; i <= 15; i++) {
	let option = document.createElement('option');
	option.textContent = i;
	travelersInput.append(option);
}

// FUNCTION TO UPDATE AND DISPLAY TOTAL VALUE
let total = 0;


const updateTotal = () => {
    total = 0;

    if (countryDetails.textContent !== '') {
        total += 500;
    }

    if (cityDetails.textContent !== '') {
        total += 100;
    }

    if (departureDetails.textContent !== '' && returnDetails.textContent !== '') {
        const departureDate = new Date(departureInput.value);
        const returnDate = new Date(returnInput.value);
        const travelTime = Math.ceil((returnDate - departureDate) / (1000 * 3600 * 24)); // Calculate travel time in days and round it up
        total += travelTime * 100;
    }

    if (travelersDetails.textContent !== '') {
        const numTravelers = parseInt(travelersInput.value);
        total *= numTravelers;
    }

    // Update total details
    totalDetails.textContent = `kr ${total}`;
};


// DISPLAY DETAILS IN SUMMARY
// country
dropdown.addEventListener('click', function(event) {
    if (event.target.classList.contains('dropdown-item')) {
        const clickedCountry = event.target.textContent;
        countryDetails.textContent = clickedCountry;
		updateTotal();
		
		removeErrorMessage(countryInput);
    }
});

// city
cityInput.addEventListener('input', function() {
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
travelersDetails.textContent = travelersInput.value;
travelersInput.addEventListener('input', function() {
	travelersDetails.textContent = this.value;
	updateTotal();
	removeErrorMessage(travelersInput);
})

updateTotal();

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
	if(!countryInput.value || !cityInput.value || !departureInput.value || !returnInput.value || parseInt(travelersInput.value) === 0) {
		// display error message for travelers
		if(parseInt(travelersInput.value) === 0) {
			const requiredSpan = document.createElement('span');
			requiredSpan.classList.add('required-span'); // add a class to identify required spans
			requiredSpan.textContent = ' Select amount of travelers!';
			requiredSpan.style.color = 'red';
			travelersLabel.append(requiredSpan); // append the span next to the label
		}
		
		// iterate through the inputs to find the ones that dont satisfy the conditions
		const inputs = [countryInput, cityInput, departureInput, returnInput];
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