import { StatusBar } from 'expo-status-bar';
import { Home } from './src/screens/home';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme/theme';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({DMSans_400Regular, DMSans_500Medium, DMSans_700Bold})


  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Home/> : <ActivityIndicator/>}
    </ThemeProvider>
  );
}