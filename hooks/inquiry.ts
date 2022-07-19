import { useDispatch } from "react-redux";
import { inquiriesApi } from "../repositories/firebase/api/inquiries";
import { QueryClauses } from "../repositories/firebase/types/clause";
import { Inquiry } from "../repositories/firebase/types/inquiry";
import { inquiriesSlice } from "../store/Inquiries";
import { getLastInquiry } from "../services/inquiries";


export const useInquiry = () => {
    const dispatch = useDispatch();

    const fetchInquiries = async (queryClauses?: QueryClauses): Promise<Inquiry[]> => {
        let inquiries: Inquiry[] = [];

        try {
            inquiries = await inquiriesApi.fetchInquiries(queryClauses);
            const lastInquiry = getLastInquiry(inquiries);
            const prevClauses: QueryClauses =
                lastInquiry
                    ? { ...queryClauses, startAtClause: { prevLastInquiryCreatedAt: lastInquiry.createdAt } }
                    : queryClauses ? queryClauses : {};
            dispatch(inquiriesSlice.actions.setClauses(prevClauses));
            dispatch(inquiriesSlice.actions.setInquiries(inquiries));
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
