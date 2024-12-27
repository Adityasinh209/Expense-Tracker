import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Wallet } from 'lucide-react';
import type { Transaction, Category } from './types/finance';
import type { User } from './types/auth';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { getMonthYear } from './utils/date';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(getMonthYear(new Date().toISOString()));
  const [categories, setCategories] = useState<Category[]>([
    { id: 'food', name: 'Food', type: 'expense', icon: 'utensils' },
    { id: 'transport', name: 'Transport', type: 'expense', icon: 'car' },
    { id: 'shopping', name: 'Shopping', type: 'expense', icon: 'shopping-bag' }
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Money Tracker' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}