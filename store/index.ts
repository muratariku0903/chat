import { configureStore, getDefaultMiddleware, combineReducers, EnhancedStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { userSlice } from './user';
import { inquiriesSlicer } from './Inquiries';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null)
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value)
        },
        removeItem(_key: any) {
            return Promise.resolve()
        },
    }
}
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootReducer = combineReducers({
    user: userSlice.reducer,
    inquiries: inquiriesSlicer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'chat',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
});

export default store;
