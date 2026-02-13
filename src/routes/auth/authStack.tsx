import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import SignIn from '../../screens/auth/signIn';
import SignUp from '../../screens/auth/signUp';
import Welcome from '../../screens/auth/welcome';


const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none', presentation: 'transparentModal' }}>
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;