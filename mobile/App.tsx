import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { INGREDIENTES_DISPONIBLES, RECETAS, type Receta } from './src/data/recetas';

type Pantalla = 'inicio' | 'ingredientes' | 'resultados' | 'detalle';

type ResultadoReceta = Receta & {
  porcentaje: number;
  disponibles: string[];
  faltantes: string[];
};

export default function App() {
  const { width } = useWindowDimensions();
  const pantallaAncha = width >= 600;

  const [pantalla, setPantalla] = useState<Pantalla>('inicio');
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<
    string[]
  >([]);
  const [recetaSeleccionada, setRecetaSeleccionada] =
    useState<ResultadoReceta | null>(null);
  const [resultadosAPI, setResultadosAPI] = useState<ResultadoReceta[]>([]);
  const [cargando, setCargando] = useState(false);
  const [busquedaIngrediente, setBusquedaIngrediente] = useState('');
  const [catalogoLocal, setCatalogoLocal] = useState(false);

  const getBackendUrl = () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (apiUrl) {
      return apiUrl.replace(/\/$/, '');
    }

    const debuggerHost = Constants.expoConfig?.hostUri;
    const host = debuggerHost?.split(':')[0];

    if (host) {
      return `http://${host}:3000`;
    }

    throw new Error(
      'No se pudo determinar la dirección del backend. Configura EXPO_PUBLIC_API_URL.'
    );
  };

  const volver = () => {
    if (pantalla === 'detalle') {
      setPantalla('resultados');
      return true;
    }

    if (pantalla === 'resultados') {
      setPantalla('ingredientes');
      return true;
    }

    if (pantalla === 'ingredientes') {
      setPantalla('inicio');
      return true;
    }

    return false;
  };

  useEffect(() => {
    const suscripcion = BackHandler.addEventListener(
      'hardwareBackPress',
      volver,
    );

    return () => suscripcion.remove();
  }, [pantalla]);

  const alternarIngrediente = (ingrediente: string) => {
    setIngredientesSeleccionados((actuales) => {
      if (actuales.includes(ingrediente)) {
        return actuales.filter((item) => item !== ingrediente);
      }

      return [...actuales, ingrediente];
    });
  };

  const limpiarIngredientes = () => {
    setIngredientesSeleccionados([]);
    setBusquedaIngrediente('');
  };

  const crearResultadoLocal = (receta: Receta): ResultadoReceta => {
    const disponibles = receta.ingredientes
      .filter((ingrediente) => ingredientesSeleccionados.includes(ingrediente.nombre))
      .map((ingrediente) => ingrediente.nombre);
    const faltantes = receta.ingredientes
      .filter((ingrediente) => !ingredientesSeleccionados.includes(ingrediente.nombre))
      .map((ingrediente) => ingrediente.nombre);

    return {
      ...receta,
      id: -receta.id,
      porcentaje: Math.round((disponibles.length / receta.ingredientes.length) * 100),
      disponibles,
      faltantes,
    };
  };

  const buscarRecetas = async () => {
    if (ingredientesSeleccionados.length === 0) {
      Alert.alert(
        'Selecciona ingredientes',
        'Debes seleccionar al menos un ingrediente para buscar recetas.',
      );
      return;
    }

    setCargando(true);
    const resultadosLocales = RECETAS.map(crearResultadoLocal);
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), 6000);

    try {
      const respuesta = await fetch(
        `${getBackendUrl()}/api/recomendaciones`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredientes: ingredientesSeleccionados }),
          signal: controlador.signal,
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje ?? 'No fue posible obtener las recomendaciones.',
        );
      }

      const recomendacionesServidor = (datos.recomendaciones ?? []).map(
        (item: {
          id_receta: number;
          nombre: string;
          descripcion: string | null;
          tiempo_preparacion: number | null;
          dificultad: string | null;
          porcentajeCoincidencia: number;
          preparacion?: string[];
          utensilios?: string[];
          equipos?: string[];
          fuente_url?: string | null;
        }) => ({ nombre: item.nombre, item }),
      );

      const recetasServidor = new Map(
        recomendacionesServidor.map(({ nombre, item }: { nombre: string; item: Record<string, unknown> }) => [
          nombre.toLocaleLowerCase('es-MX'), item,
        ]),
      );
      const catalogoParcial = recetasServidor.size < RECETAS.length;
      const resultados = resultadosLocales.map((local) => {
        const servidor = recetasServidor.get(local.nombre.toLocaleLowerCase('es-MX')) as
          | {
              id_receta: number;
              porcentajeCoincidencia: number;
              preparacion?: string[];
              utensilios?: string[];
              equipos?: string[];
              fuente_url?: string | null;
            }
          | undefined;

        if (!servidor) return local;
        return {
          ...local,
          id: servidor.id_receta,
          porcentaje: catalogoParcial
            ? local.porcentaje
            : servidor.porcentajeCoincidencia,
          preparacion: servidor.preparacion?.length ? servidor.preparacion : local.preparacion,
          utensilios: servidor.utensilios?.length ? servidor.utensilios : local.utensilios,
          equipos: servidor.equipos?.length ? servidor.equipos : local.equipos,
          fuenteUrl: servidor.fuente_url ?? local.fuenteUrl,
        };
      });
      const resultadosConCoincidencia = resultados.filter((resultado) => resultado.porcentaje > 0);
      resultadosConCoincidencia.sort((a, b) => b.porcentaje - a.porcentaje || a.nombre.localeCompare(b.nombre, 'es-MX'));
      setCatalogoLocal(catalogoParcial);
      setResultadosAPI(resultadosConCoincidencia);
      setPantalla('resultados');
    } catch {
      const resultadosConCoincidencia = resultadosLocales
        .filter((resultado) => resultado.porcentaje > 0)
        .sort((a, b) => b.porcentaje - a.porcentaje || a.nombre.localeCompare(b.nombre, 'es-MX'));
      setResultadosAPI(resultadosConCoincidencia);
      setCatalogoLocal(true);
      setPantalla('resultados');
    } finally {
      clearTimeout(temporizador);
      setCargando(false);
    }
  };

  const abrirDetalle = (receta: ResultadoReceta) => {
    setRecetaSeleccionada(receta);
    setPantalla('detalle');
  };

  const botonRegreso = (
    texto: string,
    accion: () => void,
  ) => (
    <TouchableOpacity
      onPress={accion}
      style={styles.botonRegreso}
      activeOpacity={0.65}
      accessibilityRole="button"
      accessibilityLabel={texto}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.iconoRegreso}>‹</Text>
      <Text style={styles.textoRegreso}>{texto}</Text>
    </TouchableOpacity>
  );

  const encabezado = (
    titulo: string,
    subtitulo: string,
  ) => (
    <View style={styles.encabezado}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );

  const ingredientesFiltrados = INGREDIENTES_DISPONIBLES.filter((ingrediente) =>
    `${ingrediente.nombre} ${ingrediente.categoria}`
      .toLocaleLowerCase('es-MX')
      .includes(busquedaIngrediente.trim().toLocaleLowerCase('es-MX')),
  );

  const mostrarInicio = () => (
    <ScrollView
      contentContainerStyle={styles.contenidoInicio}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconoPrincipal}>
        <Text style={styles.emojiPrincipal}>🌮</Text>
      </View>

      <Text style={styles.tituloInicio}>Recetas mexicanas</Text>

      <View style={styles.resumenInicio}>
        <View style={styles.datoInicio}>
          <Text style={styles.numeroInicio}>{RECETAS.length}</Text>
          <Text style={styles.etiquetaInicio}>recetas</Text>
        </View>
        <View style={styles.separadorInicio} />
        <View style={styles.datoInicio}>
          <Text style={styles.numeroInicio}>{INGREDIENTES_DISPONIBLES.length}</Text>
          <Text style={styles.etiquetaInicio}>ingredientes</Text>
        </View>
      </View>

      <Text style={styles.descripcionInicio}>
        Descubre qué puedes cocinar con los ingredientes que tienes en casa.
      </Text>

      <View style={styles.tarjetaInformativa}>
        <Text style={styles.tituloTarjeta}>
          ¿Qué puedes hacer con esta aplicación?
        </Text>

        <Text style={styles.textoInformativo}>
          • Seleccionar los ingredientes que tienes disponibles.
        </Text>

        <Text style={styles.textoInformativo}>
          • Encontrar recetas de la gastronomía mexicana.
        </Text>

        <Text style={styles.textoInformativo}>
          • Consultar qué ingredientes te faltan.
        </Text>

        <Text style={styles.textoInformativo}>
          • Conocer los utensilios y equipos necesarios.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botonPrincipal}
        onPress={() => setPantalla('ingredientes')}
        activeOpacity={0.75}
        accessibilityRole="button"
      >
        <Text style={styles.textoBotonPrincipal}>Comenzar</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const mostrarIngredientes = () => (
    <View style={styles.contenedorPantalla}>
      {botonRegreso('Volver al inicio', () => setPantalla('inicio'))}

      {encabezado(
        'Mis ingredientes',
        'Selecciona los ingredientes que tienes disponibles.',
      )}

      <View style={styles.resumenSeleccion}>
        <Text style={styles.textoResumen}>
          Ingredientes seleccionados: {ingredientesSeleccionados.length}
        </Text>

        <TouchableOpacity
          onPress={limpiarIngredientes}
          disabled={ingredientesSeleccionados.length === 0}
          style={[
            styles.botonLimpiar,
            ingredientesSeleccionados.length === 0 &&
              styles.botonDeshabilitado,
          ]}
          activeOpacity={0.7}
          accessibilityRole="button"
        >
          <Text style={styles.textoBotonLimpiar}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={busquedaIngrediente}
        onChangeText={setBusquedaIngrediente}
        placeholder="Busca un ingrediente, por ejemplo: chile"
        placeholderTextColor="#8B958B"
        style={styles.campoBusqueda}
        accessibilityLabel="Buscar ingredientes"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      <Text style={styles.textoAyudaIngredientes}>
        {ingredientesFiltrados.length} ingredientes disponibles · {RECETAS.length} recetas mexicanas
      </Text>

      <ScrollView
        style={styles.listaDesplazable}
        contentContainerStyle={styles.listaIngredientes}
        showsVerticalScrollIndicator={false}
      >
        {ingredientesFiltrados.length === 0 ? (
          <Text style={styles.textoSinIngredientes}>
            No hay ingredientes con ese nombre. Prueba otra búsqueda.
          </Text>
        ) : ingredientesFiltrados.map((ingrediente) => {
          const seleccionado =
            ingredientesSeleccionados.includes(ingrediente.nombre);

          return (
            <TouchableOpacity
              key={ingrediente.nombre}
              onPress={() => alternarIngrediente(ingrediente.nombre)}
              style={[
                styles.botonIngrediente,
                pantallaAncha && styles.botonIngredienteAncho,
                seleccionado && styles.ingredienteSeleccionado,
              ]}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: seleccionado }}
            >
              <Text
                style={[
                  styles.textoIngrediente,
                  seleccionado && styles.textoIngredienteSeleccionado,
                ]}
              >
                {seleccionado ? '✓  ' : '+  '}
                {ingrediente.nombre}
              </Text>
              <Text style={styles.categoriaIngrediente}>{ingrediente.categoria}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.piePantalla}>
        <TouchableOpacity
          style={[
            styles.botonPrincipal,
            (cargando || ingredientesSeleccionados.length === 0) &&
              styles.botonDeshabilitado,
          ]}
          onPress={buscarRecetas}
          disabled={cargando || ingredientesSeleccionados.length === 0}
          activeOpacity={0.75}
          accessibilityRole="button"
        >
          {cargando ? (
            <View style={styles.filaCargando}>
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.textoBotonPrincipal}>Buscando recetas...</Text>
            </View>
          ) : (
            <Text style={styles.textoBotonPrincipal}>
              Buscar recetas ({ingredientesSeleccionados.length})
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const mostrarResultados = () => {
    const resultados = resultadosAPI;

    return (
      <View style={styles.contenedorPantalla}>
        {botonRegreso('Volver a ingredientes', () =>
          setPantalla('ingredientes'),
        )}

        {encabezado(
          'Recetas recomendadas',
          'Estas recetas se ordenan según los ingredientes que tienes.',
        )}

        {catalogoLocal && (
          <View style={styles.avisoCatalogoLocal}>
            <Text style={styles.textoAvisoCatalogo}>
              Catálogo listo en tu dispositivo. Algunas recetas se muestran desde la app mientras se completa la sincronización con el servidor.
            </Text>
          </View>
        )}

        <Text style={styles.textoCantidad}>
          {resultados.length === 1
            ? 'Se encontró 1 receta.'
            : `Se encontraron ${resultados.length} recetas.`}
        </Text>

        {resultados.length === 0 ? (
          <View style={styles.mensajeVacio}>
            <Text style={styles.emojiVacio}>🥑</Text>

            <Text style={styles.tituloMensajeVacio}>
              No encontramos recetas
            </Text>

            <Text style={styles.textoMensajeVacio}>
              Prueba seleccionando otros ingredientes para encontrar más
              opciones.
            </Text>

            <TouchableOpacity
              style={styles.botonPrincipal}
              onPress={() => setPantalla('ingredientes')}
              activeOpacity={0.75}
              accessibilityRole="button"
            >
              <Text style={styles.textoBotonPrincipal}>
                Cambiar ingredientes
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            style={styles.listaDesplazable}
            contentContainerStyle={styles.listaResultados}
            showsVerticalScrollIndicator={false}
          >
            {resultados.map((receta) => (
              <View key={receta.id} style={styles.tarjetaReceta}>
                <View style={styles.filaTituloReceta}>
                  <View style={styles.infoTituloReceta}>
                    <Text style={styles.nombreReceta}>{receta.nombre}</Text>

                    <Text style={styles.descripcionReceta}>
                      {receta.descripcion}
                    </Text>
                  </View>

                  <View style={styles.etiquetaPorcentaje}>
                    <Text style={styles.numeroPorcentaje}>
                      {receta.porcentaje}%
                    </Text>
                    <Text style={styles.textoCoincidencia}>Coincidencia</Text>
                  </View>
                </View>

                <View style={styles.barraFondo}>
                  <View
                    style={[
                      styles.barraProgreso,
                      { width: `${receta.porcentaje}%` },
                    ]}
                  />
                </View>

                <Text style={styles.datoReceta}>
                  ⏱ Tiempo: {receta.tiempoMin} min
                </Text>

                <Text style={styles.datoReceta}>
                  Dificultad: {receta.dificultad}
                </Text>

                <Text style={styles.tituloLista}>
                  ✓ Ingredientes que tienes ({receta.disponibles.length})
                </Text>

                <Text style={styles.listaTexto}>
                  {receta.disponibles.join(', ')}
                </Text>

                <Text style={styles.tituloFaltantes}>
                  ! Ingredientes que te faltan ({receta.faltantes.length})
                </Text>

                <Text style={styles.listaTexto}>
                  {receta.faltantes.length > 0
                    ? receta.faltantes.join(', ')
                    : '¡Tienes todos los ingredientes!'}
                </Text>

                <TouchableOpacity
                  style={styles.botonDetalle}
                  onPress={() => abrirDetalle(receta)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                >
                  <Text style={styles.textoBotonDetalle}>
                    Ver detalle de la receta →
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  const mostrarDetalle = () => {
    if (!recetaSeleccionada) {
      return (
        <View style={styles.contenedorPantalla}>
          {botonRegreso('Volver a recetas', () =>
            setPantalla('resultados'),
          )}

          <Text style={styles.textoMensajeVacio}>
            No se ha seleccionado ninguna receta.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.contenedorPantalla}>
        {botonRegreso('Volver a recetas', () =>
          setPantalla('resultados'),
        )}

        <ScrollView
          style={styles.listaDesplazable}
          contentContainerStyle={styles.contenidoDetalle}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.tituloDetalle}>
            {recetaSeleccionada.nombre}
          </Text>

          <Text style={styles.descripcionDetalle}>
            {recetaSeleccionada.descripcion}
          </Text>

          <View style={styles.tarjetaDatosDetalle}>
            <View style={styles.datoDetalle}>
              <Text style={styles.iconoDato}>⏱</Text>
              <Text style={styles.etiquetaDato}>Tiempo</Text>
              <Text style={styles.valorDato}>
                {recetaSeleccionada.tiempoMin} min
              </Text>
            </View>

            <View style={styles.datoDetalle}>
              <Text style={styles.iconoDato}>👨‍🍳</Text>
              <Text style={styles.etiquetaDato}>Dificultad</Text>
              <Text style={styles.valorDato}>
                {recetaSeleccionada.dificultad}
              </Text>
            </View>

            <View style={styles.datoDetalle}>
              <Text style={styles.iconoDato}>✓</Text>
              <Text style={styles.etiquetaDato}>Coincidencia</Text>
              <Text style={styles.valorDato}>
                {recetaSeleccionada.porcentaje}%
              </Text>
            </View>
          </View>

          <View style={styles.seccionDetalle}>
            <Text style={styles.tituloSeccion}>Ingredientes</Text>

            {recetaSeleccionada.ingredientes.map((ingrediente) => {
              const loTienes = recetaSeleccionada.disponibles.includes(ingrediente.nombre);
              return (
                <View key={ingrediente.nombre} style={styles.filaIngredienteDetalle}>
                  <Text style={[styles.elementoLista, !loTienes && styles.elementoFaltante]}>
                    {loTienes ? '✓' : '＋'} {ingrediente.nombre}
                  </Text>
                  <Text style={styles.cantidadIngrediente}>{ingrediente.cantidad}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.seccionDetalle}>
            <Text style={styles.tituloSeccion}>Ingredientes faltantes</Text>

            {recetaSeleccionada.faltantes.length > 0 ? (
              recetaSeleccionada.faltantes.map((ingrediente) => (
                <Text key={ingrediente} style={styles.elementoFaltante}>
                  • {ingrediente}
                </Text>
              ))
            ) : (
              <Text style={styles.elementoLista}>
                ¡No te falta ningún ingrediente!
              </Text>
            )}
          </View>

          <View style={styles.seccionDetalle}>
            <Text style={styles.tituloSeccion}>Preparación</Text>
            {recetaSeleccionada.preparacion.map((paso, indice) => (
              <View key={`${recetaSeleccionada.id}-paso-${indice}`} style={styles.filaPaso}>
                <Text style={styles.numeroPaso}>{indice + 1}</Text>
                <Text style={styles.textoPaso}>{paso}</Text>
              </View>
            ))}
          </View>

          <View style={styles.seccionDetalle}>
            <Text style={styles.tituloSeccion}>Utensilios necesarios</Text>

            {recetaSeleccionada.utensilios.map((utensilio) => (
              <Text key={utensilio} style={styles.elementoLista}>
                • {utensilio}
              </Text>
            ))}
          </View>

          {recetaSeleccionada.fuenteUrl && (
            <TouchableOpacity
              onPress={() => Linking.openURL(recetaSeleccionada.fuenteUrl!).catch(() =>
                Alert.alert('No se pudo abrir el enlace', 'Revisa tu conexión e inténtalo nuevamente.'),
              )}
              style={styles.botonFuente}
              activeOpacity={0.75}
              accessibilityRole="link"
            >
              <Text style={styles.textoBotonFuente}>Consultar la fuente de la receta ↗</Text>
            </TouchableOpacity>
          )}

          <View style={styles.seccionDetalle}>
            <Text style={styles.tituloSeccion}>
              Equipos y dispositivos necesarios
            </Text>

            {recetaSeleccionada.equipos.length > 0 ? (
              recetaSeleccionada.equipos.map((equipo) => (
                <Text key={equipo} style={styles.elementoLista}>
                  • {equipo}
                </Text>
              ))
            ) : (
              <Text style={styles.textoSecundario}>
                Esta receta no requiere equipos eléctricos específicos.
              </Text>
            )}

            <Text style={styles.notaDetalle}>
              La aplicación indica los equipos necesarios para preparar la
              receta, pero no comprueba si están disponibles en tu casa.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={() => setPantalla('ingredientes')}
            activeOpacity={0.75}
            accessibilityRole="button"
          >
            <Text style={styles.textoBotonPrincipal}>
              Elegir otros ingredientes
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {pantalla === 'inicio' && mostrarInicio()}
      {pantalla === 'ingredientes' && mostrarIngredientes()}
      {pantalla === 'resultados' && mostrarResultados()}
      {pantalla === 'detalle' && mostrarDetalle()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8F2',
  },

  contenedorPantalla: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
  },

  contenidoInicio: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 30,
  },

  iconoPrincipal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E4F2DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  emojiPrincipal: {
    fontSize: 52,
  },

  tituloInicio: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#246B45',
    textAlign: 'center',
    marginBottom: 12,
  },

  descripcionInicio: {
    fontSize: 16,
    color: '#505B52',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 26,
    maxWidth: 500,
  },

  resumenInicio: {
    width: '100%',
    maxWidth: 360,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF2E6',
    borderRadius: 16,
    paddingVertical: 15,
    marginBottom: 18,
  },

  datoInicio: {
    alignItems: 'center',
    flex: 1,
  },

  numeroInicio: {
    color: '#246B45',
    fontSize: 22,
    fontWeight: 'bold',
  },

  etiquetaInicio: {
    color: '#58645A',
    fontSize: 12,
    marginTop: 2,
  },

  separadorInicio: {
    height: 34,
    width: 1,
    backgroundColor: '#C8D9C5',
  },

  tarjetaInformativa: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E8DC',
  },

  tituloTarjeta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#246B45',
    marginBottom: 14,
  },

  textoInformativo: {
    fontSize: 15,
    color: '#3F4941',
    lineHeight: 24,
    marginBottom: 6,
  },

  botonPrincipal: {
    width: '100%',
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#267348',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginVertical: 8,
  },

  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  botonRegreso: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    minHeight: 50,
    minWidth: 48,
    maxWidth: '100%',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#E4F2DF',
  },

  iconoRegreso: {
    fontSize: 32,
    lineHeight: 34,
    color: '#246B45',
    marginRight: 8,
    fontWeight: 'bold',
  },

  textoRegreso: {
    color: '#246B45',
    fontSize: 15,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  encabezado: {
    marginBottom: 16,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#246B45',
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 15,
    color: '#58645A',
    lineHeight: 22,
  },

  resumenSeleccion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },

  textoResumen: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#35473A',
    flexShrink: 1,
  },

  botonLimpiar: {
    minHeight: 42,
    minWidth: 80,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FBE9E7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botonDeshabilitado: {
    opacity: 0.45,
  },

  textoBotonLimpiar: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A33B32',
  },

  listaDesplazable: {
    flex: 1,
  },

  campoBusqueda: {
    minHeight: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1D6',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#26372D',
    marginBottom: 6,
  },

  textoAyudaIngredientes: {
    fontSize: 12,
    color: '#667268',
    marginBottom: 12,
  },

  textoSinIngredientes: {
    width: '100%',
    paddingVertical: 24,
    color: '#58645A',
    textAlign: 'center',
    lineHeight: 22,
  },

  listaIngredientes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },

  botonIngrediente: {
    width: '48%',
    minHeight: 66,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1D6',
  },

  botonIngredienteAncho: {
    width: '31.5%',
  },

  ingredienteSeleccionado: {
    backgroundColor: '#DFF1E2',
    borderColor: '#267348',
    borderWidth: 2,
  },

  textoIngrediente: {
    fontSize: 14,
    color: '#37433A',
    fontWeight: '500',
  },

  textoIngredienteSeleccionado: {
    color: '#246B45',
    fontWeight: 'bold',
  },

  categoriaIngrediente: {
    marginTop: 3,
    marginLeft: 24,
    color: '#7A857C',
    fontSize: 11,
  },

  filaCargando: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  piePantalla: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F7F8F2',
  },

  textoCantidad: {
    fontSize: 14,
    color: '#58645A',
    marginBottom: 12,
  },

  avisoCatalogoLocal: {
    backgroundColor: '#FFF3D6',
    borderColor: '#E9D79E',
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  textoAvisoCatalogo: {
    color: '#6E5A27',
    fontSize: 12,
    lineHeight: 18,
  },

  listaResultados: {
    paddingBottom: 24,
  },

  tarjetaReceta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E8DC',
    padding: 16,
    marginBottom: 16,
  },

  filaTituloReceta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },

  infoTituloReceta: {
    flex: 1,
  },

  nombreReceta: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#246B45',
    marginBottom: 6,
  },

  descripcionReceta: {
    fontSize: 14,
    lineHeight: 21,
    color: '#59635B',
  },

  etiquetaPorcentaje: {
    backgroundColor: '#E4F2DF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 78,
  },

  numeroPorcentaje: {
    color: '#246B45',
    fontSize: 20,
    fontWeight: 'bold',
  },

  textoCoincidencia: {
    color: '#246B45',
    fontSize: 10,
    textAlign: 'center',
  },

  barraFondo: {
    height: 8,
    backgroundColor: '#E8ECE6',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 14,
  },

  barraProgreso: {
    height: '100%',
    backgroundColor: '#33945A',
    borderRadius: 10,
  },

  datoReceta: {
    fontSize: 14,
    color: '#475349',
    marginBottom: 6,
  },

  tituloLista: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#267348',
    marginTop: 12,
    marginBottom: 5,
  },

  tituloFaltantes: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B45B37',
    marginTop: 8,
    marginBottom: 5,
  },

  listaTexto: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4D584F',
  },

  botonDetalle: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#267348',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 16,
  },

  textoBotonDetalle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  mensajeVacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 40,
  },

  emojiVacio: {
    fontSize: 48,
    marginBottom: 14,
  },

  tituloMensajeVacio: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#246B45',
    textAlign: 'center',
    marginBottom: 10,
  },

  textoMensajeVacio: {
    fontSize: 15,
    lineHeight: 23,
    color: '#58645A',
    textAlign: 'center',
    marginBottom: 18,
  },

  contenidoDetalle: {
    paddingBottom: 30,
  },

  tituloDetalle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#246B45',
    marginBottom: 10,
  },

  descripcionDetalle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#58645A',
    marginBottom: 20,
  },

  tarjetaDatosDetalle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E8DC',
  },

  datoDetalle: {
    flexGrow: 1,
    flexBasis: '30%',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 10,
  },

  iconoDato: {
    fontSize: 23,
    color: '#267348',
    marginBottom: 5,
  },

  etiquetaDato: {
    fontSize: 12,
    color: '#58645A',
    textAlign: 'center',
    marginBottom: 4,
  },

  valorDato: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#246B45',
    textAlign: 'center',
  },

  seccionDetalle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E0E8DC',
  },

  filaIngredienteDetalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 3,
    gap: 12,
  },

  cantidadIngrediente: {
    maxWidth: '42%',
    color: '#69746B',
    fontSize: 13,
    lineHeight: 24,
    textAlign: 'right',
  },

  filaPaso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },

  numeroPaso: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E4F2DF',
    color: '#246B45',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  textoPaso: {
    flex: 1,
    color: '#46534A',
    fontSize: 14,
    lineHeight: 22,
  },

  botonFuente: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#267348',
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 14,
  },

  textoBotonFuente: {
    color: '#267348',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#246B45',
    marginBottom: 12,
  },

  elementoLista: {
    fontSize: 15,
    lineHeight: 25,
    color: '#267348',
    marginBottom: 3,
  },

  elementoFaltante: {
    fontSize: 15,
    lineHeight: 25,
    color: '#B45B37',
    marginBottom: 3,
  },

  textoSecundario: {
    fontSize: 14,
    lineHeight: 22,
    color: '#58645A',
  },

  notaDetalle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#58645A',
    marginTop: 12,
    fontStyle: 'italic',
  },
});
