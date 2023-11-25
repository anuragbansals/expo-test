import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ProductItem} from '../screens/home';

export interface Order {
  orders: Array<ProductItem>;
}

const initialState: Order = {
  orders: [],
};

export const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<ProductItem[]>) => {
      state.orders = action.payload;
    },
  },
});

export const {placeOrder} = OrderSlice.actions;
export default OrderSlice.reducer;
