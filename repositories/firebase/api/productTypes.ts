import { getDocs, collection } from "firebase/firestore";
import { ProductTypes, ProductType } from "../types/productType";
import { db } from "../db";

const rootCollection = 'productTypes';


const fetchProductTypes = async (): Promise<ProductTypes> => {
    const ProductTypes: ProductTypes = {};
    try {
        const colRef = createColRef();
        (await getDocs(colRef)).docs.forEach(doc => {
            const ProductType = doc.data() as ProductType;
            ProductTypes[ProductType.id] = ProductType;
        });
        console.log('Fetching ProductTypes from firestore.');
    } catch (e) {
        throw (`Fail fetching ProductTypes form firestore because: ${e}`);
    } finally {
        return ProductTypes;
    }
}

const createColRef = () => {
    return collection(db, rootCollection);
}

export const productTypesApi = { fetchProductTypes };
