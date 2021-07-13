import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import store from './src/redux/store'
import {ShoppingCartIcon} from './src/components/shopping-cart/shopping-cart.component';
import {connect} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import CategoryScreen from "./src/screens/CategoryScreen/category.screen";
import CheckoutScreen from './src/screens/CheckoutScreen/checkout.screen';
import BasketScreen from './src/screens/BasketScreen/basket.screen';
import ProductScreen from "./src/screens/ProductScreen/product.screen";
import ThankYouScreen from "./src/screens/ThankYouScreen/thankyou.screen";
import HomeScreen from './src/screens/HomeScreen/home.screen';
import * as _ from 'lodash';

enableScreens(true);
const StackNavigator = createStackNavigator();

const App = () => {
  return (
      <Provider store={store}>
        <ProvidedAppComponentWithRedux />
      </Provider>
  );
};

const AppComponent = (props) => {
  const headerRight = () => <ShoppingCartIcon badge={_.get(props, 'cart.length', 0)} />
  const options = { headerRight };
  const screenOptions = { headerTitleAlign: 'center', };

  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={screenOptions}>
          <StackNavigator.Screen options={options} name="HomeScreen" component={HomeScreen}/>
          <StackNavigator.Screen options={options} name="ProductScreen" component={ProductScreen}/>
          <StackNavigator.Screen options={options} name="CategoryScreen" component={CategoryScreen}/>
          <StackNavigator.Screen name="BasketScreen" component={BasketScreen}/>
          <StackNavigator.Screen name="ThankYouScreen" component={ThankYouScreen}/>
          <StackNavigator.Screen name="CheckoutScreen" component={CheckoutScreen}/>
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const ProvidedAppComponentWithRedux = connect(mapStateToProps)(AppComponent);

export default App;
