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
  'Agua de naranja','Agua de limón','Agua de jamaica','Agua de tamarindo','Licuado de fresa',
  'Licuado de chocolate','Atole de chocolate','Atole de maíz','Agua de mango','Limonada casera',
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
  const base: string[] = [];
  const agua = 'Agua=1 litro';
  const hielo = 'Hielo=1 taza';
  const azucar = /piloncillo/.test(n) ? 'Piloncillo=1/3 taza' : 'Azúcar=1/3 taza';
  const fruta = /mango/.test(n) ? 'Mango=1 taza'
    : /fresa/.test(n) ? 'Fresa=1 taza'
      : /piña/.test(n) ? 'Piña=1 taza'
        : /naranja/.test(n) ? 'Naranja=3 piezas'
          : /sandía/.test(n) ? 'Sandía=2 tazas'
            : /melón/.test(n) ? 'Melón=2 tazas'
              : /papaya/.test(n) ? 'Papaya=1 taza'
                : /plátano/.test(n) ? 'Plátano=1 pieza'
                  : /tamarindo/.test(n) ? 'Tamarindo=1/2 taza'
                    : /jamaica/.test(n) ? 'Flor de jamaica=1/3 taza'
                      : /pepino/.test(n) ? 'Pepino=1 pieza'
                        : /limón/.test(n) ? 'Limón=4 piezas' : null;

  if (/café|capuchino|moka/.test(n)) {
    base.push('Café=2 cucharadas', 'Leche=2 tazas', 'Agua=1 taza', azucar, 'Canela=1 pizca');
  } else if (/té|infusión/.test(n)) {
    base.push(agua, /manzanilla/.test(n) ? 'Manzanilla=2 cucharaditas' : /hierbabuena/.test(n) ? 'Hierbabuena=6 hojas' : 'Té=2 cucharaditas', 'Limón=1 pieza', 'Miel=1 cucharada');
  } else if (/atole|chocolate caliente/.test(n)) {
    base.push('Leche=1 litro', 'Masa de maíz=1/3 taza', 'Agua=1 taza', azucar, 'Canela=1 raja');
    if (/chocolate/.test(n)) base.push('Chocolate en barra=1 tablilla');
  } else if (/horchata/.test(n)) {
    base.push('Arroz=1/2 taza', 'Leche=2 tazas', 'Agua=3 tazas', 'Canela=1 raja', 'Azúcar=1/3 taza', hielo);
  } else if (/licuado/.test(n)) {
    base.push('Leche=2 tazas');
    if (!/chocolate/.test(n)) base.push(fruta ?? 'Plátano=1 pieza');
    base.push('Avena=1/3 taza', /chocolate/.test(n) ? 'Chocolate en polvo=2 cucharadas' : 'Azúcar=1 cucharada', hielo);
  } else if (/jugo/.test(n)) {
    base.push(fruta ?? 'Naranja=4 piezas', agua, hielo);
    if (/zanahoria/.test(n)) base.push('Zanahoria=1 pieza');
  } else if (/frappé/.test(n)) {
    base.push('Leche=1 taza', hielo, azucar);
    if (/café|moka/.test(n)) base.push('Café=2 cucharadas');
    else if (/chocolate/.test(n)) base.push('Chocolate en polvo=2 cucharadas');
    else if (/mazapán/.test(n)) base.push('Mazapán=2 piezas');
    else if (/horchata/.test(n)) base.push('Arroz=1/2 taza', 'Canela=1 raja');
    else if (fruta) base.push(fruta);
    if (/limón/.test(n) && fruta !== 'Limón=4 piezas') base.push('Limón=1 pieza');
    if (/coco/.test(n)) base.push('Coco=1/2 taza');
  } else {
    base.push(agua, fruta ?? 'Limón=4 piezas', azucar, hielo);
  }

  if (/cajeta/.test(n)) base.push('Cajeta=2 cucharadas');
  if (/chía/.test(n)) base.push('Chía=2 cucharadas');
  if (/jengibre/.test(n)) base.push('Jengibre=1 cucharadita');
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
      'Prueba el dulzor y agrega un poco más del endulzante que aparece en la lista si hace falta. Sirve caliente con cuidado.',
    ] : [
      'Lava y desinfecta la fruta. Pela y retira semillas o partes duras; corta los ingredientes para que se puedan licuar sin forzar el equipo.',
      'Coloca en la licuadora ' + base + ' junto con agua o leche. Licúa primero a velocidad baja y después alta hasta que la mezcla quede uniforme.',
      'Agrega el hielo y vuelve a licuar para frappé o sirve sobre hielo para agua fresca. Cuela únicamente si prefieres una textura ligera.',
      'Prueba y ajusta el dulzor con el ingrediente que aparece en la lista. Sirve de inmediato y conserva la bebida refrigerada; agítala antes de servir si se separa.',
    ],
    consejo: 'Ajusta el dulzor al final y ofrece una versión sin azúcar añadida. Mantén la bebida refrigerada y consúmela el mismo día.',
    fuenteUrl: 'https://www.recetasnestle.com.mx/index.php/categorias/bebidas',
  };
});
