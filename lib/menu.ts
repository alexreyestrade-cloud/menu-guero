// ─────────────────────────────────────────────────────────────
//  FUENTE DE VERDAD DEL MENÚ — lib/menu.ts
//
//  CÓMO AGREGAR/EDITAR PRODUCTOS:
//    1. Agrega un nuevo objeto al array `items` de la categoría.
//    2. El `id` debe ser único en todo el menú.
//    3. precio: número en pesos MXN, o null si no está definido.
//    4. descripcion: texto corto que se muestra bajo el nombre.
//    5. Para agregar foto: guarda en /public/images/ y escribe
//       imagen: '/images/[id]-[nombre].jpg' en el item.
//
//  CÓMO MARCAR NO DISPONIBLE: disponible: false
// ─────────────────────────────────────────────────────────────

export interface MenuItem {
  id: number
  nombre: string
  precio: number | null
  precios?: { label: string; valor: number }[]  // múltiples tamaños/precios
  descripcion?: string
  imagen?: string
  marca?: 'cocacola' | 'manzanita' | 'horchata' | 'jamaica'  // activa placeholder branded
  variantes?: string[]   // lista de opciones/sabores que se muestran como chips en la card
  disponible: boolean
}

export interface MenuCategory {
  id: string
  nombre: string
  emoji: string
  imagen?: string   // banner opcional encima del grid de la sección
  items: MenuItem[]
}

export const menuData: MenuCategory[] = [
  {
    id: 'tacos',
    nombre: 'Tacos',
    emoji: '🌮',
    items: [
      {
        id: 1,
        nombre: 'Tacos',
        precio: 17,
        imagen: '/images/tacos.jpg',
        variantes: ['Asada', 'Tripa', 'Adobada', 'Cuerito', 'Cochinita', 'Longaniza'],
        disponible: true,
      },
    ],
  },
  {
    id: 'tortas',
    nombre: 'Tortas',
    emoji: '🥪',
    items: [
      {
        id: 7,
        nombre: 'Torta',
        precio: null,
        descripcion: 'Pan telera relleno con tu proteína favorita, frijoles, crema, queso y vegetales frescos al gusto.',
        imagen: '/images/7-torta.jpg',
        variantes: ['Asada', 'Adobada', 'Cochinita', 'Longaniza'],
        disponible: true,
      },
    ],
  },
  {
    id: 'quesadillas',
    nombre: 'Quesadillas',
    emoji: '🫓',
    items: [
      {
        id: 8,
        nombre: 'Quesadilla',
        precio: null,
        descripcion: 'Tortilla de maíz rellena de queso fundido y tu elección de ingrediente. Dorada al comal.',
        imagen: '/images/8-quesadilla.jpg',
        variantes: ['Asada', 'Adobada', 'Tripa', 'Combinada'],
        disponible: true,
      },
    ],
  },
  {
    id: 'aguas',
    nombre: 'Aguas & Refrescos',
    emoji: '🥤',
    items: [
      {
        id: 9,
        nombre: 'Aguas',
        precio: null,
        precios: [
          { label: 'Litro', valor: 45 },
          { label: 'Medio', valor: 25 },
        ],
        imagen: '/images/aguas.png',
        variantes: ['Horchata', 'Jamaica'],
        disponible: true,
      },
      {
        id: 11,
        nombre: 'Refrescos',
        precio: 30,
        imagen: '/images/manzana.png',
        variantes: ['Coca-Cola', 'Manzanita Sol'],
        disponible: true,
      },
    ],
  },
]
