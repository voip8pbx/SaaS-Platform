import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConfigProvider } from './src/context/ConfigContext';
import { AuthProvider } from './src/context/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import FlightsScreen from './src/screens/flights/FlightsScreen';
import HotelsScreen from './src/screens/hotels/HotelsScreen';
import PackagesScreen from './src/screens/packages/PackagesScreen';
import NewsScreen from './src/screens/news/NewsScreen';
import ContactScreen from './src/screens/contact/ContactScreen';
import TrainsScreen from './src/screens/trains/TrainsScreen';
import CabsScreen from './src/screens/cabs/CabsScreen';
import RentalsScreen from './src/screens/rentals/RentalsScreen';
import VillasScreen from './src/screens/villas/VillasScreen';
import CruisesScreen from './src/screens/cruises/CruisesScreen';
import AIChatScreen from './src/screens/ai/AIChatScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ConfigProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Flights" component={FlightsScreen} />
              <Stack.Screen name="Hotels" component={HotelsScreen} />
              <Stack.Screen name="Packages" component={PackagesScreen} />
              <Stack.Screen name="News" component={NewsScreen} />
              <Stack.Screen name="Contact" component={ContactScreen} />
              <Stack.Screen name="Trains" component={TrainsScreen} />
              <Stack.Screen name="Cabs" component={CabsScreen} />
              <Stack.Screen name="Rentals" component={RentalsScreen} />
              <Stack.Screen name="Villas" component={VillasScreen} />
              <Stack.Screen name="Cruises" component={CruisesScreen} />
              <Stack.Screen name="AIChat" component={AIChatScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ConfigProvider>
    </SafeAreaProvider>
  );
}

export default App;
