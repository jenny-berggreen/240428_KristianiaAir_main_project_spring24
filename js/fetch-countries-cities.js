// GET ELEMENTS FROM THE DOM
const searchInput = document.querySelector('.search-input');
const dropdown = document.querySelector('.dropdown-list');

// FUNCTION TO FETCH COUNTRY NAMES
const fetchCountries = async () => {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		const countries = await response.json();
		displayFilteredCountries(countries);
		
	} catch (error) {
		console.log(error);
	}
};

fetchCountries();

// FUNCTION TO DISPLAY COUNTRIES BASED ON SEARCH TERM IN INPUT
const displayFilteredCountries = (countries) => {

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
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
    });
};

// hide dropdown at click outside of input
document.addEventListener('click', function() {
	dropdown.style.display = 'none';
});