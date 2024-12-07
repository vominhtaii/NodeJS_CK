import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phone:'',
  address:'',
  avatar:'',
  access_token: '',
  id:'',
  isAmin: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name='', email='', access_token='' , address='', phone='',avatar='',id='',isAdmin} = action.payload;
      state.name = name ;
      state.email = email ;
      state.address = address ;
      state.phone = phone ;
      state.avatar = avatar ;
      state.id = id;
      state.access_token = access_token; 
      state.isAmin = isAdmin ;
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.id ='';
      state.access_token = false
    },
  },
});

export const { updateUser , resetUser} = userSlice.actions;
export default userSlice.reducer;