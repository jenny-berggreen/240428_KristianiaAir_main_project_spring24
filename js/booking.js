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

// DISPLAY DETAILS IN SUMMARY
dropdown.addEventListener('click', function(event) {
    if (event.target.classList.contains('dropdown-item')) {
        const clickedCountry = event.target.textContent;
        countryDetails.textContent = clickedCountry;
    }
});

cityInput.addEventListener('blur', function() {
	cityDetails.textContent = this.value;
})

departureInput.addEventListener('change', function() {
	departureDetails.textContent = this.value;
})

returnInput.addEventListener('change', function() {
	returnDetails.textContent = this.value;
})

travelersDetails.textContent = travelersInput.value;
travelersInput.addEventListener('change', function() {
	travelersDetails.textContent = this.value;
})
