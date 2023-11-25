import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {useSelector} from 'react-redux';

import {RootState} from '../redux/store';
import {ProductItem} from './home';
import {ColorPalette} from '../constants/colorPalette';
import Heading from '../molecules/heading';
import ProdItem from '../organisms/prodItem';

const Orders = () => {
  const orderList = useSelector((state: RootState) => state.orders);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading heading="Orders" />
        {orderList?.orders.length === 0 ? (
          <Text style={styles.text}>Currently you don't have any orders!</Text>
        ) : (
          <>
            {orderList.orders?.map((item: ProductItem) => (
              <ProdItem showBtn={false} key={item.id} product={item} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  text: {
    color: ColorPalette.black,
    textAlign: 'center',
    marginTop: 12,
  },
});
