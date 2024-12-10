import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    avatar: '',
    isAdmin: false,
    acces_token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { id = '', name = '', email = '', password = '', phone = '', avatar = '', address = '', acces_token = '', isAdmin } = action.payload
            state.id = id
            state.name = name || email;
            state.email = email;
            state.password = password;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar
            state.isAdmin = isAdmin
            state.acces_token = acces_token;
        },
        resetUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.password = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.avatar = '';
            state.acces_token = '';

        }
    }
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer