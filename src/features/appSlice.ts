import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
    isDark: boolean,
    isConnected: boolean,
    isBackground: boolean,
    routeName: string,
    isImageFromGallery: boolean,
    loading: boolean,
}

const initialState: AppState = {
    isDark: false,
    isConnected: false,
    isBackground: false,
    routeName: 'root',
    isImageFromGallery: true,
    loading: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<boolean>) => {
            state.isDark = action.payload
        },
        updateConnection: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload
        },
        updateProcess: (state, action: PayloadAction<boolean>) => {
            state.isBackground = action.payload;
        },
        updateRoute: (state, action: PayloadAction<string>) => {
            state.routeName = action.payload;
        },
        updateImageFromGallery: (state, action: PayloadAction<boolean>) => {
            state.isImageFromGallery = action.payload;
        },
        startLoading: state => {
            state.loading = true;
        },
        stopLoading: state => {
            state.loading = false;
        },
    },
})

export const { setTheme, updateConnection, updateProcess, updateRoute, updateImageFromGallery, startLoading, stopLoading } = appSlice.actions

export default appSlice.reducer