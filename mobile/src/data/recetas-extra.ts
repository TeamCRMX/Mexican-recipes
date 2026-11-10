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
];
