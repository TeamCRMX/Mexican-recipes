import type { CategoriaReceta, Receta, IngredienteReceta } from './recetas';

type CategoriaComida = Exclude<CategoriaReceta, 'Bebidas'>;

const titulos: Record<CategoriaComida, string[]> = {
  Desayuno: 'Huevos encamisados de Oaxaca|Huevos al comal con queso fresco|Huevos con longaniza|Huevos en salsa de chile ancho|Huevos con ejotes|Huevos con chaya|Entomatadas de queso|Enchiladas potosinas|Gorditas de migajas|Gorditas de maíz con chicharrón|Tacos al vapor de adobo rojo|Tlacoyos de requesón|Memelas poblanas|Torta de tamal verde|Tamales de rajas con queso|Tamales de dulce con pasas|Tamalitos de chipilín|Quesadillas de quelites|Quesadillas de papa con chorizo|Sopes de pollo|Panuchos yucatecos de pollo|Panuchos de huevo estilo Yucatán|Enfrijoladas con huevo|Enchiladas de mole con huevo|Migas norteñas con huevo|Burritos de frijol y queso|Tacos de canasta de frijol|Tacos de huevo ahogado en salsa roja|Tortitas de papa con queso|Chilaquiles con mole|Torta de huevo a la mexicana|Tacos de huevo con papa|Chalupas poblanas|Enfrijoladas de plátano macho|Tostadas de frijol con queso|Enchiladas de frijol con queso|Tacos de chicharrón en salsa verde|Tacos de nopales con huevo|Quesadillas de champiñones|Molletes de pico de gallo|Molletes de frijol y queso|Pan blanco con mermelada de fresa|Pan blanco con Nutella y plátano|Huevos con frijoles|Quesadillas de frijol|Avena con plátano|Tortilla con huevo y papa|Tostadas de frijoles|Pan francés con azúcar|Frijoles de olla con queso'.split('|'),
  Comida: 'Mole verde de pollo|Bistec ranchero|Picadillo mexicano|Albóndigas en chipotle|Carne en su jugo casera|Chile relleno de queso|Pollo en salsa pasilla|Pollo en adobo rojo|Pollo en pipián rojo|Enchiladas de mole poblano|Mole de olla con verduras|Caldo de pollo con verduras y arroz|Caldo de res con verduras|Pescado en salsa de chile ancho|Pescado a la talla casero|Camarones a la diabla|Pescado empapelado con verduras|Tortitas de camarón con nopales|Mixiotes de cerdo con nopales|Birria de res en olla|Carne asada con cebollitas|Huachinango veracruzano|Cerdo en salsa verde con verdolagas|Costillas de cerdo en adobo|Pollo con calabacitas y elote|Tamal de cazuela de pollo|Chile colorado con carne de res|Puchero mexicano de pollo|Albóndigas de res en caldillo|Bistec a la mexicana|Chilorio sinaloense|Discada norteña casera|Pollo en salsa de cacahuate|Tinga de res|Pescado en salsa de jitomate|Tacos de pescado estilo Baja|Cochinita de pollo|Romeritos con papas y mole|Tacos de lengua en salsa verde|Carne de puerco con chile pasilla|Pollo hervido con arroz|Pollo guisado con papa|Lentejas con verduras|Sopa de lentejas con papa|Carne de puerco con papa|Arroz con huevo|Frijoles de olla con verduras|Pescado blanco con tomate|Pollo con frijoles|Carne de res con lentejas'.split('|'),
  Cena: 'Tortas ahogadas de carnitas|Enchiladas suizas de pollo|Tacos dorados de pollo|Tacos al pastor caseros|Tacos de bistec con nopales|Tostadas de tinga de champiñones|Sopes de tinga|Empanaditas de flor de calabaza y queso|Sincronizadas de jamón y queso|Pambazos de tinga de pollo|Tostadas de atún a la mexicana|Ensalada de nopales con queso|Tostadas de picadillo|Torta de milanesa mexicana|Tacos campechanos|Tacos de suadero en casa|Tacos de canasta de adobo|Carne en salsa roja con tortillas|Papadzules yucatecos|Garnachas veracruzanas|Tacos dorados de pollo con crema|Tacos de requesón con epazote|Tostadas de tinga de res|Tacos de frijol con queso|Enchiladas de queso en salsa roja|Tacos de pollo al comal|Flautas de res con lechuga|Torta de pierna adobada|Chiles rellenos de picadillo|Tacos de pescado con col|Sopes de frijol con nopales|Tacos de rajas con crema|Quesadillas de requesón|Tostadas de pollo con aguacate|Tacos de cerdo en salsa verde|Enfrijoladas de pollo|Entomatadas de requesón|Tacos de bistec a la mexicana|Tortitas de atún con arroz|Tacos de calabacitas con queso|Sincronizadas de frijol y queso|Sándwich de pollo|Sándwich de huevo|Tacos de papa hervida|Tacos de pollo hervido|Tortitas de lentejas|Pan blanco con huevo|Molletes de mermelada|Quesadillas de papa|Tostadas de pollo'.split('|'),
  Entrada: 'Salsa borracha de chile pasilla|Salsa macha de cacahuate|Salsa taquera de jitomate|Pico de gallo con aguacate|Elote callejero con queso|Chiles toreados con limón|Ceviche de pescado estilo Acapulco|Aguachile de mango y camarón|Cóctel de camarón mexicano|Tostaditas de tinga|Frijoles puercos para botanear|Queso fundido con chorizo|Rajas poblanas con crema|Sopa de fideo seco|Sopa de frijol con tortilla|Sopa de lentejas mexicana|Caldo de camarón sencillo|Ensalada de jícama y naranja|Tostadas de ceviche de soya|Empanaditas de queso|Tamalitos de elote salados|Empanadas de plátano macho con frijol|Tostadas de pata en vinagreta|Salpicón de res para tostadas|Ensalada de aguacate y jitomate|Cacahuates enchilados caseros|Pepinos con chile y limón|Jícama con chile piquín|Elotes en vaso con epazote|Flores de calabaza rellenas de queso|Tacos dorados de papa para compartir|Totopos con frijoles y queso|Chicharrón en salsa verde|Salsa de molcajete roja|Salsa de molcajete verde|Tostadas de frijol y nopales|Calabacitas rellenas de queso|Ceviche de soya con jitomate|Papas cambray al chile|Esquites con epazote y limón|Palomitas caseras|Sopa de papa|Lentejas caldosas|Papas cocidas con cilantro|Frijoles de olla|Pan blanco con ajo|Tostadas de lentejas|Ensalada de arroz y elote|Huevos cocidos con salsa|Cacahuates con limón'.split('|'),
  Postre: 'Arroz con leche y canela|Capirotada tradicional|Flan napolitano casero|Jericalla de Guadalajara|Pan de elote mexicano|Buñuelos con piloncillo|Manzanas al horno con piloncillo|Cocadas de coco|Palanquetas de pepita|Muéganos de feria|Dulce de leche con nuez|Empanadas dulces de guayaba|Churros con azúcar y canela|Empanadas de piña|Gelatina mosaico|Pastel tres leches|Natilla de vainilla y canela|Puerquitos de piloncillo|Camote poblano en dulce|Torrejas con miel de piloncillo|Coyotas sonorenses de piloncillo|Dulce de leche cortada|Nieve de limón casera|Dulce de papaya verde|Ate de membrillo|Gorditas dulces de maíz|Empanadas de calabaza|Pan de muerto sencillo|Rosca de reyes casera|Galletas de boda mexicanas|Flan de cajeta|Pastel de elote con leche|Cacahuates garapiñados|Dulce de tejocote|Dulce de camote con naranja|Cocadas de leche y coco|Tamal dulce de piña|Buñuelos de rodilla con piloncillo|Torta de cielo yucateca|Chongos zamoranos caseros|Gelatina de fresa|Gelatina de limón|Gelatina de uva|Gelatina de piña|Gelatina de naranja|Gelatina de cereza|Pan blanco con Nutella|Pan con mermelada de fresa|Pan con mermelada de durazno|Pan con mermelada de zarzamora'.split('|'),
  Acompañamiento: 'Arroz blanco con elote|Arroz verde con cilantro|Arroz con frijol negro|Arroz poblano cremoso|Frijoles charros caseros|Frijoles bayos refritos|Frijoles negros de olla|Nopales con huevo en salsa roja|Rajas de poblano con cebolla|Chayotes rellenos de queso|Papas doradas con ajo y cilantro|Cebollitas al limón y orégano|Verdolagas con frijoles de olla|Salsa de chile morita|Frijoles negros con hoja de aguacate|Plátanos machos al horno con canela|Tortillas de maíz azul a mano|Ensalada de jícama pepino y naranja|Papas con rajas y crema|Calabacitas con elote|Arroz rojo con zanahoria|Arroz con tomate y ajo|Papas en escabeche|Puré de papa con chile poblano|Nopales a la mexicana|Ensalada de col con limón|Ensalada de pepino y jitomate|Elotes hervidos con limón|Tortillas de maíz hechas a mano|Salsa de aguacate para tacos|Pico de gallo para guarnición|Zanahorias en escabeche|Cebollas moradas encurtidas|Chiles jalapeños en escabeche|Frijoles negros con queso|Lentejas guisadas con verduras|Papas doradas al comal|Calabaza de Castilla al vapor|Ensalada de nopales sencilla|Chayote con jitomate y cebolla|Lentejas con zanahoria|Arroz con verduras|Frijoles de olla con cebolla|Papas hervidas con perejil|Papas fritas caseras|Elote con limón|Frijoles refritos|Arroz con cilantro|Pan blanco tostado|Tortillas de harina calientes'.split('|'),
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
  const nombreEn = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-MX');
  const recetasEconomicas: [RegExp, string[]][] = [
    [/pan(?: blanco)? con mermelada/, ['Pan blanco=2 rebanadas', nombreEn.includes('fresa') ? 'Mermelada de fresa=2 cucharadas' : nombreEn.includes('durazno') ? 'Mermelada de durazno=2 cucharadas' : nombreEn.includes('zarzamora') ? 'Mermelada de zarzamora=2 cucharadas' : 'Mermelada de piña=2 cucharadas']],
    [/pan blanco con nutella/, ['Pan blanco=2 rebanadas', 'Nutella=2 cucharadas', 'Plátano=1 pieza']],
    [/pambazo/, ['Pambazo=4 piezas', 'Pollo=300 g', 'Papa=2 piezas', 'Chiles en lata=1/2 taza', 'Lechuga=1 taza', 'Queso fresco=1/2 taza']],
    [/molletes/, ['Bolillo=2 piezas', 'Frijoles=1 taza', 'Queso=1/2 taza', 'Jitomate=1 pieza', 'Cebolla=1/4 pieza']],
    [/huevos con frijoles/, ['Huevo=4 piezas', 'Frijoles=1 taza', 'Cebolla=1/4 pieza', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/quesadillas? de frijol|sincronizadas de frijol/, ['Tortillas de maíz=4 piezas', 'Frijoles=1 taza', 'Queso=1/2 taza', 'Aceite=1 cucharadita']],
    [/avena con platano/, ['Avena=1/2 taza', 'Leche=1 taza', 'Plátano=1 pieza', 'Canela=1 pizca']],
    [/tortilla con huevo y papa|tacos? de papa hervida|quesadillas? de papa/, ['Papa=2 piezas', 'Huevo=2 piezas', 'Tortillas de maíz=4 piezas', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/tostadas? de frijoles?|frijoles de olla|frijoles refritos/, ['Frijoles=1 taza', 'Tortillas de maíz=4 piezas', 'Cebolla=1/4 pieza', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/pan frances/, ['Pan blanco=4 rebanadas', 'Huevo=2 piezas', 'Leche=1/2 taza', 'Azúcar=1 cucharada', 'Aceite=1 cucharadita']],
    [/frijoles de olla con verduras/, ['Frijoles=1 taza', 'Zanahoria=1 pieza', 'Calabacita=1 pieza', 'Cebolla=1/4 pieza', 'Agua=2 tazas', 'Sal=al gusto']],
    [/frijoles de olla con cebolla/, ['Frijoles=1 taza', 'Cebolla=1/4 pieza', 'Agua=2 tazas', 'Sal=al gusto']],
    [/lentejas?/, ['Lentejas=1 taza', 'Papa=1 pieza', 'Zanahoria=1 pieza', 'Jitomate=2 piezas', 'Cebolla=1/4 pieza', 'Agua=4 tazas', 'Sal=al gusto']],
    [/pollo hervido con arroz|pollo con arroz/, ['Pollo=500 g', 'Arroz=1 taza', 'Agua=4 tazas', 'Cebolla=1/4 pieza', 'Ajo=1 diente', 'Sal=al gusto']],
    [/pollo guisado con papa|pollo con frijoles|pollo con papas?/, ['Pollo=500 g', 'Papa=2 piezas', 'Jitomate=2 piezas', 'Cebolla=1/4 pieza', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/carne de puerco con papa/, ['Carne de puerco=400 g', 'Papa=2 piezas', 'Jitomate=2 piezas', 'Cebolla=1/4 pieza', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/arroz con huevo/, ['Arroz=1 taza', 'Huevo=2 piezas', 'Jitomate=1 pieza', 'Cebolla=1/4 pieza', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/pescado blanco/, ['Pescado blanco=500 g', 'Tomate=2 piezas', 'Cebolla=1/4 pieza', 'Cilantro=2 cucharadas', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/carne de res con lentejas/, ['Carne de res=300 g', 'Lentejas=1 taza', 'Zanahoria=1 pieza', 'Cebolla=1/4 pieza', 'Agua=4 tazas', 'Sal=al gusto']],
    [/sandwich de pollo/, ['Pan blanco=4 rebanadas', 'Pollo=250 g', 'Jitomate=1 pieza', 'Lechuga=4 hojas', 'Mayonesa=2 cucharadas']],
    [/sandwich de huevo|pan blanco con huevo/, ['Pan blanco=4 rebanadas', 'Huevo=2 piezas', 'Jitomate=1 pieza', 'Aceite=1 cucharadita', 'Sal=al gusto']],
    [/tacos? de pollo hervido|tostadas? de pollo/, ['Pollo=400 g', 'Tortillas de maíz=6 piezas', 'Jitomate=2 piezas', 'Cebolla=1/4 pieza', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/tortitas de lentejas/, ['Lentejas=1 taza', 'Huevo=1 pieza', 'Harina de trigo=2 cucharadas', 'Aceite=2 cucharadas', 'Sal=al gusto']],
    [/palomitas/, ['Maíz palomero=1/2 taza', 'Aceite=1 cucharada', 'Sal=al gusto']],
    [/sopa de papa|papas cocidas|papas hervidas/, ['Papa=3 piezas', 'Agua=4 tazas', 'Cebolla=1/4 pieza', 'Cilantro=2 cucharadas', 'Sal=al gusto']],
    [/papas fritas|papas doradas/, ['Papa=3 piezas', 'Aceite=3 cucharadas', 'Sal=al gusto', 'Perejil=1 cucharada']],
    [/pan blanco con ajo|pan blanco tostado/, ['Pan blanco=4 rebanadas', 'Ajo=1 diente', 'Aceite=1 cucharada', 'Perejil=1 cucharada']],
    [/ensalada de arroz y elote/, ['Arroz=1 taza', 'Grano de elote=1 taza', 'Zanahoria=1 pieza', 'Mayonesa=2 cucharadas', 'Sal=al gusto']],
    [/huevos cocidos/, ['Huevo=4 piezas', 'Chiles en lata=2 piezas', 'Jitomate=2 piezas', 'Cebolla=1/4 pieza', 'Sal=al gusto']],
    [/gelatina de (fresa|limon|uva|pina|naranja|cereza|mango)/, ['Gelatina de sabor=1 paquete', 'Agua=4 tazas']],
    [/platano con miel/, ['Plátano=2 piezas', 'Miel=2 cucharadas', 'Canela=1 pizca']],
    [/arroz con cilantro/, ['Arroz=1 taza', 'Cilantro=1/2 taza', 'Cebolla=1/4 pieza', 'Ajo=1 diente', 'Aceite=1 cucharada', 'Agua=2 tazas']],
    [/tortillas de harina calientes/, ['Tortillas de harina=8 piezas']],
    [/elote con limon/, ['Elote=2 piezas', 'Limón=1 pieza', 'Sal=al gusto']],
    [/cena|quesadillas? de queso/, ['Tortillas de maíz=4 piezas', 'Queso=1/2 taza', 'Aceite=1 cucharadita']],
  ];
  const saborGelatina = nombreEn.match(/gelatina de (fresa|limon|uva|pina|naranja|cereza|mango)/)?.[1];
  const saboresGelatina: Record<string, string> = { limon: 'limón', pina: 'piña' };
  const datos = saborGelatina
    ? [`Gelatina de ${saboresGelatina[saborGelatina] ?? saborGelatina}=1 paquete`, 'Agua=4 tazas']
    : recetasEconomicas.find(([patron]) => patron.test(nombreEn))?.[1] ?? semillas[clave] ?? semillas.casa;
  const extras: string[] = [];
  if (nombreEn.includes('chorizo')) extras.push('Chorizo=150 g');
  if (nombreEn.includes('nopal')) extras.push('Nopales=3 piezas');
  if (nombreEn.includes('champin')) extras.push('Champiñones=250 g');
  if (nombreEn.includes('flor de calabaza')) extras.push('Flor de calabaza=2 tazas');
  if (nombreEn.includes('papa')) extras.push('Papa=2 piezas');
  if (nombreEn.includes('elote')) extras.push('Granos de elote=1 taza');
  if (nombreEn.includes('camaron')) extras.push('Camarón seco=1 taza');
  if (nombreEn.includes('calabaza') || nombreEn.includes('calabacita')) extras.push('Calabacita=2 piezas');
  if (nombreEn.includes('mole')) extras.push('Pasta de mole=1/2 taza');
  const todo = [...extras, ...datos].reduce((mapa, item) => mapa.set(item.split('=')[0].toLocaleLowerCase('es-MX'), item), new Map<string, string>());
  return [...todo.values()].slice(0, 6).map((item) => {
    const [nombreIngrediente, cantidad] = item.split('=');
    const categoriaIngrediente = /jitomate|cebolla|ajo|papa|nopal|calabacita|elote|lechuga|verdura/i.test(nombreIngrediente) ? 'Verduras'
      : /queso|leche|mantequilla/i.test(nombreIngrediente) ? 'Lácteos'
      : /pollo|res|cerdo|puerco|pescado|camarón|huevo|chorizo/i.test(nombreIngrediente) ? 'Proteínas'
      : /tortilla|pambazo|bolillo|pan blanco|harina|arroz|masa|ma[ií]z|avena/i.test(nombreIngrediente) ? 'Cereales'
      : /frijol|lenteja/i.test(nombreIngrediente) ? 'Leguminosas'
      : /chile|salsa/i.test(nombreIngrediente) ? 'Chiles'
      : /cilantro|perejil|epazote|canela/i.test(nombreIngrediente) ? 'Hierbas y especias'
      : /gelatina/i.test(nombreIngrediente) ? 'Postres' : 'Despensa';
    return { nombre: nombreIngrediente, cantidad, categoria: categoriaIngrediente };
  });
};

const preparar = (categoria: CategoriaComida, nombre: string, ingredientes: IngredienteReceta[]): string[] => {
  const nombreNormalizado = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-MX');
  const otros = ingredientes.slice(3, 6).map((item) => item.nombre).join(', ');
  const tiene = (expresion: RegExp) => ingredientes.some((item) => expresion.test(item.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-MX')));
  if (/gelatina de/.test(nombreNormalizado)) {
    return [
      'Calienta una taza de agua hasta que hierva. Apaga la estufa y disuelve por completo el paquete de gelatina, mezclando para que no queden grumos.',
      'Agrega tres tazas de agua fría y vuelve a mezclar. Vierte la gelatina en un molde limpio.',
      'Refrigera de 3 a 4 horas, hasta que cuaje por completo. No la dejes fuera del refrigerador mientras se enfría.',
      'Desmolda con cuidado y sirve fría. Para porciones individuales, reparte la mezcla en vasos antes de refrigerar.',
    ];
  }
  if (categoria === 'Postre' && /pan blanco|mermelada|nutella|platano con miel/.test(nombreNormalizado)) return [
    'Lava y corta el plátano si aparece en los ingredientes. Tuesta el pan en un comal seco a fuego bajo si lo quieres crujiente.',
    'Unta la mermelada o Nutella sobre el pan ya tostado; agrega el plátano o la miel cuando estén incluidos.',
    'Sirve de inmediato. Esta receta no necesita horno ni freírse.',
  ];
  if (nombreNormalizado.includes('pan frances')) return [
    'Bate el huevo con la leche y el azúcar en un plato hondo. Remoja cada rebanada de pan por ambos lados sin dejar que se deshaga.',
    'Calienta una sartén con un poco de aceite a fuego medio. Dora el pan de 2 a 3 minutos por lado hasta que el huevo quede cocido.',
    'Sirve caliente. Limpia la sartén entre tandas si el azúcar se empieza a quemar.',
  ];
  if (nombreNormalizado.includes('palomitas')) return [
    'Calienta el aceite en una olla amplia con tapa. Agrega dos granos de maíz palomero y espera a que revienten para saber que el aceite está listo.',
    'Añade el resto del maíz en una sola capa, tapa la olla y muévela suavemente cada pocos segundos para que no se queme.',
    'Cuando pasen varios segundos entre cada estallido, apaga el fuego. Espera a que deje de reventar y agrega sal al gusto.',
  ];
  if (nombreNormalizado.includes('papas fritas')) return [
    'Lava, pela y corta las papas en tiras del mismo tamaño. Sécalas muy bien con una toalla limpia para evitar salpicaduras.',
    'Fríe las tiras en tandas pequeñas en aceite caliente, de 6 a 8 minutos, hasta que estén doradas y cocidas por dentro. Retíralas con una espumadera.',
    'Escurre sobre papel absorbente y agrega sal y perejil. No dejes el aceite sin vigilancia.',
  ];
  if (tiene(/lenteja/)) return [
    'Enjuaga las lentejas y retira piedritas. Pela y pica la papa, la zanahoria, el jitomate y la cebolla en trozos pequeños.',
    'Pon las lentejas en una olla con el agua y cocina a fuego medio de 20 a 25 minutos; deben empezar a suavizarse antes de agregar las verduras.',
    'Añade las verduras y sal. Tapa y cocina de 15 a 20 minutos más, hasta que las lentejas y la papa estén suaves; agrega agua si hace falta.',
    'Prueba la sal y sirve caliente. Si la receta lleva carne, cuécela por separado hasta que esté bien cocida antes de agregarla.',
  ];
  if (/frijoles.* de olla/.test(nombreNormalizado)) return [
    'Enjuaga los frijoles secos y retira piedritas. Si puedes, déjalos en remojo cubiertos con agua desde la noche anterior; después escurre esa agua.',
    'Pon los frijoles en una olla, cúbrelos con agua limpia por unos 5 cm y llévalos a hervor. Baja el fuego, tapa parcialmente y cuece de 1 hora y media a 2 horas, hasta que estén suaves; agrega agua si hace falta.',
    'Agrega sal y las verduras de la receta cuando los frijoles ya estén suaves. Cocina de 10 a 15 minutos más. En olla de presión, sigue sus indicaciones y revisa que no quede presión antes de abrir.',
    'Sirve los frijoles con un poco de su caldo de cocción. Refrigera las sobras dentro de las siguientes dos horas.',
  ];
  if (/frijoles .*refritos/.test(nombreNormalizado)) return [
    'Si los frijoles están secos, enjuágalos, remójalos y cuécelos en agua hasta que estén suaves; también puedes usar frijoles ya cocidos.',
    'Calienta una cucharada de aceite en una sartén. Agrega los frijoles cocidos y machácalos mientras los calientas a fuego medio.',
    'Añade poco a poco agua de cocción hasta que queden cremosos. Cocina de 5 a 8 minutos, moviendo para que no se peguen; prueba y ajusta la sal.',
    'Sirve caliente como guarnición o relleno. Si aparecen tortillas o queso en la lista, acompaña con ellos.',
  ];
  if (/huevos cocidos/.test(nombreNormalizado)) return [
    'Coloca los huevos en una olla y cúbrelos con agua fría. Lleva a hervor a fuego medio.',
    'Cuando el agua hierva, cuenta 10 a 12 minutos. Retira la olla del fuego y pasa los huevos a un recipiente con agua fría.',
    'Pela los huevos cuando se puedan tocar y córtalos por la mitad. Sirve con la salsa y las verduras de la receta.',
  ];
  if (/arroz con huevo/.test(nombreNormalizado)) return [
    'Enjuaga el arroz hasta que el agua salga casi clara. Sofríe cebolla y jitomate en una olla con aceite, agrega el arroz y mezcla un minuto.',
    'Añade dos tazas de agua por cada taza de arroz y una pizca de sal. Tapa y cuece a fuego bajo de 15 a 18 minutos, hasta que el agua se absorba.',
    'Aparte, bate los huevos y cocínalos en una sartén con un poco de aceite, revolviendo hasta que estén firmes y completamente cocidos.',
    'Mezcla el huevo con el arroz ya cocido y sirve caliente.',
  ];
  if (categoria === 'Postre') return [
    'Mide los ingredientes. Lava, pela y corta la fruta si corresponde; deja preparado un molde o una olla limpia.',
    'Mezcla los ingredientes secos y aromáticos. Bate el huevo con la leche o los ingredientes húmedos y agrega poco a poco la mezcla seca para evitar grumos.',
    'Cocina a fuego bajo, moviendo para que no se pegue; si se trata de un pan o pastel, hornea en horno precalentado a 180 °C hasta que el centro esté firme.',
    'Retira del fuego y deja enfriar antes de cortar. Añade canela o fruta solo si aparece en los ingredientes y refrigera las porciones sobrantes.',
  ];
  const pasosPrevios: string[] = [];
  if (tiene(/pollo/)) {
    pasosPrevios.push(/frito|milanesa/.test(nombreNormalizado)
      ? 'Corta el pollo en piezas parejas y fríelo en una sartén con aceite a fuego medio, de 6 a 8 minutos por lado, hasta que esté dorado y completamente cocido por dentro.'
      : /al comal|a la plancha|a la talla/.test(nombreNormalizado)
        ? 'Cocina el pollo en un comal o sartén caliente con un poco de aceite, de 6 a 8 minutos por lado, hasta que el centro esté completamente cocido; córtalo en tiras.'
        : 'Cuece el pollo en una olla con agua y sal durante 20 a 25 minutos, hasta que esté completamente cocido. Déjalo entibiar y deshébralo; conserva un poco del agua de cocción.');
  }
  if (tiene(/carne de res|carne de puerco|carne de cerdo/)) {
    pasosPrevios.push(/asada|bistec|taco|discada|campechano|suadero|frito/.test(nombreNormalizado)
      ? 'Corta la carne en tiras delgadas. Cocínala en una sartén caliente con un poco de aceite, moviendo hasta que esté dorada y completamente cocida; no la sirvas cruda al centro.'
      : 'Corta la carne en trozos pequeños y cuécela en una olla con agua y sal a fuego bajo hasta que esté suave y completamente cocida; para res calcula de 60 a 90 minutos y para puerco de 45 a 60 minutos.');
  }
  if (tiene(/pescado/)) {
    pasosPrevios.push('Seca el pescado y cocínalo en una sartén con un poco de aceite, de 3 a 5 minutos por lado según el grosor, hasta que esté opaco y se desmenuce fácilmente.');
  }
  if (tiene(/\bpapa\b/)) {
    pasosPrevios.push(/frit|dorad/.test(nombreNormalizado)
      ? 'Pela y corta la papa. Hiérvela de 12 a 18 minutos hasta que esté suave, escúrrela y, si la receta lleva papas doradas o fritas, dóralas en aceite caliente hasta que la superficie quede crujiente.'
      : 'Pela y corta la papa en cubos. Hiérvela en agua con sal de 12 a 18 minutos, hasta que puedas atravesarla fácilmente con un tenedor; escúrrela antes de guisarla.');
  }
  if (tiene(/frijol/) && /refrito/.test(nombreNormalizado)) {
    pasosPrevios.push('Calienta una cucharadita de aceite en una sartén, agrega los frijoles cocidos y machácalos mientras se calientan; añade una cucharada de agua si quedan muy secos.');
  } else if (tiene(/frijol/)) {
    pasosPrevios.push('Si usas frijoles secos, enjuágalos y cuécelos en agua hasta que estén suaves; para ahorrar tiempo, también puedes usar frijoles ya cocidos.');
  }
  if (/taco|torta|tostada|sope|quesadilla|enchilada|entomatada|enfrijolada|gordita|tlacoyo|memela|panucho|salbute|pambazo|flauta|garnacha|papadzul|mollete|chalupa|totopo|sandwich/.test(nombreNormalizado)) return [
    ...pasosPrevios,
    'Lava y pica las verduras. Cocina por separado el relleno y escurre el exceso de líquido para que no se rompan las tortillas o el pan.',
    'Sofríe cebolla, ajo y jitomate cuando estén en la lista. Incorpora ' + (otros || 'el relleno') + ' y cocina hasta que esté caliente; el pollo y la carne deben quedar completamente cocidos.',
    'Calienta las tortillas, el pan o las tostadas. Rellena cada pieza; si lleva queso, déjala en el comal hasta que se funda. Para tacos dorados o flautas, fríelos en aceite caliente hasta que estén crujientes.',
    'Sirve enseguida con las salsas y verduras que aparecen en la lista. Ajusta el chile al gusto y añade crema o limón solo si se incluyen.',
  ];
  return [
    ...pasosPrevios,
    'Lava y corta las verduras de la receta si aparecen en la lista. Mide los demás ingredientes antes de encender la estufa.',
    'Calienta una olla o sartén a fuego medio. Sofríe cebolla y ajo si están en la lista; incorpora jitomate o chile y cocina hasta que se suavicen.',
    'Agrega ' + (otros || 'los ingredientes restantes') + ' y el agua que se indica. Tapa y cocina a fuego bajo hasta que las verduras estén tiernas y cualquier carne esté completamente cocida; revisa el líquido y mueve de vez en cuando.',
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
    const coccionLenta = (categoria === 'Comida' && /birria|barbacoa|mole de olla|puchero|caldo/.test(nombre.toLocaleLowerCase('es-MX')))
      || (categoria === 'Acompañamiento' && /frijoles.*de olla/i.test(nombre));
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
