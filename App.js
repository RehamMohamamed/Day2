import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import MoviesScreen from './screens/MoviesScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import ContactScreen from './screens/ContactScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <Drawer.Navigator
          initialRouteName="Movies"
          screenOptions={{
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: '#fff',
            drawerStyle: { backgroundColor: '#1a1a1a' },
            drawerLabelStyle: { color: '#fff' },
            drawerActiveTintColor: '#00bfff',
          }}
        >
          <Drawer.Screen 
            name="Movies" 
            component={MoviesScreen} 
            options={{ title: 'Popular Movies' }}
          />
          <Drawer.Screen 
            name="Contact" 
            component={ContactScreen} 
            options={{ title: 'Contact Us' }}
          />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});
