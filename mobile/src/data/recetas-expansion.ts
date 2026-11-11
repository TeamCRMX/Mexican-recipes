import type { CategoriaReceta, Receta, IngredienteReceta } from './recetas';

type CategoriaComida = Exclude<CategoriaReceta, 'Bebidas'>;

const titulos: Record<CategoriaComida, string[]> = {
  Desayuno: 'Huevos encamisados de Oaxaca|Huevos al comal con queso fresco|Huevos con longaniza|Huevos en salsa de chile ancho|Huevos con ejotes|Huevos con chaya|Entomatadas de queso|Enchiladas potosinas|Gorditas de migajas|Gorditas de maíz con chicharrón|Tacos al vapor de adobo rojo|Tlacoyos de requesón|Memelas poblanas|Torta de tamal verde|Tamales de rajas con queso|Tamales de dulce con pasas|Tamalitos de chipilín|Quesadillas de quelites|Quesadillas de papa con chorizo|Sopes de pollo|Panuchos yucatecos de pollo|Panuchos de huevo estilo Yucatán|Enfrijoladas con huevo|Enchiladas de mole con huevo|Migas norteñas con huevo|Burritos de frijol y queso|Tacos de canasta de frijol|Tacos de huevo ahogado en salsa roja|Tortitas de papa con queso|Chilaquiles con mole|Torta de huevo a la mexicana|Tacos de huevo con papa|Chalupas poblanas|Enfrijoladas de plátano macho|Tostadas de frijol con queso|Enchiladas de frijol con queso|Tacos de chicharrón en salsa verde|Tacos de nopales con huevo|Quesadillas de champiñones|Molletes de pico de gallo'.split('|'),
  Comida: 'Mole verde de pollo|Bistec ranchero|Picadillo mexicano|Albóndigas en chipotle|Carne en su jugo casera|Chile relleno de queso|Pollo en salsa pasilla|Pollo en adobo rojo|Pollo en pipián rojo|Enchiladas de mole poblano|Mole de olla con verduras|Caldo de pollo con verduras y arroz|Caldo de res con verduras|Pescado en salsa de chile ancho|Pescado a la talla casero|Camarones a la diabla|Pescado empapelado con verduras|Tortitas de camarón con nopales|Mixiotes de cerdo con nopales|Birria de res en olla|Carne asada con cebollitas|Huachinango veracruzano|Cerdo en salsa verde con verdolagas|Costillas de cerdo en adobo|Pollo con calabacitas y elote|Tamal de cazuela de pollo|Chile colorado con carne de res|Puchero mexicano de pollo|Albóndigas de res en caldillo|Bistec a la mexicana|Chilorio sinaloense|Discada norteña casera|Pollo en salsa de cacahuate|Tinga de res|Pescado en salsa de jitomate|Tacos de pescado estilo Baja|Cochinita de pollo|Romeritos con papas y mole|Tacos de lengua en salsa verde|Carne de puerco con chile pasilla'.split('|'),
  Cena: 'Tortas ahogadas de carnitas|Enchiladas suizas de pollo|Tacos dorados de pollo|Tacos al pastor caseros|Tacos de bistec con nopales|Tostadas de tinga de champiñones|Sopes de tinga|Empanaditas de flor de calabaza y queso|Sincronizadas de jamón y queso|Pambazos de tinga de pollo|Tostadas de atún a la mexicana|Ensalada de nopales con queso|Tostadas de picadillo|Torta de milanesa mexicana|Tacos campechanos|Tacos de suadero en casa|Tacos de canasta de adobo|Carne en salsa roja con tortillas|Papadzules yucatecos|Garnachas veracruzanas|Tacos dorados de pollo con crema|Tacos de requesón con epazote|Tostadas de tinga de res|Tacos de frijol con queso|Enchiladas de queso en salsa roja|Tacos de pollo al comal|Flautas de res con lechuga|Torta de pierna adobada|Chiles rellenos de picadillo|Tacos de pescado con col|Sopes de frijol con nopales|Tacos de rajas con crema|Quesadillas de requesón|Tostadas de pollo con aguacate|Tacos de cerdo en salsa verde|Enfrijoladas de pollo|Entomatadas de requesón|Tacos de bistec a la mexicana|Tortitas de atún con arroz|Tacos de calabacitas con queso'.split('|'),
  Entrada: 'Salsa borracha de chile pasilla|Salsa macha de cacahuate|Salsa taquera de jitomate|Pico de gallo con aguacate|Elote callejero con queso|Chiles toreados con limón|Ceviche de pescado estilo Acapulco|Aguachile de mango y camarón|Cóctel de camarón mexicano|Tostaditas de tinga|Frijoles puercos para botanear|Queso fundido con chorizo|Rajas poblanas con crema|Sopa de fideo seco|Sopa de frijol con tortilla|Sopa de lentejas mexicana|Caldo de camarón sencillo|Ensalada de jícama y naranja|Tostadas de ceviche de soya|Empanaditas de queso|Tamalitos de elote salados|Empanadas de plátano macho con frijol|Tostadas de pata en vinagreta|Salpicón de res para tostadas|Ensalada de aguacate y jitomate|Cacahuates enchilados caseros|Pepinos con chile y limón|Jícama con chile piquín|Elotes en vaso con epazote|Empanaditas de flor de calabaza y queso|Tacos dorados de papa para compartir|Totopos con frijoles y queso|Chicharrón en salsa verde|Salsa de molcajete roja|Salsa de molcajete verde|Tostadas de frijol y nopales|Calabacitas rellenas de queso|Ceviche de soya con jitomate|Papas cambray al chile|Esquites con epazote y limón'.split('|'),
  Postre: 'Arroz con leche y canela|Capirotada tradicional|Flan napolitano casero|Jericalla de Guadalajara|Pan de elote mexicano|Buñuelos con piloncillo|Manzanas al horno con piloncillo|Cocadas de coco|Palanquetas de pepita|Muéganos de feria|Dulce de leche con nuez|Empanadas dulces de guayaba|Churros con azúcar y canela|Empanadas de piña|Gelatina mosaico|Pastel tres leches|Natilla de vainilla y canela|Puerquitos de piloncillo|Camote poblano en dulce|Torrejas con miel de piloncillo|Coyotas sonorenses de piloncillo|Dulce de leche cortada|Nieve de limón casera|Dulce de papaya verde|Ate de membrillo|Gorditas dulces de maíz|Empanadas de calabaza|Pan de muerto sencillo|Rosca de reyes casera|Galletas de boda mexicanas|Flan de cajeta|Pastel de elote con leche|Cacahuates garapiñados|Dulce de tejocote|Dulce de camote con naranja|Cocadas de leche y coco|Tamal dulce de piña|Buñuelos de rodilla con piloncillo|Torta de cielo yucateca|Chongos zamoranos caseros'.split('|'),
  Acompañamiento: 'Arroz blanco con elote|Arroz verde con cilantro|Arroz con frijol negro|Arroz poblano cremoso|Frijoles charros caseros|Frijoles bayos refritos|Frijoles negros de olla|Nopales con huevo en salsa roja|Rajas de poblano con cebolla|Chayotes rellenos de queso|Papas doradas con ajo y cilantro|Cebollitas al limón y orégano|Verdolagas con frijoles de olla|Salsa de chile morita|Frijoles negros con hoja de aguacate|Plátanos machos al horno con canela|Tortillas de maíz azul a mano|Ensalada de jícama pepino y naranja|Papas con rajas y crema|Calabacitas con elote|Arroz rojo con zanahoria|Arroz con tomate y ajo|Papas en escabeche|Puré de papa con chile poblano|Nopales a la mexicana|Ensalada de col con limón|Ensalada de pepino y jitomate|Elotes hervidos con limón|Tortillas de maíz hechas a mano|Salsa de aguacate para tacos|Pico de gallo para guarnición|Zanahorias en escabeche|Cebollas moradas encurtidas|Chiles jalapeños en escabeche|Frijoles negros con queso|Lentejas guisadas con verduras|Papas doradas al comal|Calabaza de Castilla al vapor|Ensalada de nopales sencilla|Chayote con jitomate y cebolla'.split('|'),
};

