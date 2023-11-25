/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {QueryClientProvider, QueryClient} from 'react-query';

import RootNavigator from './navigation/rootNavigator';
import {store} from './redux/store';
import {ColorPalette} from './constants/colorPalette';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <RootNavigator />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
  },
});
