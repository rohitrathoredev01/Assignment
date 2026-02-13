import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Alert, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/authSlice';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleLogin = async () => {
        try {
            setLoading(true);

            // Login user
            const userCredential = await auth().signInWithEmailAndPassword(
                email,
                password
            );

            const user = userCredential.user;

            // Get Firebase ID Token (Access Token)
            const accessToken = await user.getIdToken();

            console.log("Access Token:", accessToken);

            // Store token locally
            dispatch(setToken(accessToken))
            Alert.alert('Success', 'Login successful!');

            // Navigate to Home screen
            // navigation.replace('Home');

        } catch (error: any) {
            Alert.alert('Login Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.title}>Log into</Text>
                <Text style={styles.title}>your account</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text style={styles.buttonText}>LOGIN</Text>
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Don’t have an account?{' '}
                    <Text
                        style={styles.signupText}
                        onPress={() => navigation.replace('SignUp')}
                    >
                        SignUp
                    </Text>
                </Text>
            </View>
        </View>
    );
};
export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0C10',
        paddingHorizontal: 24,
        justifyContent: 'center',
    },

    header: {
        marginBottom: 50,
    },

    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 5,
    },

    form: {
        marginBottom: 40,
    },

    inputContainer: {
        marginBottom: 25,
    },

    label: {
        color: '#A0A0A0',
        fontSize: 14,
        marginBottom: 8,
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        color: '#FFFFFF',
        fontSize: 16,
        paddingVertical: 6,
    },

    forgot: {
        color: '#666',
        fontSize: 12,
        textAlign: 'right',
        marginTop: -10,
    },

    button: {
        backgroundColor: '#E5E5E5',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
    },

    buttonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },

    footer: {
        alignItems: 'center',
    },

    footerText: {
        color: '#A0A0A0',
        fontSize: 14,
    },

    signupText: {
        color: '#FFFFFF',
        fontWeight: '600',
        paddingTop: 12
    },
});
