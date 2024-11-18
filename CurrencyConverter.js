import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';

const { width, height } = Dimensions.get('window');

const currencyList = [
  { label: 'USD', value: 'USD' },
  { label: 'MXN', value: 'MXN' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MXN');
  const [result, setResult] = useState('0.00');
  const [buttonScale] = useState(new Animated.Value(1));

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'MXN':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'JPY':
        return '¥';
      default:
        return '';
    }
  };

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

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.90,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={['#1E3C72', '#2A5298', '#4F6D7A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientBackground, { paddingTop: height * 0.05 }]}
    >
      <Text style={styles.title}>CONVERTIDOR DE DIVISAS</Text>

      <View style={styles.contentBackground}>
        <Text style={styles.subtitle}>CANTIDAD A CAMBIAR</Text>

        <View style={styles.inputContainer}>
        <Text style={[styles.currencySymbol, { left: 10, paddingBottom: 5 }]}>{getCurrencySymbol(fromCurrency)}</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.currencyContainer}>
          <View style={styles.currencyBlock}>
            <Text style={styles.label}>DE</Text>
            <View style={pickerSelectStyles.container}>
              <RNPickerSelect
                onValueChange={(value) => setFromCurrency(value)}
                value={fromCurrency}
                style={pickerSelectStyles}
                items={currencyList}
                placeholder={{}}
              />
            </View>
          </View>
          <Text style={styles.arrowText}>→</Text>
          <View style={styles.currencyBlock}>
            <Text style={styles.label}>A</Text>
            <View style={pickerSelectStyles.container}>
              <RNPickerSelect
                onValueChange={(value) => setToCurrency(value)}
                value={toCurrency}
                style={pickerSelectStyles}
                items={currencyList}
                placeholder={{}}
              />
            </View>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={convertCurrency}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <LinearGradient
              colors={['#1E3C72', '#2A5298', '#4F6D7A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Convertir</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultSymbol}>{getCurrencySymbol(toCurrency)}</Text>
            <Text style={styles.result}>{result}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBackground: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 29,
    marginTop: height * 0.02,
    marginBottom: height * 0.04,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  currencyBlock: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    left: 15,
  },
  input: {
    height: 60,
    width: width * 0.4,
    fontSize: 30,
    textAlign: 'center',
    borderWidth: 0,
    borderBottomWidth: 2,
    paddingLeft: 30,
    paddingRight: 30
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  arrowText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#555",
    marginHorizontal: 10,
    marginTop: 15,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resultSymbol: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 10,
  },
  result: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.25,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const pickerSelectStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  inputIOS: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
  inputAndroid: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default CurrencyConverter;