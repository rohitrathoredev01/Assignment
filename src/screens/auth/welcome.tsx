import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';

const Welcome = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            {/* Center Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/logo/logo.png')}
                    // 🔥 Replace with your logo path
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Bottom Button */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                    <Icon source="arrow-right" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E0F14',
        justifyContent: 'space-between',
    },

    /* Logo Center */
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 250,
        height: 250,
    },

    /* Bottom Button */
    buttonWrapper: {
        paddingHorizontal: 25,
        paddingBottom: 30,
    },

    button: {
        backgroundColor: '#E5E5E5',
        paddingVertical: 18,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
