import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phone:'',
  address:'',
  avatar:'',
  access_token: '',
  id:null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name='', email='', access_token='' , address='', phone='',avatar='',id=''} = action.payload;
      state.name = name ;
      state.email = email ;
      state.address = address ;
      state.phone = phone ;
      state.avatar = avatar ;
      state.id = id;
      state.access_token = access_token ;
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.access_token = '';
      state.address = '';
      state.phone = '';
      state.id ='';
      state.avatar = '';
    },
  },
});

export const { updateUser , resetUser} = userSlice.actions;
export default userSlice.reducer;