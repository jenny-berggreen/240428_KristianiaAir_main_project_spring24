import { removeErrorMessage, updateTotal } from "./booking";

// GET ELEMENTS FROM THE DOM
const searchInput = document.querySelector('.search-input');
const dropdown = document.querySelector('.dropdown-list');
const countryDetails = document.querySelector('.details-value--country');
const countryLabel = document.querySelector('label[for="country"]');

// FUNCTION TO FETCH COUNTRIES AND CALL DISPLAY FUNCTION
const fetchAndDisplayCountries = async (value) => {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		const countries = await response.json();
		displayFilteredCountries(countries, value);
		
	} catch (error) {
		console.log(error);
	};
};

// FUNCTION TO FETCH COUNTRIES AND CALL CHECK FUNCTION
const fetchAndCheckCountries = async (value) => {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		const countries = await response.json();
		checkValue(value, countries);
		
	} catch (error) {
		console.log(error);
	};
};

// FUNCTION TO DISPLAY COUNTRIES BASED ON SEARCH TERM IN INPUT
const displayFilteredCountries = (countries, value) => {
	const searchTerm = value.trim().toLowerCase();
	
	// filter countries based on the search term
	const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
	
	// sort filtered countries alphabetically
	filteredCountries.sort((a, b) => {
		const nameA = a.name.common.toLowerCase();
		const nameB = b.name.common.toLowerCase();
		return nameA.localeCompare(nameB);
	});
	
	// clear previous results
	dropdown.innerHTML = '';

	// create dropdown items for each filtered country
	filteredCountries.forEach(country => {
		const dropdownItem = document.createElement('div');
		dropdownItem.classList.add('dropdown-item');
		dropdownItem.textContent = country.name.common;
		
		// select country
		dropdownItem.addEventListener('click', function() {
			searchInput.value = country.name.common;
			dropdown.innerHTML = '';
		});

		// append dropdown item to the dropdown list
		dropdown.appendChild(dropdownItem);
	});

	// display dropdown
	dropdown.style.display = filteredCountries.length > 0 ? 'block' : 'none';
};

// FUNCTION TO CHECK IF INPUT VALUE IS A VALID COUNTRY
const checkValue = (value, countries) => {
	removeErrorMessage(searchInput);

	let match = false;

	if(value) {
		countries.forEach(country => {
			if (value.toLowerCase() === country.name.common.toLowerCase()) {
				match = true;
				countryDetails.textContent = country.name.common;
				updateTotal();
				return;
			};
		});

		if(!match) {
			countryDetails.textContent = '';
			updateTotal();

			const requiredSpan = document.createElement('span');
			requiredSpan.classList.add('required-span'); // add a class to identify required span
			requiredSpan.textContent = ' Unvalid country name!';
			requiredSpan.style.color = 'red';
			countryLabel.append(requiredSpan); // append the span next to the label
		}
	};
};

export { fetchAndDisplayCountries, fetchAndCheckCountries };