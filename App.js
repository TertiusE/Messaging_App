import { SafeAreaView,View, Text } from "react-native";
import { Provider } from 'react-redux';
import store from './redux/store';
import HandleNav from "./navigation/HandleNav";


export default function App() {
  
  return (
    <Provider store={store}>
      <HandleNav />
    </Provider>
  );
}

