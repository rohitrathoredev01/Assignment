import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export interface ProductState {
  productListItems: any[];
  productDetails: object;
  cartItems: CartItem[];
  checkoutItems: object;
}

const initialState: ProductState = {
  productListItems: [],
  productDetails: {},
  cartItems: [],
  checkoutItems: {},
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.productListItems = action.payload;
    },
    setProductDetails: (state, action: PayloadAction<any>) => {
      state.productDetails = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        item =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      );
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    setCheckoutItems: (state, action: PayloadAction<CartItem[]>) => {
      console.log(action);

      state.checkoutItems = action.payload;
    },

    clearAllState: () => initialState,
  },
});

export const {
  setProducts,
  setProductDetails,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCheckoutItems,
  clearAllState,
} = productSlice.actions;

export default productSlice.reducer;
