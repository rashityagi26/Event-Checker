import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/graphql/client';
import { useAuthStore } from './src/store/authStore';

import LoginScreen from './src/screens/LoginScreen';
import EventListScreen from './src/screens/EventListScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';

// Define navigation types
type RootStackParamList = {
  Login: undefined;
  EventList: undefined;
  EventDetail: {
    event: {
      id: string;
      name: string;
      location: string;
      startTime: string;
      attendees: Array<{
        id: string;
        name: string;
        email: string;
      }>;
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppContent = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="EventList" component={EventListScreen} />
            <Stack.Screen name="EventDetail" component={EventDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}
