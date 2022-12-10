import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './redux/store';
import HandleNav from "./navigation/HandleNav";
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';


export default function App() {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
  const [isLoading, setLoading] = useState(true)
  const [fontsLoaded] = useFonts({
    'Caveat': require("./assets/fonts/Caveat/Caveat-Bold.ttf"),
    'Roboto': require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    'RobotoSlab': require("./assets/fonts/Roboto_Slab/RobotoSlab-Medium.ttf"),
    'Poppins': require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setLoading(false)
    }
  }, [fontsLoaded])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2980B9" />
      </SafeAreaView>
    );
  }
  return (
    <Provider store={store}>
      <HandleNav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  }
})