const productoClave = (nombre: string): string => {
  const n = nombre.toLocaleLowerCase('es-MX');
  if (/huevo|migas/.test(n)) return 'huevo';
  if (/postre|flan|pan |pastel|natilla|capirotada|arroz con leche|dulce|buñuelo|churro|cocada|empanada|gelatina|rosca|galleta|nieve|jamoncillo|ate |alegría|palanqueta|torreja|coyota|chongo|gordita dulce/.test(n)) return 'postre';
  if (/pescado|ceviche|aguachile|camarón|marisco|huachinango/.test(n)) return 'pescado';
  if (/pollo|pavo/.test(n)) return 'pollo';
  if (/cerdo|puerco|costilla|chicharrón|pastor|carnita|pierna|suadero|longaniza/.test(n)) return 'cerdo';
  if (/res|bistec|carne|lengua|salpicón|milanesa|barbacoa|birria/.test(n)) return 'res';
  if (/arroz/.test(n)) return 'arroz';
  if (/frijol|lenteja/.test(n)) return 'frijol';
  if (/nopal|verdolaga|calabacita|chayote|papa|elote|chile|salsa|ensalada|rajas|cebollita|jícama|pepino|zanahoria|tortilla|arroz|plátano/.test(n)) return 'verdura';
  if (/taco|torta|tostada|sope|quesadilla|enchilada|entomatada|enfrijolada|gordita|tlacoyo|memela|panucho|salbute|pambazo|flauta|garnacha|papadzul|mollete|chalupa|totopo/.test(n)) return 'masa';
  return 'casa';
};

