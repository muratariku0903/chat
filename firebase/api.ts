import { signInAnonymously, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, addDoc, collection, query, getDocs } from "firebase/firestore";
import { Inquiry } from '../pages/contact';
import { db } from "./db";

// Add a new document in collection "cities"
const addInquiry = async (id: string, input: Inquiry): Promise<void> => {
    try {
        const docRef = doc(db, 'inquiries', id);
        await setDoc(docRef, input);
        console.log('add inquiry to firestore');
    } catch (e) {
        console.error(e);
    }
}

const fetchInquiries = async (): Promise<Inquiry[]> => {
    const inquiries: Inquiry[] = [];
    try {
        const col = collection(db, 'inquiries');
        (await getDocs(col)).docs.forEach(doc => {
            inquiries.push(doc.data() as Inquiry);
        })
    } catch (e) {
        console.error(e);
    }
    return inquiries;
}

const addMessage = async (inquiryId: string, message: string, senderId: string): Promise<void> => {
    try {
        const colRef = collection(db, 'messages', inquiryId, 'inquiryMessages');
        await addDoc(colRef, { from: senderId, message, inquiryId });
        console.log('add message to firestore.');
    } catch (e) {
        console.error(e);
    }
}

export type Message = {
    inquiryId: string;
    message: string;
    from: string;
}

const fetchMessages = async (inquiryId: string): Promise<Message[]> => {
    const messages: Message[] = [];
    try {
        const col = collection(db, 'messages', inquiryId, 'inquiryMessages');
        (await getDocs(col)).docs.forEach(doc => {
            messages.push(doc.data() as Message);
        })
    } catch (e) {
        console.error(e);
    }
    return messages;
}

export const firebaseApi = { addInquiry, fetchInquiries, addMessage, fetchMessages };
