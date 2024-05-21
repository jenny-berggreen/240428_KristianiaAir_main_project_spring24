import { getTicketsFromFirestore } from "./tickets";

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



