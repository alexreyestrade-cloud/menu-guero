# Imágenes de productos

Guarda aquí las fotos de los platillos para mostrarlas en las cards del menú.

## Cómo agregar una foto a un producto

1. **Guarda la imagen** en esta carpeta (`/public/images/`).
   - Nombre sugerido: `[id]-[nombre].jpg`
   - Ejemplo: `1-asada.jpg`, `5-cochinita.jpg`
   - Formato recomendado: JPG o WebP, mínimo 600×400 px.

2. **Agrega la ruta** al item en `lib/menu.ts`:

```ts
{ id: 1, nombre: 'Asada', precio: 17, disponible: true, imagen: '/images/1-asada.jpg' }
```

3. El cambio se refleja automáticamente en el menú.

---

Las cards funcionan bien **con y sin foto** — si no hay imagen se muestra
un placeholder elegante con el emoji de la categoría.
