import { getDocs, collection } from "firebase/firestore";
import { db } from "../db";

const rootCollection = 'inquiries';

export type Inquiry = {
    id: string;
    customerName: string;
    customerEmail: string;
    customerTel: string;
    title: string;
    content: string;
    productTypeId: string;
    statusTypeId: string;
    staffId: string;
    createdAt: number;
}

export type Inquiries = Record<Inquiry['id'], Inquiry>;

const fetchAllInquiries = async (): Promise<Inquiries> => {
    const inquiries: Inquiries = {};
    try {
        const colRef = createCollectionRef();
        (await getDocs(colRef)).docs.forEach(doc => {
            const inquiry = doc.data() as Inquiry;
            inquiries[inquiry.id] = inquiry;
        });
        console.log('Fetching all inquiries from firestore.');
    } catch (e) {
        throw (`Fail fetching all inquiries form firestore because: ${e}`);
    } finally {
        return inquiries;
    }
}

const createCollectionRef = () => {
    return collection(db, rootCollection);
}

export const inquiriesApi = { fetchAllInquiries };
