import { inquiriesApi } from "../repositories/firebase/api/inquiries";
import { QueryClauses } from "../repositories/firebase/types/clause";
import { Inquiry } from "../repositories/firebase/types/inquiry";



export const useInquiry = () => {
    const fetchInquiries = async (queryClauses: QueryClauses): Promise<Inquiry[]> => {
        let inquiries: Inquiry[] = [];

        try {
            inquiries = await inquiriesApi.fetchInquiries(queryClauses);
        } catch (e) {
            console.error(e);
        } finally {
            return inquiries;
        }
    }

    const addInquiry = async (form: Omit<Inquiry, 'id' | 'statusTypeId' | 'staffId' | 'createdAt'>): Promise<void> => {
        try {
            await inquiriesApi.addInquiry(form);
            console.log('add inquiry');
        } catch (e) {
            console.error(e);
        }
    }

    return { fetchInquiries, addInquiry };
}
