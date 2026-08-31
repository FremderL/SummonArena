# Summon Arena - Development Log

## Ultimo Cambio: Eliminar Sidebar y Reorganizar Layout (2026-04-09)

### Problema
- El aside#sidebar contenia elementos de lobby que se mostaban en todas las vistas
- Los elementos se veian apretados en pantallas pequenas
- El usuario queria eliminar completamente el sidebar

### Solucion
1. **Eliminado `#app-shell` grid de 2 columnas**
   - Cambiado a contenedor simple de una sola columna
   - Contenido centrado con max-width de 1400px

2. **Sidebar eliminado del HTML**
   - Todo el contenido del sidebar movido a `#home-welcome` dentro de `#summon-screen`
   - Solo visible en la vista "Inicio"

3. **Layout responsive con breakpoints**
   - **> 1100px**: 3 columnas (brand, lobby, stats)
   - **768-1100px**: 2 columnas (brand ocupa 2 columnas, centrado)
   - **< 768px**: 1 columna (mobile), lobby sube al inicio
   - **< 480px**: 1 columna compacta, descripcion del brand ocultada
   - **< 600px**: Navegacion compacta con tabs mas pequenos

### Archivos Modificados
- `client/index.html`: Sidebar eliminado, contenido movido a `#home-welcome`
- `client/style.css`: `#app-shell` simplificado, estilos para `#home-welcome`

### Estilos Clave
```css
#app-shell {
  min-height: 100vh;
  padding: 16px 20px;
}

#home-welcome {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
  align-items: start;
}
```

---

## Fix: Imagenes de Criaturas Desincronizadas (2026-04-09)

### Problema
- Servidor y cliente tenian criaturas con imagenes incorrectas
- `server/data/creatures.js` contenia criaturas comentadas y otras con imagenes reutilizadas
- `client/gacha.js` no coincidia con el servidor en estructura de datos

### Solucion
- Sincronizado `server/data/creatures.js` con `client/gacha.js`
- Ambas listas ahora tienen 22 criaturas con imagenes unicas
- Agregados campos `archetype`, `race`, `legacy` a todas las criaturas

### Nota
- Los datos de coleccion guardados localmente pueden contener imagenes incorrectas
- Limpiar localStorage o abrir en modo incognito para regenerar

---

## Cambios Preteriores (Resumen Rapido)

### Sistema de Linaje Completo
- **Fragmentos de Divinidad**: 10% probabilidad al derrotar apostoles
- **Habilidades de Linaje**: Unicas por raza/legado, uso unico por combate
- **UI de Fragmentos**: Nueva pestana en Coleccion
- **Integracion en combate**: Boton "Linaje" dorado en panel de acciones

### Arreglos
- Fix: `btn-toggle-cosmetics` no existia - ahora es condicional
- Fix: `ui-overlay-backdrop` no existia - ahora es condicional

---

## Estructura de Vistas (Book Layout)

| Seccion | Pestanas |
|---------|----------|
| Perfil | Resumen, Criatura, Progreso PvE, Botin, Cosmeticos |
| Historia del Mundo | Panteon, Cronicas, Bestiario, Compendio |
| Tienda | Recursos, Articulos, Hitos |
| Inventario | Consumibles, Reliquias, Estandartes, Cosmeticos |
| Coleccion | Eternidad, Cartas Eternas, Fragmentos, Cartas Encontradas |
