// GET ELEMENTS FROM THE DOM
const countryInput = document.querySelector('.country-input');
const cityInput = document.querySelector('.city-input');
const departureInput = document.querySelector('.departure-input');
const returnInput = document.querySelector('.return-input');
const travelersInput = document.querySelector('.travelers-input');

// INSERT INTO SELECT
for(let i = 0; i <= 15; i++) {
	let option = document.createElement('option');
	option.textContent = i;
	travelersInput.append(option);
}