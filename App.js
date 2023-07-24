import React from 'react';
import { Provider } from 'react-redux';
import MainMenuScreen from './screens/MainMenuScreen';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <MainMenuScreen />
    </Provider>
  );
}
