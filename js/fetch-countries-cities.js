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
        
        // Filter countries based on the search term
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
        
		// Sort filtered countries alphabetically
		filteredCountries.sort((a, b) => {
			const nameA = a.name.common.toLowerCase();
			const nameB = b.name.common.toLowerCase();
			return nameA.localeCompare(nameB);
		});
        
        // Clear previous results
        dropdown.innerHTML = '';

        // Create dropdown items for each filtered country
        filteredCountries.forEach(country => {
            const dropdownItem = document.createElement('div');
            dropdownItem.classList.add('dropdown-item');
            dropdownItem.textContent = country.name.common;
            
            // Add click event listener to each dropdown item
            dropdownItem.addEventListener('click', function() {
                // Set the search input value to the selected country
                searchInput.value = country.name.common;
                // Clear the dropdown
                dropdown.innerHTML = '';
            });

            // Append dropdown item to the dropdown list
            dropdown.appendChild(dropdownItem);
        });

        // Display dropdown
        dropdown.style.display = filteredCountries.length > 0 ? 'block' : 'none';
    });
};