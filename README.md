# Calculadora PR y Visor de PDFs

Una aplicación web moderna desarrollada con SvelteKit y TypeScript para calcular PR (Personal Record) en ejercicios de pesas y consultar guías de entrenamiento en PDF.

## Características

- Calculadora de PR con múltiples fórmulas:
  - Epley
  - Brzycki
  - Lombardi
  - O'Conner
- Visor de PDFs integrado con PDF.js
- Interfaz responsive y accesible con TailwindCSS + DaisyUI
- Animaciones suaves con Motion One
- Modo claro/oscuro automático
- TypeScript para type safety
- Tests unitarios con Vitest

## Requisitos

- Node.js >= 18
- pnpm >= 8.0

## Instalación

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
cd pesas-app-basico
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## Comandos disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Compila la aplicación para producción
- `pnpm preview` - Previsualiza la versión de producción
- `pnpm check` - Ejecuta las verificaciones de TypeScript
- `pnpm test` - Ejecuta tests con Vitest
- `pnpm generate-pdf-metadata` - Genera metadata de PDFs

## Estructura del proyecto

```
/
├── src/
│   ├── lib/
│   │   ├── components/    # Componentes Svelte
│   │   ├── utils/         # Utilidades y helpers
│   │   └── types/         # Tipos TypeScript
│   ├── routes/            # Páginas de la aplicación
│   └── app.html          # Template HTML principal
├── static/
│   └── pdfs/             # Archivos PDF de guías
├── public/
│   └── pdfs.json         # Metadatos de los PDFs
├── tests/                # Tests unitarios
├── tailwind.config.js    # Configuración de TailwindCSS
├── svelte.config.js      # Configuración de SvelteKit
└── vite.config.ts        # Configuración de Vite
```

## Uso

1. **Calculadora PR**:

   - Ingresa el peso levantado
   - Ingresa el número de repeticiones
   - Selecciona la fórmula de cálculo
   - El PR estimado se calcula automáticamente en tiempo real

2. **Visor de PDFs**:
   - Navega por las guías disponibles en el grid responsive
   - Los PDFs se colorean automáticamente para fácil identificación
   - Haz clic en una guía para verla en pantalla completa
   - Usa Esc o el botón de cerrar para volver
   - Interfaz optimizada para dispositivos móviles

## Tecnologías principales

- **SvelteKit**: Framework para generar el sitio estático
- **TypeScript**: Tipado estático para mejor mantenibilidad
- **TailwindCSS + DaisyUI**: Estilos y componentes UI
- **PDF.js**: Visualización de PDFs en el navegador
- **Motion One**: Animaciones fluidas
- **Vitest**: Framework de testing
- **pnpm**: Gestor de paquetes rápido y eficiente

## Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

Asegúrate de:

- Seguir el estilo de código existente
- Añadir tests para nuevas funcionalidades
- Actualizar la documentación según corresponda

## Licencia

MIT
