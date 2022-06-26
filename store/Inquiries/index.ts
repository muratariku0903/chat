import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Inquiry = {
    id: string;
    title: string;
    content: string;
}

type InquiriesState = {
    inquiries: Inquiry[];
}

const initialState: InquiriesState = {
    inquiries: []
};

type SetInquiriesPayload = Inquiry[];

export const inquiriesSlicer = createSlice({
    name: 'inquiries',
    initialState,
    reducers: {
        setInquiries(state, action: PayloadAction<SetInquiriesPayload>) {
            state.inquiries = action.payload;
        }
    }
});
