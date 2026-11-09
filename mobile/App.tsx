import React, { useCallback, useEffect, useState } from 'react';
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
import {
  CATEGORIAS_RECETA,
  INGREDIENTES_DISPONIBLES,
  RECETAS,
  type CategoriaReceta,
  type Receta,
} from './src/data/recetas';

type Pantalla = 'inicio' | 'ingredientes' | 'resultados' | 'detalle' | 'catalogo' | 'opiniones' | 'contacto';
type DificultadReceta = Receta['dificultad'];
type Opinion = {
  id_opinion: number;
  nombre_receta: string | null;
  nombre_usuario: string;
  calificacion: number;
  comentario: string;
  creado_en: string;
};

const ICONO_CATEGORIA: Record<CategoriaReceta, string> = {
  Desayuno: '☀️',
  Comida: '🍽️',
  Cena: '🌙',
  Entrada: '🥣',
  Postre: '🍮',
  Acompañamiento: '🥗',
};

const getBackendUrl = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  if (apiUrl) return apiUrl.replace(/\/$/, '');

  const debuggerHost = Constants.expoConfig?.hostUri;
  const host = debuggerHost?.split(':')[0];
  if (host) return `http://${host}:3000`;

  throw new Error('No se pudo determinar la dirección del backend. Configura EXPO_PUBLIC_API_URL.');
};

const fetchConTiempo = async (url: string, init?: RequestInit) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

type ResultadoReceta = Receta & {
  porcentaje: number;
  disponibles: string[];
  faltantes: string[];
};

