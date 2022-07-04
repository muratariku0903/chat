import { firebaseConfig } from "../config";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { setDoc, collection, doc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rootCollection = 'inquiries';
const seedingCnt = 20;
const productTypeIds = ['NMjN6RdlToeg6w1LNJeq', 'OKYId0COQ0MvkE3sUDLy', 'dm129qbM9QYUEo3yQ6kv'];
const statusTypeIds = [100, 200, 300];

const arrRand = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < seedingCnt; i++) {
    (async function () {
        const colRef = collection(db, rootCollection);
        const docRef = doc(colRef);
        const id = docRef.id;
        const inquiry = {
            id,
            title: 'test title',
            customerName: 'test name',
            customerTel: '090-0909-0909',
            customerEmail: 'test@gmail.com',
            content: 'test content',
            productTypeId: arrRand(productTypeIds),
            statusTypeId: arrRand(statusTypeIds),
            staffId: '',
            createdAt: new Date().getTime(),
        }
        await setDoc(docRef, inquiry);
        console.log('add inquiry');
    })();
}

