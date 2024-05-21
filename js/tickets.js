import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// ACCESS THE TICKETS COLLECTION IN FIRESTORE
const ticketsCollection = collection(db, 'tickets');

const saveTicketToFirestore = async (ticketData) => {
    try {
        const docRef = await addDoc(collection(db, 'tickets'), ticketData);
        console.log('Ticket stored with ID: ' + docRef.id);
    } catch (e) {
        console.error('Error: ' + e);
    }
};

const getTicketsFromFirestore = async () => {
    try {
        const snapshot = await getDocs(ticketsCollection);
        const tickets = [];
        snapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() });
        });
        return tickets;
    } catch (e) {
        console.error('Error retrieving tickets: ', e);
    }
};

export { saveTicketToFirestore, getTicketsFromFirestore };