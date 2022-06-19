import { signInAnonymously, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { Inquiry } from '../pages/contact';
import { db } from "./db";

// Add a new document in collection "cities"
const addInquiry = async (id: string, input: Inquiry): Promise<void> => {
    try {
        const docRef = doc(db, 'inquiries', id);
        await setDoc(docRef, input);
    } catch (e) {
        console.error(e);
    }
}

const fetchInquiries = async (): Promise<Inquiry[]> => {
    console.log(getAuth().currentUser);
    const inquiries: Inquiry[] = [];
    try {
        const col = collection(db, 'inquiries');
        (await getDocs(col)).docs.forEach(doc => {
            inquiries.push(doc.data() as Inquiry);
        })
        // return inquiries;
    } catch (e) {
        console.error(e);
    }
    return inquiries;
}



export const firebaseApi = { addInquiry, fetchInquiries };
