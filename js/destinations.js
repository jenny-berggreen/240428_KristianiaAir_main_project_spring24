// GET ELEMENTS FROM THE DOM
const sort = document.querySelector('.sort-select');
const filter = document.querySelector('.filter-select');
const destinationsGrid = document.querySelector('.destinations-section .grid');

// DESTINATIONS ARRAY
const destinations = [
	{
		name: 'Alicante, Spain',
		price: 'kr 699',
		image: '/assets/images/alicante.jpeg', // https://www.apollo.no/spania/alicante
		filter: 'beach',
		popular: true
	},
	{
		name: 'Amsterdam, Nederland',
		price: 'kr 599',
		image: '/assets/images/amsterdam.jpg', // https://storbyferie.com/amsterdam/
		filter: 'city',
		popular: false
	},
	{
		name: 'Bordeaux, Frankrike',
		price: 'kr 799',
		image: '/assets/images/bordeaux.jpeg', // https://snl.no/Bordeaux
		filter: 'city',
		popular: false
	},
	{
		name: 'Edinburgh, Storbritannia',
		price: 'kr 499',
		image: '/assets/images/edinburgh.webp', // https://www.cntraveller.com/article/travel-guide-edinburgh
		filter: 'city',
		popular: false
	},
	{
		name: 'Gran Canaria, Spania',
		price: 'kr 949',
		image: '/assets/images/gran-canaria.jpeg', // https://www.apollo.no/spania/kanarioyene/gran-canaria
		filter: 'beach',
		popular: true
	},
	{
		name: 'Napoli, Italia',
		price: 'kr 649',
		image: '/assets/images/napoli.jpeg', // https://no.tripadvisor.com/Attractions-g187785-Activities-Naples_Province_of_Naples_Campania.html
		filter: 'beach',
		popular: false
	},
	{
		name: 'Nice, Frankrike',
		price: 'kr 499',
		image: '/assets/images/nice.jpg', // https://storbyferie.com/nice/
		filter: 'beach',
		popular: false
	},
	{
		name: 'Riga, Latvia',
		price: 'kr 349',
		image: '/assets/images/riga.jpeg', // https://storbyferie.com/riga/
		filter: 'city',
		popular: true
	},
	{
		name: 'Santorini, Hellas',
		price: 'kr 1029',
		image: '/assets/images/santorini.webp', // https://no.hotels.com/go/greece/things-to-do-santorini
		filter: 'beach',
		popular: false
	}

]

// FUNCTION TO CREATE DESTINATION CARD
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.classList.add('destination-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    cardImage.style.backgroundImage = `url('${destination.image}')`;

    const cardDetailsContainer = document.createElement('div');
    cardDetailsContainer.classList.add('card-details-container');

    const cardTitle = document.createElement('span');
    cardTitle.classList.add('card-title', 'm');
    cardTitle.textContent = destination.name;

    const cardPrice = document.createElement('span');
    cardPrice.classList.add('card-price', 'text--semibold', 'l');
    cardPrice.textContent = destination.price;

    cardDetailsContainer.appendChild(cardTitle);
    cardDetailsContainer.appendChild(cardPrice);

    card.appendChild(cardImage);
    card.appendChild(cardDetailsContainer);

    return card;
}

// FUNCTION TO RENDER DESTINATIONS
function renderDestinations(destinations) {
    destinations.forEach(destination => {
        const card = createDestinationCard(destination);
        destinationsGrid.appendChild(card);
    });
}

// FUNCTION TO SORT DESTINATIONS
function sortDestinations(destinations, sortValue) {
    if (sortValue === 'A-Z') {
        return destinations.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'Z-A') {
        return destinations.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === 'low-high') {
        return destinations.sort((a, b) => parseFloat(a.price.split(' ')[1]) - parseFloat(b.price.split(' ')[1]));
    } else if (sortValue === 'high-low') {
        return destinations.sort((a, b) => parseFloat(b.price.split(' ')[1]) - parseFloat(a.price.split(' ')[1]));
    }
}

// FUNCTION TO FILTER DESTINATIONS
function filterDestinations(destinations, filterValue) {
    if (filterValue === 'all') {
        return destinations;
    } else if (filterValue === 'popular') {
        return destinations.filter(destination => destination.popular);
    } else if (filterValue === 'beach') {
        return destinations.filter(destination => destination.filter === 'beach');
    } else if (filterValue === 'city') {
        return destinations.filter(destination => destination.filter === 'city');
    } else {
        return destinations; // No filter applied
    }
}

// FUNCTION TO DISPLAY SORTED AND FILTERED DESTINATIONS
function updateDisplayedDestinations() {
    const sortValue = sort.value;
    const filterValue = filter.value;

    let sortedDestinations = sortDestinations(destinations, sortValue);
    let filteredDestinations = filterDestinations(sortedDestinations, filterValue);

    // Clear existing destination cards
    destinationsGrid.innerHTML = '';

    // Render filtered and sorted destinations
    renderDestinations(filteredDestinations);
}

// ADD EVENT LISTENERS
sort.addEventListener('change', updateDisplayedDestinations);
filter.addEventListener('change', updateDisplayedDestinations);

// RENDER DESTINATIONS
renderDestinations(destinations);
