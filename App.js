import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/main';
import store from './src/redux';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
