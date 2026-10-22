
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ingredientes = [
  'Tomate',
  'Cebolla',
  'Ajo',
  'Chile',
  'Cilantro',
  'Papa',
  'Zanahoria',
  'Calabacita',
  'Elote',
  'Frijoles',
  'Arroz',
  'Huevo',
  'Queso',
  'Pollo',
  'Carne de res',
  'Tortillas',
  'Aguacate',
  'Limón',
];

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const cambiarIngrediente = (ingrediente: string) => {
    setSeleccionados((actuales) =>
      actuales.includes(ingrediente)
        ? actuales.filter((item) => item !== ingrediente)
        : [...actuales, ingrediente]
    );
  };

  const buscarRecetas = () => {
    if (seleccionados.length === 0) {
      Alert.alert(
        'Selecciona ingredientes',
        'Elige al menos un ingrediente para continuar.'
      );
      return;
    }

    Alert.alert(
      'Ingredientes seleccionados',
      `Elegiste ${seleccionados.length} ingredientes. La búsqueda de recetas se conectará en la siguiente etapa.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {pantalla === 'inicio' ? (
        <View style={styles.inicio}>
          <Text style={styles.emoji}>🌮</Text>

          <Text style={styles.titulo}>Recetas mexicanas</Text>

          <Text style={styles.descripcion}>
            Descubre qué platillos mexicanos puedes preparar
            con los ingredientes que tienes en casa.
          </Text>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => setPantalla('ingredientes')}
          >
            <Text style={styles.textoBoton}>
              Seleccionar ingredientes
            </Text>
          </TouchableOpacity>

          <Text style={styles.pie}>
            El sabor de México en tu cocina
          </Text>
        </View>
      ) : (
        <View style={styles.contenido}>
          <TouchableOpacity
            onPress={() => setPantalla('inicio')}
            style={styles.volver}
          >
            <Text style={styles.textoVolver}>‹ Volver al inicio</Text>
          </TouchableOpacity>

          <Text style={styles.tituloSeccion}>
            ¿Qué tienes en casa?
          </Text>

          <Text style={styles.descripcionSeccion}>
            Selecciona los ingredientes que tienes disponibles.
          </Text>

          <Text style={styles.contador}>
            Ingredientes seleccionados: {seleccionados.length}
          </Text>

          <ScrollView
            style={styles.lista}
            contentContainerStyle={styles.listaContenido}
          >
            {ingredientes.map((ingrediente) => {
              const seleccionado = seleccionados.includes(ingrediente);

              return (
                <TouchableOpacity
                  key={ingrediente}
                  style={[
                    styles.ingrediente,
                    seleccionado && styles.ingredienteSeleccionado,
                  ]}
                  onPress={() => cambiarIngrediente(ingrediente)}
                >
                  <Text
                    style={[
                      styles.textoIngrediente,
                      seleccionado && styles.textoSeleccionado,
                    ]}
                  >
                    {seleccionado ? '✓  ' : '+  '}
                    {ingrediente}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.boton}
            onPress={buscarRecetas}
          >
            <Text style={styles.textoBoton}>Buscar recetas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.limpiar}
            onPress={() => setSeleccionados([])}
          >
            <Text style={styles.textoLimpiar}>
              Limpiar selección
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  inicio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  contenido: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 12,
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pie: {
    marginTop: 32,
    color: '#786F64',
    fontSize: 14,
  },
  volver: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  textoVolver: {
    color: '#28613B',
    fontSize: 16,
    fontWeight: '600',
  },
  tituloSeccion: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#28613B',
    marginBottom: 8,
  },
  descripcionSeccion: {
    color: '#514B43',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  contador: {
    fontSize: 14,
    color: '#28613B',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  lista: {
    flex: 1,
    marginBottom: 12,
  },
  listaContenido: {
    paddingBottom: 8,
  },
  ingrediente: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3DCCF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 9,
  },
  ingredienteSeleccionado: {
    backgroundColor: '#E1F0E4',
    borderColor: '#28613B',
  },
  textoIngrediente: {
    fontSize: 16,
    color: '#514B43',
  },
  textoSeleccionado: {
    color: '#28613B',
    fontWeight: 'bold',
  },
  limpiar: {
    padding: 12,
    alignItems: 'center',
  },
  textoLimpiar: {
    color: '#8B3A32',
    fontSize: 14,
    fontWeight: '600',
  },
});
