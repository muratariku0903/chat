import { getDoc, getDocs, setDoc, collection, doc, where, query, orderBy, limit, startAt } from "firebase/firestore";
import { Inquiry } from "../types/inquiry";
import { QueryClauses } from "../types/clause";
import { db } from "../db";

const rootCollection = 'inquiries';


const fetchInquiries = async (queryClauses?: QueryClauses): Promise<Inquiry[]> => {
    const inquiries: Inquiry[] = [];
    try {
        const colRef = createColRef();
        console.log(queryClauses);
        const clauses = queryClauses ? createClauses(queryClauses) : [];
        const q = query(colRef, ...clauses);

        // クエリカーソルどうしましょ？って話
        // ソート条件が変わればリセット
        // 詳細ページから戻ってきた場合とかどうする？またリセットさせて表示するか
        // 前に戻るボタンが押されたらどうする
        // const q = query(colRef,
        //     where('statusTypeId', 'in', [100, 200, 300]),
        //     orderBy('createdAt'),
        //     // limit(5)
        // );

        await getDocs(q).then(res => {
            // console.log(res);
        }).catch(e => {
            console.log(e);
        });

        (await getDocs(q)).docs.forEach(doc => {
            const inquiry = doc.data() as Inquiry;
            inquiries.push(inquiry);
        });
        console.log('Fetching inquiries from firestore.');
    } catch (e) {
        throw (`Fail fetching inquiries form firestore because: ${e}`);
    } finally {
        console.log(inquiries);
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
    const { whereClauses, orderByClauses, limitClause, startAtClause } = queryClauses;

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

    if (startAtClause) {
        clauses.push(startAt('createdAt', startAtClause.prevLastInquiryCreatedAt));
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
