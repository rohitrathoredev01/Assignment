import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import { Icon } from 'react-native-paper';
import { useGetProductDetailsQuery } from '../../services/productService';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addToCart, setProductDetails } from '../../features/productSlice';

type ProductDetailsType = {
  id: string;
  title: string;
  price: number;
  images?: string[];
  description?: string;
  // add other fields as needed
};

const ProductDetailS = () => {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch();

  const productId = route?.params?.product?.id
  const productDetails = useAppSelector((state) => state.product?.productDetails) as ProductDetailsType | undefined;

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#E8CFC4');

  const sizes = ['S', 'M', 'L'];
  const colors = ['#E8CFC4', '#000000', '#D66F6F'];

  const { data, isLoading, isFetching } = useGetProductDetailsQuery(productId, {
    skip: !productId, // skip if productId is undefined
  });


  useEffect(() => {
    if (data !== undefined) {
      dispatch(setProductDetails(data))
    } else {
      dispatch(setProductDetails({}))
    }
  }, [data])

  const handleAddToCart = () => {
    if (!productDetails) return;
    dispatch(
      addToCart({
        id: Number(productDetails.id),
        title: productDetails.title,
        price: productDetails.price,
        image: productDetails.images?.[0] ?? 'https://images.unsplash.com/photo-1520975661595-6453be3f7070',
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      })
    );
    // console.log('Added to cart');
    Alert.alert('Product Added Successfully')
  };


  return (
    <View style={styles.container}>{
      productDetails && productDetails.id ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Product Image */}
            <View style={styles.imageContainer}>
              <Image
                source={
                  //@ts-ignore
                  productDetails?.images ? { uri: productDetails.images[0] }
                    : { uri: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070' }
                }
                style={styles.image}
              />

              {/* Floating Buttons */}
              <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                <Icon source="chevron-left" size={22} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.wishlistBtn}>
                <Icon source="heart" size={20} color="#FF4D6D" />
              </TouchableOpacity>
            </View>

            {/* Elevated Detail Card */}
            <View style={styles.details}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{productDetails?.title}</Text>
                <Text style={styles.price}>{productDetails?.price}</Text>
              </View>

              <View style={styles.ratingRow}>
                <Text style={styles.rating}>★★★★☆</Text>
                <Text style={styles.reviewCount}> (4.9)</Text>
              </View>

              {/* Color */}
              <Text style={styles.label}>Color</Text>
              <View style={styles.colorRow}>
                {colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorCircle,
                      {
                        backgroundColor: color,
                        borderWidth: selectedColor === color ? 2 : 0,
                        borderColor: '#fff',
                      },
                    ]}
                  />
                ))}
              </View>

              {/* Size */}
              <Text style={styles.label}>Size</Text>
              <View style={styles.sizeRow}>
                {sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.sizeBox,
                      selectedSize === size && styles.sizeBoxActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && { color: '#000' },
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Description */}
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {productDetails?.description}
              </Text>

              {/* Reviews */}
              <Text style={styles.sectionTitle}>Reviews</Text>
              <Text style={styles.reviewScore}>4.9 ★★★★★</Text>

              {/* Similar Products */}
              <Text style={styles.sectionTitle}>Similar Product</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3].map((item) => (
                  <View key={item} style={styles.similarCard}>
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
                      }}
                      style={styles.similarImage}
                    />
                    <Text style={styles.similarName}>Crop Top</Text>
                    <Text style={styles.similarPrice}>$39.99</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={{ height: 120 }} />
            </View>
          </ScrollView>

          {/* Elevated Add To Cart */}
          <View style={styles.cartContainer} >
            <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
              <Icon source="shopping-outline" size={20} color="#000" />
              <Text style={styles.cartText}> Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) :
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>No Data Available</Text>
          </View>)
    }
    </View>
  );
};

export default ProductDetailS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121418',
  },

  imageContainer: {
    height: 420,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },

  wishlistBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },

  details: {
    backgroundColor: '#1C1F26',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  price: {
    color: '#fff',
    fontSize: 18,
  },

  ratingRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  rating: {
    color: '#4CD964',
  },

  reviewCount: {
    color: '#aaa',
  },

  label: {
    color: '#aaa',
    marginTop: 15,
    marginBottom: 8,
  },

  colorRow: {
    flexDirection: 'row',
  },

  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },

  sizeRow: {
    flexDirection: 'row',
  },

  sizeBox: {
    borderWidth: 1,
    borderColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },

  sizeBoxActive: {
    backgroundColor: '#fff',
  },

  sizeText: {
    color: '#fff',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },

  description: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 20,
  },

  reviewScore: {
    color: '#fff',
    fontSize: 16,
  },

  similarCard: {
    width: 120,
    marginRight: 15,
  },

  similarImage: {
    width: 120,
    height: 140,
    borderRadius: 12,
  },

  similarName: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },

  similarPrice: {
    color: '#aaa',
    fontSize: 12,
  },

  cartContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },

  cartButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  cartText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});
