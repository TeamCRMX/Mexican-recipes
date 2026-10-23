
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

type Pantalla = 'inicio' | 'ingredientes' | 'resultados' | 'detalle';

type Receta = {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string[];
  tiempo: string;
  dificultad: string;
  utensilios: string[];
  equipos: string[];
};

const ingredientes = [
  'Tomate', 'Cebolla', 'Ajo', 'Chile', 'Cilantro', 'Papa',
  'Zanahoria', 'Calabacita', 'Elote', 'Frijoles', 'Arroz',
  'Huevo', 'Queso', 'Pollo', 'Carne de res', 'Tortillas',
  'Aguacate', 'Limón',
];

const recetas: Receta[] = [
  {
    id: 1,
    nombre: 'Huevos a la mexicana',
    descripcion: 'Huevos preparados con tomate, cebolla y chile.',
    ingredientes: ['Huevo', 'Tomate', 'Cebolla', 'Chile'],
    tiempo: '15 minutos',
    dificultad: 'Fácil',
    utensilios: ['Cuchillo', 'Tabla para cortar', 'Espátula'],
    equipos: ['Estufa', 'Sartén'],
  },
  {
    id: 2,
    nombre: 'Guacamole',
    descripcion: 'Preparación mexicana a base de aguacate.',
    ingredientes: ['Aguacate', 'Tomate', 'Cebolla', 'Cilantro', 'Limón', 'Chile'],
    tiempo: '10 minutos',
    dificultad: 'Fácil',
    utensilios: ['Cuchillo', 'Tenedor', 'Recipiente'],
    equipos: [],
  },
  {
    id: 3,
    nombre: 'Arroz rojo',
    descripcion: 'Arroz cocinado con tomate, ajo y cebolla.',
    ingredientes: ['Arroz', 'Tomate', 'Ajo', 'Cebolla'],
    tiempo: '30 minutos',
    dificultad: 'Media',
    utensilios: ['Olla', 'Cuchara', 'Cuchillo'],
    equipos: ['Estufa', 'Licuadora'],
  },
  {
    id: 4,
    nombre: 'Quesadillas de queso',
    descripcion: 'Tortillas rellenas de queso derretido.',
    ingredientes: ['Tortillas', 'Queso'],
    tiempo: '10 minutos',
    dificultad: 'Fácil',
    utensilios: ['Espátula'],
    equipos: ['Estufa', 'Comal'],
  },
  {
    id: 5,
    nombre: 'Caldo de pollo con verduras',
    descripcion: 'Caldo casero de pollo con verduras.',
    ingredientes: ['Pollo', 'Papa', 'Zanahoria', 'Calabacita', 'Cebolla', 'Ajo'],
    tiempo: '60 minutos',
    dificultad: 'Media',
    utensilios: ['Cuchillo', 'Tabla para cortar', 'Olla', 'Cuchara'],
    equipos: ['Estufa'],
  },
  {
    id: 6,
    nombre: 'Frijoles guisados',
    descripcion: 'Frijoles preparados con ajo y cebolla.',
    ingredientes: ['Frijoles', 'Cebolla', 'Ajo'],
    tiempo: '20 minutos',
    dificultad: 'Fácil',
    utensilios: ['Olla', 'Cuchara'],
    equipos: ['Estufa'],
  },
];

