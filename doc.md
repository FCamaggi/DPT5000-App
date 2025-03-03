# Documento de Diseño: DPT5000 App

## 1. Overview

Aplicación web estática para:

1. Visualizar PDFs de rutinas de ejercicio con sistema de coloración
2. Calculadora de porcentajes PR con múltiples escalas

**Tecnologías:**

- SvelteKit (compilado como sitio estático)
- TypeScript para type safety
- TailwindCSS para estilos
- PDF.js para visualización de PDFs
- Motion One para animaciones
- DaisyUI para componentes UI
- Vitest para testing

**Diseño:** UI/UX minimalista y responsive
**Hosting:** Netlify  
**Persistencia:** Archivos estáticos en sistema de archivos

## 2. Requerimientos Funcionales

### 2.1. Módulo PDF Viewer

- Listado de PDFs desde carpeta `/public/pdfs`
- Cada PDF debe mostrar:
  - Título del archivo (sin extensión)
  - Identificador de color generado de alguna forma arbitraria (borde o cabecera)
- Visualización embebida del PDF en el navegador con soporte para uso en mobiles
- Vista modal para visualización completa

### 2.2. Calculadora PR

- Campos de entrada:
  - Peso levantado (kg)
  - Repeticiones realizadas
  - Selector de escala (Epley, Brzycki, Lombardi, O'Conner)
- Fórmulas:
  - Epley: `PR = peso * (1 + 0.0333 * reps)`
  - Brzycki: `PR = peso * (36 / (37 - reps))`
  - Lombardi: `PR = peso * reps^0.1`
  - O'Conner: `PR = peso * (1 + 0.025 * reps)`
- Resultado actualizable en tiempo real

## 3. Especificaciones Técnicas

### 3.1. Estructura de Archivos

```
/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── PDFViewer.svelte
│   │   │   ├── Calculator.svelte
│   │   │   ├── ColoredCard.svelte
│   │   │   └── Modal.svelte
│   │   ├── utils/
│   │   │   ├── formulas.ts
│   │   │   └── pdfUtils.ts
│   │   └── types/
│   │       └── index.ts
│   ├── routes/
│   │   ├── +page.svelte
│   │   └── +layout.svelte
│   └── app.html
├── static/
│   └── pdfs/
├── public/
│   └── pdfs.json
├── tests/
│   ├── calculator.test.ts
│   └── pdfUtils.test.ts
├── tailwind.config.js
├── svelte.config.js
└── vite.config.ts
```

### 3.2. PDF Metadata

Archivo `pdfs.json`:

```json
{
  "pdfs": [
    {
      "title": "Biseries",
      "filename": "Biseries  .pdf",
      "slug": "biseries",
      "color": "#4299E1",
      "category": "general"
    }
  ]
}
```

### 3.3. PDF Rendering

Implementación con PDF.js:

```typescript
import { pdfjs } from 'pdfjs-dist';

export class PDFRenderer {
  async renderPage(url: string, pageNum: number): Promise<HTMLCanvasElement> {
    const pdf = await pdfjs.getDocument(url).promise;
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    return canvas;
  }
}
```

### 3.4. Calculadora

Implementación de fórmulas en TypeScript:

```typescript
interface Formula {
  (weight: number, reps: number): number;
}

interface Formulas {
  [key: string]: Formula;
}

const formulas: Formulas = {
  epley: (weight: number, reps: number): number => weight * (1 + 0.0333 * reps),
  brzycki: (weight: number, reps: number): number =>
    weight * (36 / (37 - reps)),
  lombardi: (weight: number, reps: number): number =>
    weight * Math.pow(reps, 0.1),
  oconner: (weight: number, reps: number): number =>
    weight * (1 + 0.025 * reps),
};
```

## 4. UI/UX Design

### 4.1. Layout

Seccion pdf es la pagina principal y la seccion calculadora se abre al hacer click en el boton de calculadora fixed e la pantalla y se abre como sidebar

- Sección PDFs:
  - Grid de tarjetas (1 columna móvil, 2 tablet, 3 desktop)
  - Cada tarjeta muestra título y color
  - Modal para visualización completa
  - Animaciones suaves con Motion One
- Sección Calculadora:
  - Inputs agrupados en tarjeta
  - Selector de escala estilo dropdown
  - Resultado en tarjeta destacada
  - Validación de inputs en tiempo real

### 4.2. Estilos

- Paleta de colores usando TailwindCSS:
  - Background: #121212 (bg-neutral-900)
  - Surface: #1e1e1e (bg-neutral-800)
  - Primary: #00ff9d (custom color)
  - Text: #ffffff (text-white)
  - Text Secondary: #b3b3b3 (text-neutral-400)
- Tipografía: Inter (mejor legibilidad que Roboto)
- Efectos hover y focus con TailwindCSS
- Diseño mobile-first con breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 5. Desarrollo

### 5.1. Setup Inicial

1. Clonar repositorio
2. Instalar dependencias:
   ```bash
   pnpm install
   ```
3. Iniciar servidor de desarrollo:
   ```bash
   pnpm dev
   ```
4. Añadir PDFs en `static/pdfs/`
5. Actualizar `pdfs.json` con metadatos

### 5.2. Scripts Disponibles

- `pnpm dev`: Inicia servidor de desarrollo con Vite
- `pnpm build`: Construye la aplicación para producción
- `pnpm preview`: Vista previa de la build de producción
- `pnpm test`: Ejecuta tests con Vitest
- `pnpm check`: Verifica tipos de TypeScript
- `pnpm generate-pdf-metadata`: Genera metadata de PDFs

### 5.3. Despliegue

1. Generar build de producción:
   ```bash
   pnpm build && pnpm generate-pdf-metadata
   ```
2. Configurar Netlify:
   - Build command: `pnpm build`
   - Publish directory: `build`
   - Environment variables:
     - `NODE_VERSION`: 18

## 6. Consideraciones Futuras

- Añadir más escalas de cálculo
- Sistema de categorías para PDFs
- Modo oscuro automático con CSS variables
- Descarga directa de PDFs con progress bar
- Service Worker para funcionamiento offline
- Posibilidad de ordenar PDFs con drag-and-drop
- Búsqueda y filtrado de PDFs con Fuse.js
- Historiales de PR con LocalStorage
- Exportación de datos en CSV
