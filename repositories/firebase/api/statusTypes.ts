import { getDocs, collection } from "firebase/firestore";
import { StatusTypes, StatusType } from "../types/statusType";
import { db } from "../db";

const rootCollection = 'statusTypes';


const fetchStatusTypes = async (): Promise<StatusTypes> => {
    const statusTypes: StatusTypes = {};
    try {
        const colRef = createColRef();
        (await getDocs(colRef)).docs.forEach(doc => {
            const statusType = doc.data() as StatusType;
            statusTypes[statusType.id] = statusType;
        });
        console.log('Fetching statusTypes from firestore.');
    } catch (e) {
        throw (`Fail fetching statusTypes form firestore because: ${e}`);
    } finally {
        return statusTypes;
    }
}

const createColRef = () => {
    return collection(db, rootCollection);
}

export const statusTypesApi = { fetchStatusTypes };
