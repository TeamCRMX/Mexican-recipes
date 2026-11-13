const normalizarTexto = (valor: string) => valor
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es-MX')
  .replace(/\s+/g, ' ')
  .trim();

/** Agrupa nombres equivalentes para que el selector use palabras cotidianas. */
export const nombreIngredienteGeneral = (nombre: string) => {
  const n = normalizarTexto(nombre);

  if (/^agua\b/.test(n) && !/^agua de (?:coco|jamaica|horchata|tamarindo|limon|fruta)/.test(n)) return 'Agua';
  if (/^(?:asiento o )?manteca(?: de (?:cerdo|puerco)| vegetal)?$/.test(n)) return 'Manteca';
  if (/frijol/.test(n)) return 'Frijoles';
  if (/^(?:huevo|clara de huevo(?: pasteurizada)?|yema de huevo)$/.test(n)) return 'Huevo';
  if (/^chicharron(?: prensado)?$/.test(n)) return 'Chicharrón';
  if (/pollo/.test(n) && !/(caldo|consome|sazonador|concentrado)/.test(n)) return 'Pollo';
  if (/(cerdo|puerco|carnitas)/.test(n) && !/(chicharron|chorizo|tocino|manteca)/.test(n)) return 'Carne de puerco';
  if (/(\bres\b|bistec|tasajo)/.test(n) && !/(caldo|tuetano)/.test(n)) return 'Carne de res';
  if (/^pavo\b/.test(n)) return 'Pavo';
  if (/^(?:(?:filete de )?(?:pescado blanco|huachinango)(?: muy fresco)?|pescado blanco muy fresco|filete de huachinango o pescado blanco)$/.test(n)) return 'Pescado blanco';
  if (/^(?:filete de )?pescado(?: blanco)?(?: muy fresco)?$/.test(n)) return 'Pescado blanco';

  if (/^azucar(?: blanca| morena)?$/.test(n) || /^azucar o piloncillo$/.test(n) || /^azucar o miel$/.test(n)) return 'Azúcar';
  if (/^piloncillo$/.test(n)) return 'Piloncillo';
  if (/^(?:miel de maiz|miel)$/.test(n)) return 'Miel';
  if (/^(?:fecula de maiz|maicena)$/.test(n)) return 'Maicena';
  if (/^tomate verde$/.test(n)) return 'Tomate';
  if (/^(?:jugo de limon|ralladura de limon|lima)$/.test(n)) return 'Limón';
  if (/^cascara de naranja$/.test(n)) return 'Naranja';
  if (/^(?:salsa de )?chile de arbol$/.test(n)) return 'Chile de árbol';
  if (/^(?:salsa verde|chiles en lata)$/.test(n)) return 'Chiles en lata';
  if (/^setas?$/.test(n)) return 'Champiñones';
  if (/^caldo de frijol$/.test(n)) return 'Frijoles';
  if (/^totopos?(?: de maiz)?$/.test(n)) return 'Tortillas de maíz';
  if (/^(?:birote(?: salado)?|bolillo(?: del dia anterior| suave)?)$/.test(n) || /^bolillos$/.test(n)) return 'Bolillo';
  if (/^pambazos?$/.test(n)) return 'Pambazo';
  if (/^pambazo o bolillo suave$/.test(n)) return 'Pambazo';
  if (/^(?:tlayuda|tlayuda o tortilla grande|tortilla grande|tortilla de maiz pequena)$/.test(n)) return 'Tortillas de maíz';
  if (/^tortillas?(?: de maiz(?: azul| pequenas?)?)?$/.test(n)) return 'Tortillas de maíz';
  if (/^tortillas? de harina(?: grandes?)?$/.test(n)) return 'Tortillas de harina';
  if (/^granos? de elote(?: tierno)?$/.test(n)) return 'Grano de elote';
  if (/^elotes? enteros?$/.test(n)) return 'Elote';
  if (/^habas secas?$/.test(n)) return 'Habas';
  if (/^hojas? de platano$/.test(n)) return 'Hoja de plátano';
  if (/^jengibre fresco$/.test(n)) return 'Jengibre';
  if (/^mango maduro$/.test(n)) return 'Mango';
  if (/^nopales? limpios?$/.test(n)) return 'Nopal';
  if (/^platanos? machos?(?: maduros?)?$/.test(n)) return 'Plátano macho';
  if (/^calabaza(?: de castilla| cocida)?$/.test(n)) return 'Calabaza';
  if (/^papas?$/.test(n)) return 'Papa';
  if (/^arroz blanco$/.test(n)) return 'Arroz';
  if (/^amaranto inflado$/.test(n)) return 'Amaranto';
  if (/^ajonjoli tostado$/.test(n)) return 'Ajonjolí';
  if (/^cacahuate(?: tostado| sin sal)?$/.test(n)) return 'Cacahuate';
  if (/^clavo molido$/.test(n)) return 'Clavo';
  if (/^chocolate de mesa$/.test(n)) return 'Chocolate en barra';
  if (/^chocolate en polvo$/.test(n)) return 'Chocolate en polvo';
  if (/^chocolate en barra$/.test(n)) return 'Chocolate en barra';
  if (/^(?:cafe soluble o espresso|cafe o fruta del sabor elegido)$/.test(n)) return 'Café';
  if (/^aceite(?:\s+.*)?$/.test(n)) return 'Aceite';
  if (/^cebolla(?:\s+(?:blanca|morada|roja|amarilla))?$/.test(n)) return 'Cebolla';
  if (/^ajonjoli(?: tostado)?$/.test(n)) return 'Ajonjolí';
  if (/^amaranto(?: inflado)?$/.test(n)) return 'Amaranto';
  if (/^nopal(?:es)?(?: limpio(?:s)?)?$/.test(n)) return 'Nopal';
  if (/^calabaza(?: cocida)?$/.test(n)) return 'Calabaza';
  if (/^papas?$/.test(n)) return 'Papa';
  if (/^arroz(?: blanco)?$/.test(n)) return 'Arroz';
  if (/^mango(?: maduro)?$/.test(n)) return 'Mango';
  if (/^platanos? machos?(?: maduros?)?$/.test(n)) return 'Plátano macho';
  if (/^jengibre(?: fresco)?$/.test(n)) return 'Jengibre';
  if (/^cacahuate(?: tostado| sin sal)?$/.test(n)) return 'Cacahuate';

  const saborMermelada = n.match(/^mermelada de (fresa|durazno|pina|zarzamora|chabacano|chabacana)$/);
  if (saborMermelada) {
    const sabor = saborMermelada[1] === 'chabacana' ? 'chabacano' : saborMermelada[1] === 'pina' ? 'piña' : saborMermelada[1];
    return `Mermelada de ${sabor}`;
  }
  if (/^vinagre de manzana$/.test(n)) return 'Vinagre de manzana';
  if (/^vinagre blanco$/.test(n)) return 'Vinagre blanco';
  if (/^vinagre(?:\s+.*)?$/.test(n)) return 'Vinagre';
  if (/^canela en raja$/.test(n)) return 'Canela';

  return nombre.trim()
    .replace(/\s+(?:del dia anterior|muy fresco|finamente picado|picados?|picadas?|cortados?|cortadas?|rebanados?|rebanadas?|rallados?|ralladas?|pelados?|peladas?|desvenados?|desvenadas?|sin semillas|sin cascara|sin piel|sin sal|tostado|inflado|maduro|madura|cocido|cocida|limpio|limpia|fresco|fresca|entero|entera|molido|molida|deshebrado|deshebrada|asado|asada|en cubos|en tiras|pequenas?|grandes?)$/i, '')
    .trim();
};

export const claveIngredienteGeneral = (nombre: string) => normalizarTexto(nombreIngredienteGeneral(nombre));
