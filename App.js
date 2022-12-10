import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './redux/store';
import HandleNav from "./navigation/HandleNav";
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
  return (
    <Provider store={store}>
      <HandleNav />
    </Provider>
  );
}

