import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import PromotionScreen from './src/screens/PromotionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for authenticated screens
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#f9fafb',
          borderTopColor: '#e5e7eb'
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        },
        tabBarActiveTintColor: '#0088FE',
        tabBarInactiveTintColor: '#9CA3AF'
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="Survey"
        component={SurveyScreen}
        options={{
          title: 'Surveys',
          tabBarLabel: 'Surveys'
        }}
      />
      <Tab.Screen
        name="Promotions"
        component={PromotionScreen}
        options={{
          title: 'Promotions',
          tabBarLabel: 'Offers'
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
