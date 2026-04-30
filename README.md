# Taquería El Güero — Menú Digital

Menú digital tipo vitrina (sin carrito) para **Taquería El Güero**, Palenque Chiapas.
Construido con Next.js 14, TypeScript y Tailwind CSS. Desplegado en Vercel.

## Vista previa

- Menú público con animaciones (Ken Burns, fade-in, shimmer dorado)
- Cards con foto real, variantes y precios por tamaño
- Botón flotante de WhatsApp
- Información de contacto, redes y dirección
- Panel de administración con CRUD *(próximamente — Supabase)*

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Tipado |
| Tailwind CSS | Estilos y animaciones |
| Supabase (próximo) | Base de datos del menú |
| Vercel | Deploy |
| Google Fonts | Playfair Display + Oswald |

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Crea un archivo `.env.local` en la raíz (no se sube al repo):

```env
# Supabase (próximo — panel de admin)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx

# Contraseña del panel de admin
ADMIN_PASSWORD=tu_contraseña_segura
```

## Deploy en Vercel

```bash
npm i -g vercel
vercel --prod
```

O conecta el repositorio desde [vercel.com](https://vercel.com) para deploy automático en cada push a `main`.

## Estructura del proyecto

```
menu-guero/
├── app/
│   ├── layout.tsx        # Fuentes Google, metadata
│   ├── page.tsx          # Página principal
│   └── globals.css       # Variables, animaciones, utilidades
├── components/
│   ├── CartelHero.tsx    # Hero con cartel + info bar (FB, contacto)
│   ├── CategoryTabs.tsx  # Tabs sticky con scroll activo
│   ├── MenuSection.tsx   # Sección por categoría con fade-in
│   ├── ProductCard.tsx   # Card con foto/placeholder, variantes, precios
│   ├── Divider.tsx       # Divisor ornamental SVG
│   ├── WhatsAppButton.tsx# Botón flotante de WhatsApp
│   └── Footer.tsx        # Pie de página
├── lib/
│   └── menu.ts           # Fuente de verdad temporal (migrar a Supabase)
└── public/
    ├── logo.jpeg
    ├── cartel.jpeg
    └── images/           # Fotos de productos
```

## Editar el menú

Mientras no esté el panel admin, edita `lib/menu.ts`.

### Cambiar precio
```ts
precio: 20   // era 17
```

### Agregar variante
```ts
variantes: ['Asada', 'Tripa', 'Nueva variante']
```

### Agregar foto a un producto
1. Guarda la imagen en `public/images/nombre.jpg`
2. Agrega `imagen: '/images/nombre.jpg'` al item

### Marcar como no disponible
```ts
disponible: false
```

## Contacto y datos del negocio

| Dato | Valor |
|---|---|
| Teléfono | 916 100 85 79 |
| WhatsApp | wa.me/529161008579 |
| Facebook | facebook.com/TaqueriaElGuero |
| Dirección | Blvd. Bonampak, Col. Maya Lacanhá, Palenque, Chiapas |
| Horario | Lun – Dom · 6:00 PM – 12:00 AM |
