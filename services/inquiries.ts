import { Inquiry } from "../repositories/firebase/types/inquiry"

export const getLastInquiry = (inquiries: Inquiry[]): Inquiry | null => {
    if (!inquiries.length) return null;

    return inquiries.slice(-1)[0];
}
