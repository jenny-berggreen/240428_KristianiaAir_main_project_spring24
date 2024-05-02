// GET ELEMENTS FROM THE DOM
const countryInput = document.querySelector('.search-input');
const cityInput = document.querySelector('.city-input');
const departureInput = document.querySelector('.departure-input');
const returnInput = document.querySelector('.return-input');
const travelersInput = document.querySelector('.travelers-input');
const dropdownItems = document.querySelectorAll('.dropdown-item');

const countryDetails = document.querySelector('.details-value--country');
const cityDetails = document.querySelector('.details-value--city');
const departureDetails = document.querySelector('.details-value--departure');
const returnDetails = document.querySelector('.details-value--return');
const travelersDetails = document.querySelector('.details-value--travelers');
const totalDetails = document.querySelector('.details-value--total');

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
		console.log(total);
		console.log(countryDetails.textContent);
		totalDetails.textContent = `kr ${total}`;
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
		console.log('updated' + total);
    }
});

// city
cityInput.addEventListener('input', function() {
	cityDetails.textContent = this.value;
	updateTotal();
})

// departure
departureInput.addEventListener('input', function() {
	departureDetails.textContent = this.value;
	updateTotal();
})

// return
returnInput.addEventListener('input', function() {
	returnDetails.textContent = this.value;
	updateTotal();
})

// travelers
travelersDetails.textContent = travelersInput.value;
travelersInput.addEventListener('input', function() {
	travelersDetails.textContent = this.value;
	updateTotal();
})

updateTotal();