
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
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

const ingredientesDisponibles = [
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
    descripcion: 'Preparación tradicional mexicana a base de aguacate.',
    ingredientes: ['Aguacate', 'Tomate', 'Cebolla', 'Cilantro', 'Limón', 'Chile'],
    tiempo: '10 minutos',
    dificultad: 'Fácil',
    utensilios: ['Cuchillo', 'Tabla para cortar', 'Tenedor', 'Recipiente'],
    equipos: [],
  },
  {
    id: 3,
    nombre: 'Arroz rojo',
    descripcion: 'Arroz cocinado con tomate, ajo y cebolla.',
    ingredientes: ['Arroz', 'Tomate', 'Ajo', 'Cebolla'],
    tiempo: '30 minutos',
    dificultad: 'Media',
    utensilios: ['Cuchillo', 'Tabla para cortar', 'Olla', 'Cuchara'],
    equipos: ['Estufa', 'Licuadora'],
  },
  {
    id: 4,
    nombre: 'Quesadillas de queso',
    descripcion: 'Tortillas rellenas de queso y calentadas hasta derretirlo.',
    ingredientes: ['Tortillas', 'Queso'],
    tiempo: '10 minutos',
    dificultad: 'Fácil',
    utensilios: ['Espátula'],
    equipos: ['Estufa', 'Comal'],
  },
  {
    id: 5,
    nombre: 'Caldo de pollo con verduras',
    descripcion: 'Caldo casero de pollo acompañado de verduras.',
    ingredientes: ['Pollo', 'Papa', 'Zanahoria', 'Calabacita', 'Cebolla', 'Ajo'],
    tiempo: '60 minutos',
    dificultad: 'Media',
    utensilios: ['Cuchillo', 'Tabla para cortar', 'Olla', 'Cuchara'],
    equipos: ['Estufa'],
  },
  {
    id: 6,
    nombre: 'Frijoles guisados',
    descripcion: 'Frijoles preparados con un toque de ajo y cebolla.',
    ingredientes: ['Frijoles', 'Cebolla', 'Ajo'],
    tiempo: '20 minutos',
    dificultad: 'Fácil',
    utensilios: ['Olla', 'Cuchara', 'Cuchillo'],
    equipos: ['Estufa'],
  },
];

