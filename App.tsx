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
 

export type RootStackParamList = {
  Home: undefined
  Item: IItemProps
  Search:ISearchProps
  Cart: ICartProps
}
 
function App(): React.JSX.Element {

  const Stack = createNativeStackNavigator<RootStackParamList>()

  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Item' component={Item}/>
        <Stack.Screen name='Search' component={Search}/>
        <Stack.Screen name='Cart' component={Cart}/>
      </Stack.Navigator>
    </NavigationContainer> 
  )
  
}

export default App