import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Alert, ActivityIndicator } from 'react-native';
import firebase from '@react-native-firebase/app';

import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),

    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});

const SignUp = () => {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (values: any) => {
        try {
            setLoading(true);

            // Create user in Firebase Auth
            const userCredential = await auth().createUserWithEmailAndPassword(
                values.email,
                values.password
            );

            const uid = userCredential.user.uid;

            // Save additional data in Realtime Database
            await database()
                .ref(`/users/${uid}`)
                .set({
                    name: values.name,
                    email: values.email,
                    createdAt: new Date().toISOString(),
                });

            Alert.alert('Success', 'Account created successfully!');
            navigation.replace('SignIn');

        } catch (error: any) {
            Alert.alert('Error', error.message);
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar barStyle="light-content" />

                <View style={styles.header}>
                    <Text style={styles.title}>Create</Text>
                    <Text style={styles.title}>your account</Text>
                </View>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={handleSignUp}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isValid
                    }) => (
                        <>
                            <View style={styles.form}>
                                {/* Name */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Enter your name</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                    />
                                    {touched.name && errors.name && (
                                        <Text style={styles.error}>{errors.name}</Text>
                                    )}
                                </View>

                                {/* Email */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Email address</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                    />
                                    {touched.email && errors.email && (
                                        <Text style={styles.error}>{errors.email}</Text>
                                    )}
                                </View>

                                {/* Password */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style={styles.error}>{errors.password}</Text>
                                    )}
                                </View>

                                {/* Confirm Password */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Confirm password</Text>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <Text style={styles.error}>
                                            {errors.confirmPassword}
                                        </Text>
                                    )}
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { opacity: !isValid || loading ? 0.6 : 1 }
                                ]}
                                onPress={() => handleSubmit()}
                                disabled={!isValid || loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#000" />
                                ) : (
                                    <Text style={styles.buttonText}>SIGN UP</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have account?{' '}
                        <Text
                            style={styles.loginText}
                            onPress={() => navigation.replace('SignIn')}
                        >
                            SignIn
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    error: {
        color: '#FF6B6B',
        fontSize: 12,
        marginTop: 5,
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
    loginText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
