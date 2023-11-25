import {configureStore} from '@reduxjs/toolkit';

import cartSlice from './cartSlice';
import customerSlice from './customerSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    customer: customerSlice,
    orders: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
