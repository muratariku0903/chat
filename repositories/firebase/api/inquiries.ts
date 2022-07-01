import { getDocs, addDoc, collection, where, query, orderBy, limit } from "firebase/firestore";
import { Inquiry } from "../types/inquiry";
import { QueryClauses } from "../types/clause";
import { db } from "../db";

const rootCollection = 'inquiries';


const fetchInquiries = async (queryClauses: QueryClauses): Promise<Inquiry[]> => {
    const inquiries: Inquiry[] = [];
    try {
        const colRef = createColRef();
        const clauses = createClauses(queryClauses);
        console.log(clauses);
        const q = query(colRef, ...clauses);
        (await getDocs(q)).docs.forEach(doc => {
            const inquiry = doc.data() as Inquiry;
            inquiries.push(inquiry);
        });
        console.log('Fetching inquiries from firestore.');
    } catch (e) {
        throw (`Fail fetching inquiries form firestore because: ${e}`);
    } finally {
        return inquiries;
    }
}

const fetchAllInquiries = async (): Promise<Inquiry[]> => {
    const inquiries: Inquiry[] = [];
    try {
        const colRef = createColRef();
        (await getDocs(colRef)).docs.forEach(doc => {
            const inquiry = doc.data() as Inquiry;
            inquiries.push(inquiry);
        });
        console.log('Fetching all inquiries from firestore.');
    } catch (e) {
        throw (`Fail fetching all inquiries form firestore because: ${e}`);
    } finally {
        return inquiries;
    }
}

const addInquiry = async (inquiry: Inquiry): Promise<void> => {
    try {
        const colRef = createColRef();
        await addDoc(colRef, inquiry);
    } catch (e) {
        throw (`Fail adding inquiry to firestore because: ${e}`);
    }
}

const createClauses = (queryClauses: QueryClauses) => {
    const clauses = [];
    const { whereClauses, orderByClauses, limitClause } = queryClauses;

    if (whereClauses) {
        for (const clause of whereClauses) {
            const { fieldName, operator, fieldValue } = clause;
            clauses.push(where(fieldName, operator, fieldValue));
        }
    }

    if (orderByClauses) {
        for (const clause of orderByClauses) {
            const { fieldName, direValue } = clause;
            clauses.push(orderBy(fieldName, direValue));
        }
    }

    if (limitClause) {
        clauses.push(limit(limitClause.limitCnt));
    }

    return clauses;
}

const createColRef = () => {
    return collection(db, rootCollection);
}

export const inquiriesApi = { fetchInquiries, fetchAllInquiries, addInquiry };
