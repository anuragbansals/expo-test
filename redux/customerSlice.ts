import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Customer {
  name: string;
  gender: string;
  age: number;
  address: string;
  order?: Array<any>;
}

const initialState: Customer = {
  address: '',
  age: 0,
  gender: '',
  name: '',
  order: [],
};

export const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    editDetails: (state, action: PayloadAction<Customer>) => {
      (state.address = action.payload.address),
        (state.age = action.payload.age),
        (state.gender = action.payload.gender),
        (state.name = action.payload.name);
    },
  },
});

export const {editDetails} = CustomerSlice.actions;
export default CustomerSlice.reducer;
