import type { CategoriaReceta } from './recetas';

export type BebidaAcompanamiento = {
  id: string;
  nombre: string;
  descripcion: string;
  emoji: string;
  categorias: CategoriaReceta[];
};

const TODAS_LAS_CATEGORIAS: CategoriaReceta[] = [
  'Desayuno',
  'Comida',
  'Cena',
  'Entrada',
  'Postre',
  'Acompañamiento',
];

export const BEBIDAS_ACOMPANAMIENTO: BebidaAcompanamiento[] = [
  {
    id: 'agua-natural',
    nombre: 'Agua natural',
    descripcion: 'Una opción fresca y ligera para cualquier platillo.',
    emoji: '💧',
    categorias: TODAS_LAS_CATEGORIAS,
  },
  {
    id: 'agua-jamaica',
    nombre: 'Agua de jamaica',
    descripcion: 'Infusión fría de jamaica, ideal para comidas con chile o salsa.',
    emoji: '🌺',
    categorias: ['Comida', 'Cena', 'Entrada', 'Acompañamiento'],
  },
  {
    id: 'horchata',
    nombre: 'Agua de horchata',
    descripcion: 'Bebida de arroz con canela, suave para equilibrar sabores intensos.',
    emoji: '🥛',
    categorias: ['Comida', 'Cena', 'Postre'],
  },
  {
    id: 'refresco',
    nombre: 'Refresco de cola o sabor',
    descripcion: 'Una alternativa fría para acompañar tacos, antojitos y platillos fuertes.',
    emoji: '🥤',
    categorias: ['Comida', 'Cena'],
  },
  {
    id: 'cafe-de-olla',
    nombre: 'Café de olla',
    descripcion: 'Café con canela y piloncillo, clásico para el desayuno o el postre.',
    emoji: '☕',
    categorias: ['Desayuno', 'Postre'],
  },
  {
    id: 'chocolate-caliente',
    nombre: 'Chocolate caliente',
    descripcion: 'Bebida de cacao reconfortante para desayunos y panes dulces.',
    emoji: '🍫',
    categorias: ['Desayuno', 'Postre'],
  },
  {
    id: 'agua-limon',
    nombre: 'Agua de limón',
    descripcion: 'Agua fresca cítrica, sencilla y refrescante.',
    emoji: '🍋',
    categorias: ['Comida', 'Cena', 'Entrada', 'Acompañamiento'],
  },
  {
    id: 'agua-tamarindo',
    nombre: 'Agua de tamarindo',
    descripcion: 'Agua fresca agridulce que acompaña muy bien antojitos mexicanos.',
    emoji: '🧉',
    categorias: ['Comida', 'Cena', 'Entrada', 'Acompañamiento'],
  },
];

export const obtenerBebidasParaAcompanamiento = (categoria: CategoriaReceta) =>
  BEBIDAS_ACOMPANAMIENTO.filter((bebida) => bebida.categorias.includes(categoria));
