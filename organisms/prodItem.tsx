import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {ColorPalette} from '../constants/colorPalette';
import CustomButton from '../atoms/button';
import {ProductItem} from '../screens/home';

interface IProps {
  product: ProductItem;
  onPress?: Function;
  showBtn?: boolean;
}

const ProdItem = (props: IProps) => {
  const {id, name, price, category, cart, imgUrl} = props.product;
  const {onPress, showBtn = true} = props;

  return (
    <View style={styles.productContainer}>
      <Image resizeMode="cover" style={styles.img} source={{uri: imgUrl}} />
      <View style={styles.prodTextContainer}>
        <Text style={[styles.prodText, {fontWeight: '500'}]}>{name}</Text>
        <Text style={styles.prodText}>Rs {price}</Text>
        <Text style={styles.prodText}>{category}</Text>
      </View>
      {showBtn && (
        <CustomButton
          buttonStyles={styles.btn}
          title={cart ? 'ADDED' : 'ADD'}
          isDisable={cart}
          onPress={() => onPress(props.product)}
          titleStyle={styles.btnText}
        />
      )}
    </View>
  );
};

export default ProdItem;

const styles = StyleSheet.create({
  productContainer: {
    marginTop: 8,
    borderWidth: 1,
    width: 90,
    height: 180,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: ColorPalette.grey,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 80,
  },
  prodText: {
    color: ColorPalette.black,
    fontSize: 12,
  },
  prodTextContainer: {
    padding: 2,
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 0,
  },
  btnText: {
    color: ColorPalette.white,
  },
});
