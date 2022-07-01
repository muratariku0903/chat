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

    return { fetchInquiries };
}
