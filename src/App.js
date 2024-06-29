import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from './navigations/Navigation';

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Navigation />
    </>
  );
};

export default App;