export default function App() {
  const [pantalla, setPantalla] = useState<Pantalla>('inicio');
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [recetaActual, setRecetaActual] = useState<Receta | null>(null);

  const resultados = recetas
    .map((receta) => {
      const disponibles = receta.ingredientes.filter((ingrediente) =>
        seleccionados.includes(ingrediente)
      );
      const faltantes = receta.ingredientes.filter(
        (ingrediente) => !seleccionados.includes(ingrediente)
      );
      const porcentaje = Math.round(
        (disponibles.length / receta.ingredientes.length) * 100
      );

      return { receta, disponibles, faltantes, porcentaje };
    })
    .filter((resultado) => resultado.porcentaje > 0)
    .sort((a, b) => b.porcentaje - a.porcentaje);

  function cambiarIngrediente(ingrediente: string) {
    setSeleccionados((actuales) =>
      actuales.includes(ingrediente)
        ? actuales.filter((item) => item !== ingrediente)
        : [...actuales, ingrediente]
    );
  }

  function buscarRecetas() {
    if (seleccionados.length === 0) {
      Alert.alert('Selecciona ingredientes', 'Elige al menos un ingrediente para continuar.');
      return;
    }
    setPantalla('resultados');
  }

  function abrirDetalle(receta: Receta) {
    setRecetaActual(receta);
    setPantalla('detalle');
  }

  return (
    <SafeAreaView style={styles.container}>
      {pantalla === 'inicio' && (
        <View style={styles.inicio}>
          <Text style={styles.emoji}>🌮</Text>
          <Text style={styles.titulo}>Recetas mexicanas</Text>
          <Text style={styles.descripcion}>
            Descubre qué platillos mexicanos puedes preparar con los ingredientes que tienes en casa.
          </Text>
          <TouchableOpacity style={styles.boton} onPress={() => setPantalla('ingredientes')}>
            <Text style={styles.textoBoton}>Seleccionar ingredientes</Text>
          </TouchableOpacity>
          <Text style={styles.pie}>El sabor de México en tu cocina</Text>
        </View>
      )}

      {pantalla === 'ingredientes' && (
        <View style={styles.contenido}>
          <TouchableOpacity onPress={() => setPantalla('inicio')} style={styles.volver}>
            <Text style={styles.textoVolver}>‹ Volver al inicio</Text>
          </TouchableOpacity>
          <Text style={styles.tituloSeccion}>¿Qué tienes en casa?</Text>
          <Text style={styles.descripcionSeccion}>
            Selecciona los ingredientes que tienes disponibles.
          </Text>
          <Text style={styles.contador}>
            Ingredientes seleccionados: {seleccionados.length}
          </Text>

          <ScrollView style={styles.lista} contentContainerStyle={styles.listaContenido}>
            {ingredientes.map((ingrediente) => {
              const seleccionado = seleccionados.includes(ingrediente);
              return (
                <TouchableOpacity
                  key={ingrediente}
                  style={[styles.ingrediente, seleccionado && styles.ingredienteSeleccionado]}
                  onPress={() => cambiarIngrediente(ingrediente)}
                >
                  <Text style={[styles.textoIngrediente, seleccionado && styles.textoSeleccionado]}>
                    {seleccionado ? '✓  ' : '+  '}{ingrediente}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.boton} onPress={buscarRecetas}>
            <Text style={styles.textoBoton}>Buscar recetas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.limpiar} onPress={() => setSeleccionados([])}>
            <Text style={styles.textoLimpiar}>Limpiar selección</Text>
          </TouchableOpacity>
        </View>
      )}

      {pantalla === 'resultados' && (
        <View style={styles.contenido}>
          <TouchableOpacity onPress={() => setPantalla('ingredientes')} style={styles.volver}>
            <Text style={styles.textoVolver}>‹ Cambiar ingredientes</Text>
          </TouchableOpacity>
          <Text style={styles.tituloSeccion}>Recetas recomendadas</Text>
          <Text style={styles.descripcionSeccion}>
            Ordenadas según los ingredientes que tienes.
          </Text>

          <ScrollView style={styles.lista} contentContainerStyle={styles.listaContenido}>
            {resultados.length === 0 ? (
              <Text style={styles.mensaje}>No encontramos recetas con esos ingredientes. Prueba con otros.</Text>
            ) : (
              resultados.map(({ receta, disponibles, faltantes, porcentaje }) => (
                <View key={receta.id} style={styles.tarjeta}>
                  <Text style={styles.nombreReceta}>{receta.nombre}</Text>
                  <Text style={styles.porcentaje}>{porcentaje}% de coincidencia</Text>
                  <View style={styles.fondoProgreso}>
                    <View style={[styles.progreso, { width: `${porcentaje}%` }]} />
                  </View>
                  <Text style={styles.texto}>
                    Tienes: {disponibles.length ? disponibles.join(', ') : 'Ninguno'}
                  </Text>
                  <Text style={styles.faltantes}>
                    Te faltan: {faltantes.length ? faltantes.join(', ') : 'Ninguno'}
                  </Text>
                  <Text style={styles.texto}>
                    Tiempo: {receta.tiempo} · Dificultad: {receta.dificultad}
                  </Text>
                  <TouchableOpacity style={styles.boton} onPress={() => abrirDetalle(receta)}>
                    <Text style={styles.textoBoton}>Ver detalle</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      )}

      {pantalla === 'detalle' && recetaActual && (
        <View style={styles.contenido}>
          <TouchableOpacity onPress={() => setPantalla('resultados')} style={styles.volver}>
            <Text style={styles.textoVolver}>‹ Volver a las recetas</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.listaContenido}>
            <Text style={styles.tituloSeccion}>{recetaActual.nombre}</Text>
            <Text style={styles.descripcionSeccion}>{recetaActual.descripcion}</Text>

            <Text style={styles.etiqueta}>Ingredientes necesarios</Text>
            {recetaActual.ingredientes.map((ingrediente) => {
              const tiene = seleccionados.includes(ingrediente);
              return (
                <Text key={ingrediente} style={tiene ? styles.disponible : styles.faltante}>
                  {tiene ? '✓ Tienes: ' : '• Te falta: '}{ingrediente}
                </Text>
              );
            })}

            <Text style={styles.etiqueta}>Utensilios</Text>
            <Text style={styles.texto}>{recetaActual.utensilios.join(', ')}</Text>

            <Text style={styles.etiqueta}>Equipos necesarios</Text>
            <Text style={styles.texto}>
              {recetaActual.equipos.length ? recetaActual.equipos.join(', ') : 'No requiere equipo eléctrico especial.'}
            </Text>

            <Text style={styles.etiqueta}>Información de preparación</Text>
            <Text style={styles.texto}>Tiempo: {recetaActual.tiempo}</Text>
            <Text style={styles.texto}>Dificultad: {recetaActual.dificultad}</Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8EE' },
  inicio: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28 },
  contenido: { flex: 1, paddingHorizontal: 22, paddingTop: 16, paddingBottom: 12 },
  emoji: { fontSize: 76, marginBottom: 18 },
  titulo: { fontSize: 30, fontWeight: 'bold', color: '#28613B', textAlign: 'center', marginBottom: 16 },
  descripcion: { fontSize: 17, color: '#514B43', textAlign: 'center', lineHeight: 25, marginBottom: 28 },
  boton: { backgroundColor: '#28613B', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 10 },
  textoBoton: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  pie: { marginTop: 32, color: '#786F64', fontSize: 14 },
  volver: { marginBottom: 20, alignSelf: 'flex-start' },
  textoVolver: { color: '#28613B', fontSize: 16, fontWeight: '600' },
  tituloSeccion: { fontSize: 26, fontWeight: 'bold', color: '#28613B', marginBottom: 8 },
  descripcionSeccion: { color: '#514B43', fontSize: 15, lineHeight: 22, marginBottom: 16 },
  contador: { fontSize: 14, color: '#28613B', fontWeight: 'bold', marginBottom: 12 },
  lista: { flex: 1, marginBottom: 12 },
  listaContenido: { paddingBottom: 20, gap: 9 },
  ingrediente: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E3DCCF', padding: 14, borderRadius: 10 },
  ingredienteSeleccionado: { backgroundColor: '#E1F0E4', borderColor: '#28613B' },
  textoIngrediente: { fontSize: 16, color: '#514B43' },
  textoSeleccionado: { color: '#28613B', fontWeight: 'bold' },
  limpiar: { padding: 12, alignItems: 'center' },
  textoLimpiar: { color: '#8B3A32', fontSize: 14, fontWeight: '600' },
  tarjeta: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E3DCCF', gap: 9, marginBottom: 8 },
  nombreReceta: { fontSize: 19, fontWeight: 'bold', color: '#28613B' },
  porcentaje: { fontSize: 17, fontWeight: 'bold', color: '#28613B' },
  fondoProgreso: { height: 9, backgroundColor: '#E3DCCF', borderRadius: 5, overflow: 'hidden' },
  progreso: { height: '100%', backgroundColor: '#28613B' },
  texto: { fontSize: 15, color: '#514B43', lineHeight: 23 },
  faltantes: { color: '#A44B28', fontSize: 15, lineHeight: 23 },
  mensaje: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, color: '#514B43', lineHeight: 23 },
  etiqueta: { fontSize: 18, fontWeight: 'bold', color: '#28613B', marginTop: 18, marginBottom: 8 },
  disponible: { fontSize: 15, color: '#28613B', lineHeight: 24 },
});
