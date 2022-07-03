import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inquiry } from "../../repositories/firebase/types/inquiry";


type InquiriesState = {
    inquiries: Inquiry[];
}

const initialState: InquiriesState = {
    inquiries: [],
};

type SetInquiriesPayload = Inquiry[];

export const inquiriesSlice = createSlice({
    name: 'inquiries',
    initialState,
    reducers: {
        setInquiries(state, action: PayloadAction<SetInquiriesPayload>) {
            state.inquiries = action.payload;
        }
    }
});
