import React, { useEffect } from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { Platform, useColorScheme } from "react-native";
import MainNavigator from '../routes/main';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setTheme, updateRoute } from '../features/appSlice';
import { configureFonts, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { appColorsCode } from '../styles/appColorsCode';

export const navigationRef = createNavigationContainerRef()

const AppTheme = ({ setState, setIsDark }: any) => {
    const dispatch = useAppDispatch();
    const isDark = useAppSelector(state => state.app.isDark);
    const subscription = useColorScheme();

    useEffect(() => {
        dispatch(setTheme(subscription === 'dark'))
        setIsDark(subscription === 'dark')
    }, [subscription]);

    const fontConfig = {
        fontFamily: 'Poppins-Regular',
        lineHeight: 24,
        ...(Platform.OS === 'ios' && { lineHeight: 27 }),
    };

    const theme = {
        ...MD3LightTheme,
        roundness: 2,
        // @ts-ignore
        colors: {
            ...MD3LightTheme.colors,
            primary: isDark ? appColorsCode.secondary : appColorsCode.primary,
            background: appColorsCode.white,
            outline: isDark ? appColorsCode.secondary : appColorsCode.primary,
            outlineVariant: isDark ? appColorsCode.secondary : appColorsCode.primary,
            tertiaryContainer: isDark ? appColorsCode.secondary : appColorsCode.primary,
            onSurfaceVariant: isDark ? appColorsCode.secondary : appColorsCode.primary,
            surfaceDisabled: appColorsCode.gray2,
            onSurfaceDisabled: appColorsCode.gray2,
        },
        fonts: configureFonts({ config: fontConfig }),
    };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer
                ref={navigationRef}
                onStateChange={async () => {
                    const currentRouteName = navigationRef?.getCurrentRoute()?.name;
                    setState(currentRouteName);
                    setIsDark(isDark);
                    dispatch(updateRoute(currentRouteName || 'root'));
                }}>
                <MainNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default AppTheme;
