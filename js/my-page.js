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
	cardTitle.classList.add('card-title', 'm');
	cardTitle.textContent = `${ticket.city}, ${ticket.country}`;

	const cardDetails = document.createElement('div');
	cardDetails.classList.add('card-details', 'flex', 'flex-column');

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
	priceTotal.classList.add('card-price', 'text--semibold');
	priceTotal.textContent = `Total: ${ticket.total}`;

	card.appendChild(cardDetailsContainer);
	cardDetailsContainer.appendChild(cardTitle);
	cardDetailsContainer.appendChild(cardDetails);
	cardDetails.appendChild(departureDate);
	cardDetails.appendChild(returnDate);
	cardDetails.appendChild(travelers);
	cardDetails.appendChild(priceTotal);

	return card;
};

// FUNCTION TO RENDER TICKETS
const renderTickets = (tickets) => {
	tickets.forEach(ticket => {
		const card = createTicketCard(ticket);
		ticketsGrid.appendChild(card);
	});
	
};

// FUNCTION TO LOAD TICKETS FROM FIRESTORE
const loadTickets = async () => {
    const tickets = await getTicketsFromFirestore();
    renderTickets(tickets);
};

document.addEventListener('DOMContentLoaded', loadTickets);



