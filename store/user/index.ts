import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
    name: string;
    email: string;
    password: string;
}

export type UserState = {
    user: User;
    isLogin: boolean;
};

export type UpdateUserPayload = User;

const initialState: UserState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    isLogin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UpdateUserPayload>) {
            console.log('setUser');
            state.user = action.payload;
            state.isLogin = true;
        },
        updateUser(state, action: PayloadAction<UpdateUserPayload>) {
            state.user = action.payload;
        },
        reset(): UserState {
            console.log('logout');
            return initialState;
        },
    },
})
