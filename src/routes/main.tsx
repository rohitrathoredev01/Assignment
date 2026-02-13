import React, { useEffect, useRef, useState } from 'react';
import AuthStack from './auth/authStack';
import RootStack from './rootStack';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import NetInfo from "@react-native-community/netinfo";
import { AppState, AppStateStatus, Platform, Settings, View } from 'react-native';
import { updateConnection, updateProcess } from '../features/appSlice';
import { appColorsCode } from '../styles/appColorsCode';
import { Text } from 'react-native-paper';
import WaitScreen from '../shared/WaitScreen';
import { logoutSuccess, setToken } from '../features/authSlice';
import auth from '@react-native-firebase/auth';

const MainScreen = () => {
    const dispatch = useAppDispatch();
    const isConnected = useAppSelector((state) => state.app.isConnected);
    const appState = useRef(AppState.currentState);
    const token = useAppSelector((state) => state.auth.token);

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any>(null);

    console.log(token);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            setUser(user);
            setInitializing(false);
        });

        return subscriber;
    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            dispatch(updateConnection(state?.isConnected ?? false));
        });

        const subscription = AppState.addEventListener('change', _handleAppStateChange);

        return () => {
            unsubscribe();
            subscription.remove();
        };
    }, []);

    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            dispatch(updateProcess(true));
        } else {
            appState.current = nextAppState;
            dispatch(updateProcess(false));
        }
    };

    if (initializing) return <WaitScreen />;

    return (
        <>
            {!isConnected && (
                <View style={{ backgroundColor: appColorsCode.negative }}>
                    <Text style={{ textAlign: 'center', color: appColorsCode.white }}>
                        No Internet Available
                    </Text>
                </View>
            )}

            {token ? <RootStack /> : <AuthStack />}
        </>
    )
};

export default React.memo(MainScreen);
