import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { Transaction } from '../types/finance';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<Transaction['paymentMethod']>('cash');

  const handleSubmit = () => {
    if (!amount || !description) return;
    
    onAddTransaction({
      amount: parseFloat(amount),
      type,
      category,
      description,
      date: new Date().toISOString(),
      paymentMethod,
    });

    // Reset form
    setAmount('');
    setDescription('');
    setType('expense');
    setCategory('food');
    setPaymentMethod('cash');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Add Transaction</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#9CA3AF"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
        cursorColor="#3B82F6"
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={setType}
          style={styles.picker}
        >
          <Picker.Item label="Expense" value="expense" />
          <Picker.Item label="Income" value="income" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={paymentMethod}
          onValueChange={setPaymentMethod}
          style={styles.picker}
        >
          <Picker.Item label="Cash" value="cash" />
          <Picker.Item label="UPI" value="upi" />
          <Picker.Item label="Card" value="card" />
          <Picker.Item label="Bank Transfer" value="bank" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#9CA3AF"
        value={description}
        onChangeText={setDescription}
        cursorColor="#3B82F6"
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: '#374151',
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});