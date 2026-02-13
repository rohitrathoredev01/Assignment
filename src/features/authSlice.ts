import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Credentials {
    user_name: string;
    password: string;
}

export interface AuthState {
    userDetails?: any;
    token: string;
    errorMessage?: any;
    isLoggedIn: boolean;
    credentials: Credentials;
    userRole?: string;
}

const initialState: AuthState = {
    userDetails: undefined,
    token: '',
    errorMessage: undefined,
    isLoggedIn: false,
    credentials: {
        user_name: '',
        password: '',
    },
    userRole: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
      state.isLoggedIn = true;
      state.userRole = action.payload?.data?.user?.contactType;
    },
    logoutSuccess: state => {
      state.userDetails = undefined;
      state.token = '';
      state.isLoggedIn = false;
      state.errorMessage = undefined;
      state.userRole = undefined;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    authError: (state, action: PayloadAction<any>) => {
      state.errorMessage = action.payload;
    },
    userCredentials: (state, action: PayloadAction<Credentials>) => {
      state.credentials = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setToken, authError, userCredentials } = authSlice.actions

export default authSlice.reducer