import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';


interface InitialState {
    token: string;
}


const initialState: InitialState = {
    token: localStorage.getItem('token') ?? ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state, action: PayloadAction) => {
            state.token = '';
        }
    }
});


export const {
    login,
    logout
} = userSlice.actions;
export default userSlice.reducer;
