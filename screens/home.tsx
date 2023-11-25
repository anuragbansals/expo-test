import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';

import {addItem} from '../redux/cartSlice';
import {ColorPalette} from '../constants/colorPalette';
import ProdItem from '../organisms/prodItem';

export interface ProductItem {
  name: string;
  id: number;
  price: number;
  category: string;
  cart?: boolean;
  imgUrl?: string;
}

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [productList, setProductList] = useState<any>([]);

  const {isLoading, isError, data} = useQuery('product-list', () => {
    return require('../utils/dummyData/products.json');
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setProductList(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (searchText) {
      const filterProduct = setTimeout(() => {
        let tempProducts: any = [];
        data.products.forEach((prod: ProductItem) => {
          if (
            prod.name.toLowerCase().includes(searchText.toLowerCase()) ||
            prod.category.toLowerCase().includes(searchText.toLowerCase())
          ) {
            tempProducts.push(prod);
          } else {
            setProductList([]);
          }
        }, setProductList(tempProducts));
        setProductList(tempProducts);
      }, 1000);
      return () => clearTimeout(filterProduct);
    } else {
      setProductList(data?.products);
    }
  }, [searchText]);

  const handleCart = (props: ProductItem) => {
    let prodList = [...productList];
    productList.forEach((item: ProductItem, index: number) => {
      let prod: any = {};
      if (item.id === props.id) {
        prod = {
          ...item,
          cart: true,
        };
        prodList[index] = prod;
      }
    });
    setProductList(prodList);
    dispatch(addItem(props));
  };

  if (isLoading) {
    return (
      <View>
        <Text style={styles.text}>...loading</Text>
      </View>
    );
  }

  if (isError) {
    <View>
      <Text style={styles.text}>Something went wrong...</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={val => setSearchText(val)}
        style={styles.searchBox}
        placeholder="Search items"
        placeholderTextColor={ColorPalette.grey}
      />
      {productList?.length === 0 ? (
        <Text style={styles.noText}>No items to display</Text>
      ) : (
        <FlatList
          numColumns={3}
          style={styles.flatList}
          contentContainerStyle={styles.flatList}
          data={productList}
          renderItem={({item}: {item: ProductItem}) => (
            <ProdItem key={item?.id} product={item} onPress={handleCart} />
          )}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  searchBox: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    color: ColorPalette.black,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 12,
  },
  text: {
    color: ColorPalette.black,
  },
  noText: {
    color: ColorPalette.black,
    marginTop: 12,
    textAlign: 'center',
  },
  flatList: {
    marginTop: 12,
  },
  flatListContent: {
    alignItems: 'center',
  },
});
