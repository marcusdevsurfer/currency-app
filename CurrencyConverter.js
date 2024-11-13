import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MXN');
  const [result, setResult] = useState(null);

  const convertCurrency = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/ed2d323918a926928d2c9b0e/latest/${fromCurrency}`);
      const rate = response.data.conversion_rates[toCurrency];
      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount.toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convertidor de Divisas</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="De (Ej. USD)"
        value={fromCurrency}
        onChangeText={setFromCurrency}
      />
      <TextInput
        style={styles.input}
        placeholder="A (Ej. EUR)"
        value={toCurrency}
        onChangeText={setToCurrency}
      />
      <Button title="Convertir" onPress={convertCurrency} />
      {result && <Text style={styles.result}>Resultado: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
  },
  result: {
    marginTop: 16,
    fontSize: 18,
  },
});

export default CurrencyConverter;