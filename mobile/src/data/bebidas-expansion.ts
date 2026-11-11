import type { CategoriaReceta, Receta, IngredienteReceta } from './recetas';

const nombres = [
  'Frappé de café de olla','Frappé de moka casero','Frappé de horchata','Frappé de mazapán','Frappé de chocolate mexicano',
  'Frappé de fresa natural','Frappé de mango con limón','Frappé de piña y coco sin alcohol','Frappé de limón','Frappé de pepino con limón',
  'Capuchino tradicional','Capuchino de cajeta','Capuchino de canela','Capuchino de vainilla','Capuchino de chocolate',
  'Capuchino de piloncillo','Jugo de naranja natural','Jugo verde de nopal y piña','Jugo de zanahoria y naranja','Jugo de piña con pepino',
  'Licuado de papaya con leche','Licuado de plátano y avena','Limonada de hierbabuena y chía','Limonada mineral de pepino','Agua fresca de mango',
  'Agua de sandía','Licuado frío de melón y canela','Agua fresca de piña y canela','Agua de limón con hierbabuena','Agua de tamarindo con naranja',
  'Té frío de jamaica y limón','Té de canela y manzana','Té de limón con miel','Infusión de hierbabuena','Té de manzanilla',
  'Té de limón con jengibre','Café de olla con piloncillo','Chocolate caliente con canela','Atole de avena casero','Atole de cajeta',
];

const platos = ['Desayuno','Comida','Cena','Entrada','Postre','Acompañamiento'] as CategoriaReceta[];
const acompañamientos = (indice: number): CategoriaReceta[] => indice % 3 === 0
  ? platos
  : indice % 3 === 1
    ? ['Desayuno','Postre','Entrada']
    : ['Comida','Cena','Acompañamiento'];

const clasificar = (nombre: string): string => /leche|crema|cajeta|yogur/i.test(nombre) ? 'Lácteos'
  : /café|capuchino|chocolate|té|infusión|canela|jengibre|hierbabuena|manzanilla|piloncillo|vainilla/i.test(nombre) ? 'Despensa'
  : /piña|fresa|mango|limón|naranja|sandía|melón|papaya|plátano|manzana|pepino|tamarindo/i.test(nombre) ? 'Frutas'
  : /avena|arroz|chía|nopal/i.test(nombre) ? 'Cereales'
  : /hielo|agua/i.test(nombre) ? 'Bebidas' : 'Despensa';

const ingredientesPara = (nombre: string): IngredienteReceta[] => {
  const n = nombre.toLocaleLowerCase('es-MX');
  let base: string[];
  if (/café|capuchino|moka/.test(n)) base = ['Café soluble o espresso=2 cucharadas','Leche=2 tazas','Agua caliente=1 taza','Azúcar=2 cucharadas o al gusto','Canela=1 pizca','Hielo=1 taza'];
  else if (/té|infusión/.test(n)) base = ['Agua=3 tazas','Té o hierbas secas=2 cucharaditas','Limón=1 pieza','Miel=1 cucharada o al gusto','Hielo=1 taza'];
  else if (/atole|chocolate caliente/.test(n)) base = ['Leche=1 litro','Agua=1 taza','Masa de maíz=1/3 taza','Azúcar o piloncillo=1/3 taza','Canela=1 raja','Vainilla=1 cucharadita'];
  else if (/horchata/.test(n)) base = ['Arroz=1/2 taza','Leche=2 tazas','Agua=3 tazas','Canela=1 raja','Azúcar=1/3 taza','Hielo=1 taza'];
  else if (/licuado/.test(n)) base = ['Leche=2 tazas','Avena=1/3 taza','Plátano=1 pieza','Azúcar o miel=1 cucharada','Canela=1 pizca','Hielo=1 taza'];
  else if (/jugo/.test(n)) base = ['Naranja=4 piezas','Zanahoria=1 pieza','Limón=1/2 pieza','Agua fría=1 taza','Hielo=1 taza','Miel=1 cucharadita opcional'];
  else if (/frappé/.test(n)) base = ['Leche=1 taza','Hielo=2 tazas','Azúcar=2 cucharadas o al gusto','Café o fruta del sabor elegido=1/2 taza','Vainilla=1/2 cucharadita','Canela=1 pizca'];
  else base = ['Agua=1 litro','Fruta de temporada=2 tazas','Limón=1 pieza','Azúcar=2 cucharadas o al gusto','Hielo=1 taza','Hierbabuena=4 hojas opcionales'];
  if (/mango/.test(n)) base[3] = 'Mango maduro=2 piezas';
  if (/fresa/.test(n)) base[3] = 'Fresa=1 taza';
  if (/piña/.test(n)) base[3] = 'Piña=2 tazas';
  if (/pepino/.test(n)) base[3] = 'Pepino=1 pieza';
  if (/sandía/.test(n)) base[3] = 'Sandía sin semillas=3 tazas';
  if (/melón/.test(n)) base[3] = 'Melón=2 tazas';
  if (/papaya/.test(n)) base[2] = 'Papaya madura=1 taza';
  if (/plátano/.test(n)) base[2] = 'Plátano=1 pieza';
  if (/jamaica/.test(n)) base[1] = 'Flor de jamaica=1/2 taza';
  if (/limón/.test(n)) base[3] = 'Jugo de limón=1/3 taza';
  if (/cajeta/.test(n)) base.push('Cajeta=2 cucharadas');
  if (/mazapán/.test(n)) base.push('Mazapán=2 piezas');
  if (/chocolate/.test(n)) base.push('Chocolate de mesa=1 tablilla');
  if (/nopal/.test(n)) base.push('Nopal limpio=1 pieza');
  if (/chía/.test(n)) base.push('Chía=2 cucharadas');
  if (/jengibre/.test(n)) base.push('Jengibre fresco=1 cucharadita rallada');
  const map = new Map<string, string>();
  for (const item of base) map.set(item.split('=')[0].toLocaleLowerCase('es-MX'), item);
  return [...map.values()].slice(0, 8).map((item) => {
    const [ingrediente, cantidad] = item.split('=');
    return { nombre: ingrediente, cantidad, categoria: clasificar(ingrediente) };
  });
};