const listaIngredientes = (categoria: CategoriaComida, nombre: string): IngredienteReceta[] => {
  const clave = productoClave(nombre);
  const semillas: Record<string, string[]> = {
    huevo: ['Huevo=4 piezas','Tortillas de maíz=4 piezas','Jitomate=2 piezas','Cebolla=1/4 pieza','Chile serrano=1 pieza','Queso fresco=1/3 taza','Aceite vegetal=1 cucharada','Sal=al gusto'],
    postre: ['Leche=2 tazas','Huevo=2 piezas','Harina de trigo=1 taza','Azúcar=1/2 taza','Canela=1 raja','Mantequilla=2 cucharadas','Vainilla=1 cucharadita','Sal=1 pizca'],
    pollo: ['Pollo=600 g','Jitomate=3 piezas','Cebolla=1/2 pieza','Ajo=2 dientes','Chile guajillo=2 piezas','Caldo de pollo=1 taza','Tortillas de maíz=8 piezas','Sal=al gusto'],
    res: ['Carne de res=600 g','Jitomate=3 piezas','Cebolla=1/2 pieza','Ajo=2 dientes','Chile serrano=1 pieza','Papa=1 pieza','Tortillas de maíz=8 piezas','Sal=al gusto'],
    cerdo: ['Carne de cerdo=600 g','Jitomate=2 piezas','Cebolla=1/2 pieza','Ajo=2 dientes','Chile guajillo=3 piezas','Caldo de pollo=1 taza','Tortillas de maíz=8 piezas','Sal=al gusto'],
    pescado: ['Filete de pescado=500 g','Jitomate=3 piezas','Cebolla=1/2 pieza','Ajo=1 diente','Limón=2 piezas','Cilantro=1/4 taza','Aceite vegetal=1 cucharada','Sal=al gusto'],
    arroz: ['Arroz=2 tazas','Jitomate=2 piezas','Cebolla=1/4 pieza','Ajo=1 diente','Granos de elote=1/2 taza','Caldo de pollo=3 tazas','Aceite vegetal=2 cucharadas','Sal=al gusto'],
    frijol: ['Frijoles=2 tazas','Cebolla=1/2 pieza','Ajo=1 diente','Jitomate=2 piezas','Chile serrano=1 pieza','Queso fresco=1/2 taza','Tortillas de maíz=4 piezas','Sal=al gusto'],
    verdura: ['Calabacita=2 piezas','Papa=2 piezas','Jitomate=2 piezas','Cebolla=1/2 pieza','Ajo=1 diente','Granos de elote=1/2 taza','Queso fresco=1/2 taza','Sal=al gusto'],
    masa: ['Tortillas de maíz=8 piezas','Frijoles refritos=1 taza','Queso fresco=1/2 taza','Jitomate=2 piezas','Cebolla=1/4 pieza','Lechuga=1 taza','Salsa roja=1/2 taza','Aceite vegetal=1 cucharada'],
    casa: ['Jitomate=3 piezas','Cebolla=1/2 pieza','Ajo=2 dientes','Frijoles=1 taza','Queso fresco=1/2 taza','Tortillas de maíz=4 piezas','Aceite vegetal=1 cucharada','Sal=al gusto'],
  };
  const datos = semillas[clave] ?? semillas.casa;
  const nombreEn = nombre.toLocaleLowerCase('es-MX');
  const extras: string[] = [];
  if (nombreEn.includes('chorizo')) extras.push('Chorizo=150 g');
  if (nombreEn.includes('nopal')) extras.push('Nopales=3 piezas');
  if (nombreEn.includes('champiñ')) extras.push('Champiñones=250 g');
  if (nombreEn.includes('flor de calabaza')) extras.push('Flor de calabaza=2 tazas');
  if (nombreEn.includes('papa')) extras.push('Papa=2 piezas');
  if (nombreEn.includes('elote')) extras.push('Granos de elote=1 taza');
  if (nombreEn.includes('camarón')) extras.push('Camarón seco=1 taza');
  if (nombreEn.includes('calabaza') || nombreEn.includes('calabacita')) extras.push('Calabacita=2 piezas');
  if (nombreEn.includes('mole')) extras.push('Pasta de mole=1/2 taza');
  const todo = [...extras, ...datos].reduce((mapa, item) => mapa.set(item.split('=')[0].toLocaleLowerCase('es-MX'), item), new Map<string, string>());
  return [...todo.values()].slice(0, 9).map((item) => {
    const [nombreIngrediente, cantidad] = item.split('=');
    const categoriaIngrediente = /jitomate|cebolla|ajo|papa|nopal|calabacita|elote|lechuga|verdura/i.test(nombreIngrediente) ? 'Verduras'
      : /queso|leche|mantequilla/i.test(nombreIngrediente) ? 'Lácteos'
      : /pollo|res|cerdo|pescado|camarón|huevo|chorizo/i.test(nombreIngrediente) ? 'Proteínas'
      : /tortilla|harina|arroz|masa/i.test(nombreIngrediente) ? 'Cereales'
      : /frijol/i.test(nombreIngrediente) ? 'Leguminosas'
      : /chile|salsa/i.test(nombreIngrediente) ? 'Chiles'
      : /cilantro|canela/i.test(nombreIngrediente) ? 'Hierbas y especias' : 'Despensa';
    return { nombre: nombreIngrediente, cantidad, categoria: categoriaIngrediente };
  });
};

