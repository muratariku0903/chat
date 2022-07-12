import { getDoc, getDocs, setDoc, collection, doc, where, query, orderBy, limit, startAt } from "firebase/firestore";
import { Inquiry } from "../types/inquiry";
import { QueryClauses } from "../types/clause";
import { db } from "../db";

const rootCollection = 'inquiries';


const fetchInquiries = async (queryClauses?: QueryClauses): Promise<Inquiry[]> => {
    const inquiries: Inquiry[] = [];
    try {
        const colRef = createColRef();
        const clauses = queryClauses ? createClauses(queryClauses) : [];
        const q = query(colRef, ...clauses);

        // 最後に取得してきたレコードの時間をstartAtにして仕舞えばいいのでは？
        // 未着手を100として、対応中を２００にする、そして、対応ずみを３００にする
        // 未着手だけがほしい
        // where('statusTypeId', '<=', 100),
        // 未着手と対応中だけがほしい
        // where('statusTypeId', '<=', 200),
        // 未着手と対応中と対応済みだけがほしい
        // where('statusTypeId', '<=', 300),
        // 未着手と対応済みだけがほしい -> statusTypeId が100から300以内で200は除外
        // where('statusTypeId', '>=', 100),
        // where('statusTypeId', '<=', 300),
        // where('statusTypeId', '!=', 200),
        const statusQuery = query(colRef, where('statusTypeId', '<=', 200), orderBy('statusTypeId'));
        const sortQuery = query(colRef, orderBy('createdAt'));

        // const q = query(colRef,
        //     where('statusTypeId', '==', 200),
        //     // orderBy('statusTypeId'),
        //     orderBy('createdAt'),
        //     // where('createdAt', '>', 1),
        //     // limit(5)
        // );

        // await getDocs(q).then(res => {
        //     console.log(res);
        // }).catch(e => {
        //     console.log(e);
        // });

        // console.log(querySnapshot);

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

const addInquiry = async (form: Omit<Inquiry, 'id' | 'statusTypeId' | 'staffId' | 'createdAt'>): Promise<void> => {
    try {
        const colRef = createColRef();
        const docRef = doc(colRef);
        const id = docRef.id;
        const inquiry: Inquiry = {
            id,
            ...form,
            statusTypeId: 100,
            staffId: '',
            createdAt: new Date().getTime(),
        }
        await setDoc(docRef, inquiry);
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