export default function App() {
  const { width } = useWindowDimensions();
  const pantallaAncha = width >= 600;

  const [pantalla, setPantalla] = useState<Pantalla>('inicio');
  const [pantallaAnterior, setPantallaAnterior] = useState<Pantalla>('inicio');
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<
    string[]
  >([]);
  const [recetaSeleccionada, setRecetaSeleccionada] =
    useState<ResultadoReceta | null>(null);
  const [resultadosAPI, setResultadosAPI] = useState<ResultadoReceta[]>([]);
  const [cargando, setCargando] = useState(false);
  const [busquedaIngrediente, setBusquedaIngrediente] = useState('');
  const [catalogoLocal, setCatalogoLocal] = useState(false);
  const [busquedaCatalogo, setBusquedaCatalogo] = useState('');
  const [ingredienteFiltro, setIngredienteFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<CategoriaReceta | 'Todas'>('Todas');
  const [dificultadFiltro, setDificultadFiltro] = useState<DificultadReceta | 'Todas'>('Todas');
  const [tiempoFiltro, setTiempoFiltro] = useState<number | null>(null);
  const [ordenCatalogo, setOrdenCatalogo] = useState<'Recomendadas' | 'Más rápidas' | 'A-Z'>('Recomendadas');
  const [recetaDestacada, setRecetaDestacada] = useState<Receta>(RECETAS[0]);
  const [pasosCompletados, setPasosCompletados] = useState<number[]>([]);
  const [ingredientesRevisados, setIngredientesRevisados] = useState<string[]>([]);
  const [recetaOpinion, setRecetaOpinion] = useState<Receta | null>(null);
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [promedioOpiniones, setPromedioOpiniones] = useState(0);
  const [cargandoOpiniones, setCargandoOpiniones] = useState(false);
  const [enviandoOpinion, setEnviandoOpinion] = useState(false);
  const [nombreOpinion, setNombreOpinion] = useState('');
  const [textoOpinion, setTextoOpinion] = useState('');
  const [calificacionOpinion, setCalificacionOpinion] = useState(5);
  const [estadoOpinion, setEstadoOpinion] = useState('');
  const [nombreContacto, setNombreContacto] = useState('');
  const [correoContacto, setCorreoContacto] = useState('');
  const [mensajeContacto, setMensajeContacto] = useState('');
  const [enviandoContacto, setEnviandoContacto] = useState(false);
  const [estadoContacto, setEstadoContacto] = useState('');

  const cargarOpiniones = useCallback(async () => {
    setCargandoOpiniones(true);
    setEstadoOpinion('');
    try {
      const query = recetaOpinion
        ? `?receta=${encodeURIComponent(recetaOpinion.nombre)}`
        : '';
      const respuesta = await fetchConTiempo(`${getBackendUrl()}/api/opiniones${query}`);
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.mensaje ?? 'No se pudieron cargar las opiniones.');
      setOpiniones(datos.opiniones ?? []);
      setPromedioOpiniones(Number(datos.promedio) || 0);
    } catch {
      setOpiniones([]);
      setPromedioOpiniones(0);
      setEstadoOpinion('No se pudieron cargar las opiniones. Revisa tu conexión con el servidor.');
    } finally {
      setCargandoOpiniones(false);
    }
  }, [recetaOpinion]);

  useEffect(() => {
    if (pantalla === 'opiniones') void cargarOpiniones();
  }, [pantalla, cargarOpiniones]);

  const volver = useCallback(() => {
    if (pantalla === 'detalle') {
      setPantalla(pantallaAnterior);
      return true;
    }

    if (pantalla === 'opiniones' || pantalla === 'contacto') {
      setPantalla(pantallaAnterior);
      return true;
    }

    if (pantalla === 'catalogo') {
      setPantalla('inicio');
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
  }, [pantalla, pantallaAnterior]);

  useEffect(() => {
    const suscripcion = BackHandler.addEventListener(
      'hardwareBackPress',
      volver,
    );

    return () => suscripcion.remove();
  }, [volver]);

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
    const faltantes = ingredientesSeleccionados.length === 0
      ? []
      : receta.ingredientes
        .filter((ingrediente) => !ingredientesSeleccionados.includes(ingrediente.nombre))
        .map((ingrediente) => ingrediente.nombre);

    return {
      ...receta,
      id: -receta.id,
      porcentaje: ingredientesSeleccionados.length === 0
        ? 0
        : Math.round((disponibles.length / receta.ingredientes.length) * 100),
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
          categoria?: string | null;
          porciones?: number | null;
          emoji?: string | null;
          consejo?: string | null;
        }) => ({ nombre: item.nombre, item }),
      );

      const recetasServidor = new Map(
        recomendacionesServidor.map(({ nombre, item }: { nombre: string; item: Record<string, unknown> }) => [
          nombre.toLocaleLowerCase('es-MX'), item,
        ]),
      );
      const catalogoTotal = Number(datos.catalogoTotal ?? recomendacionesServidor.length);
      const catalogoParcial = catalogoTotal < RECETAS.length;
      const resultados = resultadosLocales.map((local) => {
        const servidor = recetasServidor.get(local.nombre.toLocaleLowerCase('es-MX')) as
          | {
              id_receta: number;
              porcentajeCoincidencia: number;
              preparacion?: string[];
              utensilios?: string[];
              equipos?: string[];
              fuente_url?: string | null;
              categoria?: string | null;
              porciones?: number | null;
              emoji?: string | null;
              consejo?: string | null;
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
          categoria: (servidor.categoria as CategoriaReceta | null) ?? local.categoria,
          porciones: servidor.porciones ?? local.porciones,
          emoji: servidor.emoji ?? local.emoji,
          consejo: servidor.consejo ?? local.consejo,
        };
      });
      const resultadosConCoincidencia = resultados.filter((resultado) => resultado.porcentaje >= 50);
      resultadosConCoincidencia.sort((a, b) => b.porcentaje - a.porcentaje || a.nombre.localeCompare(b.nombre, 'es-MX'));
      setCatalogoLocal(catalogoParcial);
      setResultadosAPI(resultadosConCoincidencia);
      setPantalla('resultados');
    } catch {
      const resultadosConCoincidencia = resultadosLocales
        .filter((resultado) => resultado.porcentaje >= 50)
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
    setPantallaAnterior(pantalla);
    setRecetaSeleccionada(receta);
    setPasosCompletados([]);
    setIngredientesRevisados([]);
    setPantalla('detalle');
  };

  const abrirOpiniones = (receta: Receta | null = null) => {
    setPantallaAnterior(pantalla);
    setRecetaOpinion(receta);
    setOpiniones([]);
    setPromedioOpiniones(0);
    setTextoOpinion('');
    setCalificacionOpinion(5);
    setEstadoOpinion('');
    setPantalla('opiniones');
  };

  const abrirContacto = () => {
    setPantallaAnterior(pantalla);
    setEstadoContacto('');
    setPantalla('contacto');
  };

  const alternarPaso = (indice: number) => {
    setPasosCompletados((actuales) => actuales.includes(indice)
      ? actuales.filter((item) => item !== indice)
      : [...actuales, indice]);
  };

  const alternarIngredienteRevisado = (nombre: string) => {
    setIngredientesRevisados((actuales) => actuales.includes(nombre)
      ? actuales.filter((item) => item !== nombre)
      : [...actuales, nombre]);
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

  const normalizarTexto = (valor: string) => valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-MX');

  const recetasFiltradas = RECETAS.filter((receta) => {
    const campos = normalizarTexto([
      receta.nombre,
      receta.descripcion,
      receta.categoria,
      receta.dificultad,
      `${receta.tiempoMin} minutos`,
      `${receta.porciones} porciones`,
      receta.ingredientes.map((item) => `${item.nombre} ${item.cantidad} ${item.categoria}`).join(' '),
      receta.preparacion.join(' '),
      receta.utensilios.join(' '),
      receta.equipos.join(' '),
    ].join(' '));
    const busqueda = normalizarTexto(busquedaCatalogo.trim());
    const ingrediente = normalizarTexto(ingredienteFiltro.trim());
    const tieneIngrediente = !ingrediente || receta.ingredientes.some((item) =>
      normalizarTexto(item.nombre).includes(ingrediente));

    return (categoriaFiltro === 'Todas' || receta.categoria === categoriaFiltro)
      && (dificultadFiltro === 'Todas' || receta.dificultad === dificultadFiltro)
      && (tiempoFiltro === null || receta.tiempoMin <= tiempoFiltro)
      && (!busqueda || campos.includes(busqueda))
      && tieneIngrediente;
  }).sort((a, b) => {
    if (ordenCatalogo === 'Más rápidas') return a.tiempoMin - b.tiempoMin || a.nombre.localeCompare(b.nombre, 'es-MX');
    if (ordenCatalogo === 'A-Z') return a.nombre.localeCompare(b.nombre, 'es-MX');
    const coincidencia = (receta: Receta) => ingredientesSeleccionados.length
      ? receta.ingredientes.filter((item) => ingredientesSeleccionados.includes(item.nombre)).length / receta.ingredientes.length
      : 0;
    return coincidencia(b) - coincidencia(a) || a.nombre.localeCompare(b.nombre, 'es-MX');
  });

  const sorprenderme = () => {
    const indice = Math.floor(Math.random() * RECETAS.length);
    setRecetaDestacada(RECETAS[indice]);
  };

  const enviarOpinion = async () => {
    if (textoOpinion.trim().length < 10) {
      setEstadoOpinion('Cuéntanos un poco más: escribe al menos 10 caracteres.');
      return;
    }
    setEnviandoOpinion(true);
    setEstadoOpinion('');
    try {
      const respuesta = await fetchConTiempo(`${getBackendUrl()}/api/opiniones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreOpinion.trim() || 'Anónimo',
          calificacion: calificacionOpinion,
          comentario: textoOpinion.trim(),
          receta: recetaOpinion?.nombre ?? 'La app',
        }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.mensaje ?? 'No se pudo guardar tu opinión.');
      setTextoOpinion('');
      await cargarOpiniones();
      setEstadoOpinion(datos.mensaje ?? '¡Gracias por compartir tu opinión!');
    } catch (error) {
      setEstadoOpinion(error instanceof Error
        ? error.message
        : 'No se pudo enviar. Revisa la conexión e inténtalo de nuevo.');
    } finally {
      setEnviandoOpinion(false);
    }
  };

  const enviarContacto = async () => {
    if (nombreContacto.trim().length < 2 || mensajeContacto.trim().length < 10) {
      setEstadoContacto('Completa tu nombre y escribe un mensaje de al menos 10 caracteres.');
      return;
    }
    setEnviandoContacto(true);
    setEstadoContacto('');
    try {
      const respuesta = await fetchConTiempo(`${getBackendUrl()}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreContacto.trim(),
          correo: correoContacto.trim(),
          mensaje: mensajeContacto.trim(),
        }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.mensaje ?? 'No se pudo enviar tu mensaje.');
      setNombreContacto('');
      setCorreoContacto('');
      setMensajeContacto('');
      setEstadoContacto(datos.mensaje ?? 'Tu mensaje quedó guardado.');
    } catch (error) {
      setEstadoContacto(error instanceof Error
        ? error.message
        : 'No se pudo enviar. Revisa la conexión e inténtalo de nuevo.');
    } finally {
      setEnviandoContacto(false);
    }
  };

  const mostrarInicio = () => (
    <ScrollView
      contentContainerStyle={styles.contenidoInicio}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contenidoInicioAncho}>
        <View style={styles.heroInicio}>
          <View style={styles.etiquetaHero}><Text style={styles.textoEtiquetaHero}>SABOR DE CASA · RECETAS MEXICANAS</Text></View>
          <Text style={styles.tituloHero}>¿Qué se te antoja cocinar hoy?</Text>
          <Text style={styles.descripcionHero}>Encuentra algo delicioso con lo que ya tienes en tu cocina.</Text>
          <View style={styles.filaHeroAcciones}>
            <TouchableOpacity
              style={styles.botonHeroClaro}
              onPress={() => setPantalla('ingredientes')}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Text style={styles.textoBotonHeroClaro}>🥑  Tengo ingredientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botonHeroTransparente}
              onPress={() => setPantalla('catalogo')}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Text style={styles.textoBotonHeroTransparente}>Explorar recetas  →</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.decoracionHero}>🌮  🌶️  🥑</Text>
        </View>

        <View style={styles.resumenInicio}>
          <View style={styles.datoInicio}>
            <Text style={styles.numeroInicio}>{RECETAS.length}</Text>
            <Text style={styles.etiquetaInicio}>recetas mexicanas</Text>
          </View>
          <View style={styles.separadorInicio} />
          <View style={styles.datoInicio}>
            <Text style={styles.numeroInicio}>{INGREDIENTES_DISPONIBLES.length}</Text>
            <Text style={styles.etiquetaInicio}>ingredientes</Text>
          </View>
          <View style={styles.separadorInicio} />
          <View style={styles.datoInicio}>
            <Text style={styles.numeroInicio}>6</Text>
            <Text style={styles.etiquetaInicio}>categorías</Text>
          </View>
        </View>

        <View style={styles.seccionInicio}>
          <View style={styles.encabezadoSeccionInicio}>
            <View>
              <Text style={styles.tituloSeccionInicio}>Explora por momento</Text>
              <Text style={styles.subtituloSeccionInicio}>Toca una categoría y encuentra tu próximo platillo.</Text>
            </View>
          </View>
          <View style={styles.grillaCategorias}>
            {CATEGORIAS_RECETA.map((categoria) => (
              <TouchableOpacity
                key={categoria}
                style={styles.tarjetaCategoriaInicio}
                onPress={() => {
                  setCategoriaFiltro(categoria);
                  setPantalla('catalogo');
                }}
                activeOpacity={0.76}
                accessibilityRole="button"
                accessibilityLabel={`Explorar ${categoria}`}
              >
                <Text style={styles.iconoCategoriaInicio}>{ICONO_CATEGORIA[categoria]}</Text>
                <View style={styles.textoCategoriaInicio}>
                  <Text style={styles.nombreCategoriaInicio}>{categoria}</Text>
                  <Text style={styles.cantidadCategoriaInicio}>{RECETAS.filter((item) => item.categoria === categoria).length} recetas</Text>
                </View>
                <Text style={styles.flechaCategoriaInicio}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tarjetaDestacada}>
          <View style={styles.encabezadoDestacada}>
            <Text style={styles.etiquetaDestacada}>ANTOJO DEL MOMENTO</Text>
            <TouchableOpacity onPress={sorprenderme} accessibilityRole="button" accessibilityLabel="Elegir otra receta al azar">
              <Text style={styles.botonAzar}>🎲 Sorpréndeme</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filaDestacada}>
            <Text style={styles.emojiDestacado}>{recetaDestacada.emoji}</Text>
            <View style={styles.infoDestacada}>
              <Text style={styles.nombreDestacado}>{recetaDestacada.nombre}</Text>
              <Text style={styles.descripcionDestacada}>{recetaDestacada.descripcion}</Text>
              <Text style={styles.metaDestacada}>{ICONO_CATEGORIA[recetaDestacada.categoria]} {recetaDestacada.categoria}  ·  ⏱ {recetaDestacada.tiempoMin} min</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.botonDestacada}
            onPress={() => abrirDetalle(crearResultadoLocal(recetaDestacada))}
            accessibilityRole="button"
            activeOpacity={0.76}
          >
            <Text style={styles.textoBotonDestacada}>Ver receta paso a paso  →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filaAccionesSociales}>
          <TouchableOpacity style={styles.tarjetaAccionSocial} onPress={() => abrirOpiniones()} activeOpacity={0.75} accessibilityRole="button">
            <Text style={styles.iconoAccionSocial}>⭐</Text>
            <Text style={styles.tituloAccionSocial}>Opiniones</Text>
            <Text style={styles.textoAccionSocial}>Comparte lo que te pareció.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tarjetaAccionSocial} onPress={abrirContacto} activeOpacity={0.75} accessibilityRole="button">
            <Text style={styles.iconoAccionSocial}>💬</Text>
            <Text style={styles.tituloAccionSocial}>Contacto</Text>
            <Text style={styles.textoAccionSocial}>Escríbenos una sugerencia.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const mostrarCatalogo = () => (
    <View style={styles.contenedorPantalla}>
      {botonRegreso('Inicio', () => setPantalla('inicio'))}
      {encabezado('Explorar recetas', 'Combina filtros por categoría, ingrediente, dificultad y tiempo.')}
      <ScrollView style={styles.listaDesplazable} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <TextInput
          value={busquedaCatalogo}
          onChangeText={setBusquedaCatalogo}
          placeholder="Busca también en preparación, equipo y utensilios"
          placeholderTextColor="#8B958B"
          style={styles.campoBusqueda}
          accessibilityLabel="Buscar en todos los datos de las recetas"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <Text style={styles.ayudaFiltro}>La búsqueda general revisa nombres, ingredientes, preparación, utensilios y equipo.</Text>

        <Text style={styles.tituloFiltro}>Categoría</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsFila}>
          {(['Todas', ...CATEGORIAS_RECETA] as const).map((categoria) => (
            <TouchableOpacity
              key={categoria}
              onPress={() => setCategoriaFiltro(categoria)}
              style={[styles.chipFiltro, categoriaFiltro === categoria && styles.chipFiltroActivo]}
              accessibilityRole="button"
              accessibilityState={{ selected: categoriaFiltro === categoria }}
            >
              <Text style={[styles.textoChipFiltro, categoriaFiltro === categoria && styles.textoChipFiltroActivo]}>
                {categoria === 'Todas' ? '🍽️ Todas' : `${ICONO_CATEGORIA[categoria]} ${categoria}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.tituloFiltro}>Ingrediente</Text>
        <TextInput
          value={ingredienteFiltro}
          onChangeText={setIngredienteFiltro}
          placeholder="Ej. aguacate, frijol, elote…"
          placeholderTextColor="#8B958B"
          style={styles.campoBusqueda}
          accessibilityLabel="Filtrar recetas por ingrediente"
          clearButtonMode="while-editing"
        />

        <Text style={styles.tituloFiltro}>Dificultad</Text>
        <View style={styles.chipsAjustables}>
          {(['Todas', 'Fácil', 'Media', 'Avanzada'] as const).map((dificultad) => (
            <TouchableOpacity
              key={dificultad}
              onPress={() => setDificultadFiltro(dificultad)}
              style={[styles.chipFiltro, dificultadFiltro === dificultad && styles.chipFiltroActivo]}
              accessibilityRole="button"
              accessibilityState={{ selected: dificultadFiltro === dificultad }}
            >
              <Text style={[styles.textoChipFiltro, dificultadFiltro === dificultad && styles.textoChipFiltroActivo]}>{dificultad}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.tituloFiltro}>Tiempo máximo</Text>
        <View style={styles.chipsAjustables}>
          {[null, 20, 30, 45, 60, 90, 120].map((minutos) => (
            <TouchableOpacity
              key={minutos ?? 'cualquiera'}
              onPress={() => setTiempoFiltro(minutos)}
              style={[styles.chipFiltro, tiempoFiltro === minutos && styles.chipFiltroActivo]}
              accessibilityRole="button"
              accessibilityState={{ selected: tiempoFiltro === minutos }}
            >
              <Text style={[styles.textoChipFiltro, tiempoFiltro === minutos && styles.textoChipFiltroActivo]}>{minutos ? `≤ ${minutos} min` : 'Cualquiera'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.filaOrdenCatalogo}>
          <Text style={styles.tituloFiltro}>Ordenar</Text>
          <View style={styles.chipsAjustables}>
            {(['Recomendadas', 'Más rápidas', 'A-Z'] as const).map((orden) => (
              <TouchableOpacity
                key={orden}
                onPress={() => setOrdenCatalogo(orden)}
                style={[styles.chipFiltro, ordenCatalogo === orden && styles.chipFiltroActivo]}
                accessibilityRole="button"
                accessibilityState={{ selected: ordenCatalogo === orden }}
              >
                <Text style={[styles.textoChipFiltro, ordenCatalogo === orden && styles.textoChipFiltroActivo]}>{orden}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filaConteoCatalogo}>
          <Text style={styles.textoConteoCatalogo}>{recetasFiltradas.length} de {RECETAS.length} recetas</Text>
          <TouchableOpacity onPress={() => {
            setBusquedaCatalogo('');
            setIngredienteFiltro('');
            setCategoriaFiltro('Todas');
            setDificultadFiltro('Todas');
            setTiempoFiltro(null);
            setOrdenCatalogo('Recomendadas');
          }} accessibilityRole="button">
            <Text style={styles.textoLimpiarFiltros}>Limpiar filtros</Text>
          </TouchableOpacity>
        </View>

        {recetasFiltradas.length === 0 ? (
          <View style={styles.mensajeVacio}>
            <Text style={styles.emojiVacio}>🔎</Text>
            <Text style={styles.tituloMensajeVacio}>No encontramos recetas</Text>
            <Text style={styles.textoMensajeVacio}>Prueba otro ingrediente o quita algún filtro.</Text>
          </View>
        ) : recetasFiltradas.map((receta) => (
          <TouchableOpacity
            key={receta.id}
            style={styles.tarjetaCatalogo}
            onPress={() => abrirDetalle(crearResultadoLocal(receta))}
            activeOpacity={0.78}
            accessibilityRole="button"
            accessibilityLabel={`Ver ${receta.nombre}`}
          >
            <View style={styles.emojiTarjetaCatalogo}><Text style={styles.emojiTarjetaCatalogoTexto}>{receta.emoji}</Text></View>
            <View style={styles.infoTarjetaCatalogo}>
              <View style={styles.filaCategoriaTarjeta}>
                <Text style={styles.categoriaTarjetaCatalogo}>{ICONO_CATEGORIA[receta.categoria]} {receta.categoria}</Text>
                <Text style={styles.flechaTarjetaCatalogo}>›</Text>
              </View>
              <Text style={styles.nombreTarjetaCatalogo}>{receta.nombre}</Text>
              <Text style={styles.descripcionTarjetaCatalogo} numberOfLines={2}>{receta.descripcion}</Text>
              <Text style={styles.metaTarjetaCatalogo}>⏱ {receta.tiempoMin} min  ·  👨‍🍳 {receta.dificultad}  ·  {receta.porciones} porciones</Text>
              <Text style={styles.ingredientesTarjetaCatalogo} numberOfLines={1}>{receta.ingredientes.map((item) => item.nombre).join(' · ')}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
                    <Text style={styles.nombreReceta}>{receta.emoji}  {receta.nombre}</Text>

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
                  {ICONO_CATEGORIA[receta.categoria]} {receta.categoria}  ·  ⏱ {receta.tiempoMin} min  ·  {receta.porciones} porciones
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

  const mostrarOpiniones = () => (
    <View style={styles.contenedorPantalla}>
      {botonRegreso('Volver', volver)}
      <ScrollView style={styles.listaDesplazable} contentContainerStyle={styles.contenidoDetalle} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {encabezado(
          recetaOpinion ? `Opiniones: ${recetaOpinion.nombre}` : 'Opiniones de la comunidad',
          'Califica la receta o cuéntanos qué te pareció la aplicación.',
        )}
        <View style={styles.resumenOpiniones}>
          <Text style={styles.estrellasResumen}>{promedioOpiniones ? `${'★'.repeat(Math.round(promedioOpiniones))}${'☆'.repeat(5 - Math.round(promedioOpiniones))}` : '☆☆☆☆☆'}</Text>
          <Text style={styles.promedioOpiniones}>{promedioOpiniones ? `${promedioOpiniones} de 5` : 'Sé la primera opinión'}</Text>
          <Text style={styles.textoSecundario}>{opiniones.length} {opiniones.length === 1 ? 'opinión' : 'opiniones'}</Text>
        </View>

        <View style={styles.seccionDetalle}>
          <Text style={styles.tituloSeccion}>Comparte tu experiencia</Text>
          <TextInput
            value={nombreOpinion}
            onChangeText={setNombreOpinion}
            placeholder="Tu nombre (opcional)"
            placeholderTextColor="#8B958B"
            style={styles.campoFormulario}
            maxLength={80}
            accessibilityLabel="Tu nombre para la opinión"
          />
          <Text style={styles.etiquetaFormulario}>Tu calificación</Text>
          <View style={styles.selectorEstrellas}>
            {[1, 2, 3, 4, 5].map((estrella) => (
              <TouchableOpacity
                key={estrella}
                onPress={() => setCalificacionOpinion(estrella)}
                style={styles.botonEstrella}
                accessibilityRole="button"
                accessibilityLabel={`${estrella} ${estrella === 1 ? 'estrella' : 'estrellas'}`}
                accessibilityState={{ selected: calificacionOpinion === estrella }}
              >
                <Text style={[styles.textoEstrella, estrella <= calificacionOpinion && styles.textoEstrellaActiva]}>{estrella <= calificacionOpinion ? '★' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            value={textoOpinion}
            onChangeText={setTextoOpinion}
            placeholder="¿Qué te gustó? ¿Cambiarías algo? (10 a 600 caracteres)"
            placeholderTextColor="#8B958B"
            style={[styles.campoFormulario, styles.campoMultilinea]}
            multiline
            maxLength={600}
            textAlignVertical="top"
            accessibilityLabel="Escribe tu opinión"
          />
          <Text style={styles.contadorFormulario}>{textoOpinion.length}/600</Text>
          {estadoOpinion ? <Text style={styles.estadoFormulario}>{estadoOpinion}</Text> : null}
          <TouchableOpacity
            style={[styles.botonPrincipal, (enviandoOpinion || textoOpinion.trim().length < 10) && styles.botonDeshabilitado]}
            onPress={enviarOpinion}
            disabled={enviandoOpinion || textoOpinion.trim().length < 10}
            accessibilityRole="button"
          >
            <Text style={styles.textoBotonPrincipal}>{enviandoOpinion ? 'Enviando opinión…' : 'Publicar opinión'}</Text>
          </TouchableOpacity>
          <Text style={styles.notaFormulario}>Tu opinión se guardará en la aplicación para ayudar a otras personas.</Text>
        </View>

        <Text style={styles.tituloSeccionLista}>Lo que comparte la comunidad</Text>
        {cargandoOpiniones ? (
          <ActivityIndicator color="#267348" style={styles.cargandoOpiniones} />
        ) : opiniones.length ? opiniones.map((opinion) => (
          <View key={opinion.id_opinion} style={styles.tarjetaOpinion}>
            <View style={styles.filaOpinion}>
              <Text style={styles.nombreOpinion}>{opinion.nombre_usuario || 'Anónimo'}</Text>
              <Text style={styles.fechaOpinion}>{new Date(opinion.creado_en).toLocaleDateString('es-MX')}</Text>
            </View>
            <Text style={styles.estrellasOpinion}>{'★'.repeat(opinion.calificacion)}{'☆'.repeat(5 - opinion.calificacion)}</Text>
            <Text style={styles.comentarioOpinion}>{opinion.comentario}</Text>
          </View>
        )) : (
          <Text style={styles.textoSinOpiniones}>{estadoOpinion || 'Todavía no hay opiniones. ¡Puedes iniciar la conversación!'}</Text>
        )}
      </ScrollView>
    </View>
  );

  const mostrarContacto = () => (
    <View style={styles.contenedorPantalla}>
      {botonRegreso('Volver', volver)}
      <ScrollView style={styles.listaDesplazable} contentContainerStyle={styles.contenidoDetalle} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {encabezado('Escríbenos', '¿Tienes una idea, encontraste un problema o quieres sugerir una receta?')}
        <View style={styles.tarjetaContactoHero}>
          <Text style={styles.iconoContactoHero}>💌</Text>
          <Text style={styles.tituloContactoHero}>Nos interesa escucharte</Text>
          <Text style={styles.textoContactoHero}>Envía tu mensaje desde aquí. Se guardará para que el equipo pueda revisarlo.</Text>
        </View>
        <View style={styles.seccionDetalle}>
          <Text style={styles.tituloSeccion}>Tu mensaje</Text>
          <TextInput
            value={nombreContacto}
            onChangeText={setNombreContacto}
            placeholder="Nombre"
            placeholderTextColor="#8B958B"
            style={styles.campoFormulario}
            maxLength={80}
            accessibilityLabel="Nombre de contacto"
          />
          <TextInput
            value={correoContacto}
            onChangeText={setCorreoContacto}
            placeholder="Correo para responder (opcional)"
            placeholderTextColor="#8B958B"
            style={styles.campoFormulario}
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={254}
            accessibilityLabel="Correo electrónico para responder"
          />
          <TextInput
            value={mensajeContacto}
            onChangeText={setMensajeContacto}
            placeholder="Cuéntanos cómo podemos ayudarte (10 a 1200 caracteres)"
            placeholderTextColor="#8B958B"
            style={[styles.campoFormulario, styles.campoMultilinea]}
            multiline
            maxLength={1200}
            textAlignVertical="top"
            accessibilityLabel="Escribe tu mensaje"
          />
          <Text style={styles.contadorFormulario}>{mensajeContacto.length}/1200</Text>
          <Text style={styles.notaFormulario}>El mensaje y el correo opcional se guardan en el servidor del proyecto para su seguimiento.</Text>
          {estadoContacto ? <Text style={styles.estadoFormulario}>{estadoContacto}</Text> : null}
          <TouchableOpacity
            style={[styles.botonPrincipal, (enviandoContacto || mensajeContacto.trim().length < 10 || nombreContacto.trim().length < 2) && styles.botonDeshabilitado]}
            onPress={enviarContacto}
            disabled={enviandoContacto || mensajeContacto.trim().length < 10 || nombreContacto.trim().length < 2}
            accessibilityRole="button"
          >
            <Text style={styles.textoBotonPrincipal}>{enviandoContacto ? 'Enviando mensaje…' : 'Enviar mensaje'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

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
        {botonRegreso('Volver a recetas', volver)}

        <ScrollView
          style={styles.listaDesplazable}
          contentContainerStyle={styles.contenidoDetalle}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroDetalleReceta}>
            <Text style={styles.emojiDetalleReceta}>{recetaSeleccionada.emoji}</Text>
            <View style={styles.textoHeroDetalle}>
              <Text style={styles.categoriaDetalle}>{ICONO_CATEGORIA[recetaSeleccionada.categoria]} {recetaSeleccionada.categoria}</Text>
              <Text style={styles.tituloDetalle}>{recetaSeleccionada.nombre}</Text>
            </View>
          </View>

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
              <Text style={styles.iconoDato}>🍽️</Text>
              <Text style={styles.etiquetaDato}>Porciones</Text>
              <Text style={styles.valorDato}>{recetaSeleccionada.porciones}</Text>
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
                {ingredientesSeleccionados.length ? `${recetaSeleccionada.porcentaje}%` : 'Sin comparar'}
              </Text>
            </View>
          </View>

          <View style={styles.seccionDetalle}>
            <Text style={styles.tituloSeccion}>Ingredientes</Text>
            <Text style={styles.textoSecundario}>Cantidades para {recetaSeleccionada.porciones} porciones. Toca un ingrediente cuando ya lo tengas listo.</Text>

            {recetaSeleccionada.ingredientes.map((ingrediente) => {
              const loTienes = recetaSeleccionada.disponibles.includes(ingrediente.nombre);
              const revisado = ingredientesRevisados.includes(ingrediente.nombre);
              const pendiente = ingredientesSeleccionados.length > 0 && !loTienes;
              return (
                <TouchableOpacity
                  key={ingrediente.nombre}
                  style={styles.filaIngredienteDetalle}
                  onPress={() => alternarIngredienteRevisado(ingrediente.nombre)}
                  activeOpacity={0.72}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: revisado }}
                  accessibilityLabel={`${ingrediente.nombre}, ${ingrediente.cantidad}`}
                >
                  <View style={styles.infoIngredienteChecklist}>
                    <Text style={[styles.cajaChecklist, revisado && styles.cajaChecklistActiva]}>{revisado ? '✓' : loTienes ? '•' : '＋'}</Text>
                    <View style={styles.contenidoIngrediente}>
                      <Text style={[styles.elementoLista, pendiente && styles.elementoFaltante, revisado && styles.textoTachado]}>{ingrediente.nombre}</Text>
                      <Text style={styles.categoriaDetalleIngrediente}>{ingrediente.categoria} · {revisado ? 'listo' : ingredientesSeleccionados.length === 0 ? 'ingrediente' : loTienes ? 'lo tienes' : 'te falta'}</Text>
                    </View>
                  </View>
                  <Text style={styles.cantidadIngrediente}>{ingrediente.cantidad}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.seccionDetalle}>
            <Text style={styles.tituloSeccion}>Ingredientes faltantes</Text>

            {ingredientesSeleccionados.length === 0 ? (
              <Text style={styles.textoSecundario}>Selecciona lo que tienes en casa desde “Buscar con mis ingredientes” para comparar esta receta.</Text>
            ) : recetaSeleccionada.faltantes.length > 0 ? (
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
            <View style={styles.filaTituloPreparacion}>
              <View>
                <Text style={styles.tituloSeccion}>Preparación paso a paso</Text>
                <Text style={styles.textoSecundario}>Toca cada paso cuando lo termines.</Text>
              </View>
              <Text style={styles.progresoPasos}>{pasosCompletados.length}/{recetaSeleccionada.preparacion.length}</Text>
            </View>
            <View style={styles.fondoProgresoPasos}>
              <View style={[styles.barraProgresoPasos, { width: `${recetaSeleccionada.preparacion.length ? (pasosCompletados.length / recetaSeleccionada.preparacion.length) * 100 : 0}%` }]} />
            </View>
            {recetaSeleccionada.preparacion.map((paso, indice) => (
              <TouchableOpacity
                key={`${recetaSeleccionada.id}-paso-${indice}`}
                style={[styles.filaPaso, pasosCompletados.includes(indice) && styles.filaPasoCompletada]}
                onPress={() => alternarPaso(indice)}
                activeOpacity={0.75}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: pasosCompletados.includes(indice) }}
                accessibilityLabel={`Paso ${indice + 1}: ${paso}`}
              >
                <Text style={[styles.numeroPaso, pasosCompletados.includes(indice) && styles.numeroPasoCompletado]}>{pasosCompletados.includes(indice) ? '✓' : indice + 1}</Text>
                <Text style={[styles.textoPaso, pasosCompletados.includes(indice) && styles.textoPasoCompletado]}>{paso}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {recetaSeleccionada.consejo ? (
            <View style={styles.tarjetaConsejo}>
              <Text style={styles.tituloConsejo}>👩‍🍳 Consejo de cocina</Text>
              <Text style={styles.textoConsejo}>{recetaSeleccionada.consejo}</Text>
            </View>
          ) : null}

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

          <TouchableOpacity
            style={styles.botonOpinionesDetalle}
            onPress={() => abrirOpiniones(recetaSeleccionada)}
            activeOpacity={0.75}
            accessibilityRole="button"
          >
            <Text style={styles.textoBotonOpinionesDetalle}>⭐  Ver y dejar opiniones de esta receta</Text>
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
      {pantalla === 'catalogo' && mostrarCatalogo()}
      {pantalla === 'opiniones' && mostrarOpiniones()}
      {pantalla === 'contacto' && mostrarContacto()}
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
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingVertical: 18,
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

  contenidoInicioAncho: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },

  heroInicio: {
    minHeight: 280,
    backgroundColor: '#1D5A39',
    borderRadius: 28,
    padding: 24,
    marginBottom: 16,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  etiquetaHero: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF24',
    marginBottom: 16,
  },

  textoEtiquetaHero: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#FBE8C3',
    fontWeight: '800',
  },

  tituloHero: {
    maxWidth: 460,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  descripcionHero: {
    maxWidth: 430,
    fontSize: 15,
    lineHeight: 23,
    color: '#E3F0E3',
    marginBottom: 20,
  },

  filaHeroAcciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    zIndex: 1,
  },

  botonHeroClaro: {
    minHeight: 48,
    justifyContent: 'center',
    backgroundColor: '#F7C961',
    paddingHorizontal: 16,
    borderRadius: 14,
  },

  textoBotonHeroClaro: {
    color: '#303721',
    fontSize: 14,
    fontWeight: '800',
  },

  botonHeroTransparente: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  textoBotonHeroTransparente: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  decoracionHero: {
    position: 'absolute',
    right: 18,
    bottom: 10,
    fontSize: 36,
    opacity: 0.32,
    transform: [{ rotate: '-8deg' }],
  },

  seccionInicio: {
    marginTop: 16,
    marginBottom: 8,
  },

  encabezadoSeccionInicio: {
    marginBottom: 12,
  },

  tituloSeccionInicio: {
    color: '#214E34',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 4,
  },

  subtituloSeccionInicio: {
    color: '#68746A',
    fontSize: 13,
    lineHeight: 19,
  },

  grillaCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 9,
  },

  tarjetaCategoriaInicio: {
    width: '48.5%',
    minHeight: 76,
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8DC',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconoCategoriaInicio: {
    fontSize: 24,
    marginRight: 9,
  },

  nombreCategoriaInicio: {
    fontSize: 13,
    fontWeight: '700',
    color: '#33473A',
  },

  textoCategoriaInicio: {
    flex: 1,
  },

  cantidadCategoriaInicio: {
    color: '#879087',
    fontSize: 10,
    marginTop: 2,
  },

  flechaCategoriaInicio: {
    fontSize: 24,
    color: '#6D9273',
    marginLeft: 4,
  },

  tarjetaDestacada: {
    backgroundColor: '#FFF5DF',
    borderColor: '#F0D89D',
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    marginTop: 18,
  },

  encabezadoDestacada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  etiquetaDestacada: {
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '800',
    color: '#A35D24',
  },

  botonAzar: {
    fontSize: 13,
    fontWeight: '700',
    color: '#246B45',
    padding: 6,
  },

  filaDestacada: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  emojiDestacado: {
    width: 72,
    height: 72,
    lineHeight: 72,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    fontSize: 42,
  },

  infoDestacada: {
    flex: 1,
  },

  nombreDestacado: {
    color: '#2D4B35',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 4,
  },

  descripcionDestacada: {
    color: '#667166',
    fontSize: 13,
    lineHeight: 19,
  },

  metaDestacada: {
    color: '#915D2B',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },

  botonDestacada: {
    minHeight: 46,
    marginTop: 14,
    borderRadius: 13,
    backgroundColor: '#267348',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  textoBotonDestacada: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  filaAccionesSociales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 12,
    marginBottom: 8,
  },

  tarjetaAccionSocial: {
    flex: 1,
    minHeight: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8DC',
    padding: 15,
  },

  iconoAccionSocial: {
    fontSize: 24,
    marginBottom: 8,
  },

  tituloAccionSocial: {
    color: '#294D35',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },

  textoAccionSocial: {
    color: '#68746A',
    fontSize: 12,
    lineHeight: 18,
  },

  ayudaFiltro: {
    color: '#6D796E',
    fontSize: 12,
    lineHeight: 18,
    marginTop: -1,
    marginBottom: 12,
  },

  tituloFiltro: {
    color: '#314D39',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 7,
  },

  chipsFila: {
    paddingBottom: 4,
    gap: 8,
  },

  chipsAjustables: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 5,
  },

  chipFiltro: {
    minHeight: 38,
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D6E1D5',
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },

  chipFiltroActivo: {
    backgroundColor: '#267348',
    borderColor: '#267348',
  },

  textoChipFiltro: {
    color: '#4B5A4D',
    fontSize: 12,
    fontWeight: '600',
  },

  textoChipFiltroActivo: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  filaOrdenCatalogo: {
    marginTop: 3,
  },

  filaConteoCatalogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 10,
  },

  textoConteoCatalogo: {
    color: '#4E5D50',
    fontSize: 13,
    fontWeight: '700',
  },

  textoLimpiarFiltros: {
    color: '#267348',
    fontSize: 12,
    fontWeight: '800',
    padding: 6,
  },

  tarjetaCatalogo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E1E8DE',
    marginBottom: 11,
  },

  emojiTarjetaCatalogo: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#F3F5E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emojiTarjetaCatalogoTexto: {
    fontSize: 31,
  },

  infoTarjetaCatalogo: {
    flex: 1,
  },

  filaCategoriaTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  categoriaTarjetaCatalogo: {
    color: '#9A612D',
    fontSize: 11,
    fontWeight: '800',
  },

  flechaTarjetaCatalogo: {
    color: '#809181',
    fontSize: 22,
    lineHeight: 22,
  },

  nombreTarjetaCatalogo: {
    color: '#246B45',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 2,
    marginBottom: 3,
  },

  descripcionTarjetaCatalogo: {
    color: '#5D685F',
    fontSize: 12,
    lineHeight: 18,
  },

  metaTarjetaCatalogo: {
    color: '#475B4A',
    fontSize: 11,
    marginTop: 7,
    fontWeight: '700',
  },

  ingredientesTarjetaCatalogo: {
    color: '#7A857B',
    fontSize: 11,
    marginTop: 5,
  },

  heroDetalleReceta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
  },

  emojiDetalleReceta: {
    width: 74,
    height: 74,
    lineHeight: 74,
    textAlign: 'center',
    backgroundColor: '#E6F0E2',
    borderRadius: 24,
    overflow: 'hidden',
    fontSize: 42,
  },

  textoHeroDetalle: {
    flex: 1,
  },

  categoriaDetalle: {
    color: '#9A612D',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 3,
  },

  infoIngredienteChecklist: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },

  contenidoIngrediente: {
    flex: 1,
  },

  categoriaDetalleIngrediente: {
    color: '#7A857B',
    fontSize: 11,
    marginTop: 1,
  },

  cajaChecklist: {
    width: 24,
    height: 24,
    lineHeight: 24,
    textAlign: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    color: '#708071',
    backgroundColor: '#F1F4EE',
    fontSize: 15,
    fontWeight: '800',
  },

  cajaChecklistActiva: {
    backgroundColor: '#267348',
    color: '#FFFFFF',
  },

  textoTachado: {
    textDecorationLine: 'line-through',
    opacity: 0.62,
  },

  filaTituloPreparacion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },

  progresoPasos: {
    color: '#267348',
    fontWeight: '800',
    fontSize: 13,
  },

  fondoProgresoPasos: {
    height: 7,
    backgroundColor: '#E9EEE6',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },

  barraProgresoPasos: {
    height: '100%',
    backgroundColor: '#4DA66A',
    borderRadius: 8,
  },

  filaPasoCompletada: {
    backgroundColor: '#F3F8F1',
    borderRadius: 12,
    padding: 9,
  },

  numeroPasoCompletado: {
    color: '#FFFFFF',
    backgroundColor: '#267348',
  },

  textoPasoCompletado: {
    color: '#778078',
    textDecorationLine: 'line-through',
  },

  tarjetaConsejo: {
    backgroundColor: '#FFF4DC',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0D99D',
    padding: 16,
    marginBottom: 14,
  },

  tituloConsejo: {
    color: '#8C5A24',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },

  textoConsejo: {
    color: '#68583B',
    fontSize: 14,
    lineHeight: 21,
  },

  botonOpinionesDetalle: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#D2A447',
    borderRadius: 13,
    backgroundColor: '#FFF7E4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 3,
    marginBottom: 14,
  },

  textoBotonOpinionesDetalle: {
    color: '#78551B',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },

  resumenOpiniones: {
    alignItems: 'center',
    backgroundColor: '#FFF6E0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  estrellasResumen: {
    color: '#D59A26',
    fontSize: 25,
    letterSpacing: 2,
  },

  promedioOpiniones: {
    color: '#354A38',
    fontSize: 17,
    fontWeight: '800',
    marginVertical: 4,
  },

  selectorEstrellas: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  botonEstrella: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  textoEstrella: {
    color: '#BBC0B9',
    fontSize: 37,
  },

  textoEstrellaActiva: {
    color: '#D59A26',
  },

  campoFormulario: {
    minHeight: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1D6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#26372D',
    marginBottom: 10,
  },

  campoMultilinea: {
    minHeight: 120,
    paddingTop: 13,
  },

  etiquetaFormulario: {
    color: '#4A5C4B',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },

  contadorFormulario: {
    color: '#899389',
    fontSize: 11,
    textAlign: 'right',
    marginTop: -8,
    marginBottom: 8,
  },

  estadoFormulario: {
    color: '#246B45',
    backgroundColor: '#E8F3E6',
    borderRadius: 10,
    padding: 11,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },

  notaFormulario: {
    color: '#778177',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  tituloSeccionLista: {
    color: '#314D39',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 10,
  },

  tarjetaOpinion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E1E8DE',
    padding: 14,
    marginBottom: 10,
  },

  filaOpinion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  nombreOpinion: {
    color: '#354E39',
    fontSize: 14,
    fontWeight: '800',
  },

  fechaOpinion: {
    color: '#8A948B',
    fontSize: 11,
  },

  estrellasOpinion: {
    color: '#D59A26',
    fontSize: 16,
    marginVertical: 5,
  },

  comentarioOpinion: {
    color: '#4D5A50',
    fontSize: 14,
    lineHeight: 21,
  },

  textoSinOpiniones: {
    color: '#6A756B',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 15,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },

  cargandoOpiniones: {
    paddingVertical: 24,
  },

  tarjetaContactoHero: {
    alignItems: 'center',
    backgroundColor: '#EAF3E5',
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },

  iconoContactoHero: {
    fontSize: 35,
    marginBottom: 7,
  },

  tituloContactoHero: {
    color: '#31583B',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 5,
    textAlign: 'center',
  },

  textoContactoHero: {
    color: '#657465',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});
