const normalizarTexto = (valor: string) => valor
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es-MX')
  .trim();

export const nombreIngredienteGeneral = (nombre: string) => {
  const normalizado = normalizarTexto(nombre);

  if (/^agua(?:\s+(?:potable|natural|fria|caliente|tibia|templada|hirviendo)|\s+para\b.*)?$/.test(normalizado)) {
    return 'Agua';
  }
  if (/^(?:asiento o )?manteca(?: de cerdo| vegetal)?$/.test(normalizado)) {
    return 'Manteca';
  }
  if (normalizado.includes('frijol') && !normalizado.includes('caldo de frijol')) {
    return 'Frijoles';
  }
  if (normalizado.includes('pollo') && !/(caldo|consome|sazonador|concentrado)/.test(normalizado)) {
    return 'Pollo';
  }
  if (/(cerdo|puerco)/.test(normalizado) && !/(chicharron|chorizo|tocino|manteca)/.test(normalizado)) {
    return 'Carne de puerco';
  }
  if (/(\bres\b|bistec|tasajo)/.test(normalizado) && !/(caldo|tuetano)/.test(normalizado)) {
    return 'Carne de res';
  }
  if (/^cebolla(?:\s+(?:blanca|morada|roja|amarilla))?$/.test(normalizado)) {
    return 'Cebolla';
  }

  return nombre.trim();
};

export const claveIngredienteGeneral = (nombre: string) => normalizarTexto(nombreIngredienteGeneral(nombre));
