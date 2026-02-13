import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import Home from "../../screens/tabs/home";
import Search from "../../screens/tabs/search";
import MyCard from "../../screens/tabs/myCard";
import Profile from "../../screens/tabs/profile";
import ProductDetailS from "../../screens/tabs/productDetailS";

const Tab = createBottomTabNavigator();


function CustomTabBar({ state, navigation }: any) {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route: any, index: any) => {
                const isFocused = state.index === index;

                let iconName;
                if (route.name === "Home") iconName = "home-outline";
                if (route.name === "Search") iconName = "magnify";
                if (route.name === "Cart") iconName = "shopping-outline";
                if (route.name === "Profile") iconName = "account-outline";
                // if (route.name === "ProductDetailS") iconName = "account-outline";

                return (
                    <TouchableOpacity
                        key={route.key}
                        style={styles.tabItem}
                        onPress={() => navigation.navigate(route.name)}
                    >
                        <Icon
                            source={iconName}
                            size={24}
                            color={isFocused ? "#ffffff" : "#8e8e93"}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

/* ------------------ MAIN APP ------------------ */

export default function HomeTab() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Home" component={Home} />
            {/* <Tab.Screen name="ProductDetailS" component={ProductDetailS} /> */}
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Cart" component={MyCard} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 22,
        fontWeight: "600",
    },
    tabContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#111111",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        elevation: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
    },
});
