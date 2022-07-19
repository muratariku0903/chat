import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inquiry } from "../../repositories/firebase/types/inquiry";
import { QueryClauses } from '../../repositories/firebase/types/clause';


type InquiriesState = {
    inquiries: Inquiry[];
    clauses: QueryClauses;
}

const initialState: InquiriesState = {
    inquiries: [],
    clauses: {}
};

type SetInquiriesPayload = Inquiry[];
type SetClausesPayload = QueryClauses;

export const inquiriesSlice = createSlice({
    name: 'inquiries',
    initialState,
    reducers: {
        setInquiries(state, action: PayloadAction<SetInquiriesPayload>) {
            state.inquiries = action.payload;
        },

        setClauses(state, action: PayloadAction<SetClausesPayload>) {
            state.clauses = action.payload;
        }
    }
});
