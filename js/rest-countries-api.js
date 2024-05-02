
const fetchCountries = async () => {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		const countries = await response.json();
		displayCountries(countries);
		
	} catch (error) {
		console.log(error);
	}
};

fetchCountries();

const displayCountries = (countries) => {
	const countriesArray = [];

	countries.forEach(country => {
		let name = country.name.common;
		countriesArray.push(name);
	});

	const sortedArray = countriesArray.sort();
	console.log(sortedArray);
}
