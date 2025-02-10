/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './Views/Home';
import Item, { IItemProps } from './Views/Item';
import Search, { ISearchProps } from './Views/Search';
import Cart, { ICartProps } from './Views/Cart';
import { IMenuProps } from './Components/SideMenu';
import { ICartItemProps } from './Components/CartComponents/CartItem';
import Login, { ILoginProps } from './Views/Login';
import Register, { IRegisterProps } from './Views/Register';
import AccountSettings, { IAccountSettings } from './Views/AccountSettings';
import Buy, { IBuyProps } from './Views/Buy';
import MyOrders, { IMyOrdersProps } from './Views/MyOrders';
import Contact, { IContactProps } from './Views/Contact';
import OrderDetails, { IOrderDetailsProps } from './Views/OrderDetails';
import { IOrder } from './Interfaces/IApiResponse';
import UsersOrders, { IUsersOrdersProps } from './Views/UsersOrders';
 

export type RootStackParamList = {
  Home: undefined
  Item: IItemProps
  Search:ISearchProps
  Cart: ICartProps
  Menu: IMenuProps,
  CartItem: ICartItemProps,
  Login: ILoginProps
  Register: IRegisterProps
  AccountSettings: IAccountSettings
  Buy:IBuyProps,
  MyOrders: IMyOrdersProps
  Contact: IContactProps
  OrderDetails: IOrderDetailsProps
  UsersOrders: IUsersOrdersProps
}
 
//  console.log = (e) => {console.info(e) }

function App(): React.JSX.Element {

  const Stack = createNativeStackNavigator<RootStackParamList>()

  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Item' component={Item}/>
        <Stack.Screen name='Search' component={Search}/>
        <Stack.Screen name='Cart' component={Cart}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='AccountSettings' component={AccountSettings}/>
        <Stack.Screen name='Buy' component={Buy}/>
        <Stack.Screen name='MyOrders' component={MyOrders}/>
        <Stack.Screen name='Contact' component={Contact}/>
        <Stack.Screen name='OrderDetails' component={OrderDetails}/>
        <Stack.Screen name='UsersOrders' component={UsersOrders}/>
      </Stack.Navigator>
    </NavigationContainer> 
  )
  
}

export default App