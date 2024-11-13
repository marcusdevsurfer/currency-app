import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CurrencyConverter from './CurrencyConverter'; // Asegúrate de que la ruta sea correcta

export default function App() {
  return (
    <View style={styles.container}>
      <CurrencyConverter />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});