let id = 600;
export const BEBIDAS_EXPANSION: Receta[] = nombres.map((nombre, indice) => {
  const ingredientes = ingredientesPara(nombre);
  const caliente = /capuchino|café de olla|chocolate caliente|atole|té de |infusión/.test(nombre.toLocaleLowerCase('es-MX'));
  const base = ingredientes.slice(0, 3).map((item) => item.nombre.toLocaleLowerCase('es-MX')).join(', ');
  return {
    id: id++,
    nombre,
    descripcion: nombre + (caliente
      ? ': bebida caliente de cafetería con ingredientes sencillos y preparación en casa.'
      : ': bebida fría para acompañar la comida, preparada con fruta, hielo y opciones de dulzor ajustable.'),
    categoria: 'Bebidas',
    tiempoMin: caliente ? 15 : 10,
    porciones: 2,
    dificultad: 'Fácil',
    emoji: /café|capuchino|chocolate|atole|té |infusión/.test(nombre.toLocaleLowerCase('es-MX')) ? '☕' : '🥤',
    acompanamientoPara: acompañamientos(indice),
    ingredientes,
    utensilios: caliente ? ['Taza medidora', 'Olla pequeña', 'Cuchara', 'Tazas para servir'] : ['Licuadora o jarra', 'Cuchillo', 'Tabla para cortar', 'Colador'],
    equipos: caliente ? ['Estufa'] : /frappé|licuado/.test(nombre.toLocaleLowerCase('es-MX')) ? ['Licuadora', 'Refrigerador'] : ['Refrigerador'],
    preparacion: caliente ? [
      'Mide ' + base + ' y separa los ingredientes. Si la bebida lleva fruta o especias frescas, lávalas y córtalas antes de calentar.',
      'Calienta el agua o la leche en una olla pequeña a fuego medio. Añade el café, el té, la canela o la fruta y remueve para que libere su aroma.',
      'Para atole, disuelve la masa en agua fría antes de incorporarla; cocina a fuego bajo, moviendo constantemente hasta que espese. Para café o té, evita que la leche hierva fuerte.',
      'Prueba el dulzor, ajusta con azúcar o miel al gusto y sirve caliente en tazas. Manipula con cuidado la olla y las tazas.',
    ] : [
      'Lava y desinfecta la fruta. Pela y retira semillas o partes duras; corta los ingredientes para que se puedan licuar sin forzar el equipo.',
      'Coloca en la licuadora ' + base + ' junto con agua o leche. Licúa primero a velocidad baja y después alta hasta que la mezcla quede uniforme.',
      'Agrega el hielo y vuelve a licuar para frappé o sirve sobre hielo para agua fresca. Cuela únicamente si prefieres una textura ligera.',
      'Prueba y ajusta el dulzor con poca azúcar o miel. Sirve de inmediato y conserva la bebida refrigerada; agítala antes de servir si se separa.',
    ],
    consejo: 'Ajusta el dulzor al final y ofrece una versión sin azúcar añadida. Mantén la bebida refrigerada y consúmela el mismo día.',
    fuenteUrl: 'https://www.recetasnestle.com.mx/index.php/categorias/bebidas',
  };
});
