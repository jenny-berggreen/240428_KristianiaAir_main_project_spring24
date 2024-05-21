import { getTicketsFromFirestore } from "./tickets";

// GET ELEMENTS FROM THE DOM
const ticketsGrid = document.querySelector('.tickets-grid');

// FUNCTION TO CREATE TICKET CARD
const createTicketCard = (ticket) => {
	const card = document.createElement('div');
    card.classList.add('ticket-card');

	const cardDetailsContainer = document.createElement('div');
    cardDetailsContainer.classList.add('card-details-container');

	const cardTitle = document.createElement('span');
	cardTitle.classList.add('card-title m');
	cardTitle.textContent = `${ticket.city}, ${ticket.country}`;

	const cardDetails = document.createElement('div');
	cardDetails.classList.add('card-details flex flex-column');

	const departureDate = document.createElement('span');
	departureDate.classList.add('card-departure');
	departureDate.textContent = `Departure: ${ticket.departure}`;

	const returnDate = document.createElement('span');
	returnDate.classList.add('card-return');
	returnDate.textContent = `Return: ${ticket.return}`;

	const travelers = document.createElement('span');
	travelers.classList.add('card-travelers');
	travelers.textContent = `Travelers: ${ticket.travelers}`;

	const priceTotal = document.createElement('span');
	priceTotal.classList.add('card-price text--semibold');
	priceTotal.textContent = `Total: ${ticket.total}`;

	card.appendChild(cardDetailsContainer);
	cardDetailsContainer.appendChild(cardTitle, cardDetails);
	cardDetails.appendChild(departureDate, returnDate, travelers, priceTotal);

	return card;
}

const displayTickets = (tickets) => {
	tickets.forEach(ticket => {
		console.log(ticket);
	});
	
}

const loadTickets = async () => {
    const tickets = await getTicketsFromFirestore();
    displayTickets(tickets);
};

loadTickets();