export default function App() {
  const [pantalla, setPantalla] = useState<Pantalla>('inicio');
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null);

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

  function alternarIngrediente(ingrediente: string) {
    setSeleccionados((actuales) =>
      actuales.includes(ingrediente)
        ? actuales.filter((item) => item !== ingrediente)
        : [...actuales, ingrediente]
    );
  }

  function buscarRecetas() {
    if (seleccionados.length === 0) {
      Alert.alert(
        'Selecciona ingredientes',
        'Elige al menos un ingrediente para buscar recetas.'
      );
      return;
    }

    setPantalla('resultados');
  }

  function mostrarDetalle(receta: Receta) {
    setRecetaSeleccionada(receta);
    setPantalla('detalle');
  }

  function volverAIngredientes() {
    setPantalla('ingredientes');
  }

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f8f2" />

      <ScrollView contentContainerStyle={estilos.contenido}>
        <Text style={estilos.titulo}>Recetas mexicanas</Text>

        {pantalla === 'inicio' && (
          <View style={estilos.seccion}>
            <Text style={estilos.subtitulo}>
              Prepara algo rico con lo que tienes en casa
            </Text>
            <Text style={estilos.texto}>
              Selecciona tus ingredientes y descubre recetas mexicanas que
              puedes preparar.
            </Text>

            <TouchableOpacity
              style={estilos.boton}
              onPress={() => setPantalla('ingredientes')}
            >
              <Text style={estilos.textoBoton}>Seleccionar ingredientes</Text>
            </TouchableOpacity>
          </View>
        )}

        {pantalla === 'ingredientes' && (
          <View style={estilos.seccion}>
            <Text style={estilos.subtitulo}>¿Qué ingredientes tienes?</Text>
            <Text style={estilos.texto}>
              Toca los ingredientes disponibles en casa.
            </Text>

            <View style={estilos.listaIngredientes}>
              {ingredientesDisponibles.map((ingrediente) => {
                const seleccionado = seleccionados.includes(ingrediente);

                return (
                  <TouchableOpacity
                    key={ingrediente}
                    style={[
                      estilos.ingrediente,
                      seleccionado && estilos.ingredienteSeleccionado,
                    ]}
                    onPress={() => alternarIngrediente(ingrediente)}
                  >
                    <Text
                      style={[
                        estilos.textoIngrediente,
                        seleccionado && estilos.textoIngredienteSeleccionado,
                      ]}
                    >
                      {seleccionado ? '✓ ' : '+ '}
                      {ingrediente}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={estilos.contador}>
              Ingredientes seleccionados: {seleccionados.length}
            </Text>

            <TouchableOpacity
              style={estilos.boton}
              onPress={buscarRecetas}
            >
              <Text style={estilos.textoBoton}>Buscar recetas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botonSecundario}
              onPress={() => setSeleccionados([])}
            >
              <Text style={estilos.textoBotonSecundario}>
                Limpiar selección
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPantalla('inicio')}>
              <Text style={estilos.enlace}>Volver al inicio</Text>
            </TouchableOpacity>
          </View>
        )}

        {pantalla === 'resultados' && (
          <View style={estilos.seccion}>
            <Text style={estilos.subtitulo}>Recetas recomendadas</Text>
            <Text style={estilos.texto}>
              Ordenadas de mayor a menor coincidencia con tus ingredientes.
            </Text>

            {resultados.length === 0 ? (
              <Text style={estilos.mensaje}>
                No encontramos recetas con los ingredientes seleccionados.
                Prueba con otros ingredientes.
              </Text>
            ) : (
              resultados.map(({ receta, disponibles, faltantes, porcentaje }) => (
                <View key={receta.id} style={estilos.tarjeta}>
                  <Text style={estilos.nombreReceta}>{receta.nombre}</Text>
                  <Text style={estilos.porcentaje}>{porcentaje}% de coincidencia</Text>
                  <View style={estilos.fondoProgreso}>
                    <View
                      style={[estilos.progreso, { width: `${porcentaje}%` }]}
                    />
                  </View>
                  <Text style={estilos.texto}>
                    Tiempo: {receta.tiempo} · Dificultad: {receta.dificultad}
                  </Text>
                  <Text style={estilos.texto}>
                    Tienes: {disponibles.length > 0 ? disponibles.join(', ') : 'Ninguno'}
                  </Text>
                  <Text style={estilos.faltantes}>
                    Te faltan: {faltantes.length > 0 ? faltantes.join(', ') : 'Ninguno'}
                  </Text>

                  <TouchableOpacity
                    style={estilos.boton}
                    onPress={() => mostrarDetalle(receta)}
                  >
                    <Text style={estilos.textoBoton}>Ver detalle</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}

            <TouchableOpacity
              style={estilos.botonSecundario}
              onPress={volverAIngredientes}
            >
              <Text style={estilos.textoBotonSecundario}>
                Cambiar ingredientes
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {pantalla === 'detalle' && recetaSeleccionada && (
          <View style={estilos.seccion}>
            <Text style={estilos.subtitulo}>{recetaSeleccionada.nombre}</Text>
            <Text style={estilos.texto}>{recetaSeleccionada.descripcion}</Text>
            <Text style={estilos.etiqueta}>Ingredientes necesarios</Text>

            {recetaSeleccionada.ingredientes.map((ingrediente) => {
              const loTiene = seleccionados.includes(ingrediente);

              return (
                <Text
                  key={ingrediente}
                  style={loTiene ? estilos.disponible : estilos.faltante}
                >
                  {loTiene ? '✓ Tienes: ' : '• Te falta: '}
                  {ingrediente}
                </Text>
              );
            })}

            <Text style={estilos.etiqueta}>Utensilios</Text>
            <Text style={estilos.texto}>
              {recetaSeleccionada.utensilios.join(', ')}
            </Text>

            <Text style={estilos.etiqueta}>Equipos necesarios</Text>
            <Text style={estilos.texto}>
              {recetaSeleccionada.equipos.length > 0
                ? recetaSeleccionada.equipos.join(', ')
                : 'No se requiere equipo eléctrico especial.'}
            </Text>

            <Text style={estilos.texto}>
              Tiempo: {recetaSeleccionada.tiempo}
            </Text>
            <Text style={estilos.texto}>
              Dificultad: {recetaSeleccionada.dificultad}
            </Text>

            <TouchableOpacity
              style={estilos.boton}
              onPress={() => setPantalla('resultados')}
            >
              <Text style={estilos.textoBoton}>Volver a las recetas</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f8f2',
  },
  contenido: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#245c36',
    textAlign: 'center',
    marginVertical: 20,
  },
  seccion: {
    gap: 14,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#245c36',
  },
  texto: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 23,
  },
  boton: {
    backgroundColor: '#2e7d46',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonSecundario: {
    backgroundColor: '#e3eee4',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonSecundario: {
    color: '#245c36',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listaIngredientes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingrediente: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b7cbb9',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  ingredienteSeleccionado: {
    backgroundColor: '#2e7d46',
    borderColor: '#2e7d46',
  },
  textoIngrediente: {
    color: '#245c36',
    fontSize: 14,
  },
  textoIngredienteSeleccionado: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  contador: {
    color: '#245c36',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#d8e5d8',
    marginTop: 6,
  },
  nombreReceta: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#245c36',
  },
  porcentaje: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2e7d46',
  },
  fondoProgreso: {
    height: 9,
    backgroundColor: '#e1e8e1',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progreso: {
    height: '100%',
    backgroundColor: '#2e7d46',
  },
  faltantes: {
    color: '#b45309',
    fontSize: 14,
  },
  mensaje: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    color: '#374151',
    lineHeight: 23,
  },
  enlace: {
    textAlign: 'center',
    color: '#245c36',
    fontWeight: 'bold',
    padding: 12,
  },
  etiqueta: {
    color: '#245c36',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
  },
  disponible: {
    color: '#24743b',
    fontSize: 15,
    lineHeight: 23,
  },
  faltante: {
    color: '#b45309',
    fontSize: 15,
    lineHeight: 23,
  },
});
