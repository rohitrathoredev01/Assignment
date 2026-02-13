import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailS from '../../screens/tabs/productDetailS';
import HomeTab from '../tabs/homeTab';
import Checkout from '../../screens/tabs/checkout';


const Stack = createStackNavigator();

const MainStack = ({ route }: any) => {
    const initialScreen = route?.params?.screen || 'form1';

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animation: 'none', presentation: 'transparentModal' }} >
            <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetailS" component={ProductDetailS} options={{ headerShown: false }} />
            <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default MainStack;
