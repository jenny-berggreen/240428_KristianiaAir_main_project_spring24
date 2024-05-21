import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const saveTicketToFirestore = async (ticketData) => {
    try {
        const docRef = await addDoc(collection(db, 'tickets'), ticketData);
        console.log('Ticket stored with ID: ' + docRef.id);
    } catch (e) {
        console.error('Error: ' + e);
    }
};

export { saveTicketToFirestore };