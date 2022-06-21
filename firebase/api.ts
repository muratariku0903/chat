import { doc, setDoc, addDoc, collection, getDocs, onSnapshot, query, Unsubscribe, orderBy, getDoc, FieldValue, Timestamp } from "firebase/firestore";
import { Inquiry } from '../pages/contact';
import { db } from "./db";


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

const addMessage = async (inquiryId: string, message: string, senderId: string, createdAt: number): Promise<void> => {
    try {
        const colRef = collection(db, 'messages', inquiryId, 'inquiryMessages');
        await addDoc(colRef, { from: senderId, message, inquiryId, createdAt });
        console.log('add message to firestore.');
    } catch (e) {
        console.error(e);
    }
}

export type Message = {
    inquiryId: string;
    message: string;
    from: string;
    createdAt: number;
}

const fetchMessages = async (inquiryId: string): Promise<Message[]> => {
    const messages: Message[] = [];
    try {
        const colRef = collection(db, 'messages', inquiryId, 'inquiryMessages');
        const sortConf = orderBy('createdAt', 'asc');
        const q = query(colRef, sortConf);
        onSnapshot(q, (qs) => {
            const messages: Message[] = [];
            qs.forEach(doc => {
                messages.push(doc.data() as Message);
                console.log(doc.data());
            });
            console.log(messages);
            return messages;
        });
        // console.log(res);
        // (await getDocs(q)).docs.forEach(doc => {
        //     console.log(doc.data());
        //     messages.push(doc.data() as Message);
        // });
    } catch (e) {
        console.error(e);
    } finally {
        return messages;
    }
}

const watch = async (inquiryId: string): Promise<Unsubscribe> => {
    const colRef = collection(db, 'messages', inquiryId, 'inquiryMessages');
    const q = query(colRef, orderBy('createdAt', 'asc'));
    const res = onSnapshot(q, (qs) => {
        qs.forEach(doc => {
            console.log(doc);
        });
    });

    return res;
}

export const firebaseApi = { addInquiry, fetchInquiries, addMessage, fetchMessages, watch };
