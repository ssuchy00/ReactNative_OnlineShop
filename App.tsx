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
  Buy:IBuyProps
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
      </Stack.Navigator>
    </NavigationContainer> 
  )
  
}

export default App