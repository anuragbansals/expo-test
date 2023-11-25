import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ProductItem} from '../screens/home';

export interface Cart {
  products: Array<ProductItem>;
}

const initialState: Cart = {
  products: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductItem>) => {
      state.products.push(action.payload);
    },
  },
});

export const {addItem} = CartSlice.actions;

export default CartSlice.reducer;
