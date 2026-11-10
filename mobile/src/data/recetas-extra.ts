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
  crearRecetaExtra({
    id: 53, nombre: 'Cochinita pibil', categoria: 'Comida', descripcion: 'Cerdo marinado en achiote y naranja, cocido lentamente y servido con cebolla morada encurtida.', tiempoMin: 240, dificultad: 'Avanzada', emoji: '🐖',
    ingredientes: ['Paleta de cerdo|1.2 kg|Proteínas', 'Pasta de achiote|100 g|Especias', 'Jugo de naranja|1 taza|Frutas', 'Vinagre blanco|1/4 taza|Despensa', 'Ajo|4 dientes|Verduras', 'Hoja de plátano|2 piezas|Verduras', 'Cebolla morada|2 piezas|Verduras', 'Naranja agria o limón|1/2 taza|Frutas', 'Tortillas de maíz|16 piezas|Cereales'],
    utensilios: ['Licuadora', 'Tazón', 'Cuchillo', 'Tabla', 'Charola profunda', 'Papel aluminio'], equipos: ['Licuadora', 'Refrigerador', 'Horno'],
    preparacion: ['Licúa achiote, jugo de naranja, vinagre, ajo y sal hasta formar un adobo uniforme. Corta la carne en trozos grandes y cúbrela con la mezcla; refrigera al menos 2 horas, idealmente toda la noche.', 'Pasa las hojas de plátano por una flama o comal unos segundos para suavizarlas. Forra una charola con ellas, coloca la carne con todo el adobo y cierra el paquete; cubre además con aluminio.', 'Hornea a 160 °C durante 3 horas o hasta que el cerdo se deshaga fácilmente con un tenedor. Abre con cuidado porque el vapor quema; deshebra la carne dentro de sus jugos.', 'Mientras se hornea, corta la cebolla morada en plumas y mézclala con jugo de naranja agria o limón y sal. Déjala reposar 30 minutos y sírvela sobre la cochinita en tortillas calientes.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/cochinita-pibil/',
  }),
  crearRecetaExtra({
    id: 54, nombre: 'Pollo con mole poblano', categoria: 'Comida', descripcion: 'Piezas de pollo cocidas y cubiertas con mole de chiles, especias, semillas y chocolate.', tiempoMin: 150, dificultad: 'Avanzada', emoji: '🍗',
    ingredientes: ['Pollo en piezas|1.2 kg|Proteínas', 'Pasta de mole poblano|400 g|Despensa', 'Caldo de pollo|1.5 litros|Despensa', 'Ajonjolí tostado|3 cucharadas|Semillas', 'Arroz blanco|2 tazas|Cereales', 'Cebolla|1/2 pieza|Verduras', 'Ajo|2 dientes|Verduras', 'Sal|al gusto|Despensa'],
    utensilios: ['Olla grande', 'Cacerola de fondo grueso', 'Cuchara de madera', 'Cucharón', 'Sartén'],
    preparacion: ['Coloca el pollo en una olla con cebolla, ajo, sal y agua suficiente para cubrirlo. Cuece a fuego medio hasta que esté bien cocido; retíralo y conserva el caldo.', 'Calienta una cacerola de fondo grueso a fuego bajo. Deshaz la pasta de mole con un poco de caldo y muévela continuamente para que no se pegue.', 'Añade más caldo poco a poco hasta obtener una salsa espesa que cubra el dorso de una cuchara. Cocina a fuego bajo de 20 a 30 minutos, moviendo frecuentemente y evitando que salpique.', 'Incorpora las piezas de pollo y deja que se calienten dentro del mole. Sirve con arroz y ajonjolí tostado; ajusta la sal y diluye con caldo si la salsa espesa demasiado.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/mole-poblano-2/',
  }),
  crearRecetaExtra({
    id: 55, nombre: 'Carnitas estilo Michoacán', categoria: 'Comida', descripcion: 'Carne de cerdo cocinada despacio hasta quedar suave por dentro y dorada en su propia grasa.', tiempoMin: 120, dificultad: 'Media', emoji: '🐷',
    ingredientes: ['Espaldilla de cerdo|1.2 kg|Proteínas', 'Costilla de cerdo|500 g|Proteínas', 'Jugo de naranja|2 tazas|Frutas', 'Manteca de cerdo|2 cucharadas|Despensa', 'Laurel|2 hojas|Hierbas', 'Sal|2 cucharaditas|Despensa', 'Tortillas de maíz|16 piezas|Cereales', 'Cebolla|1/2 pieza|Verduras', 'Cilantro|1/2 taza|Hierbas'],
    utensilios: ['Cazo u olla gruesa', 'Pinzas', 'Cuchillo', 'Tabla', 'Cucharón'],
    preparacion: ['Corta la carne en trozos medianos del mismo tamaño. Colócala en una olla gruesa con jugo de naranja, laurel, sal y agua suficiente para casi cubrirla.', 'Lleva a hervor, baja el fuego y cocina destapado de 75 a 90 minutos. Mueve de vez en cuando y revisa que la carne esté suave antes de que se evapore todo el líquido.', 'Cuando el líquido se haya reducido, agrega la manteca si hace falta y deja que la carne se dore en su grasa, volteándola con pinzas para dorar varias caras sin romperla.', 'Retira los trozos, deja escurrir brevemente y pícalos. Sirve en tortillas con cebolla, cilantro, salsa y limón; manipula la grasa caliente con cuidado.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/carnitas/',
  }),
  crearRecetaExtra({
    id: 56, nombre: 'Pescado a la veracruzana', categoria: 'Comida', descripcion: 'Filetes de pescado horneados en salsa de jitomate, aceitunas, alcaparras y chiles güeros.', tiempoMin: 45, dificultad: 'Media', emoji: '🐟',
    ingredientes: ['Filete de huachinango o pescado blanco|4 piezas|Proteínas', 'Jitomate|5 piezas|Verduras', 'Cebolla|1 pieza|Verduras', 'Ajo|2 dientes|Verduras', 'Aceitunas verdes|1/3 taza|Despensa', 'Alcaparras|2 cucharadas|Despensa', 'Chile güero en vinagre|4 piezas|Chiles', 'Orégano seco|1 cucharadita|Especias', 'Aceite de oliva|2 cucharadas|Despensa'],
    utensilios: ['Sartén amplio', 'Cuchillo', 'Tabla', 'Espátula', 'Refractario'], equipos: ['Estufa', 'Horno'],
    preparacion: ['Seca los filetes y sazónalos por ambos lados con sal y pimienta. Pica jitomate, cebolla y ajo; corta las aceitunas si son grandes.', 'Sofríe cebolla y ajo en aceite hasta que estén suaves. Agrega jitomate, orégano y una pizca de sal; cocina de 12 a 15 minutos hasta formar una salsa espesa.', 'Incorpora aceitunas, alcaparras y chiles güeros. Coloca los filetes en un refractario y cúbrelos con la salsa y un poco de su líquido.', 'Hornea a 190 °C durante 12 a 18 minutos, según el grosor, hasta que el pescado se desmenuce fácilmente y esté opaco al centro. Sirve con arroz blanco.'],
  }),
  crearRecetaExtra({
    id: 57, nombre: 'Barbacoa de res estilo Hidalgo', categoria: 'Comida', descripcion: 'Res sazonada con adobo de chile, envuelta y cocida lentamente hasta quedar muy suave.', tiempoMin: 240, dificultad: 'Avanzada', emoji: '🥩',
    ingredientes: ['Diezmillo de res|1.5 kg|Proteínas', 'Chile guajillo|5 piezas|Chiles', 'Chile ancho|3 piezas|Chiles', 'Ajo|4 dientes|Verduras', 'Vinagre|2 cucharadas|Despensa', 'Comino|1 cucharadita|Especias', 'Laurel|3 hojas|Hierbas', 'Hojas de plátano|2 piezas|Verduras', 'Caldo de res|2 tazas|Despensa'],
    utensilios: ['Olla con tapa o vaporera', 'Licuadora', 'Colador', 'Cuchillo', 'Tabla'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Retira tallos y semillas de los chiles; tuéstalos unos segundos por lado y remójalos en agua caliente hasta que se suavicen. Licúalos con ajo, vinagre, comino y sal; cuela el adobo.', 'Corta la carne en piezas grandes y úntala con el adobo. Déjala reposar tapada en refrigeración durante al menos una hora para que tome sabor.', 'Suaviza las hojas de plátano sobre el comal. Forra una olla o vaporera, acomoda la carne y añade laurel y caldo; cierra bien el paquete y tapa la olla.', 'Cocina a fuego bajo de 3 a 4 horas, revisando que siempre haya líquido en el fondo. Deshebra cuando esté muy suave y sirve con tortillas, cebolla y cilantro.'],
  }),
  crearRecetaExtra({
    id: 58, nombre: 'Tamales oaxaqueños de pollo', categoria: 'Comida', descripcion: 'Masa de maíz con pollo y mole, envuelta en hoja de plátano y cocida al vapor.', tiempoMin: 120, dificultad: 'Avanzada', emoji: '🫔',
    ingredientes: ['Masa para tamal|1 kg|Cereales', 'Manteca|200 g|Despensa', 'Caldo de pollo|2 tazas|Despensa', 'Pollo cocido y deshebrado|500 g|Proteínas', 'Mole poblano|1 taza|Despensa', 'Polvo para hornear|1 cucharadita|Despensa', 'Hojas de plátano|8 piezas|Verduras', 'Sal|al gusto|Despensa'],
    utensilios: ['Batidora o cuchara firme', 'Tazón amplio', 'Olla', 'Vaporera', 'Tijeras de cocina'], equipos: ['Estufa', 'Vaporera'],
    preparacion: ['Pasa las hojas de plátano por una flama o comal para suavizarlas; córtalas en rectángulos grandes. Disuelve el mole con un poco de caldo y mézclalo con el pollo deshebrado.', 'Bate la manteca hasta que se vea más clara. Agrega la masa, polvo para hornear, sal y caldo poco a poco; trabaja hasta obtener una mezcla suave que se pueda untar.', 'Extiende una porción de masa sobre cada hoja, coloca una cucharada de pollo con mole en el centro y cierra envolviendo los lados y doblando las puntas.', 'Acomoda los tamales en una vaporera con la unión hacia arriba. Cocina tapados de 60 a 75 minutos y deja reposar 10 minutos antes de abrir uno para comprobar que la masa se desprende de la hoja.'],
  }),
  crearRecetaExtra({
    id: 59, nombre: 'Pollo en pipián verde', categoria: 'Comida', descripcion: 'Pollo cocido bañado en una salsa verde espesa de pepitas, tomate verde y cilantro.', tiempoMin: 75, dificultad: 'Media', emoji: '🌿',
    ingredientes: ['Pollo en piezas|1 kg|Proteínas', 'Pepitas de calabaza|1 taza|Semillas', 'Tomate verde|500 g|Verduras', 'Chile serrano|2 piezas|Chiles', 'Cebolla|1/2 pieza|Verduras', 'Ajo|2 dientes|Verduras', 'Cilantro|1 taza|Hierbas', 'Caldo de pollo|3 tazas|Despensa', 'Aceite vegetal|2 cucharadas|Despensa'],
    utensilios: ['Olla', 'Sartén', 'Licuadora', 'Espátula', 'Cucharón'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Cuece el pollo en agua con un trozo de cebolla, ajo y sal hasta que esté bien cocido. Reserva el caldo y mantén el pollo tapado para que no se reseque.', 'Tuesta las pepitas en una sartén seca a fuego bajo, moviéndolas continuamente hasta que empiecen a saltar y oler a nuez. Retíralas antes de que se oscurezcan.', 'Hierve los tomates verdes y chiles hasta que cambien de color. Licúalos con pepitas, cilantro, cebolla, ajo y una taza de caldo hasta obtener una salsa fina.', 'Calienta el aceite en una cacerola y cocina la salsa sin dejar de mover. Añade caldo hasta que quede cremosa, incorpora el pollo y hierve suavemente 10 minutos.'],
  }),
  crearRecetaExtra({
    id: 60, nombre: 'Mixiotes de pollo', categoria: 'Comida', descripcion: 'Pollo marinado en adobo de guajillo y especias, cocido al vapor en paquetes individuales.', tiempoMin: 100, dificultad: 'Media', emoji: '🍗',
    ingredientes: ['Muslos de pollo|8 piezas|Proteínas', 'Chile guajillo|5 piezas|Chiles', 'Chile ancho|2 piezas|Chiles', 'Ajo|3 dientes|Verduras', 'Vinagre de manzana|2 cucharadas|Despensa', 'Comino|1/2 cucharadita|Especias', 'Laurel|2 hojas|Hierbas', 'Nopales|3 piezas|Verduras', 'Hojas para mixiote|8 piezas|Despensa'],
    utensilios: ['Licuadora', 'Colador fino', 'Tazón', 'Hilo de cocina', 'Vaporera'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Desvena los chiles y remójalos en agua caliente. Licúalos con ajo, vinagre, comino, sal y un poco del agua; cuela para retirar las pieles.', 'Cubre el pollo con el adobo y deja marinar tapado en refrigeración durante 30 minutos. Corta los nopales en tiras y mézclalos con un poco de sal.', 'Coloca una pieza de pollo, nopales y una hoja de laurel en cada hoja para mixiote. Añade una cucharada de adobo y amarra el paquete con hilo, sin apretarlo demasiado.', 'Pon los paquetes en la vaporera y cocina de 60 a 70 minutos, hasta que el pollo esté completamente cocido y tierno. Abre con cuidado por el vapor y sirve con tortillas.'],
  }),
  crearRecetaExtra({
    id: 61, nombre: 'Carne en su jugo jalisciense', categoria: 'Comida', descripcion: 'Bistec picado y tocino cocidos en un caldo concentrado de tomatillo, con frijoles de la olla.', tiempoMin: 50, dificultad: 'Media', emoji: '🥣',
    ingredientes: ['Bistec de res|600 g|Proteínas', 'Tocino|150 g|Proteínas', 'Tomate verde|6 piezas|Verduras', 'Chile serrano|2 piezas|Chiles', 'Cilantro|1/2 taza|Hierbas', 'Frijoles de la olla|2 tazas|Leguminosas', 'Cebolla|1/2 pieza|Verduras', 'Caldo de res|3 tazas|Despensa', 'Limón|2 piezas|Frutas'],
    utensilios: ['Olla grande', 'Sartén', 'Licuadora', 'Cuchillo', 'Tabla', 'Cucharón'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Corta el bistec en tiras pequeñas y el tocino en cubos. Dora el tocino en una olla hasta que suelte parte de su grasa; retíralo y reserva.', 'Sella la carne en la misma olla en tandas para que se dore en vez de hervirse. Regresa todo a la olla y añade el caldo caliente.', 'Licúa tomates verdes, chile, cilantro y un poco de caldo. Cuela la salsa sobre la carne y cocina a fuego bajo durante 25 a 30 minutos, hasta que la res esté tierna.', 'Agrega los frijoles y el tocino reservado; hierve 5 minutos más y ajusta sal. Sirve en tazones hondos con cebolla, cilantro y limón.'],
  }),
  crearRecetaExtra({
    id: 62, nombre: 'Enchiladas mineras', categoria: 'Comida', descripcion: 'Tortillas bañadas en adobo de guajillo, rellenas de queso y servidas con papa y zanahoria.', tiempoMin: 55, dificultad: 'Media', emoji: '🌯',
    ingredientes: ['Tortillas de maíz|12 piezas|Cereales', 'Chile guajillo|5 piezas|Chiles', 'Papa|2 piezas|Verduras', 'Zanahoria|2 piezas|Verduras', 'Queso fresco|1 taza|Lácteos', 'Cebolla|1 pieza|Verduras', 'Ajo|2 dientes|Verduras', 'Lechuga|2 tazas|Verduras', 'Aceite vegetal|1/2 taza|Despensa'],
    utensilios: ['Olla', 'Licuadora', 'Colador', 'Sartén', 'Espumadera', 'Cuchillo'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Cuece papa y zanahoria en agua con sal hasta que estén suaves pero no se deshagan. Escúrrelas, enfríalas un poco y córtalas en cubos.', 'Retira tallos y semillas a los guajillos, remójalos en agua caliente y licúalos con ajo y un trozo de cebolla. Cuela el adobo y cocínalo 8 minutos en una cacerola.', 'Pasa cada tortilla por el adobo y luego fríela brevemente en aceite caliente para suavizarla. Rellena con queso fresco desmoronado y cebolla picada, y enróllala.', 'Sirve las enchiladas con cubos de papa y zanahoria, lechuga fileteada y más queso. Calienta el adobo restante y úsalo para bañar ligeramente.'],
  }),
  crearRecetaExtra({
    id: 63, nombre: 'Mole de olla', categoria: 'Comida', descripcion: 'Caldo de res con chile ancho, verduras de temporada, epazote y elote.', tiempoMin: 120, dificultad: 'Media', emoji: '🍲',
    ingredientes: ['Chambarete de res|800 g|Proteínas', 'Chile ancho|3 piezas|Chiles', 'Jitomate|3 piezas|Verduras', 'Elote|2 piezas|Verduras', 'Calabacita|2 piezas|Verduras', 'Ejotes|1 taza|Verduras', 'Xoconostle|2 piezas|Frutas', 'Epazote|3 ramas|Hierbas', 'Ajo|2 dientes|Verduras'],
    utensilios: ['Olla grande', 'Licuadora', 'Colador', 'Cuchillo', 'Tabla', 'Cucharón'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Pon la carne en una olla con agua, ajo y sal. Retira la espuma de la superficie al comenzar el hervor y cuece tapada a fuego bajo hasta que empiece a suavizarse.', 'Desvena los chiles, tuéstalos brevemente y remójalos. Licúalos con jitomate y un poco de caldo; cuela el adobo y agrégalo a la olla.', 'Añade el elote en trozos y el xoconostle pelado. Cocina 20 minutos; incorpora ejotes, calabacitas y epazote, y hierve hasta que las verduras estén tiernas.', 'Prueba el caldo y ajusta sal o picante. Sirve muy caliente con una pieza de carne, elote y verduras en cada tazón.'],
  }),
  crearRecetaExtra({
    id: 64, nombre: 'Pambazos de papa con chorizo', categoria: 'Cena', descripcion: 'Pan bañado en salsa de guajillo y relleno de papa con chorizo, lechuga, crema y queso.', tiempoMin: 45, dificultad: 'Media', emoji: '🥪',
    ingredientes: ['Pambazo o bolillo suave|4 piezas|Cereales', 'Papa|3 piezas|Verduras', 'Chorizo mexicano|250 g|Proteínas', 'Chile guajillo|4 piezas|Chiles', 'Ajo|1 diente|Verduras', 'Lechuga|2 tazas|Verduras', 'Crema|1/2 taza|Lácteos', 'Queso fresco|1/2 taza|Lácteos', 'Aceite vegetal|3 cucharadas|Despensa'],
    utensilios: ['Olla', 'Sartén', 'Licuadora', 'Colador', 'Pinzas', 'Cuchillo'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Cuece las papas hasta que estén tiernas, pélalas y córtalas en cubos. Retira tallos y semillas de los guajillos y remójalos en agua caliente.', 'Licúa los chiles con ajo y un poco del agua de remojo; cuela la salsa. Desmenuza el chorizo en una sartén, dóralo y añade la papa para que se impregne.', 'Abre los panes sin separarlos del todo. Pásalos por la salsa de guajillo por ambos lados y dóralos en una sartén con un poco de aceite.', 'Rellena con papa y chorizo. Sirve con lechuga finamente cortada, crema y queso fresco; espera un momento antes de comer porque el relleno queda muy caliente.'],
  }),
  crearRecetaExtra({
    id: 65, nombre: 'Tacos de canasta de papa', categoria: 'Cena', descripcion: 'Tortillas rellenas de papa sazonada, acomodadas en canasta para que se suavicen con vapor.', tiempoMin: 60, dificultad: 'Media', emoji: '🌮',
    ingredientes: ['Tortillas de maíz|16 piezas|Cereales', 'Papa|4 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Chile ancho|1 pieza|Chiles', 'Aceite vegetal|1/2 taza|Despensa', 'Manteca|1/4 taza|Despensa', 'Sal|al gusto|Despensa', 'Salsa verde|1 taza|Chiles'],
    utensilios: ['Olla', 'Machacador', 'Sartén', 'Canasta o recipiente con tapa', 'Papel estraza'],
    preparacion: ['Cuece las papas en agua con sal hasta que estén suaves. Pélalas y machácalas; sofríe cebolla picada y mézclala con la papa, sal y un poco de chile ancho molido.', 'Calienta las tortillas para que se doblen sin romperse. Coloca una cucharada de relleno en cada una y dóblalas en forma de taco.', 'Forra una canasta con papel estraza y una tela limpia. Acomoda los tacos en capas y vierte encima un poco de aceite caliente con manteca, sin saturarlos.', 'Cubre la canasta para atrapar el vapor y deja reposar 30 minutos. Sirve tibios con salsa verde; refrigera las sobras y recalienta completamente antes de comer.'],
  }),
  crearRecetaExtra({
    id: 66, nombre: 'Enchiladas suizas', categoria: 'Cena', descripcion: 'Tortillas rellenas de pollo, bañadas en salsa de tomate verde con crema y queso gratinado.', tiempoMin: 45, dificultad: 'Media', emoji: '🧀',
    ingredientes: ['Tortillas de maíz|12 piezas|Cereales', 'Pollo cocido y deshebrado|500 g|Proteínas', 'Tomate verde|700 g|Verduras', 'Chile serrano|2 piezas|Chiles', 'Crema|1 taza|Lácteos', 'Queso manchego|1 taza|Lácteos', 'Cilantro|1/4 taza|Hierbas', 'Cebolla|1/2 pieza|Verduras'],
    utensilios: ['Olla', 'Licuadora', 'Sartén', 'Refractario', 'Espátula'], equipos: ['Estufa', 'Licuadora', 'Horno'],
    preparacion: ['Hierve los tomates verdes y chiles hasta que cambien de color. Licúalos con cilantro, cebolla y sal; vierte la salsa en una cacerola y cocina 8 minutos.', 'Retira la salsa del fuego y mezcla la crema poco a poco para que no se corte. Si queda muy espesa, incorpora cucharadas de caldo de pollo.', 'Calienta las tortillas en un comal, rellena con pollo y enróllalas. Acomódalas juntas en un refractario y cúbrelas con la salsa cremosa.', 'Espolvorea queso manchego y hornea a 200 °C durante 8 a 10 minutos, hasta que se gratine. Sirve caliente con cebolla y cilantro.'],
  }),
  crearRecetaExtra({
    id: 67, nombre: 'Flautas de pollo con salsa verde', categoria: 'Cena', descripcion: 'Tortillas enrolladas con pollo deshebrado, doradas y servidas con crema y salsa verde.', tiempoMin: 40, dificultad: 'Media', emoji: '🌯',
    ingredientes: ['Tortillas de maíz|12 piezas|Cereales', 'Pollo cocido y deshebrado|450 g|Proteínas', 'Tomate verde|6 piezas|Verduras', 'Chile serrano|2 piezas|Chiles', 'Lechuga|2 tazas|Verduras', 'Crema|1/2 taza|Lácteos', 'Queso fresco|1/2 taza|Lácteos', 'Aceite vegetal|para freír|Despensa'],
    preparacion: ['Hierve tomates verdes y chiles hasta que estén suaves. Licúalos con cilantro, ajo y sal, y hierve la salsa 5 minutos para que tome cuerpo.', 'Calienta las tortillas tapadas para hacerlas flexibles. Pon pollo en un extremo, enrolla apretadamente y asegura cada flauta con un palillo si se abre.', 'Fríe las flautas en aceite caliente por tandas, girándolas con pinzas hasta que queden doradas por todos lados. Escurre sobre papel absorbente.', 'Sirve sobre lechuga cortada y agrega salsa, crema y queso. Retira los palillos antes de llevarlas a la mesa.'],
  }),
  crearRecetaExtra({
    id: 68, nombre: 'Tostadas de pata de res', categoria: 'Cena', descripcion: 'Tostadas crujientes con pata de res en vinagre, lechuga, crema, queso y salsa.', tiempoMin: 45, dificultad: 'Fácil', emoji: '🥙',
    ingredientes: ['Pata de res cocida|500 g|Proteínas', 'Tostadas de maíz|8 piezas|Cereales', 'Vinagre blanco|1/3 taza|Despensa', 'Cebolla morada|1 pieza|Verduras', 'Orégano seco|1 cucharadita|Especias', 'Lechuga|2 tazas|Verduras', 'Crema|1/2 taza|Lácteos', 'Queso fresco|1/2 taza|Lácteos', 'Salsa roja|1/2 taza|Chiles'],
    preparacion: ['Corta la pata cocida en tiras finas. Filetea la cebolla y mézclala con vinagre, orégano, sal y una cucharada de agua; deja reposar 15 minutos.', 'Incorpora la pata al escabeche y mezcla para cubrirla. Refrigera mientras preparas los demás ingredientes.', 'Lava y corta la lechuga en tiras finas. Unta una capa ligera de crema sobre cada tostada para ayudar a que el relleno se adhiera.', 'Distribuye la pata sobre las tostadas y termina con lechuga, queso y salsa. Sirve enseguida para que no se humedezcan.'],
  }),
  crearRecetaExtra({
    id: 69, nombre: 'Tlayuda oaxaqueña', categoria: 'Cena', descripcion: 'Tortilla grande tostada con asiento, frijoles, tasajo, col y quesillo.', tiempoMin: 35, dificultad: 'Media', emoji: '🫓',
    ingredientes: ['Tlayuda o tortilla grande|2 piezas|Cereales', 'Tasajo o bistec|300 g|Proteínas', 'Frijoles negros refritos|1 taza|Leguminosas', 'Quesillo|200 g|Lácteos', 'Col|2 tazas|Verduras', 'Aguacate|1 pieza|Verduras', 'Asiento o manteca|2 cucharadas|Despensa', 'Salsa de chile de árbol|1/3 taza|Chiles'],
    utensilios: ['Comal grande', 'Pinzas', 'Cuchillo', 'Tabla', 'Espátula'], equipos: ['Estufa'],
    preparacion: ['Corta la col en tiras finas y rebana el aguacate. Calienta los frijoles con una cucharada de agua hasta que queden untables.', 'Asa el tasajo en un comal caliente hasta que esté bien cocido y dorado en los bordes. Córtalo en tiras; si usas bistec, sazónalo con sal antes de asarlo.', 'Calienta la tlayuda por ambos lados hasta que quede firme y ligeramente tostada. Unta asiento con cuidado y extiende frijoles sobre la superficie.', 'Agrega quesillo, tasajo, col, aguacate y salsa. Dobla o sirve abierta; caliéntala una vez más en el comal para fundir el queso.'],
  }),
  crearRecetaExtra({
    id: 70, nombre: 'Cemita poblana de milanesa', categoria: 'Cena', descripcion: 'Pan de cemita con milanesa crujiente, quesillo, aguacate, pápalo y chipotle.', tiempoMin: 40, dificultad: 'Media', emoji: '🥪',
    ingredientes: ['Milanesa de res|4 piezas|Proteínas', 'Cemitas|4 piezas|Cereales', 'Huevo|2 piezas|Proteínas', 'Pan molido|1 taza|Cereales', 'Quesillo|200 g|Lácteos', 'Aguacate|2 piezas|Verduras', 'Pápalo|1 manojo pequeño|Hierbas', 'Chile chipotle adobado|2 piezas|Chiles', 'Aceite vegetal|para freír|Despensa'],
    utensilios: ['Dos platos', 'Sartén amplio', 'Pinzas', 'Papel absorbente', 'Cuchillo'],
    preparacion: ['Aplana las milanesas para que tengan grosor parejo. Bate el huevo en un plato y coloca el pan molido en otro; cubre cada pieza primero con huevo y luego con pan.', 'Fríe las milanesas en aceite caliente a fuego medio, una o dos por tanda, hasta que estén doradas y completamente cocidas. Escúrrelas sobre papel.', 'Abre las cemitas y coloca una milanesa en cada una. Añade quesillo deshebrado, rebanadas de aguacate, hojas de pápalo y chipotle al gusto.', 'Cierra el pan y presiónalo ligeramente para que el relleno se acomode. Sirve caliente y ofrece más chipotle aparte.'],
  }),
  crearRecetaExtra({
    id: 71, nombre: 'Tacos gobernador', categoria: 'Cena', descripcion: 'Tacos de camarón salteado con chile poblano, cebolla y queso derretido.', tiempoMin: 30, dificultad: 'Media', emoji: '🦐',
    ingredientes: ['Camarón mediano limpio|500 g|Proteínas', 'Tortillas de maíz|8 piezas|Cereales', 'Chile poblano|1 pieza|Chiles', 'Cebolla|1/2 pieza|Verduras', 'Ajo|1 diente|Verduras', 'Queso Chihuahua|1 taza|Lácteos', 'Mantequilla|1 cucharada|Lácteos', 'Limón|2 piezas|Frutas', 'Cilantro|2 cucharadas|Hierbas'],
    preparacion: ['Asa el chile poblano, tápalo unos minutos y retira la piel, las semillas y las venas. Córtalo en tiras y pica la cebolla.', 'Derrite mantequilla en una sartén y sofríe cebolla y ajo. Añade las rajas y los camarones; cocina solo hasta que cambien a rosa y estén opacos.', 'Baja el fuego, incorpora queso rallado y mezcla hasta que se funda. Evita cocinar demasiado los camarones porque se endurecen.', 'Calienta las tortillas y rellénalas con la mezcla. Sirve con limón, cilantro y salsa fresca.'],
  }),
  crearRecetaExtra({
    id: 72, nombre: 'Salbutes de pavo', categoria: 'Cena', descripcion: 'Tortillas ligeramente fritas con pavo deshebrado, lechuga, tomate, aguacate y cebolla encurtida.', tiempoMin: 50, dificultad: 'Media', emoji: '🦃',
    ingredientes: ['Pavo cocido y deshebrado|400 g|Proteínas', 'Tortillas de maíz|12 piezas|Cereales', 'Lechuga|2 tazas|Verduras', 'Jitomate|2 piezas|Verduras', 'Aguacate|1 pieza|Verduras', 'Cebolla morada|1 pieza|Verduras', 'Naranja agria o limón|1/3 taza|Frutas', 'Aceite vegetal|1/2 taza|Despensa', 'Chile habanero|1 pieza|Chiles'],
    preparacion: ['Filetea la cebolla morada y cúbrela con jugo de naranja agria o limón y una pizca de sal. Déjala reposar; manipula el habanero con guantes y sírvelo aparte.', 'Fríe las tortillas una por una en aceite a temperatura media, sin dejarlas endurecer; deben inflarse apenas y conservar flexibilidad. Escúrrelas.', 'Calienta el pavo deshebrado con una cucharada de caldo para mantenerlo jugoso. Corta lechuga, jitomate y aguacate.', 'Pon pavo sobre cada tortilla y termina con lechuga, jitomate, aguacate y cebolla encurtida. Sirve caliente con chile al gusto.'],
  }),
  crearRecetaExtra({
    id: 73, nombre: 'Quesadillas fritas de papa y chorizo', categoria: 'Cena', descripcion: 'Quesadillas de masa rellenas de papa con chorizo, doradas y acompañadas de lechuga.', tiempoMin: 45, dificultad: 'Media', emoji: '🧀',
    ingredientes: ['Masa de maíz|500 g|Cereales', 'Papa|2 piezas|Verduras', 'Chorizo|150 g|Proteínas', 'Queso Oaxaca|150 g|Lácteos', 'Lechuga|2 tazas|Verduras', 'Crema|1/3 taza|Lácteos', 'Salsa verde|1/2 taza|Chiles', 'Aceite vegetal|para freír|Despensa'],
    utensilios: ['Olla', 'Prensa para tortillas', 'Sartén profundo', 'Espumadera', 'Papel absorbente'],
    preparacion: ['Cuece las papas hasta que estén suaves, pélalas y machácalas. Dora el chorizo en una sartén y mézclalo con la papa; deja que el relleno se enfríe.', 'Forma discos de masa con una prensa entre dos plásticos. Coloca papa y queso en el centro, dobla y sella bien los bordes para que el relleno no se salga.', 'Fríe las quesadillas en aceite caliente en tandas pequeñas, volteándolas hasta que estén doradas y la masa se cocine por dentro. Retira con espumadera.', 'Escurre sobre papel y sirve con lechuga, crema y salsa verde. Deja reposar un minuto antes de comer para evitar quemaduras con el relleno.'],
  }),
  crearRecetaExtra({
    id: 74, nombre: 'Torta ahogada de Guadalajara', categoria: 'Cena', descripcion: 'Birote salado relleno de carnitas y bañado en salsa de jitomate con chile de árbol.', tiempoMin: 50, dificultad: 'Media', emoji: '🥖',
    ingredientes: ['Birote salado|4 piezas|Cereales', 'Carnitas|500 g|Proteínas', 'Jitomate|5 piezas|Verduras', 'Chile de árbol|4 piezas|Chiles', 'Ajo|2 dientes|Verduras', 'Cebolla|1 pieza|Verduras', 'Vinagre blanco|2 cucharadas|Despensa', 'Orégano seco|1 cucharadita|Especias', 'Limón|2 piezas|Frutas'],
    utensilios: ['Olla', 'Licuadora', 'Colador', 'Cuchillo', 'Tabla'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Hierve jitomates con un trozo de cebolla hasta que se suavicen. Licúalos con ajo, vinagre, sal y agua; cuela y cocina la salsa 10 minutos.', 'Remoja los chiles de árbol en agua caliente y licúalos con un poco de la salsa roja. Mantén esta salsa aparte y agrégala gradualmente porque es muy picante.', 'Abre los birotes sin separarlos por completo y rellénalos con carnitas calientes. Acomoda cada torta en un plato hondo.', 'Baña con salsa roja al gusto y agrega cebolla fileteada y orégano. Sirve la salsa picante aparte para que cada persona ajuste el nivel.'],
  }),
  crearRecetaExtra({
    id: 75, nombre: 'Gringas al pastor', categoria: 'Cena', descripcion: 'Tortillas de harina con cerdo adobado al pastor, queso derretido, piña y cilantro.', tiempoMin: 45, dificultad: 'Media', emoji: '🌮',
    ingredientes: ['Carne de cerdo en tiras|500 g|Proteínas', 'Tortillas de harina|8 piezas|Cereales', 'Pasta de achiote|40 g|Especias', 'Jugo de naranja|1/2 taza|Frutas', 'Vinagre|2 cucharadas|Despensa', 'Queso Oaxaca|250 g|Lácteos', 'Piña|1 taza|Frutas', 'Cebolla|1/2 pieza|Verduras', 'Cilantro|1/4 taza|Hierbas'],
    preparacion: ['Mezcla achiote, jugo de naranja, vinagre y sal. Cubre el cerdo con el adobo y refrigera 30 minutos; corta la piña y la cebolla en cubos pequeños.', 'Cocina el cerdo en una sartén caliente hasta que esté bien cocido y dorado en los bordes. Agrega piña y cebolla y saltea 2 minutos más.', 'Calienta una tortilla de harina en el comal, agrega queso Oaxaca y una porción de carne; dobla y cocina a fuego medio-bajo hasta fundir el queso.', 'Corta las gringas en mitades y sírvelas con cilantro, limón y salsa. Mantén separada la carne cruda de las guarniciones listas para comer.'],
  }),
  crearRecetaExtra({
    id: 76, nombre: 'Garnachas istmeñas', categoria: 'Cena', descripcion: 'Tortillas pequeñas fritas con carne de res deshebrada, col curtida y salsa roja.', tiempoMin: 55, dificultad: 'Media', emoji: '🫓',
    ingredientes: ['Tortillas de maíz pequeñas|12 piezas|Cereales', 'Falda de res cocida|400 g|Proteínas', 'Col|2 tazas|Verduras', 'Vinagre de manzana|1/3 taza|Despensa', 'Jitomate|4 piezas|Verduras', 'Chile guajillo|3 piezas|Chiles', 'Ajo|1 diente|Verduras', 'Aceite vegetal|1/2 taza|Despensa', 'Queso fresco|1/2 taza|Lácteos'],
    preparacion: ['Deshebra la carne cocida. Rebana la col y mézclala con vinagre, sal y una cucharada de agua; deja que se curta mientras preparas la salsa.', 'Remoja el guajillo sin tallo ni semillas. Licúalo con jitomate y ajo, cuela y cocina la salsa a fuego medio durante 8 a 10 minutos.', 'Fríe las tortillas en poco aceite hasta que estén doradas pero aún flexibles. Escurre el exceso de grasa y coloca carne sobre cada una.', 'Agrega salsa caliente, col curtida y queso desmoronado. Sirve de inmediato para que las tortillas conserven textura.'],
  }),
  crearRecetaExtra({
    id: 77, nombre: 'Tacos de barbacoa de res', categoria: 'Cena', descripcion: 'Tortillas calientes rellenas de res cocida lentamente con adobo, cebolla y cilantro.', tiempoMin: 190, dificultad: 'Avanzada', emoji: '🌮',
    ingredientes: ['Res para cocción lenta|1 kg|Proteínas', 'Chile guajillo|4 piezas|Chiles', 'Chile ancho|2 piezas|Chiles', 'Ajo|3 dientes|Verduras', 'Comino|1 cucharadita|Especias', 'Laurel|2 hojas|Hierbas', 'Caldo de res|2 tazas|Despensa', 'Tortillas de maíz|16 piezas|Cereales', 'Cebolla|1 pieza|Verduras', 'Cilantro|1/2 taza|Hierbas'],
    utensilios: ['Olla con tapa', 'Licuadora', 'Colador', 'Cuchillo', 'Tabla', 'Cucharón'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Retira semillas y venas de los chiles, remójalos en agua caliente y licúalos con ajo, comino, sal y una taza de caldo. Cuela el adobo.', 'Cubre la carne con el adobo y déjala reposar 30 minutos. Pásala a una olla con laurel y el resto del caldo; tapa bien.', 'Cocina a fuego muy bajo de 2.5 a 3 horas, hasta que se deshebre con facilidad. Revisa ocasionalmente que haya líquido y añade agua caliente si hace falta.', 'Deshebra la carne y mézclala con un poco del consomé. Sirve en tortillas calientes con cebolla, cilantro, limón y salsa.'],
  }),
  crearRecetaExtra({
    id: 78, nombre: 'Caldo tlalpeño', categoria: 'Entrada', descripcion: 'Caldo de pollo con garbanzos, verduras, epazote, chipotle y cubos de aguacate.', tiempoMin: 70, dificultad: 'Media', emoji: '🍲',
    ingredientes: ['Pechuga de pollo|2 piezas|Proteínas', 'Garbanzos cocidos|1 taza|Leguminosas', 'Zanahoria|2 piezas|Verduras', 'Ejotes|1 taza|Verduras', 'Jitomate|3 piezas|Verduras', 'Chile chipotle adobado|1 pieza|Chiles', 'Epazote|2 ramas|Hierbas', 'Aguacate|1 pieza|Verduras', 'Caldo de pollo|1.5 litros|Despensa'],
    preparacion: ['Cuece la pechuga en el caldo a fuego medio hasta que esté completamente cocida. Retírala, deshébrala y reserva tapada; conserva el caldo caliente.', 'Corta zanahoria y ejotes en piezas pequeñas. Licúa jitomate con ajo, cebolla y el chipotle; cuela la mezcla para un caldo más terso.', 'Hierve el caldillo de jitomate en una olla durante 8 minutos. Añade el caldo, garbanzos, zanahoria, ejotes y epazote; cocina hasta que las verduras estén tiernas.', 'Regresa el pollo deshebrado a la olla y calienta unos minutos. Sirve con aguacate en cubos, limón y tortillas calientes.'],
    fuenteUrl: 'https://laroussecocina.mx/palabra/caldo-tlalpeno/',
  }),
  crearRecetaExtra({
    id: 79, nombre: 'Sopa de lima yucateca', categoria: 'Entrada', descripcion: 'Caldo ligero de pollo con jitomate, chile dulce y el aroma fresco de la lima.', tiempoMin: 60, dificultad: 'Media', emoji: '🍋',
    ingredientes: ['Pechuga de pollo|1 pieza|Proteínas', 'Caldo de pollo|1.5 litros|Despensa', 'Jitomate|2 piezas|Verduras', 'Cebolla blanca|1/2 pieza|Verduras', 'Pimiento verde|1/2 pieza|Verduras', 'Lima|3 piezas|Frutas', 'Tortillas de maíz|4 piezas|Cereales', 'Aceite vegetal|2 cucharadas|Despensa', 'Orégano seco|1/2 cucharadita|Especias'],
    utensilios: ['Olla', 'Sartén', 'Cuchillo', 'Tabla', 'Cucharón', 'Rallador fino'], equipos: ['Estufa'],
    preparacion: ['Cuece el pollo en el caldo con una pizca de sal hasta que esté completamente cocido. Retíralo, deshébralo y conserva el caldo caliente.', 'Corta las tortillas en tiras y dóralas en una sartén con aceite; escúrrelas. Pica jitomate, cebolla y pimiento en cubos pequeños.', 'Sofríe cebolla y pimiento; agrega jitomate y orégano y cocina hasta que el jitomate pierda parte de su agua. Incorpora el sofrito al caldo y hierve 10 minutos.', 'Sirve el pollo y las tiras de tortilla en los tazones. Añade caldo caliente y termina con jugo de lima recién exprimido y una rodaja fina.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/sopa-de-lima/',
  }),
  crearRecetaExtra({
    id: 80, nombre: 'Sopa tarasca michoacana', categoria: 'Entrada', descripcion: 'Crema de frijoles y jitomate servida con tiras crujientes de tortilla, chile y queso.', tiempoMin: 55, dificultad: 'Media', emoji: '🫘',
    ingredientes: ['Frijoles bayos cocidos|3 tazas|Leguminosas', 'Caldo de frijol|3 tazas|Despensa', 'Jitomate|3 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Ajo|1 diente|Verduras', 'Chile ancho|2 piezas|Chiles', 'Tortillas de maíz|4 piezas|Cereales', 'Crema|1/2 taza|Lácteos', 'Queso fresco|1/2 taza|Lácteos'],
    preparacion: ['Corta las tortillas en tiras finas y dóralas en aceite hasta que queden crujientes. Escúrrelas; fríe los chiles ancho unos segundos y córtalos en aros.', 'Licúa los frijoles con el caldo hasta obtener una crema. Asa o cocina el jitomate, la cebolla y el ajo; licúalos y cuela la salsa.', 'Calienta una cucharada de aceite en una olla, vierte la salsa de jitomate y cocina 5 minutos. Incorpora el puré de frijol y hierve a fuego bajo, moviendo para que no se pegue.', 'Ajusta la textura con caldo y la sal. Sirve con tiras de tortilla, chile ancho, crema y queso fresco.'],
    fuenteUrl: 'https://laroussecocina.mx/palabra/sopa-tarasca/',
  }),
  crearRecetaExtra({
    id: 81, nombre: 'Sopa de hongos con epazote', categoria: 'Entrada', descripcion: 'Hongos frescos salteados en caldo de jitomate y chile, perfumado con epazote.', tiempoMin: 40, dificultad: 'Fácil', emoji: '🍄',
    ingredientes: ['Champiñones|400 g|Verduras', 'Setas|200 g|Verduras', 'Jitomate|3 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Ajo|2 dientes|Verduras', 'Chile pasilla|1 pieza|Chiles', 'Epazote|3 ramas|Hierbas', 'Caldo de verduras|1.5 litros|Despensa', 'Limón|2 piezas|Frutas'],
    preparacion: ['Limpia los hongos con una servilleta húmeda y córtalos en rebanadas. Pica cebolla y ajo; retira tallo y semillas del chile pasilla.', 'Tuesta el chile pasilla brevemente y remójalo en agua caliente. Licúalo con jitomate, ajo y media taza de caldo; cuela la salsa.', 'Sofríe la cebolla en una olla, añade los hongos y cocina hasta que empiecen a soltar líquido. Vierte la salsa y hierve durante 5 minutos.', 'Agrega el resto del caldo y el epazote; cocina a fuego bajo 15 minutos. Prueba y sirve con gotas de limón y tortillas calientes.'],
  }),
  crearRecetaExtra({
    id: 82, nombre: 'Sopa de milpa', categoria: 'Entrada', descripcion: 'Caldo mexicano con elote, calabacita, flor de calabaza, chile poblano y epazote.', tiempoMin: 45, dificultad: 'Fácil', emoji: '🌽',
    ingredientes: ['Granos de elote|1 taza|Verduras', 'Calabacita|2 piezas|Verduras', 'Flor de calabaza|2 tazas|Verduras', 'Chile poblano|1 pieza|Chiles', 'Jitomate|2 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Epazote|3 ramas|Hierbas', 'Caldo de verduras|1.5 litros|Despensa', 'Queso panela|150 g|Lácteos'],
    preparacion: ['Asa el chile poblano, déjalo sudar dentro de un recipiente tapado, retira la piel y las semillas y córtalo en tiras. Lava la flor y retira tallos gruesos.', 'Pica cebolla y jitomate; corta calabacitas en cubos. Sofríe la cebolla, agrega jitomate y cocina hasta formar un caldillo.', 'Vierte el caldo y añade los granos de elote; hierve 10 minutos. Incorpora calabacita y rajas, y cocina hasta que estén tiernas sin deshacerse.', 'Añade flor de calabaza y epazote en los últimos 3 minutos. Sirve con cubos de queso panela y ajusta sal al gusto.'],
  }),
  crearRecetaExtra({
    id: 83, nombre: 'Crema de chile poblano', categoria: 'Entrada', descripcion: 'Crema suave de chile poblano asado con caldo, leche y granos de elote.', tiempoMin: 45, dificultad: 'Media', emoji: '🥣',
    ingredientes: ['Chile poblano|4 piezas|Chiles', 'Cebolla|1/2 pieza|Verduras', 'Mantequilla|2 cucharadas|Lácteos', 'Caldo de pollo|3 tazas|Despensa', 'Leche|1 taza|Lácteos', 'Crema|1/2 taza|Lácteos', 'Granos de elote|1 taza|Verduras', 'Queso panela|100 g|Lácteos'],
    utensilios: ['Comal', 'Licuadora', 'Olla', 'Colador', 'Cucharón'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Asa los poblanos girándolos hasta que la piel se ampolle. Tápalos 10 minutos, pélalos y retira semillas y venas; reserva unas rajas para decorar.', 'Sofríe cebolla en mantequilla hasta que esté suave. Licúa los chiles con la cebolla y una taza de caldo hasta que quede una mezcla lisa.', 'Vierte la mezcla en una olla y agrega el resto del caldo. Cocina a fuego medio 10 minutos; incorpora leche y crema sin dejar que hierva con fuerza.', 'Añade elote y cubos de queso, ajusta la sal y calienta hasta que el queso se entibie. Sirve con rajas reservadas.'],
    fuenteUrl: 'https://laroussecocina.mx/Categoria/sopas/',
  }),
  crearRecetaExtra({
    id: 84, nombre: 'Ceviche estilo Acapulco', categoria: 'Entrada', descripcion: 'Pescado marinado en limón con jitomate, cebolla, cilantro, pepino y aguacate.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🐟',
    ingredientes: ['Pescado blanco muy fresco|500 g|Proteínas', 'Jugo de limón|1 taza|Frutas', 'Jitomate|2 piezas|Verduras', 'Pepino|1 pieza|Verduras', 'Cebolla morada|1/2 pieza|Verduras', 'Cilantro|1/2 taza|Hierbas', 'Aguacate|1 pieza|Verduras', 'Tostadas de maíz|8 piezas|Cereales', 'Salsa picante|al gusto|Chiles'],
    utensilios: ['Cuchillo', 'Tabla para pescado', 'Tazón de vidrio', 'Colador', 'Refrigerador'], equipos: ['Refrigerador'],
    preparacion: ['Mantén el pescado frío y usa una tabla limpia separada de otros alimentos. Córtalo en cubos pequeños y colócalo en un tazón de vidrio.', 'Cubre el pescado con jugo de limón, mezcla y refrigera hasta que la superficie se vea opaca. El limón no elimina todos los riesgos de consumir pescado crudo; utiliza producto apto para consumo crudo o cocina el pescado previamente.', 'Pica jitomate, pepino, cebolla y cilantro. Escurre un poco del exceso de limón y mezcla las verduras con el pescado; sazona y prueba.', 'Incorpora el aguacate justo antes de servir para que mantenga su forma. Acompaña con tostadas y salsa picante.'],
  }),
  crearRecetaExtra({
    id: 85, nombre: 'Aguachile verde de camarón', categoria: 'Entrada', descripcion: 'Camarón marinado en limón, chile serrano y cilantro, acompañado de pepino y cebolla morada.', tiempoMin: 35, dificultad: 'Media', emoji: '🦐',
    ingredientes: ['Camarón crudo limpio|500 g|Proteínas', 'Jugo de limón|1 taza|Frutas', 'Chile serrano|4 piezas|Chiles', 'Cilantro|1 taza|Hierbas', 'Pepino|1 pieza|Verduras', 'Cebolla morada|1 pieza|Verduras', 'Aguacate|1 pieza|Verduras', 'Tostadas de maíz|8 piezas|Cereales', 'Sal|al gusto|Despensa'],
    utensilios: ['Cuchillo', 'Tabla para pescado', 'Licuadora', 'Tazón de vidrio', 'Refrigerador'], equipos: ['Licuadora', 'Refrigerador'],
    preparacion: ['Pela y limpia los camarones, ábrelos en mariposa y mantenlos refrigerados. Licúa el jugo de limón con cilantro, chile serrano y sal.', 'Vierte la salsa verde sobre los camarones y refrigera hasta que cambien a color opaco en la superficie. Para mayor seguridad, utiliza camarón previamente cocido y enfriado.', 'Rebana finamente pepino y cebolla morada. Coloca las verduras sobre el camarón y deja reposar unos minutos para integrar sabores.', 'Sirve frío con aguacate en rebanadas y tostadas. Mantén la preparación refrigerada y consúmela el mismo día.'],
  }),
  crearRecetaExtra({
    id: 86, nombre: 'Tostadas de ceviche de pescado', categoria: 'Entrada', descripcion: 'Ceviche fresco de pescado con jitomate y cilantro, servido sobre tostadas crujientes.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🥙',
    ingredientes: ['Filete de pescado blanco|500 g|Proteínas', 'Jugo de limón|3/4 taza|Frutas', 'Jitomate|2 piezas|Verduras', 'Cebolla morada|1/2 pieza|Verduras', 'Cilantro|1/3 taza|Hierbas', 'Pepino|1/2 pieza|Verduras', 'Tostadas de maíz|8 piezas|Cereales', 'Salsa catsup|2 cucharadas|Despensa', 'Aguacate|1 pieza|Verduras'],
    utensilios: ['Cuchillo', 'Tabla para pescado', 'Tazón', 'Colador', 'Refrigerador'], equipos: ['Refrigerador'],
    preparacion: ['Corta el pescado frío en cubos pequeños y colócalo en un recipiente limpio. Agrega limón y refrigera hasta que se vea opaco; el cítrico no sustituye una cocción segura.', 'Pica jitomate, cebolla, pepino y cilantro. Escurre el exceso de jugo del pescado y mezcla con las verduras y la catsup.', 'Prueba la mezcla y ajusta sal y limón. Refrigera 10 minutos más para que los sabores se integren, sin dejarla fuera a temperatura ambiente.', 'Reparte sobre tostadas al momento de servir y agrega aguacate. Conserva el ceviche frío y consume el mismo día.'],
  }),
  crearRecetaExtra({
    id: 87, nombre: 'Guacamole de mango', categoria: 'Entrada', descripcion: 'Aguacate machacado con mango, cebolla morada, cilantro y chile serrano.', tiempoMin: 15, dificultad: 'Fácil', emoji: '🥑',
    ingredientes: ['Aguacate|3 piezas|Verduras', 'Mango|1 pieza|Frutas', 'Cebolla morada|1/4 pieza|Verduras', 'Chile serrano|1 pieza|Chiles', 'Cilantro|1/4 taza|Hierbas', 'Limón|1 pieza|Frutas', 'Totopos de maíz|2 tazas|Cereales', 'Sal|al gusto|Despensa'],
    utensilios: ['Cuchillo', 'Tabla', 'Tazón', 'Tenedor', 'Cuchara'], equipos: [],
    preparacion: ['Pica el mango en cubos pequeños y la cebolla en trozos finos. Pica cilantro y chile; retira las semillas del chile si quieres menos picor.', 'Parte los aguacates, retira el hueso y machaca la pulpa con un tenedor, dejando algunos trozos para dar textura.', 'Agrega jugo de limón, cebolla, cilantro, chile y sal; mezcla suavemente. Incorpora el mango al final para que conserve sus cubos.', 'Prueba y ajusta acidez y sal. Sirve enseguida con totopos o tapa al ras y refrigera brevemente para evitar que se oxide.'],
  }),
  crearRecetaExtra({
    id: 88, nombre: 'Empanadas de cazón', categoria: 'Entrada', descripcion: 'Empanadas de masa de maíz rellenas de cazón guisado con jitomate y epazote.', tiempoMin: 65, dificultad: 'Media', emoji: '🥟',
    ingredientes: ['Masa de maíz|500 g|Cereales', 'Cazón cocido y desmenuzado|350 g|Proteínas', 'Jitomate|3 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Epazote|3 ramas|Hierbas', 'Ajo|1 diente|Verduras', 'Aceite vegetal|para freír|Despensa', 'Lechuga|1 taza|Verduras', 'Salsa roja|1/2 taza|Chiles'],
    utensilios: ['Sartén', 'Tazón', 'Prensa para tortillas', 'Sartén profundo', 'Espumadera'], equipos: ['Estufa'],
    preparacion: ['Pica cebolla, jitomate y ajo. Sofríe la cebolla, agrega ajo y jitomate y cocina hasta que se forme un guiso; incorpora cazón y epazote picado.', 'Cocina el relleno hasta que pierda el exceso de líquido y deja que se enfríe antes de usarlo para evitar que la masa se abra.', 'Forma discos de masa, coloca una porción de cazón en el centro, dobla y sella las orillas presionando con los dedos. Humedece ligeramente la masa si se agrieta.', 'Fríe las empanadas en aceite caliente hasta que estén doradas por ambos lados. Escurre y sirve con lechuga y salsa.'],
  }),
  crearRecetaExtra({
    id: 89, nombre: 'Esquites con tuétano', categoria: 'Entrada', descripcion: 'Granos de elote cocidos con epazote y tuétano, servidos con limón, chile y queso.', tiempoMin: 45, dificultad: 'Media', emoji: '🌽',
    ingredientes: ['Granos de elote|5 tazas|Verduras', 'Tuétano de res|300 g|Proteínas', 'Cebolla|1/4 pieza|Verduras', 'Epazote|3 ramas|Hierbas', 'Caldo de pollo|4 tazas|Despensa', 'Mayonesa|1/2 taza|Lácteos', 'Queso cotija|1/2 taza|Lácteos', 'Limón|3 piezas|Frutas', 'Chile piquín|al gusto|Chiles'],
    utensilios: ['Olla', 'Cuchara', 'Cuchillo', 'Tabla', 'Cucharón'], equipos: ['Estufa'],
    preparacion: ['Pide el tuétano limpio y córtalo en trozos. Colócalo en una olla caliente y deja que suelte parte de su grasa; retira cualquier exceso si es necesario.', 'Agrega cebolla picada y granos de elote; mezcla para que se impregnen. Vierte caldo caliente y añade epazote y sal.', 'Hierve a fuego medio de 20 a 25 minutos, hasta que los granos estén tiernos y el tuétano bien cocido. Retira los tallos de epazote.', 'Sirve en vasos o tazones con mayonesa, queso cotija, jugo de limón y chile piquín al gusto.'],
  }),
  crearRecetaExtra({
    id: 90, nombre: 'Elotes asados con chile y limón', categoria: 'Entrada', descripcion: 'Elotes dorados al comal, untados con mayonesa y terminados con queso, chile y limón.', tiempoMin: 25, dificultad: 'Fácil', emoji: '🌽',
    ingredientes: ['Elote entero|4 piezas|Verduras', 'Mayonesa|1/2 taza|Lácteos', 'Queso cotija|1/2 taza|Lácteos', 'Limón|3 piezas|Frutas', 'Chile piquín|2 cucharaditas|Chiles', 'Mantequilla|2 cucharadas|Lácteos', 'Sal|al gusto|Despensa'],
    utensilios: ['Comal o parrilla', 'Pinzas', 'Brocha de cocina', 'Plato'], equipos: ['Estufa'],
    preparacion: ['Retira las hojas y los cabellos de los elotes. Enjuágalos y sécalos; si están muy duros, cuécelos en agua durante 10 minutos antes de asarlos.', 'Calienta un comal o parrilla y unta los elotes con mantequilla. Ásalos girándolos con pinzas hasta que los granos tengan manchas doradas.', 'Deja que se entibien un poco y unta una capa fina de mayonesa alrededor. Espolvorea queso cotija y chile piquín.', 'Exprime limón encima y sirve caliente. Ajusta chile y sal al gusto de cada persona.'],
  }),
  crearRecetaExtra({
    id: 91, nombre: 'Chiles güeros en escabeche', categoria: 'Entrada', descripcion: 'Chiles güeros y verduras encurtidos en vinagre con laurel, ajo y orégano.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🌶️',
    ingredientes: ['Chile güero|12 piezas|Chiles', 'Zanahoria|2 piezas|Verduras', 'Cebolla blanca|1 pieza|Verduras', 'Vinagre blanco|1 taza|Despensa', 'Agua|1 taza|Despensa', 'Ajo|3 dientes|Verduras', 'Laurel|2 hojas|Hierbas', 'Orégano seco|1 cucharadita|Especias', 'Aceite vegetal|2 cucharadas|Despensa'],
    preparacion: ['Lava los chiles, hazles una pequeña incisión a lo largo y corta la zanahoria en rodajas y la cebolla en plumas. Usa guantes si tienes piel sensible al picante.', 'Calienta el aceite en una olla y sofríe zanahoria y cebolla 3 minutos. Añade ajo, laurel, orégano y los chiles; mezcla sin romperlos.', 'Vierte vinagre y agua, agrega sal y lleva a hervor suave. Cocina de 8 a 10 minutos hasta que la zanahoria esté tierna pero firme.', 'Deja enfriar y guarda en un frasco limpio dentro del refrigerador. Sirve como entrada o acompañamiento; no lo conserves a temperatura ambiente.'],
  }),
  crearRecetaExtra({
    id: 135, nombre: 'Capirotada mexicana', categoria: 'Postre', descripcion: 'Pan dorado bañado con miel de piloncillo, canela y pasas, terminado con cacahuate y queso.', tiempoMin: 100, dificultad: 'Media', emoji: '🍞',
    ingredientes: ['Bolillo del día anterior|8 rebanadas|Cereales', 'Piloncillo|250 g|Despensa', 'Agua|3 tazas|Despensa', 'Canela en raja|1 pieza|Especias', 'Pasas|1/2 taza|Frutas', 'Cacahuate tostado|1/2 taza|Semillas', 'Queso cotija|150 g|Lácteos', 'Aceite vegetal|1/2 taza|Despensa'],
    utensilios: ['Olla', 'Sartén', 'Cuchara', 'Molde para horno', 'Espátula'], equipos: ['Estufa', 'Horno'],
    preparacion: ['Hierve el agua con piloncillo y canela a fuego medio, moviendo hasta que se disuelva y forme una miel ligera. Añade pasas y apaga.', 'Corta el bolillo en rebanadas y dóralas en una sartén con aceite por ambos lados. Escúrrelas sobre papel para retirar el exceso de grasa.', 'Precalienta el horno a 180 °C. Acomoda una capa de pan en un molde, baña con miel y espolvorea cacahuate y queso; repite las capas hasta terminar.', 'Cubre el molde con aluminio y hornea 25 minutos para que el pan absorba la miel. Destapa los últimos minutos si quieres dorar la superficie; sirve tibia o fría.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/capirotada',
  }),
  crearRecetaExtra({
    id: 136, nombre: 'Cocadas mexicanas', categoria: 'Postre', descripcion: 'Dulces de coco rallado cocidos con leche y azúcar hasta quedar suaves por dentro y dorados.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🥥',
    ingredientes: ['Coco rallado|250 g|Frutas secas', 'Leche|1/2 taza|Lácteos', 'Azúcar|1 taza|Despensa', 'Agua de coco|1/2 taza|Bebidas', 'Canela en raja|1 pieza|Especias', 'Fécula de maíz|1 cucharada|Cereales', 'Huevo|1 pieza|Proteínas'],
    utensilios: ['Cacerola', 'Cuchara de madera', 'Tazón', 'Charola', 'Papel para hornear'], equipos: ['Estufa', 'Horno'],
    preparacion: ['Disuelve la fécula en un poco de leche fría. Coloca el resto de la leche, agua de coco, azúcar y canela en una cacerola.', 'Calienta a fuego medio, moviendo hasta que el azúcar se disuelva. Agrega la fécula y sigue mezclando hasta que la preparación espese.', 'Incorpora el coco rallado y cocina a fuego bajo hasta que la mezcla se despegue un poco del fondo. Retira la canela y deja entibiar antes de agregar el huevo batido.', 'Forma montoncitos sobre una charola con papel para hornear. Hornea a 180 °C durante 12 a 15 minutos, hasta que las puntas se doren; deja enfriar antes de moverlas.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/cocadas/',
  }),
  crearRecetaExtra({
    id: 137, nombre: 'Dulce de camote poblano', categoria: 'Postre', descripcion: 'Camote cocido lentamente con piloncillo, canela y un toque de naranja.', tiempoMin: 65, dificultad: 'Fácil', emoji: '🍠',
    ingredientes: ['Camote amarillo|1 kg|Verduras', 'Piloncillo|250 g|Despensa', 'Agua|2 tazas|Despensa', 'Canela en raja|1 pieza|Especias', 'Cáscara de naranja|2 tiras|Frutas', 'Jugo de naranja|1/2 taza|Frutas', 'Sal|1 pizca|Despensa'],
    preparacion: ['Lava y pela los camotes; córtalos en trozos grandes de tamaño parecido para que se cuezan parejo.', 'Pon agua, piloncillo, canela y cáscara de naranja en una olla. Calienta hasta disolver el piloncillo y formar un jarabe ligero.', 'Añade el camote y el jugo de naranja. Tapa parcialmente y cocina a fuego bajo de 35 a 45 minutos, volteando los trozos con cuidado hasta que estén suaves.', 'Destapa y deja reducir el jarabe unos minutos hasta que brille y cubra el camote. Retira la canela y sirve tibio o refrigerado.'],
    fuenteUrl: 'https://laroussecocina.mx/receta/dulce-de-camote/',
  }),
  crearRecetaExtra({
    id: 138, nombre: 'Alegrías de amaranto', categoria: 'Postre', descripcion: 'Barras tradicionales de amaranto inflado unidas con miel de piloncillo y semillas.', tiempoMin: 35, dificultad: 'Media', emoji: '🍯',
    ingredientes: ['Amaranto inflado|4 tazas|Cereales', 'Piloncillo|200 g|Despensa', 'Miel de abeja|2 cucharadas|Despensa', 'Agua|1/3 taza|Despensa', 'Cacahuate tostado|1/2 taza|Semillas', 'Pepitas|1/3 taza|Semillas', 'Pasas|1/3 taza|Frutas secas', 'Limón|1 cucharadita de jugo|Frutas'],
    utensilios: ['Olla pequeña', 'Cuchara de madera', 'Tazón', 'Charola', 'Papel encerado'], equipos: ['Estufa'],
    preparacion: ['Engrasa ligeramente una charola y mezcla en un tazón el amaranto, cacahuate, pepitas y pasas.', 'Calienta piloncillo, agua, miel y jugo de limón en una olla; mueve hasta que el jarabe burbujee y se vuelva espeso. Para comprobarlo, deja caer una gota en agua fría: debe formar una bolita suave.', 'Retira del fuego y vierte el jarabe caliente sobre las semillas. Mezcla rápidamente con una cuchara firme para cubrir el amaranto antes de que endurezca.', 'Pasa la mezcla a la charola, presiónala con una espátula engrasada y marca cuadros con un cuchillo. Deja enfriar por completo y separa las barras.'],
  }),
  crearRecetaExtra({
    id: 139, nombre: 'Palanquetas de cacahuate', categoria: 'Postre', descripcion: 'Dulce crujiente de cacahuate tostado unido con caramelo claro de piloncillo.', tiempoMin: 30, dificultad: 'Media', emoji: '🥜',
    ingredientes: ['Cacahuate sin sal|2 tazas|Semillas', 'Piloncillo|250 g|Despensa', 'Agua|1/2 taza|Despensa', 'Miel de maíz|2 cucharadas|Despensa', 'Jugo de limón|1 cucharadita|Frutas', 'Mantequilla|1 cucharadita|Lácteos'],
    utensilios: ['Cacerola', 'Cuchara de madera', 'Charola', 'Papel encerado', 'Espátula'], equipos: ['Estufa'],
    preparacion: ['Tuesta los cacahuates en una sartén seca a fuego bajo, moviéndolos hasta que huelan a nuez. Pásalos a una charola engrasada y distribúyelos.', 'Hierve el piloncillo con agua, miel y jugo de limón, sin revolver demasiado cuando empiece a burbujear. Cocina hasta que el jarabe forme una hebra espesa al levantar la cuchara.', 'Apaga el fuego, incorpora la mantequilla y vierte de inmediato el caramelo sobre los cacahuates. Extiéndelo con una espátula engrasada.', 'Deja que se enfríe por completo y rompe o corta en porciones. El caramelo caliente causa quemaduras; no lo pruebes hasta que haya enfriado.'],
  }),
  crearRecetaExtra({
    id: 140, nombre: 'Calabaza en tacha', categoria: 'Postre', descripcion: 'Calabaza de Castilla cocida en miel de piloncillo con canela, naranja y clavo.', tiempoMin: 90, dificultad: 'Fácil', emoji: '🎃',
    ingredientes: ['Calabaza de Castilla|1.5 kg|Verduras', 'Piloncillo|350 g|Despensa', 'Agua|3 tazas|Despensa', 'Canela en raja|2 piezas|Especias', 'Clavo de olor|3 piezas|Especias', 'Cáscara de naranja|2 tiras|Frutas', 'Leche|para servir|Lácteos'],
    utensilios: ['Cuchillo fuerte', 'Tabla estable', 'Olla grande', 'Cuchara de madera', 'Cucharón'], equipos: ['Estufa'],
    preparacion: ['Corta la calabaza en gajos con un cuchillo firme y retira las semillas con una cuchara. Conserva la cáscara para que mantenga su forma al cocerse.', 'Coloca agua, piloncillo, canela, clavo y cáscara de naranja en una olla; calienta hasta que el piloncillo se disuelva.', 'Acomoda los gajos con la pulpa hacia abajo en el jarabe. Tapa parcialmente y cocina a fuego bajo de 45 a 60 minutos, bañando ocasionalmente con el jarabe.', 'Cuando la pulpa esté suave y el jarabe espeso, retira del fuego. Sirve con parte de la miel y, si te gusta, un poco de leche fría.'],
  }),
  crearRecetaExtra({
    id: 141, nombre: 'Jamoncillo de leche', categoria: 'Postre', descripcion: 'Dulce compacto de leche y azúcar, perfumado con canela y decorado con nuez.', tiempoMin: 55, dificultad: 'Media', emoji: '🥛',
    ingredientes: ['Leche entera|1 litro|Lácteos', 'Azúcar|2 tazas|Despensa', 'Bicarbonato|1/4 cucharadita|Despensa', 'Canela|1 raja|Especias', 'Nuez|1/2 taza|Semillas', 'Vainilla|1 cucharadita|Despensa', 'Mantequilla|1 cucharadita|Lácteos'],
    utensilios: ['Olla de fondo grueso', 'Cuchara de madera', 'Termómetro de cocina opcional', 'Molde bajo', 'Espátula'], equipos: ['Estufa'],
    preparacion: ['Unta mantequilla en un molde bajo. Pon la leche, el azúcar, bicarbonato y canela en una olla amplia de fondo grueso.', 'Calienta a fuego medio, moviendo con frecuencia para que no se pegue. Cuando hierva, baja el fuego y cocina hasta que la mezcla se reduzca y tome color crema.', 'Retira la canela y agrega vainilla. Continúa mezclando hasta que al pasar la cuchara se vea el fondo de la olla por un instante; apaga y deja entibiar.', 'Bate vigorosamente la mezcla tibia hasta que pierda brillo y empiece a espesar. Viértela en el molde, decora con nuez y deja enfriar antes de cortar.'],
  }),
  crearRecetaExtra({
    id: 142, nombre: 'Ate de guayaba', categoria: 'Postre', descripcion: 'Pasta firme de guayaba cocida con azúcar y limón, lista para cortar y acompañar con queso.', tiempoMin: 100, dificultad: 'Media', emoji: '🍈',
    ingredientes: ['Guayaba madura|1 kg|Frutas', 'Azúcar|700 g|Despensa', 'Jugo de limón|2 cucharadas|Frutas', 'Agua|2 tazas|Despensa', 'Pectina|1 cucharadita opcional|Despensa', 'Queso panela|para acompañar|Lácteos'],
    utensilios: ['Olla', 'Licuadora', 'Colador fino', 'Cuchara de madera', 'Molde'], equipos: ['Estufa', 'Licuadora', 'Refrigerador'],
    preparacion: ['Lava y corta las guayabas. Cuécelas en agua hasta que estén muy suaves; licúalas y pásalas por un colador fino para retirar semillas.', 'Regresa el puré a la olla y agrega azúcar y jugo de limón. Cocina a fuego bajo, moviendo continuamente para que no salpique ni se pegue.', 'Continúa la cocción hasta que la pasta esté espesa y se despegue del fondo al pasar la cuchara. La mezcla puede tardar cerca de una hora; evita subir demasiado el fuego.', 'Vierte en un molde ligeramente engrasado y deja enfriar. Refrigera hasta que esté firme, desmolda y sirve en rebanadas con queso.'],
  }),
  crearRecetaExtra({
    id: 143, nombre: 'Nieve de limón', categoria: 'Postre', descripcion: 'Postre helado de agua, limón y jarabe de azúcar, refrescante y fácil de servir.', tiempoMin: 30, dificultad: 'Fácil', emoji: '🍋',
    ingredientes: ['Agua|3 tazas|Bebidas', 'Azúcar|1 taza|Despensa', 'Jugo de limón|3/4 taza|Frutas', 'Ralladura de limón|1 cucharadita|Frutas', 'Clara de huevo pasteurizada|1 pieza opcional|Proteínas', 'Sal|1 pizca|Despensa'],
    utensilios: ['Cacerola', 'Batidor', 'Tazón metálico', 'Rallador fino', 'Tenedor'], equipos: ['Estufa', 'Congelador'],
    preparacion: ['Hierve agua y azúcar en una cacerola hasta que se disuelva. Apaga y deja enfriar por completo el jarabe.', 'Agrega el jugo y la ralladura de limón y una pizca de sal. Prueba y ajusta acidez o dulzor antes de congelar.', 'Vierte en un recipiente metálico bajo y congela. Cada 30 minutos raspa los cristales con un tenedor y mézclalos; repite hasta lograr textura granulada.', 'Sirve de inmediato o conserva tapado en el congelador. Si usas clara para una textura más aireada, elige clara pasteurizada y bátela aparte antes de incorporarla.'],
  }),
  crearRecetaExtra({
    id: 144, nombre: 'Flan de elote', categoria: 'Postre', descripcion: 'Flan cremoso de elote tierno con caramelo, leche y vainilla.', tiempoMin: 100, dificultad: 'Media', emoji: '🍮',
    ingredientes: ['Granos de elote|2 tazas|Verduras', 'Leche condensada|1 lata|Lácteos', 'Leche evaporada|1 lata|Lácteos', 'Huevo|5 piezas|Proteínas', 'Vainilla|1 cucharadita|Despensa', 'Azúcar|3/4 taza|Despensa', 'Agua caliente|para baño María|Despensa'],
    utensilios: ['Sartén pequeña', 'Licuadora', 'Flanera', 'Charola profunda', 'Guantes para horno'], equipos: ['Estufa', 'Licuadora', 'Horno', 'Refrigerador'],
    preparacion: ['Precalienta el horno a 170 °C. Calienta el azúcar en una sartén a fuego bajo hasta que se derrita y tome color ámbar; viértelo con cuidado en una flanera.', 'Licúa el elote con leche condensada, leche evaporada, huevos y vainilla hasta obtener una mezcla uniforme. Cuélala si quieres una textura más tersa.', 'Vierte la mezcla en la flanera y cúbrela con aluminio. Colócala dentro de una charola y añade agua caliente hasta la mitad de su altura.', 'Hornea de 60 a 75 minutos, hasta que el centro esté firme pero tiemble ligeramente. Deja enfriar, refrigera al menos 4 horas y desmolda con cuidado.'],
  }),
  crearRecetaExtra({
    id: 145, nombre: 'Carlota de limón', categoria: 'Postre', descripcion: 'Postre frío de capas de galleta y crema de limón con leche condensada.', tiempoMin: 25, dificultad: 'Fácil', emoji: '🍋',
    ingredientes: ['Galletas Marías|2 paquetes|Cereales', 'Leche condensada|1 lata|Lácteos', 'Leche evaporada|1 lata|Lácteos', 'Jugo de limón|1/2 taza|Frutas', 'Ralladura de limón|1 cucharadita|Frutas', 'Queso crema|190 g|Lácteos', 'Mantequilla|para el molde|Lácteos'],
    utensilios: ['Licuadora', 'Espátula', 'Molde rectangular', 'Cuchillo'], equipos: ['Licuadora', 'Refrigerador'],
    preparacion: ['Bate en la licuadora la leche condensada, leche evaporada, queso crema y jugo de limón hasta que la mezcla espese. Prueba la acidez y ajusta con un poco más de jugo.', 'Unta una capa fina de mantequilla en el molde. Coloca galletas cubriendo el fondo sin dejar huecos grandes.', 'Extiende una capa de crema de limón sobre las galletas y repite las capas, terminando con crema. Alisa la superficie con una espátula.', 'Cubre y refrigera al menos 6 horas para que las galletas se suavicen. Decora con ralladura de limón y corta porciones frías.'],
  }),
  crearRecetaExtra({
    id: 146, nombre: 'Empanadas dulces de calabaza', categoria: 'Postre', descripcion: 'Empanadas horneadas con relleno especiado de calabaza de Castilla y piloncillo.', tiempoMin: 80, dificultad: 'Media', emoji: '🥟',
    ingredientes: ['Harina de trigo|3 tazas|Cereales', 'Mantequilla fría|180 g|Lácteos', 'Huevo|1 pieza|Proteínas', 'Leche|1/2 taza|Lácteos', 'Calabaza cocida|2 tazas|Verduras', 'Piloncillo|150 g|Despensa', 'Canela molida|1 cucharadita|Especias', 'Clavo molido|1 pizca|Especias'],
    utensilios: ['Tazón', 'Cuchara de madera', 'Rodillo', 'Charola para horno', 'Tenedor'], equipos: ['Estufa', 'Horno'],
    preparacion: ['Cuece la calabaza hasta que esté suave y machácala. Ponla en una cacerola con piloncillo, canela y clavo; cocina a fuego bajo hasta que el relleno espese y deja enfriar.', 'Mezcla harina con mantequilla fría hasta obtener migas. Agrega huevo y leche poco a poco, formando una masa suave; refrigera 20 minutos.', 'Extiende la masa sobre una mesa enharinada y corta círculos. Pon una cucharada de relleno frío en cada uno, humedece la orilla y sella con un tenedor.', 'Hornea a 190 °C de 18 a 22 minutos, hasta que estén doradas. Espera unos minutos antes de servir porque el relleno conserva mucho calor.'],
  }),
  crearRecetaExtra({
    id: 147, nombre: 'Gorditas de nata', categoria: 'Postre', descripcion: 'Gorditas dulces de harina y nata cocidas en comal, suaves y ligeramente doradas.', tiempoMin: 40, dificultad: 'Fácil', emoji: '🥞',
    ingredientes: ['Harina de trigo|2 tazas|Cereales', 'Nata|1 taza|Lácteos', 'Azúcar|1/2 taza|Despensa', 'Huevo|1 pieza|Proteínas', 'Polvo para hornear|1 cucharadita|Despensa', 'Canela|1/2 cucharadita|Especias', 'Vainilla|1 cucharadita|Despensa', 'Sal|1 pizca|Despensa'],
    utensilios: ['Tazón', 'Batidor', 'Rodillo', 'Cortador redondo', 'Comal'], equipos: ['Estufa'],
    preparacion: ['Mezcla harina, polvo para hornear, azúcar, canela y sal. Agrega nata, huevo y vainilla; amasa hasta que la mezcla quede suave y no se pegue demasiado.', 'Cubre la masa y déjala reposar 15 minutos. Extiéndela con rodillo hasta dejar aproximadamente un centímetro de grosor y corta discos.', 'Calienta un comal a fuego bajo. Cocina las gorditas de 3 a 4 minutos por lado, volteándolas cuando aparezcan burbujas y manchas doradas.', 'Comprueba que el centro esté cocido, sin resecar las orillas. Sirve tibias con café o espolvorea un poco de azúcar.'],
    fuenteUrl: 'https://laroussecocina.mx/libro/desayunos-mexicanos/',
  }),
  crearRecetaExtra({
    id: 148, nombre: 'Gelatina de mosaico', categoria: 'Postre', descripcion: 'Cubos de gelatina de sabores mezclados con una base cremosa de leche y vainilla.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🍮',
    ingredientes: ['Gelatina de fresa|1 sobre|Despensa', 'Gelatina de limón|1 sobre|Despensa', 'Gelatina de uva|1 sobre|Despensa', 'Grenetina|3 sobres|Despensa', 'Leche evaporada|1 lata|Lácteos', 'Leche condensada|1/2 lata|Lácteos', 'Leche|2 tazas|Lácteos', 'Vainilla|1 cucharadita|Despensa'],
    utensilios: ['Tres moldes bajos', 'Tazón', 'Batidor', 'Olla', 'Molde grande'], equipos: ['Estufa', 'Refrigerador'],
    preparacion: ['Prepara cada gelatina de sabor por separado usando un poco menos de agua de la indicada para que quede firme. Refrigera hasta que cuaje por completo.', 'Hidrata la grenetina en media taza de agua fría. Calienta la leche sin hervir, disuelve la grenetina hidratada y agrega leche evaporada, condensada y vainilla.', 'Corta las gelatinas de colores en cubos y repártelos en un molde grande ligeramente humedecido. Vierte encima la mezcla de leche ya tibia, no caliente.', 'Refrigera de 4 a 6 horas hasta que cuaje. Para desmoldar, pasa brevemente la base del molde por agua tibia y voltea sobre un plato.'],
  }),
  crearRecetaExtra({
    id: 149, nombre: 'Coyotas sonorenses', categoria: 'Postre', descripcion: 'Galletas rellenas de piloncillo que se hornean hasta quedar doradas y quebradizas.', tiempoMin: 65, dificultad: 'Media', emoji: '🍪',
    ingredientes: ['Harina de trigo|3 tazas|Cereales', 'Manteca vegetal|200 g|Despensa', 'Piloncillo|250 g|Despensa', 'Agua tibia|3/4 taza|Despensa', 'Polvo para hornear|1 cucharadita|Despensa', 'Canela|1/2 cucharadita|Especias', 'Azúcar|2 cucharadas|Despensa', 'Sal|1 pizca|Despensa'],
    utensilios: ['Tazón', 'Rodillo', 'Cuchillo', 'Charola para horno', 'Tenedor'], equipos: ['Horno'],
    preparacion: ['Disuelve el piloncillo en un poco de agua tibia y deja enfriar; si quedan trozos duros, rállalos. Mezcla harina, polvo para hornear, azúcar y sal.', 'Agrega la manteca y trabaja con las manos hasta obtener una textura arenosa. Incorpora agua poco a poco hasta formar una masa suave; déjala reposar 20 minutos.', 'Extiende la masa y corta discos. Coloca piloncillo en el centro de la mitad de ellos, cubre con otro disco y sella la orilla con un tenedor.', 'Pica ligeramente la superficie para permitir que salga el vapor y hornea a 180 °C de 20 a 25 minutos, hasta que estén doradas. Deja enfriar antes de moverlas.'],
  }),
  crearRecetaExtra({
    id: 150, nombre: 'Frijoles charros', categoria: 'Acompañamiento', descripcion: 'Frijoles bayos caldosos con tocino, chorizo, jitomate, chile y cilantro.', tiempoMin: 55, dificultad: 'Fácil', emoji: '🫘',
    ingredientes: ['Frijoles bayos cocidos|3 tazas|Leguminosas', 'Caldo de frijol|2 tazas|Despensa', 'Tocino|100 g|Proteínas', 'Chorizo|150 g|Proteínas', 'Jitomate|2 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Chile serrano|1 pieza|Chiles', 'Cilantro|1/4 taza|Hierbas'],
    utensilios: ['Olla', 'Cuchara de madera', 'Cuchillo', 'Tabla', 'Cucharón'], equipos: ['Estufa'],
    preparacion: ['Corta tocino, chorizo, cebolla y jitomate en trozos pequeños. Dora el tocino en una olla y retira parte de la grasa si queda demasiada.', 'Agrega chorizo y cocina hasta que esté bien hecho. Incorpora cebolla y chile y sofríe hasta que la cebolla se suavice; añade jitomate.', 'Vierte frijoles cocidos y caldo. Hierve a fuego bajo de 15 a 20 minutos para integrar sabores; agrega agua caliente si prefieres una consistencia más caldosa.', 'Termina con cilantro picado y prueba antes de añadir sal. Sirve como guarnición de carnes, tacos o quesadillas.'],
  }),
  crearRecetaExtra({
    id: 151, nombre: 'Calabacitas con elote y queso', categoria: 'Acompañamiento', descripcion: 'Calabacitas y granos de elote guisados con jitomate, cebolla y queso panela.', tiempoMin: 30, dificultad: 'Fácil', emoji: '🥒',
    ingredientes: ['Calabacita|4 piezas|Verduras', 'Granos de elote|1 taza|Verduras', 'Jitomate|2 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Chile poblano|1 pieza|Chiles', 'Queso panela|200 g|Lácteos', 'Aceite vegetal|1 cucharada|Despensa', 'Epazote|2 ramas|Hierbas'],
    preparacion: ['Lava las calabacitas y córtalas en cubos medianos. Pica jitomate y cebolla; corta el poblano en tiras y retira semillas y venas.', 'Sofríe la cebolla en aceite hasta que esté transparente. Agrega jitomate y rajas, y cocina hasta que el jitomate se convierta en un caldillo.', 'Incorpora elote y calabacita; tapa y cocina a fuego medio de 8 a 10 minutos, moviendo una vez para que se cocinen parejo sin deshacerse.', 'Añade epazote y queso panela en cubos, apaga el fuego y deja reposar tapado 2 minutos. Sirve como guarnición de frijoles o arroz.'],
  }),
  crearRecetaExtra({
    id: 152, nombre: 'Arroz a la jardinera', categoria: 'Acompañamiento', descripcion: 'Arroz esponjado con zanahoria, chícharos, granos de elote y un caldillo ligero.', tiempoMin: 40, dificultad: 'Fácil', emoji: '🍚',
    ingredientes: ['Arroz|2 tazas|Cereales', 'Zanahoria|1 pieza|Verduras', 'Chícharos|1/2 taza|Verduras', 'Granos de elote|1/2 taza|Verduras', 'Jitomate|2 piezas|Verduras', 'Cebolla|1/4 pieza|Verduras', 'Ajo|1 diente|Verduras', 'Caldo de verduras|3 tazas|Despensa', 'Aceite vegetal|2 cucharadas|Despensa'],
    preparacion: ['Enjuaga el arroz hasta que el agua salga casi clara y escúrrelo. Corta la zanahoria en cubos pequeños; licúa jitomate, cebolla y ajo con media taza de caldo.', 'Calienta el aceite en una olla y dora el arroz a fuego medio, moviéndolo con cuidado hasta que los granos se vean ligeramente transparentes.', 'Vierte el caldillo colado y cocina 3 minutos. Agrega el resto del caldo, zanahoria, chícharos, elote y sal; espera a que hierva.', 'Tapa, baja el fuego al mínimo y cocina 15 a 18 minutos sin revolver. Apaga y deja reposar 10 minutos antes de esponjar suavemente con un tenedor.'],
  }),
  crearRecetaExtra({
    id: 153, nombre: 'Nopales asados con queso panela', categoria: 'Acompañamiento', descripcion: 'Pencas de nopal asadas al comal y servidas con queso panela, cebolla y salsa.', tiempoMin: 25, dificultad: 'Fácil', emoji: '🌵',
    ingredientes: ['Nopales limpios|4 piezas|Verduras', 'Queso panela|250 g|Lácteos', 'Cebolla morada|1/4 pieza|Verduras', 'Cilantro|2 cucharadas|Hierbas', 'Limón|1 pieza|Frutas', 'Aceite de oliva|1 cucharada|Despensa', 'Orégano seco|1/2 cucharadita|Especias', 'Salsa roja|1/2 taza|Chiles'],
    utensilios: ['Comal', 'Pinzas', 'Cuchillo', 'Tabla', 'Brocha de cocina'], equipos: ['Estufa'],
    preparacion: ['Enjuaga los nopales y sécalos. Haz cortes superficiales en forma de cuadrícula para que se cuezan parejo y se les facilite soltar la baba.', 'Unta cada nopal con una capa fina de aceite y ásalos en un comal caliente de 4 a 6 minutos por lado, hasta que estén suaves y tengan marcas doradas.', 'Coloca una rebanada de queso panela sobre cada nopal durante el último minuto para que se caliente sin derretirse por completo.', 'Sirve con cebolla, cilantro, orégano, limón y salsa roja. Corta en tiras y acompaña carnes, frijoles o tortillas.'],
  }),
  crearRecetaExtra({
    id: 154, nombre: 'Rajas poblanas con elote', categoria: 'Acompañamiento', descripcion: 'Rajas de chile poblano salteadas con granos de elote, cebolla y crema ligera.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🌶️',
    ingredientes: ['Chile poblano|4 piezas|Chiles', 'Granos de elote|1 taza|Verduras', 'Cebolla|1 pieza|Verduras', 'Crema|1/2 taza|Lácteos', 'Queso fresco|1/2 taza|Lácteos', 'Aceite vegetal|1 cucharada|Despensa', 'Sal|al gusto|Despensa'],
    utensilios: ['Comal', 'Sartén amplio', 'Cuchillo', 'Tabla', 'Espátula'], equipos: ['Estufa'],
    preparacion: ['Asa los poblanos hasta que la piel se ampolle, colócalos tapados 10 minutos y después retira piel, semillas y venas. Córtalos en tiras.', 'Rebana la cebolla en plumas y sofríela en aceite hasta que esté transparente. Agrega las rajas y los granos de elote.', 'Cocina a fuego medio de 6 a 8 minutos hasta que el elote esté tierno. Baja el fuego e incorpora crema y sal; calienta sin permitir que hierva fuerte.', 'Sirve con queso fresco desmoronado. Si la crema espesa demasiado, añade una cucharada de leche o caldo.'],
  }),
  crearRecetaExtra({
    id: 155, nombre: 'Chayotes con elote y epazote', categoria: 'Acompañamiento', descripcion: 'Chayote tierno y elote guisados con cebolla, jitomate y hojas de epazote.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🥬',
    ingredientes: ['Chayote|2 piezas|Verduras', 'Granos de elote|1 taza|Verduras', 'Jitomate|2 piezas|Verduras', 'Cebolla|1/2 pieza|Verduras', 'Ajo|1 diente|Verduras', 'Epazote|2 ramas|Hierbas', 'Caldo de verduras|1 taza|Despensa', 'Aceite vegetal|1 cucharada|Despensa'],
    preparacion: ['Pela los chayotes con un pelador y córtalos en cubos; si tienen semilla grande y dura, retírala. Pica jitomate, cebolla y ajo.', 'Sofríe cebolla y ajo en una olla pequeña. Agrega jitomate y cocina hasta que suelte jugo; añade el elote y mezcla.', 'Incorpora chayote, caldo y epazote. Tapa y cocina a fuego medio-bajo de 12 a 15 minutos, hasta que el chayote esté tierno pero no deshecho.', 'Prueba el caldo y ajusta sal. Retira los tallos de epazote y sirve como acompañamiento de pescado, pollo o frijoles.'],
  }),
  crearRecetaExtra({
    id: 156, nombre: 'Papas al chipotle', categoria: 'Acompañamiento', descripcion: 'Papas doradas cubiertas con una salsa cremosa de chipotle y cilantro.', tiempoMin: 35, dificultad: 'Fácil', emoji: '🥔',
    ingredientes: ['Papa cambray|700 g|Verduras', 'Chile chipotle adobado|2 piezas|Chiles', 'Crema|1/2 taza|Lácteos', 'Ajo|1 diente|Verduras', 'Cilantro|1/4 taza|Hierbas', 'Caldo de verduras|1/2 taza|Despensa', 'Aceite vegetal|2 cucharadas|Despensa', 'Limón|1/2 pieza|Frutas'],
    utensilios: ['Olla', 'Sartén amplio', 'Licuadora', 'Colador', 'Espátula'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Lava las papas y cuécelas enteras en agua con sal hasta que un cuchillo entre con poca resistencia. Escúrrelas y pártelas por la mitad.', 'Licúa chipotle, crema, ajo, cilantro, caldo y unas gotas de limón hasta tener una salsa lisa. Prueba el picante antes de añadir más chile.', 'Dora las papas en una sartén con aceite, colocando primero el lado cortado hacia abajo. Voltea y cocina hasta que la piel esté ligeramente crujiente.', 'Baja el fuego, vierte la salsa sobre las papas y mezcla suavemente para cubrirlas. Calienta solo unos minutos y sirve enseguida.'],
  }),
  crearRecetaExtra({
    id: 157, nombre: 'Cebollitas cambray asadas', categoria: 'Acompañamiento', descripcion: 'Cebollitas doradas al comal con limón, salsa inglesa y un toque de chile.', tiempoMin: 20, dificultad: 'Fácil', emoji: '🧅',
    ingredientes: ['Cebollitas cambray|2 manojos|Verduras', 'Limón|2 piezas|Frutas', 'Salsa inglesa|1 cucharada|Despensa', 'Aceite vegetal|1 cucharada|Despensa', 'Chile piquín|1 cucharadita|Chiles', 'Sal|al gusto|Despensa'],
    utensilios: ['Comal o parrilla', 'Pinzas', 'Brocha', 'Plato'], equipos: ['Estufa'],
    preparacion: ['Corta las raíces secas y retira las hojas externas dañadas. Enjuaga las cebollitas y sécalas bien para que se doren.', 'Mezcla aceite con salsa inglesa y una pizca de sal. Unta las cebollitas con una brocha y colócalas en un comal caliente.', 'Ásalas girándolas con pinzas durante 8 a 10 minutos, hasta que estén suaves por dentro y ligeramente tostadas por fuera.', 'Exprime limón encima y espolvorea chile piquín. Sirve calientes junto con carne asada, tacos o frijoles.'],
  }),
  crearRecetaExtra({
    id: 158, nombre: 'Verdolagas con papas', categoria: 'Acompañamiento', descripcion: 'Verdolagas y papa guisadas en salsa verde de tomatillo con cilantro.', tiempoMin: 40, dificultad: 'Fácil', emoji: '🌱',
    ingredientes: ['Verdolagas|2 manojos|Verduras', 'Papa|2 piezas|Verduras', 'Tomate verde|6 piezas|Verduras', 'Chile serrano|1 pieza|Chiles', 'Cilantro|1/2 taza|Hierbas', 'Cebolla|1/2 pieza|Verduras', 'Caldo de verduras|1 taza|Despensa', 'Aceite vegetal|1 cucharada|Despensa'],
    preparacion: ['Separa las hojas tiernas de las verdolagas, lávalas varias veces y escúrrelas. Pela las papas y córtalas en cubos pequeños.', 'Hierve tomates verdes y chile hasta que cambien de color. Licúalos con cilantro y un trozo de cebolla; cuela la salsa.', 'Sofríe el resto de la cebolla en una olla, agrega la salsa y cocina 5 minutos. Añade las papas y el caldo; tapa y cocina hasta que empiecen a suavizarse.', 'Incorpora las verdolagas y cocina 8 a 10 minutos más, hasta que las papas estén cocidas y las hojas suaves. Ajusta sal y sirve.'],
  }),
  crearRecetaExtra({
    id: 159, nombre: 'Salsa verde asada', categoria: 'Acompañamiento', descripcion: 'Salsa de tomatillo, chile serrano, ajo y cebolla tatemados en comal.', tiempoMin: 20, dificultad: 'Fácil', emoji: '🫑',
    ingredientes: ['Tomate verde|8 piezas|Verduras', 'Chile serrano|3 piezas|Chiles', 'Cebolla blanca|1/4 pieza|Verduras', 'Ajo|1 diente|Verduras', 'Cilantro|1/4 taza|Hierbas', 'Sal|al gusto|Despensa', 'Agua|2 cucharadas|Despensa'],
    utensilios: ['Comal', 'Licuadora o molcajete', 'Pinzas', 'Cuchara'], equipos: ['Estufa', 'Licuadora'],
    preparacion: ['Enjuaga los tomates verdes y los chiles. Asa tomates, chiles, cebolla y ajo en un comal, volteándolos hasta que se suavicen y tengan zonas tostadas.', 'Deja que se entibien. Licúa o muele en molcajete el ajo, la cebolla y los chiles con sal; agrega los tomates poco a poco.', 'Añade cilantro y un poco de agua si quieres una salsa más suelta. Pulsa brevemente para conservar una textura ligeramente rústica.', 'Prueba el picante y la sal; sirve con tacos, frijoles, quesadillas o carnes. Refrigera lo que sobre en un recipiente cerrado.'],
  }),
  crearRecetaExtra({
    id: 160, nombre: 'Frijoles de olla con epazote', categoria: 'Acompañamiento', descripcion: 'Frijoles bayos cocidos lentamente con ajo, cebolla y epazote hasta quedar caldosos.', tiempoMin: 150, dificultad: 'Fácil', emoji: '🫘',
    ingredientes: ['Frijoles bayos secos|2 tazas|Leguminosas', 'Agua|2.5 litros|Despensa', 'Cebolla|1/2 pieza|Verduras', 'Ajo|2 dientes|Verduras', 'Epazote|2 ramas|Hierbas', 'Sal|al gusto|Despensa', 'Chile serrano|1 pieza opcional|Chiles'],
    utensilios: ['Olla grande con tapa', 'Cuchara de madera', 'Tazón para remojo', 'Cucharón'], equipos: ['Estufa'],
    preparacion: ['Revisa los frijoles y retira piedritas o granos dañados. Enjuágalos y, si tienes tiempo, remójalos cubiertos de agua durante 8 horas; desecha esa agua.', 'Pon los frijoles en una olla con agua limpia, cebolla y ajo. Lleva a hervor y baja el fuego para mantener un burbujeo suave.', 'Cuece tapado parcialmente de 1.5 a 2 horas, revisando el nivel de agua y añadiendo agua caliente si hace falta. Cuando estén casi tiernos, agrega epazote y chile.', 'Añade sal cuando los frijoles estén suaves y cocina 10 minutos más. Sirve con su caldo y conserva refrigerados una vez que se enfríen.'],
  }),
  crearRecetaExtra({
    id: 161, nombre: 'Plátanos machos fritos con crema', categoria: 'Acompañamiento', descripcion: 'Rebanadas de plátano macho doradas en sartén y servidas con crema y queso fresco.', tiempoMin: 20, dificultad: 'Fácil', emoji: '🍌',
    ingredientes: ['Plátano macho maduro|2 piezas|Frutas', 'Aceite vegetal|1/3 taza|Despensa', 'Crema|1/3 taza|Lácteos', 'Queso fresco|1/3 taza|Lácteos', 'Canela molida|1/2 cucharadita opcional|Especias', 'Sal|1 pizca|Despensa'],
    utensilios: ['Cuchillo', 'Tabla', 'Sartén', 'Espátula', 'Papel absorbente'], equipos: ['Estufa'],
    preparacion: ['Pela los plátanos y córtalos en diagonal en rebanadas de un centímetro. Sécalos con una servilleta para reducir salpicaduras.', 'Calienta aceite en una sartén a fuego medio. Fríe las rebanadas en tandas, volteándolas cuando la base esté dorada y cocinando el otro lado.', 'Retíralas con una espátula y escúrrelas sobre papel absorbente. No subas demasiado el fuego porque el azúcar del plátano se quema rápido.', 'Sirve calientes con crema y queso fresco. Para una versión dulce, añade canela; para acompañar comida salada, usa solo una pizca de sal.'],
  }),
  crearRecetaExtra({
    id: 162, nombre: 'Tortillas de harina caseras', categoria: 'Acompañamiento', descripcion: 'Tortillas norteñas flexibles de harina, manteca, agua tibia y sal, cocidas al comal.', tiempoMin: 45, dificultad: 'Media', emoji: '🫓',
    ingredientes: ['Harina de trigo|3 tazas|Cereales', 'Manteca vegetal|60 g|Despensa', 'Agua tibia|1 taza|Despensa', 'Polvo para hornear|1/2 cucharadita|Despensa', 'Sal|1 cucharadita|Despensa'],
    utensilios: ['Tazón grande', 'Rodillo', 'Comal', 'Paño limpio', 'Espátula'], equipos: ['Estufa'],
    preparacion: ['Mezcla harina, sal y polvo para hornear. Agrega la manteca y deshazla con los dedos hasta que la harina parezca arena húmeda.', 'Vierte el agua tibia poco a poco mientras amasas. Trabaja la masa de 5 a 7 minutos hasta que quede lisa y elástica; tapa y deja reposar 20 minutos.', 'Divide en bolitas iguales, cúbrelas para que no se resequen y extiende cada una con rodillo hasta formar discos delgados.', 'Cuece cada tortilla en un comal caliente; cuando aparezcan burbujas, voltéala y cocina el otro lado. Guarda las tortillas cocidas envueltas en un paño limpio.'],
  }),
  crearRecetaExtra({
    id: 163, nombre: 'Ensalada de jícama, pepino y naranja', categoria: 'Acompañamiento', descripcion: 'Ensalada fresca y crujiente de jícama, pepino, naranja, limón y chile piquín.', tiempoMin: 20, dificultad: 'Fácil', emoji: '🍊',
    ingredientes: ['Jícama|1 pieza mediana|Verduras', 'Pepino|1 pieza|Verduras', 'Naranja|2 piezas|Frutas', 'Limón|2 piezas|Frutas', 'Chile piquín|1 cucharadita|Chiles', 'Cilantro|2 cucharadas|Hierbas', 'Sal|1 pizca|Despensa'],
    utensilios: ['Pelador', 'Cuchillo', 'Tabla', 'Tazón', 'Exprimidor'], equipos: [],
    preparacion: ['Pela la jícama y córtala en bastones delgados. Lava el pepino, retira las semillas si son grandes y córtalo en piezas similares.', 'Pela las naranjas retirando la parte blanca y corta gajos sin semillas. Pica el cilantro finamente.', 'Mezcla jícama, pepino y naranja en un tazón. Agrega jugo de limón y una pizca de sal.', 'Espolvorea chile piquín y cilantro justo antes de servir. Mantén la ensalada refrigerada para conservarla crujiente.'],
  }),
];
