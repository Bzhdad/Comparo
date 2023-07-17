import MainMenuScreen from './screens/MainMenuScreen';
import {store} from "./store";
import {Provider} from "react-redux";

export default function App() {
  return (
      <Provider store={store}>
        <MainMenuScreen />
      </Provider>
  );
}

