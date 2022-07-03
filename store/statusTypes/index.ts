import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusTypes } from "../../repositories/firebase/types/statusType";


export type StatusTypesState = {
    statusTypes: StatusTypes;
}

const initialState: StatusTypesState = {
    statusTypes: {},
};

type SetStatusTypesPayload = StatusTypes;

export const statusTypesSlice = createSlice({
    name: 'statusTypes',
    initialState,
    reducers: {
        setStatusTypes(state, action: PayloadAction<SetStatusTypesPayload>) {
            state.statusTypes = action.payload;
        }
    }
});
