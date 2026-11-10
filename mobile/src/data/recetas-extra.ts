import type { CategoriaReceta, Receta } from './recetas';

type DatosRecetaExtra = Omit<Receta, 'porciones' | 'consejo' | 'ingredientes' | 'utensilios' | 'equipos' | 'fuenteUrl'> & {
  porciones?: number;
  consejo?: string;
  ingredientes: string[];
  utensilios?: string[];
  equipos?: string[];
  fuenteUrl?: string;
};

const utensiliosBase: Record<CategoriaReceta, string[]> = {
  Desayuno: ['Cuchillo', 'Tabla para cortar', 'Tazón', 'Sartén', 'Espátula'],
  Comida: ['Cuchillo', 'Tabla para cortar', 'Olla', 'Cuchara de madera', 'Cucharón'],
  Cena: ['Cuchillo', 'Tabla para cortar', 'Comal', 'Sartén', 'Espátula'],
  Entrada: ['Cuchillo', 'Tabla para cortar', 'Olla', 'Cucharón', 'Tazón'],
  Postre: ['Tazón', 'Cuchara de madera', 'Taza medidora', 'Molde'],
  Acompañamiento: ['Cuchillo', 'Tabla para cortar', 'Sartén', 'Espátula', 'Tazón'],
  Bebidas: ['Jarra', 'Cuchara larga', 'Taza medidora', 'Colador'],
};

const equiposBase: Record<CategoriaReceta, string[]> = {
  Desayuno: ['Estufa'],
  Comida: ['Estufa'],
  Cena: ['Estufa'],
  Entrada: ['Estufa'],
  Postre: ['Estufa'],
  Acompañamiento: ['Estufa'],
  Bebidas: ['Refrigerador'],
};

const fuentesCategoria: Record<CategoriaReceta, string> = {
  Desayuno: 'https://laroussecocina.mx/libro/desayunos-mexicanos/',
  Comida: 'https://laroussecocina.mx/recetas/',
  Cena: 'https://laroussecocina.mx/recetas/',
  Entrada: 'https://laroussecocina.mx/Categoria/sopas/',
  Postre: 'https://laroussecocina.mx/recetas/',
  Acompañamiento: 'https://laroussecocina.mx/recetas/',
  Bebidas: 'https://laroussecocina.mx/Categoria/bebidas/',
};

const crearRecetaExtra = (datos: DatosRecetaExtra): Receta => ({
  ...datos,
  porciones: datos.porciones ?? 4,
  consejo: datos.consejo ?? 'Prepara y mide todo antes de cocinar; prueba la sazón al final y ajusta sal o picante poco a poco.',
  utensilios: datos.utensilios ?? utensiliosBase[datos.categoria],
  equipos: datos.equipos ?? equiposBase[datos.categoria],
  fuenteUrl: datos.fuenteUrl ?? fuentesCategoria[datos.categoria],
  ingredientes: datos.ingredientes.map((valor) => {
    const [nombre, cantidad, categoria = 'Despensa'] = valor.split('|');
    return { nombre, cantidad, categoria };
  }),
});

