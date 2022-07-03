import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductTypes } from "../../repositories/firebase/types/productType";


export type ProductTypesState = {
    productTypes: ProductTypes;
}

const initialState: ProductTypesState = {
    productTypes: {},
};

type SetStatusTypesPayload = ProductTypes;

export const productTypesSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {
        setProductTypes(state, action: PayloadAction<SetStatusTypesPayload>) {
            state.productTypes = action.payload;
        }
    }
});
