import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import TabBar from './tabBar';
import Cart from '../screens/cart';
import Orders from '../screens/orders';
import Profile from '../screens/profile';
import {PathNames} from '../constants/pathnames';

const Tab = createBottomTabNavigator();

interface IProps {
  navigation: any;
  route: any;
}

const HomeStack = (props: IProps) => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen options={{headerShown: false}} name={PathNames.home}>
        {props => <Home />}
      </Tab.Screen>
      <Tab.Screen options={{headerShown: false}} name={PathNames.cart}>
        {props => <Cart />}
      </Tab.Screen>
      <Tab.Screen options={{headerShown: false}} name={PathNames.orders}>
        {props => <Orders />}
      </Tab.Screen>
      <Tab.Screen options={{headerShown: false}} name={PathNames.profile}>
        {props => <Profile />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeStack;