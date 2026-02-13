import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Pressable,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
}

const API_BASE = 'https://api.escuelajs.co/api/v1';

const ProductFilterScreen = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const [price, setPrice] = useState<string>('');
    const [priceMin, setPriceMin] = useState<string>('');
    const [priceMax, setPriceMax] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const fetchProducts = async (query = '') => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/products${query}`);
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_BASE}/categories`);
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const applyFilter = () => {
        let query = '?';
        if (price) query += `price=${price}&`;
        if (priceMin && priceMax) query += `price_min=${priceMin}&price_max=${priceMax}&`;
        if (selectedCategoryId) query += `categoryId=${selectedCategoryId}&`;
        fetchProducts(query);
        setFilterModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.filterBtn}
                onPress={() => setFilterModalVisible(true)}
            >
                <Text style={{ color: '#fff' }}>Add Filter</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => navigation.navigate('ProductDetailS', { product: item })}>
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: item.images[0] }}
                                    style={styles.image}
                                />
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.price}>${item.price}</Text>
                                <Text style={styles.category}>Category: {item.category.name}</Text>
                            </View>
                        </Pressable>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            {/* FILTER MODAL */}
            <Modal
                visible={filterModalVisible}
                animationType="slide"
                transparent
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>Filter Products</Text>

                            {/* Filter by exact price */}
                            <Text style={styles.label}>Price</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter price"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={setPrice}
                            />

                            {/* Filter by price range */}
                            <Text style={styles.label}>Price Range</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    style={[styles.input, { flex: 1, marginRight: 5 }]}
                                    placeholder="Min"
                                    keyboardType="numeric"
                                    value={priceMin}
                                    onChangeText={setPriceMin}
                                />
                                <TextInput
                                    style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                    placeholder="Max"
                                    keyboardType="numeric"
                                    value={priceMax}
                                    onChangeText={setPriceMax}
                                />
                            </View>

                            {/* Filter by category */}
                            <Text style={styles.label}>Category</Text>
                            <ScrollView style={{}}>
                                {categories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={{
                                            padding: 8,
                                            backgroundColor: selectedCategoryId === cat.id ? '#444' : '#222',
                                            marginBottom: 5,
                                            borderRadius: 8,
                                        }}
                                        onPress={() =>
                                            setSelectedCategoryId(selectedCategoryId === cat.id ? null : cat.id)
                                        }
                                    >
                                        <Text style={{ color: '#fff' }}>{cat.name}</Text>
                                    </TouchableOpacity>
                                ))}

                            </ScrollView>
                            {/* Apply button */}
                            <TouchableOpacity
                                style={styles.applyBtn}
                                onPress={applyFilter}
                            >
                                <Text style={{ color: '#fff', fontWeight: '600' }}>Apply Filter</Text>
                            </TouchableOpacity>

                            {/* Close button */}
                            <TouchableOpacity
                                style={[styles.applyBtn, { backgroundColor: '#888', marginTop: 10 }]}
                                onPress={() => setFilterModalVisible(false)}
                            >
                                <Text style={{ color: '#fff', fontWeight: '600' }}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ProductFilterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121418',
        padding: 10,
    },
    filterBtn: {
        backgroundColor: '#1C1F26',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#1C1F26',
        borderRadius: 12,
        padding: 8,
        marginBottom: 10,
        height: 250, // reduced height
    },
    image: {
        width: '100%',
        height: 170, // reduced height
        borderRadius: 12,
    },
    title: { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 6 },
    price: { color: '#aaa', marginTop: 4 },
    category: { color: '#4CD964', marginTop: 4, fontSize: 12 },

    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#222',
        borderRadius: 20,
        padding: 15,
        maxHeight: '70%',
    },
    modalTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 15 },
    label: { color: '#aaa', marginBottom: 5, marginTop: 10 },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 14,
    },
    applyBtn: {
        backgroundColor: '#4CD964',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
});
