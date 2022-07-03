import { useDispatch } from "react-redux";
import { productTypesApi } from "../repositories/firebase/api/productTypes";
import { statusTypesApi } from "../repositories/firebase/api/statusTypes";
import { productTypesSlice } from "../store/productTypes";
import { statusTypesSlice } from "../store/statusTypes";


export const useSetup = () => {
    const dispatch = useDispatch();

    const setup = async (): Promise<void> => {
        try {
            const statusTypes = await statusTypesApi.fetchStatusTypes();
            const productTypes = await productTypesApi.fetchProductTypes();
            dispatch(statusTypesSlice.actions.setStatusTypes(statusTypes));
            dispatch(productTypesSlice.actions.setProductTypes(productTypes));
        } catch (e) {
            console.error(e);
        }
    }

    return { setup };
}
