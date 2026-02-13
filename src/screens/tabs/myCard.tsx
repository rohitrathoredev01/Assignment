import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { decrementQuantity, incrementQuantity, removeFromCart, setCheckoutItems } from '../../features/productSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

const MyCartScreen = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const cartItems = useAppSelector(state => state.product?.cartItems || []);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const shipping = 10;

    // Find the selected item for price calculation
    const selectedItem = cartItems.find(item => item.id === selectedItemId);
    const subTotal = selectedItem ? selectedItem.price * selectedItem.quantity : 0;
    const total = subTotal + shipping;

    // Handlers
    const handleIncrement = (id: number) => dispatch(incrementQuantity(id));
    const handleDecrement = (id: number) => dispatch(decrementQuantity(id));
    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        if (selectedItemId === id) setSelectedItemId(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>My Cart</Text>

            <FlatList
                data={cartItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />

                        <View style={styles.info}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                            <Text style={styles.price}>Size:{item.size}</Text>

                            {/* Quantity Controls */}
                            <View style={styles.qtyRow}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => handleDecrement(item.id)}
                                >
                                    <Text style={styles.qtyText}>-</Text>
                                </TouchableOpacity>

                                <Text style={styles.qtyNumber}>{item.quantity}</Text>

                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => handleIncrement(item.id)}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Remove Button */}
                            <TouchableOpacity onPress={() => handleRemove(item.id)} style={{width:'30%'}}>
                                <Text style={styles.remove}>Remove</Text>
                            </TouchableOpacity>

                            {/* Select Item Checkbox */}
                            <View style={styles.checkboxRow}>
                                <Checkbox
                                    status={selectedItemId === item.id ? 'checked' : 'unchecked'}
                                    onPress={() =>
                                        setSelectedItemId(selectedItemId === item.id ? null : item.id)
                                    }
                                />
                                <Text style={{ color: '#fff' }}>Select this item</Text>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>Cart is empty</Text>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {/* Price Summary for selected item */}
            {selectedItem && (
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Price Details</Text>
                    <Text style={styles.summaryText}>Subtotal: ${subTotal.toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Shipping: ${shipping.toFixed(2)}</Text>
                    {/* <Text style={styles.summaryTotal}>Total: ${total.toFixed(2)}</Text> */}

                    <TouchableOpacity style={styles.checkoutBtn} onPress={() => { navigation.navigate('Checkout'); dispatch(setCheckoutItems(selectedItem))}}>
                        <Text style={styles.checkoutText}>Proceed To Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default MyCartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121418',
        padding: 20,
    },
    heading: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#1C1F26',
        borderRadius: 15,
        padding: 12,
        marginBottom: 15,
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: 10,
    },
    info: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    price: {
        color: '#aaa',
        marginTop: 5,
    },
    qtyRow: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    qtyBtn: {
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
    },
    qtyText: {
        color: '#fff',
        fontWeight: '600',
    },
    qtyNumber: {
        color: '#fff',
        marginHorizontal: 10,
    },
    remove: {
        color: '#FF4D6D',
        marginTop: 8,
        fontWeight: '600',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    empty: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 50,
    },
    summaryContainer: {
        backgroundColor: '#1C1F26',
        padding: 18,
        borderRadius: 20,
        marginTop: 10,
    },
    summaryTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    summaryText: {
        color: '#aaa',
        marginBottom: 5,
    },
    summaryTotal: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        marginTop: 8,
    },
    checkoutBtn: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 15,
    },
    checkoutText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 15,
    },
});
