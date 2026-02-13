import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, } from 'react-native';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useGetProductQuery } from '../../services/productService';
import { setProducts } from '../../features/productSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const categories = [
    { name: 'Women', icon: 'human-female' },
    { name: 'Men', icon: 'human-male' },
    { name: 'Accessories', icon: 'watch' },
    { name: 'Beauty', icon: 'face-woman' },
];

const Home = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>()
    const { data } = useGetProductQuery([])

    const productListItems = useAppSelector((state) => state.product?.productListItems);

    useEffect(() => {
        if (data !== undefined) {
            dispatch(setProducts(data))
        }
    }, [data])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20}}>

                {/* Categories */}
                <View style={styles.categories}>
                    {categories.map((item, index) => (
                        <View key={index} style={styles.categoryItem}>
                            <View style={styles.categoryIcon}>
                                <Icon source={item.icon} size={28} color="#fff" />
                            </View>
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </View>
                    ))}
                </View>


                {/* Hero Banner */}
                <View style={styles.hero}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1520975916090-3105956dac38' }}
                        style={styles.heroImage}
                    />
                    <View style={styles.heroOverlay}>
                        <Text style={styles.heroText}>Autumn Collection 2021</Text>
                    </View>
                </View>

                {/* Feature Products */}
                <SectionHeader title="Feature Products" />
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[1, 2, 3].map((item) => (
                        <ProductCard key={item} navigation={navigation} />
                    ))}
                </ScrollView> */}
                <FlatList
                    data={productListItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductCard item={item} navigation={navigation} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                {/* Promo Banner */}
                <View style={styles.promo}>
                    <Text style={styles.promoSmall}>NEW COLLECTION</Text>
                    <Text style={styles.promoTitle}>HANG OUT & PARTY</Text>
                </View>

                {/* Recommended */}
                <SectionHeader title="Recommended" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[1, 2].map((item) => (
                        <ProductSmall key={item} />
                    ))}
                </ScrollView>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Tab */}
            <View style={styles.bottomTab}>
                <Icon source="home" size={22} color="#fff" />
                <Icon source="search" size={22} color="#888" />
                <Icon source="shopping-bag" size={22} color="#888" />
                <Icon source="user" size={22} color="#888" />
            </View>
        </View>
    );
};

const SectionHeader = ({ title }: any) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.showAll}>Show all</Text>
    </View>
);

const ProductCard = ({ item, navigation }: any) => {

    return (
        <Pressable onPress={() => navigation.navigate('ProductDetailS', { product: item })}>
            <View style={styles.productCard}>
                <Image
                    source={
                        item?.images
                            ? { uri: item.images[0] }
                            : { uri: '"https://placehold.co/600x400' }
                    }
                    style={styles.productImage}
                />

                <Text style={styles.productName}>
                    {item?.title || 'N/A'}
                </Text>
                <Text style={styles.productPrice}>
                    ${item?.price}
                </Text>
            </View>
        </Pressable>
    );
};


const ProductSmall = () => (
    <View style={styles.smallCard}>
        <Image
            source={{ uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d' }}
            style={styles.smallImage}
        />
        <View>
            <Text style={styles.productName}>White fashion hoodie</Text>
            <Text style={styles.productPrice}>$29.00</Text>
        </View>
    </View>
);

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1F26',
    },

    header: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
    },

    logo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },

    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },

    categoryItem: {
        alignItems: 'center',
    },

    categoryIcon: {
        backgroundColor: '#2A2E37',
        padding: 12,
        borderRadius: 30,
        marginBottom: 5,
    },

    categoryText: {
        color: '#aaa',
        fontSize: 12,
    },

    hero: {
        marginHorizontal: 20,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
    },

    heroImage: {
        width: '100%',
        height: 190,
        resizeMode: 'cover'
    },

    heroOverlay: {
        position: 'absolute',
        right: 15,
        bottom: 15,
    },

    heroText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
    },

    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    showAll: {
        color: '#888',
        fontSize: 12,
    },

    productCard: {
        width: 140,
        marginLeft: 20,
    },

    productImage: {
        width: 140,
        height: 160,
        borderRadius: 10,
        marginBottom: 8,
    },

    productName: {
        color: '#fff',
        fontSize: 13,
    },

    productPrice: {
        color: '#aaa',
        fontSize: 12,
    },

    promo: {
        backgroundColor: '#2A2E37',
        margin: 20,
        padding: 20,
        borderRadius: 15,
    },

    promoSmall: {
        color: '#888',
        fontSize: 12,
    },

    promoTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    smallCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2E37',
        padding: 10,
        borderRadius: 12,
        marginLeft: 20,
        marginBottom: 10,
    },

    smallImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },

    bottomTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#111318',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
