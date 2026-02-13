import { Image, View } from "react-native";
import React from "react";
import { appColorsCode } from "../styles/appColorsCode";
import { useAppSelector } from "../hooks/hooks";

const WaitScreen = () => {
    const isDark = useAppSelector(state => state.app.isDark);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isDark ? appColorsCode.black : appColorsCode.black,
            }}>
            <Image source={require('../assets/logo/logo.png')} style={{ width: 200, height: 200 }} />
        </View>
    );
};
export default WaitScreen;