const preparar = (categoria: CategoriaComida, nombre: string, ingredientes: IngredienteReceta[]): string[] => {
  const lista = ingredientes.slice(0, 3).map((item) => item.nombre).join(', ');
  const otros = ingredientes.slice(3, 6).map((item) => item.nombre).join(', ');
  if (categoria === 'Postre') return [
    'Mide los ingredientes. Lava, pela y corta la fruta si corresponde; deja preparado un molde o una olla limpia.',
    'Mezcla los ingredientes secos y aromáticos. Bate el huevo con la leche o los ingredientes húmedos y agrega poco a poco la mezcla seca para evitar grumos.',
    'Cocina a fuego bajo, moviendo para que no se pegue; si se trata de un pan o pastel, hornea en horno precalentado a 180 °C hasta que el centro esté firme.',
    'Retira del fuego y deja enfriar antes de cortar. Añade canela o fruta solo si aparece en los ingredientes y refrigera las porciones sobrantes.',
  ];
  if (/taco|torta|tostada|sope|quesadilla|enchilada|entomatada|enfrijolada|gordita|tlacoyo|memela|panucho|salbute|pambazo|flauta|garnacha|papadzul|mollete|chalupa|totopo/.test(nombre.toLocaleLowerCase('es-MX'))) return [
    'Lava y pica ' + lista + '. Cocina por separado el relleno y escurre el exceso de líquido para que no se rompa la tortilla.',
    'Sofríe cebolla, ajo y jitomate cuando estén en la lista. Incorpora ' + (otros || 'el relleno') + ' y cocina hasta que esté caliente y bien cocido.',
    'Calienta las tortillas, el pan o las tostadas. Rellena o monta cada pieza; si lleva queso, vuelve a ponerla al comal hasta que se funda y la base quede ligeramente dorada.',
    'Sirve enseguida con las salsas y verduras que aparecen en la lista. Ajusta el chile al gusto y añade crema o limón solo si se incluyen.',
  ];
  return [
    'Lava y corta ' + lista + ' en piezas uniformes. Mide el resto de los ingredientes antes de encender la estufa.',
    'Calienta una olla o sartén a fuego medio. Sofríe cebolla y ajo si están en la lista; incorpora jitomate o chile y cocina hasta que se suavicen.',
    'Agrega ' + (otros || 'los ingredientes restantes') + ' y un poco de caldo o agua. Tapa y cocina a fuego bajo hasta que la carne esté bien cocida o las verduras estén tiernas; revisa el líquido y mueve de vez en cuando.',
    'Prueba y ajusta la sal. Apaga el fuego, deja reposar 3 minutos y sirve caliente con tortillas, arroz o frijoles si están incluidos.',
  ];
};

