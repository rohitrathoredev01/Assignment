import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useAppDispatch } from '../../hooks/hooks';
import { clearAllState } from '../../features/productSlice';
import { setToken } from '../../features/authSlice';

const Profile = () => {
    const dispatch = useAppDispatch();

    const [profiledata, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async user => {
            if (user) {
                const snapshot = await database()
                    .ref(`/users/${user.uid}`)
                    .once('value');

                if (snapshot.exists()) {
                    setProfileData(snapshot.val());
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await auth().signOut();
            dispatch(clearAllState());
            dispatch(setToken(''));

        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {profiledata?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Text>
                </View>
                <Text style={styles.name}>{profiledata?.name || 'User Name'}</Text>
                <Text style={styles.email}>
                    {auth().currentUser?.email}
                </Text>
            </View>

            {/* Info Card */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Company</Text>
                    <Text style={styles.value}>
                        {profiledata?.company || 'Not Provided'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.value}>
                        {profiledata?.role || 'User'}
                    </Text>
                </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0C10',
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    loader: {
        flex: 1,
        backgroundColor: '#0B0C10',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#1F2833',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 36,
        color: '#66FCF1',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    email: {
        fontSize: 14,
        color: '#A0A0A0',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#1F2833',
        borderRadius: 12,
        padding: 20,
        marginBottom: 40,
    },
    row: {
        marginBottom: 15,
    },
    label: {
        color: '#A0A0A0',
        fontSize: 13,
        marginBottom: 4,
    },
    value: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#E63946',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});
