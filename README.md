# Jodit Merge Fields Editor

[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/jhondennis/mergefield-plugin-jodit)
[![Demo](https://img.shields.io/badge/Demo-Live-green?logo=vercel)](https://mergefield-plugin-jodit.pages.dev)

Este proyecto implementa un editor de texto enriquecido (Jodit) con soporte para "Merge Fields" (campos de combinación) interactivos.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/jhondennis/mergefield-plugin-jodit.git
   ```

2. Instala las dependencias:
   ```bash
   bun install
   ```

## Ejecutar Demo

Para iniciar el servidor de desarrollo local:

```bash
bun run dev
```

El servidor iniciará en `http://localhost:5173`.

## Funcionalidades Principales

1. **Inserción de Campos**: Permite insertar variables como `{{nombre_cliente}}` mediante un menú o autocompletado `{`.
2. **Visualización Interactiva**: Los campos se renderizan como "chips" visuales dentro del editor, mejorando la experiencia de usuario.
3. **Gestión de Datos**:
   - **Carga desde API (Simulada)**: Transforma texto plano guardado en base de datos (ej: `Hola {{nombre}}`) a contenido visual HTML.
   - **Guardado a API (Simulada)**: Limpia el HTML visual y guarda solo los placeholders textuales en la base de datos.
4. **Validación de Integridad**: Evita que los usuarios rompan la estructura de las variables al editarlas.

## Uso del Plugin

### Componentes Clave

- **`EditorPlugin`**: Componente wrapper del editor Jodit.
- **`renderMergeFields(text)`**: Función que convierte texto plano con variables `{{...}}` a HTML con chips visuales.
- **`extractPlaceholders(html)`**: Función que limpia el HTML del editor para devolver texto plano con variables `{{...}}`.

### Flujo de Datos

El flujo recomendado (implementado en `App.tsx`) es:

1. **Recibir datos (Backend -> Frontend)**:

   ```typescript
   // El backend envía: "Hola {{nombre}}"
   const visualContent = renderMergeFields(backendData);
   // El editor muestra: "Hola [nombre]" (chip visual)
   ```

2. **Editar**: El usuario interactúa con los chips.

3. **Enviar datos (Frontend -> Backend)**:
   ```typescript
   // El editor tiene HTML complejo
   const plainData = extractPlaceholders(editorContent);
   // Se envía al backend: "Hola {{nombre}}"
   ```

## Estilos

Los estilos de los chips se pueden personalizar en `src/editor/merge-fields.css`. Actualmente usan un diseño minimalista con variables CSS.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
