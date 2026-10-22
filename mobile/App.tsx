
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [iniciado, setIniciado] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenido}>
        <Text style={styles.emoji}>🌮</Text>

        <Text style={styles.titulo}>Recetas mexicanas</Text>

        <Text style={styles.descripcion}>
          Descubre qué platillos puedes preparar con los
          ingredientes que tienes en casa.
        </Text>

        {iniciado && (
          <Text style={styles.mensaje}>
            ¡Muy pronto podrás seleccionar tus ingredientes!
          </Text>
        )}

        <TouchableOpacity
          style={styles.boton}
          onPress={() => setIniciado(true)}
        >
          <Text style={styles.textoBoton}>
            Buscar recetas
          </Text>
        </TouchableOpacity>

        <Text style={styles.pie}>
          El sabor de México en tu cocina
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  emoji: {
    fontSize: 76,
    marginBottom: 18,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#28613B',
    textAlign: 'center',
    marginBottom: 16,
  },
  descripcion: {
    fontSize: 17,
    color: '#514B43',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 28,
  },
  boton: {
    backgroundColor: '#28613B',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  mensaje: {
    color: '#28613B',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  pie: {
    marginTop: 32,
    color: '#786F64',
    fontSize: 14,
  },
});
