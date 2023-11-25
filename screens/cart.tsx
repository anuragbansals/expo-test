import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useMutation} from 'react-query';

import type {RootState} from '../redux/store';
import {ProductItem} from './home';
import {placeOrder} from '../redux/orderSlice';
import CustomButton from '../atoms/button';
import {ColorPalette} from '../constants/colorPalette';
import Heading from '../molecules/heading';
import ProdItem from '../organisms/prodItem';

const Cart = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems: Array<ProductItem> = useSelector(
    (state: RootState) => state.cart.products,
  );
  const dispatch = useDispatch();

  const bookOrder = useMutation({
    mutationFn: (order: Array<ProductItem>) => {
      return dispatch(placeOrder(order));
    },
  });

  useEffect(() => {
    if (bookOrder.data) {
      setOrderPlaced(true);
    }
  }, [bookOrder.data]);

  useEffect(() => {
    if (orderPlaced) {
      Alert.alert('Order placed sucessfully!', '', [
        {
          text: 'Ok',
          onPress: () => setOrderPlaced(false),
        },
      ]);
    }
  }, [orderPlaced]);

  const handleOrder = () => {
    bookOrder.mutate(cartItems);
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Heading heading="Cart" />
          {cartItems?.length === 0 ? (
            <Text style={styles.text}>Your cart is empty!</Text>
          ) : (
            <>
              <View style={styles.listContainer}>
                {cartItems.map((item: ProductItem) => (
                  <ProdItem key={item.id} showBtn={false} product={item} />
                ))}
              </View>
              <CustomButton
                isDisable={cartItems.length === 0}
                title="Place Order"
                onPress={handleOrder}
                buttonStyles={styles.btn}
                titleStyle={styles.btnText}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    padding: 24,
  },
  text: {
    color: ColorPalette.black,
    textAlign: 'center',
    marginTop: 12,
  },
  btn: {
    width: '80%',
    paddingVertical: 8,
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 20,
  },
  btnText: {
    color: ColorPalette.white,
  },
  root: {
    flex: 1,
    backgroundColor: ColorPalette.white,
  },
  listContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
});