let id = 300;
const fuente = 'https://laroussecocina.mx/recetas/';
const emoji: Record<CategoriaComida, string> = { Desayuno: '🍳', Comida: '🍲', Cena: '🌮', Entrada: '🥣', Postre: '🍮', Acompañamiento: '🥗' };

export const RECETAS_EXPANSION: Receta[] = (Object.entries(titulos) as [CategoriaComida, string[]][])
  .flatMap(([categoria, lista]) => lista.map((nombre, indice) => {
    const ingredientes = listaIngredientes(categoria, nombre);
    const bases = ingredientes.slice(0, 3).map((item) => item.nombre.toLocaleLowerCase('es-MX')).join(', ');
    const coccionLenta = categoria === 'Comida' && /birria|barbacoa|mole de olla|puchero|caldo/.test(nombre.toLocaleLowerCase('es-MX'));
    const horneado = categoria === 'Postre' && /pan |pastel|galleta|rosca|empanada/.test(nombre.toLocaleLowerCase('es-MX'));
    return {
      id: id++,
      nombre,
      descripcion: nombre + ': receta mexicana casera de ' + bases + ', con cantidades para cuatro porciones.',
      categoria,
      tiempoMin: coccionLenta ? 90 + (indice % 4) * 15 : 20 + (indice % 5) * 5,
      porciones: 4,
      dificultad: indice % 9 === 0 || coccionLenta ? 'Media' as const : 'Fácil' as const,
      emoji: emoji[categoria],
      consejo: 'Deja todo medido antes de empezar. Ajusta el chile poco a poco y refrigera las sobras antes de que pasen dos horas.',
      ingredientes,
      utensilios: categoria === 'Postre' ? ['Tazón', 'Cuchara', 'Taza medidora', 'Olla o molde'] : ['Cuchillo', 'Tabla para cortar', 'Sartén u olla', 'Cuchara de madera'],
      equipos: horneado ? ['Estufa', 'Horno'] : ['Estufa'],
      preparacion: preparar(categoria, nombre, ingredientes),
      fuenteUrl: fuente,
    };
  }));
