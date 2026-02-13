import React, { useEffect, useState } from 'react'
import { enableFreeze } from 'react-native-screens';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { appColorsCode } from './src/styles/appColorsCode';
import AppTheme from './src/theme/appTheme';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';

const App = () => {
  enableFreeze(true);
  const [state, setState] = useState();
  const [isDark, setIsDark] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? appColorsCode.black : appColorsCode.black }} edges={['top', 'right', 'bottom', 'left']}      >
        <StatusBar barStyle={isDark ? 'light-content' : 'light-content'} backgroundColor="transparent" translucent />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <AppTheme setState={setState} setIsDark={setIsDark} />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App