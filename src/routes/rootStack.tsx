import React, {  } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './tabs/homeTab';
import MainStack from './stack/mainStack';

const Stack = createStackNavigator();


const RootStack = (props: any) => {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'none',
                }}>
                <Stack.Screen
                    name="root"
                    component={MainStack}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </>
    );
};

export default RootStack;