/** Recetas regionales adicionales, normalizadas al mismo formato del catálogo. */
export const RECETAS_EXTRA: Receta[] = [
  crearRecetaExtra({
    id: 39, nombre: 'Huevos divorciados', categoria: 'Desayuno', descripcion: 'Dos huevos servidos sobre tortillas con salsa roja y verde separadas por frijoles refritos.', tiempoMin: 30, dificultad: 'Media', emoji: '🍳',
    ingredientes: ['Huevo|4 piezas|Proteínas', 'Tortillas de maíz|4 piezas|Cereales', 'Salsa roja|1/2 taza|Chiles', 'Salsa verde|1/2 taza|Chiles', 'Frijoles refritos|1 taza|Leguminosas', 'Queso fresco|1/3 taza|Lácteos', 'Aceite vegetal|2 cucharadas|Despensa', 'Sal|al gusto|Despensa'],
    utensilios: ['Comal', 'Dos sartenes', 'Espátula', 'Cuchara', 'Platos'],
    preparacion: ['Calienta las dos salsas por separado en cacerolas pequeñas; mantenlas a fuego bajo mientras preparas los huevos.', 'Pasa las tortillas por un comal caliente hasta que estén flexibles. Calienta los frijoles con una cucharada de agua y mezcla hasta que queden untables.', 'Fríe los huevos en una sartén con aceite a fuego medio. Cocina hasta que las claras estén firmes y sazona ligeramente con sal.', 'Coloca dos tortillas en cada plato, pon un huevo sobre cada una y baña uno con salsa roja y el otro con salsa verde. Sirve los frijoles entre ambos y termina con queso fresco.'],
  }),
  crearRecetaExtra({
    id: 40, nombre: 'Huevos al albañil', categoria: 'Desayuno', descripcion: 'Huevos revueltos cocinados en una salsa casera de jitomate y chile serrano.', tiempoMin: 20, dificultad: 'Fácil', emoji: '🍅',
    ingredientes: ['Huevo|6 piezas|Proteínas', 'Jitomate|3 piezas|Verduras', 'Chile serrano|2 piezas|Chiles', 'Cebolla|1/4 pieza|Verduras', 'Ajo|1 diente|Verduras', 'Aceite vegetal|1 cucharada|Despensa', 'Cilantro|2 cucharadas|Hierbas', 'Tortillas de maíz|8 piezas|Cereales', 'Sal|al gusto|Despensa'],
    preparacion: ['Pica el jitomate y la cebolla; rebana los chiles y retira sus semillas si prefieres un guiso menos picante. Bate los huevos con una pizca de sal.', 'Calienta el aceite en una sartén. Sofríe la cebolla y el chile por 2 minutos; agrega el ajo y el jitomate y cocina hasta que el jitomate suelte su jugo.', 'Vierte el huevo batido sobre la salsa y revuelve lentamente a fuego medio para que se cueza sin resecarse. Retira cuando ya no se vea líquido.', 'Espolvorea cilantro picado y lleva a la mesa con tortillas calientes y frijoles de olla.'],
  }),
  crearRecetaExtra({
    id: 41, nombre: 'Machaca con huevo', categoria: 'Desayuno', descripcion: 'Carne seca deshebrada con huevo, cebolla, chile y jitomate, al estilo norteño.', tiempoMin: 25, dificultad: 'Fácil', emoji: '🥩',
    ingredientes: ['Machaca de res|150 g|Proteínas', 'Huevo|6 piezas|Proteínas', 'Jitomate|2 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Chile serrano|1 pieza|Chiles', 'Aceite vegetal|1 cucharada|Despensa', 'Pimienta|al gusto|Especias', 'Tortillas de harina|8 piezas|Cereales'],
    preparacion: ['Desmenuza la machaca si viene en trozos. Pica jitomate, cebolla y chile; bate los huevos con pimienta y poca sal porque la carne seca ya suele ser salada.', 'Calienta el aceite en una sartén amplia y sofríe la cebolla con el chile hasta que se suavicen. Incorpora la machaca y muévela un minuto para que libere su aroma.', 'Añade el jitomate y cocina hasta que se ablande y reduzca parte de su jugo. Vierte los huevos y revuelve a fuego medio hasta que estén cocidos pero jugosos.', 'Prueba antes de añadir sal. Sirve de inmediato con tortillas de harina calientes, frijoles y salsa al gusto.'],
  }),
  crearRecetaExtra({
    id: 42, nombre: 'Tacos de huevo con chorizo', categoria: 'Desayuno', descripcion: 'Huevo revuelto con chorizo dorado y papas, servido en tortillas de maíz.', tiempoMin: 25, dificultad: 'Fácil', emoji: '🌮',
    ingredientes: ['Chorizo mexicano|180 g|Proteínas', 'Huevo|5 piezas|Proteínas', 'Papa|1 pieza mediana|Verduras', 'Tortillas de maíz|8 piezas|Cereales', 'Cebolla|1/4 pieza|Verduras', 'Cilantro|2 cucharadas|Hierbas', 'Salsa roja|1/2 taza|Chiles'],
    preparacion: ['Pela la papa y córtala en cubos pequeños para que se cocine rápido. Pica la cebolla y bate los huevos en un tazón.', 'Cuece la papa en agua hirviendo con una pizca de sal durante 8 a 10 minutos; escúrrela cuando esté tierna, pero todavía conserve su forma.', 'Desmenuza el chorizo en una sartén caliente y cocínalo hasta que esté bien hecho. Añade la cebolla y la papa, mezcla y vierte el huevo; revuelve hasta que cuaje.', 'Calienta las tortillas, reparte el guiso y sirve con cilantro y salsa roja. Mantén el chorizo completamente cocido antes de comer.'],
  }),
  crearRecetaExtra({
    id: 43, nombre: 'Enfrijoladas de queso y aguacate', categoria: 'Desayuno', descripcion: 'Tortillas dobladas bañadas en salsa de frijol, rellenas de queso fresco y aguacate.', tiempoMin: 30, dificultad: 'Fácil', emoji: '🫘',
    ingredientes: ['Frijoles negros cocidos|2 tazas|Leguminosas', 'Caldo de frijol|1 taza|Despensa', 'Tortillas de maíz|12 piezas|Cereales', 'Queso fresco|1 taza|Lácteos', 'Aguacate|1 pieza|Verduras', 'Crema|1/3 taza|Lácteos', 'Cebolla|1/4 pieza|Verduras', 'Aceite vegetal|2 cucharadas|Despensa'],
    preparacion: ['Licúa los frijoles con el caldo hasta obtener una salsa tersa. Si queda muy espesa, añade más caldo o agua poco a poco.', 'Calienta una cucharada de aceite en una cacerola y vierte la salsa. Cocina a fuego bajo de 6 a 8 minutos, moviendo para que no se pegue; ajusta sal.', 'Pasa cada tortilla unos segundos por una sartén con aceite para suavizarla. Rellénala con queso fresco y unas láminas de aguacate, y dóblala en cuatro.', 'Acomoda las tortillas en platos, báñalas con salsa caliente y termina con crema, cebolla picada y más queso.'],
  }),
  crearRecetaExtra({
    id: 44, nombre: 'Gorditas de chicharrón prensado', categoria: 'Desayuno', descripcion: 'Gorditas de masa de maíz rellenas de chicharrón prensado guisado con salsa de guajillo.', tiempoMin: 45, dificultad: 'Media', emoji: '🫓',
    ingredientes: ['Masa de maíz|500 g|Cereales', 'Chicharrón prensado|300 g|Proteínas', 'Chile guajillo|3 piezas|Chiles', 'Jitomate|2 piezas|Verduras', 'Ajo|1 diente|Verduras', 'Cebolla|1/4 pieza|Verduras', 'Lechuga|2 tazas|Verduras', 'Queso fresco|1/2 taza|Lácteos', 'Aceite vegetal|2 cucharadas|Despensa'],
    utensilios: ['Comal', 'Cacerola', 'Licuadora', 'Prensa para tortillas', 'Espátula'],
    preparacion: ['Desvena los chiles guajillo y remójalos en agua caliente durante 10 minutos. Licúalos con jitomate, ajo y un poco del agua de remojo; cuela la salsa.', 'Corta el chicharrón en trozos pequeños. Cocina la salsa en una cacerola con una cucharadita de aceite por 5 minutos, incorpora el chicharrón y guisa hasta que se suavice.', 'Divide la masa en porciones, forma discos gruesos y rellena cada uno con una cucharada del guiso. Cierra la masa alrededor del relleno y aplana con cuidado.', 'Cuece las gorditas sobre un comal a fuego medio, volteándolas para que se doren y se cocinen por dentro. Ábrelas con un cuchillo y agrega lechuga y queso.'],
  }),
  crearRecetaExtra({
    id: 45, nombre: 'Tlacoyos de haba con nopales', categoria: 'Desayuno', descripcion: 'Masa ovalada rellena de haba molida, asada al comal y acompañada de nopales.', tiempoMin: 55, dificultad: 'Media', emoji: '🌵',
    ingredientes: ['Masa de maíz azul|500 g|Cereales', 'Habas secas|1 taza|Leguminosas', 'Nopales|3 piezas|Verduras', 'Cebolla|1/4 pieza|Verduras', 'Cilantro|1/4 taza|Hierbas', 'Queso fresco|1/2 taza|Lácteos', 'Salsa verde|1/2 taza|Chiles', 'Sal|al gusto|Despensa'],
    utensilios: ['Olla', 'Colador', 'Comal', 'Tazón', 'Espátula'],
    preparacion: ['Remoja las habas durante la noche, escúrrelas y cuécelas en agua nueva hasta que estén muy suaves. Escurre y machaca con sal hasta lograr un puré espeso.', 'Corta los nopales en tiras y cuécelos en agua con sal hasta que estén tiernos. Escúrrelos muy bien y mézclalos con cebolla y cilantro picados.', 'Forma porciones ovaladas de masa, coloca una cucharada de haba en el centro y cierra la masa. Aplana cada pieza con las manos sin dejar que se abra el relleno.', 'Asa los tlacoyos en un comal caliente por ambos lados hasta que la masa esté cocida y aparezcan manchas doradas. Sirve con nopales, salsa verde y queso.'],
  }),
  crearRecetaExtra({
    id: 46, nombre: 'Quesadillas de huitlacoche', categoria: 'Desayuno', descripcion: 'Tortillas de maíz rellenas de huitlacoche guisado con cebolla, epazote y queso.', tiempoMin: 30, dificultad: 'Fácil', emoji: '🌽',
    ingredientes: ['Huitlacoche|300 g|Verduras', 'Tortillas de maíz|8 piezas|Cereales', 'Queso Oaxaca|200 g|Lácteos', 'Cebolla|1/2 pieza|Verduras', 'Epazote|5 hojas|Hierbas', 'Chile serrano|1 pieza|Chiles', 'Aceite vegetal|1 cucharada|Despensa'],
    preparacion: ['Limpia el huitlacoche y pícalo en trozos medianos. Pica la cebolla, el chile y las hojas de epazote.', 'Calienta el aceite en una sartén y sofríe la cebolla hasta que se vea transparente. Agrega el chile y el huitlacoche; cocina de 6 a 8 minutos hasta que se suavice.', 'Incorpora el epazote y una pizca de sal. Cocina un minuto más y retira del fuego para que el relleno no quede aguado.', 'Rellena las tortillas calientes con huitlacoche y queso Oaxaca. Dóblalas y caliéntalas en un comal hasta que el queso se funda; sirve enseguida.'],
  }),
  crearRecetaExtra({
    id: 47, nombre: 'Tamalitos de elote', categoria: 'Desayuno', descripcion: 'Tamales dulces de elote tierno envueltos en hojas y cocidos al vapor.', tiempoMin: 80, dificultad: 'Media', emoji: '🌽',
    ingredientes: ['Granos de elote tierno|4 tazas|Verduras', 'Mantequilla|100 g|Lácteos', 'Azúcar|1/3 taza|Despensa', 'Harina de maíz|1/2 taza|Cereales', 'Polvo para hornear|1 cucharadita|Despensa', 'Leche|1/3 taza|Lácteos', 'Hojas de maíz secas|16 piezas|Despensa', 'Sal|1 pizca|Despensa'],
    utensilios: ['Licuadora', 'Tazón', 'Espátula', 'Vaporera', 'Pinzas'], equipos: ['Licuadora', 'Estufa'],
    preparacion: ['Remoja las hojas de maíz en agua caliente durante 20 minutos para ablandarlas y escúrrelas. Separa las hojas más anchas para envolver.', 'Licúa los granos de elote con la leche hasta obtener una mezcla espesa con algo de textura. Bate la mantequilla con azúcar y sal; incorpora el elote, harina y polvo para hornear.', 'Coloca dos cucharadas de masa en cada hoja y dóblala sin apretar demasiado, dejando espacio para que el tamal crezca durante la cocción.', 'Acomoda los tamales verticalmente en la vaporera, tapa y cocina al vapor de 50 a 60 minutos. Comprueba uno: la masa debe separarse de la hoja al enfriarse unos minutos.'],
  }),
  crearRecetaExtra({
    id: 48, nombre: 'Picaditas veracruzanas', categoria: 'Desayuno', descripcion: 'Discos de masa pellizcados en la orilla con salsa, cebolla y queso fresco.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🫓',
    ingredientes: ['Masa de maíz|500 g|Cereales', 'Salsa roja|1 taza|Chiles', 'Salsa verde|1 taza|Chiles', 'Cebolla|1/2 pieza|Verduras', 'Queso fresco|3/4 taza|Lácteos', 'Manteca|3 cucharadas|Despensa', 'Crema|1/3 taza|Lácteos'],
    preparacion: ['Divide la masa en bolitas y aplánalas en discos de aproximadamente un centímetro de grosor. Cocina cada disco en un comal caliente hasta que aparezcan pequeñas manchas tostadas.', 'Mientras aún están tibios, pellizca el borde con los dedos protegidos por un paño para formar una orilla levantada que contenga la salsa.', 'Unta una pequeña cantidad de manteca en cada picadita y deja que se dore por ambos lados. Calienta las salsas por separado.', 'Baña unas piezas con salsa roja y otras con verde; agrega cebolla finamente picada, queso fresco y crema. Sirve calientes.'],
  }),
  crearRecetaExtra({
    id: 49, nombre: 'Burrito de machaca norteño', categoria: 'Desayuno', descripcion: 'Tortilla grande de harina rellena de machaca con huevo, frijoles y chile verde.', tiempoMin: 30, dificultad: 'Fácil', emoji: '🌯',
    ingredientes: ['Tortillas de harina grandes|4 piezas|Cereales', 'Machaca de res|120 g|Proteínas', 'Huevo|4 piezas|Proteínas', 'Frijoles refritos|1 taza|Leguminosas', 'Chile poblano|1 pieza|Chiles', 'Jitomate|1 pieza|Verduras', 'Queso Chihuahua|1/2 taza|Lácteos'],
    preparacion: ['Asa el chile poblano hasta que la piel se ampolle, tápalo 10 minutos y retira piel, semillas y venas. Córtalo en tiras; pica el jitomate.', 'Cocina la machaca en una sartén caliente con el jitomate y las rajas hasta que se suavicen. Bate los huevos e incorpóralos; revuelve hasta que cuajen.', 'Calienta los frijoles con un chorrito de agua. Entibia las tortillas de harina para que se doblen sin romperse.', 'Unta frijoles en el centro de cada tortilla, agrega machaca y queso; dobla los lados y enrolla firme. Dora el burrito unos segundos por cada lado en el comal.'],
  }),
  crearRecetaExtra({
    id: 50, nombre: 'Huevos con nopales', categoria: 'Desayuno', descripcion: 'Huevos revueltos con nopales tiernos, cebolla y chile serrano.', tiempoMin: 25, dificultad: 'Fácil', emoji: '🥚',
    ingredientes: ['Huevo|6 piezas|Proteínas', 'Nopales|3 piezas|Verduras', 'Cebolla|1/4 pieza|Verduras', 'Chile serrano|1 pieza|Chiles', 'Jitomate|1 pieza|Verduras', 'Aceite vegetal|1 cucharada|Despensa', 'Tortillas de maíz|8 piezas|Cereales'],
    preparacion: ['Lava y corta los nopales en cubos. Cuécelos en agua hirviendo con sal durante 10 a 12 minutos, hasta que estén suaves; escúrrelos y enjuágalos.', 'Pica cebolla, chile y jitomate. Calienta aceite en una sartén y sofríe la cebolla y el chile; agrega jitomate y cocina hasta que suelte su jugo.', 'Incorpora los nopales escurridos y cocina 3 minutos para que tomen el sabor del sofrito. Bate los huevos y viértelos sobre las verduras.', 'Revuelve a fuego medio hasta que el huevo esté firme. Sirve con tortillas y salsa, ajustando la sal al final.'],
  }),
  crearRecetaExtra({
    id: 51, nombre: 'Chilaquiles divorciados', categoria: 'Desayuno', descripcion: 'Totopos crujientes bañados en dos salsas, roja y verde, con crema, queso y cebolla.', tiempoMin: 35, dificultad: 'Media', emoji: '🌶️',
    ingredientes: ['Tortillas de maíz|12 piezas|Cereales', 'Jitomate|4 piezas|Verduras', 'Tomate verde|6 piezas|Verduras', 'Chile guajillo|2 piezas|Chiles', 'Chile serrano|2 piezas|Chiles', 'Queso fresco|3/4 taza|Lácteos', 'Crema|1/2 taza|Lácteos', 'Cebolla morada|1/2 pieza|Verduras', 'Aceite vegetal|para freír|Despensa'],
    utensilios: ['Cuchillo', 'Tabla', 'Dos ollas', 'Licuadora', 'Sartén', 'Espumadera'],
    preparacion: ['Corta las tortillas en triángulos y dóralas en aceite por tandas; escúrrelas sobre papel absorbente. Para una versión menos grasosa, hornéalas hasta que queden secas y crujientes.', 'Hierve por separado el jitomate con el guajillo y el tomate verde con el serrano hasta que estén suaves. Licúa cada grupo con un poco de cebolla y sal.', 'Calienta ambas salsas en ollas distintas durante 5 minutos. Divide los totopos en dos porciones y mézclalos brevemente con cada salsa para conservar textura.', 'Sirve las dos porciones lado a lado; termina con crema, queso desmoronado y cebolla fileteada. Agrega pollo o huevo si deseas un desayuno más completo.'],
    fuenteUrl: 'https://laroussecocina.mx/recetas/',
  }),
  crearRecetaExtra({
    id: 52, nombre: 'Molletes con chorizo', categoria: 'Desayuno', descripcion: 'Bolillos con frijoles, chorizo y queso gratinado, servidos con pico de gallo.', tiempoMin: 25, dificultad: 'Fácil', emoji: '🥖',
    ingredientes: ['Bolillo|4 piezas|Cereales', 'Frijoles negros refritos|1 taza|Leguminosas', 'Chorizo mexicano|200 g|Proteínas', 'Queso Oaxaca|1 taza|Lácteos', 'Jitomate|2 piezas|Verduras', 'Cebolla|1/4 pieza|Verduras', 'Cilantro|3 ramitas|Hierbas', 'Limón|1 pieza|Frutas'],
    utensilios: ['Sartén', 'Cuchillo', 'Tabla', 'Charola para horno', 'Cuchara'], equipos: ['Estufa', 'Horno'],
    preparacion: ['Precalienta el horno a 200 °C. Corta los bolillos a lo largo y tuéstalos ligeramente con la miga hacia arriba.', 'Dora el chorizo desmenuzado en una sartén hasta que esté bien cocido. Calienta los frijoles y unta una capa sobre cada mitad de bolillo.', 'Reparte chorizo y queso Oaxaca sobre los frijoles. Coloca los molletes en una charola y gratina de 5 a 8 minutos, hasta que el queso se funda.', 'Pica jitomate, cebolla y cilantro; mezcla con limón y sal para preparar el pico de gallo. Sirve sobre los molletes recién salidos del horno.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/molletes/',
  }),
];
