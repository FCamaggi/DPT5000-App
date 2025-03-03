## **1. Frontend-Only (Sin Backend)**

Aplicaciones que no requieren un backend propio. Usan servicios externos para datos y lógica.

### **Tecnologías Explicadas:**

#### **Frontend:**

1. **React**

   - **Tipo**: Biblioteca de JavaScript.
   - **Qué es**: Herramienta para construir interfaces de usuario (UI) mediante componentes reutilizables.
   - **Para qué sirve**: Crear SPAs (Single-Page Applications) dinámicas y escalables.
   - **Ejemplo de uso**: Redes sociales, dashboards interactivos.

2. **Vue.js**

   - **Tipo**: Framework progresivo de JavaScript.
   - **Qué es**: Alternativa a React, enfocada en simplicidad y flexibilidad.
   - **Para qué sirve**: Apps con integración gradual (puede usarse solo en partes de un proyecto).
   - **Ejemplo de uso**: Tiendas pequeñas, herramientas de gestión.

3. **SvelteKit**

   - **Tipo**: Framework fullstack (SSR, SSG, SPA).
   - **Qué es**: Compila componentes en JavaScript vanilla para optimizar rendimiento.
   - **Para qué sirve**: Aplicaciones estáticas o dinámicas con carga rápida.
   - **Ejemplo de uso**: Blogs, portfolios, landing pages.

4. **Next.js**

   - **Tipo**: Framework de React.
   - **Qué es**: Permite Server-Side Rendering (SSR) y Static Site Generation (SSG).
   - **Para qué sirve**: Proyectos que requieren SEO y rendimiento híbrido (estático + dinámico).
   - **Ejemplo de uso**: Sitios de e-commerce, blogs técnicos.

5. **Gatsby**
   - **Tipo**: Framework estático basado en React.
   - **Qué es**: Genera sitios web ultra-rápidos usando GraphQL para obtener datos.
   - **Para qué sirve**: Blogs, sitios de marketing, documentación técnica.

---

#### **Base de Datos/Backend como Servicio (BaaS):**

1. **Supabase**

   - **Tipo**: BaaS (Backend as a Service).
   - **Qué es**: Alternativa open-source a Firebase, con PostgreSQL integrado.
   - **Para qué sirve**: Apps que necesitan base de datos relacional + autenticación/APIs automáticas.
   - **Ejemplo de uso**: Apps sociales, herramientas colaborativas.

2. **Firebase**

   - **Tipo**: Plataforma de Google (BaaS).
   - **Qué es**: Servicios en la nube como Firestore (NoSQL), Auth y Functions.
   - **Para qué sirve**: Prototipos rápidos o apps con datos en tiempo real (ej: chats).

3. **Strapi**
   - **Tipo**: CMS Headless (Sistema de gestión de contenido).
   - **Qué es**: Backend auto-hosteable para crear y administrar contenido vía API.
   - **Para qué sirve**: Blogs, sitios corporativos, e-commerce.

---

#### **Herramientas de Deploy:**

1. **Netlify**

   - **Tipo**: Plataforma de deploy para estáticos.
   - **Qué es**: Automatiza el despliegue de sitios estáticos y funciones serverless.
   - **Ejemplo de uso**: Portfolios, sitios generados con Gatsby o Next.js.

2. **Vercel**
   - **Tipo**: Plataforma para deploy de frontends y Serverless Functions.
   - **Qué es**: Especializado en Next.js, con integración de SSR y edge computing.
   - **Ejemplo de uso**: Aplicaciones con rendimiento prioritario (ej: SaaS).

---

## **2. Fullstack Clásico (Frontend + Backend + BD)**

Aplicaciones con backend propio, usando Node.js y PostgreSQL.

### **Tecnologías Explicadas:**

#### **Backend:**

1. **Node.js**

   - **Tipo**: Entorno de ejecución de JavaScript.
   - **Qué es**: Permite correr JavaScript en el servidor.
   - **Para qué sirve**: Construir APIs escalables y aplicaciones en tiempo real.

2. **Express.js**

   - **Tipo**: Framework de Node.js.
   - **Qué es**: Minimalista y flexible para crear APIs REST o servidores web.
   - **Ejemplo de uso**: Backend de marketplaces, herramientas de gestión.

3. **NestJS**
   - **Tipo**: Framework de Node.js con arquitectura MVC.
   - **Qué es**: Usa TypeScript y se inspira en Angular para estructura modular.
   - **Para qué sirve**: Proyectos empresariales que requieren escalabilidad y orden.

---

#### **Bases de Datos:**

1. **PostgreSQL**

   - **Tipo**: Base de datos relacional (SQL).
   - **Qué es**: Sistema robusto y compatible con ACID.
   - **Para qué sirve**: Apps que manejan transacciones complejas (ej: fintech, reservas).

2. **Prisma**

   - **Tipo**: ORM (Mapeo Objeto-Relacional).
   - **Qué es**: Convierte tablas SQL en objetos de código para facilitar consultas.
   - **Ejemplo de uso**: Evitar escribir SQL manual en Node.js.

3. **Sequelize**
   - **Tipo**: ORM alternativo para Node.js.
   - **Qué es**: Similar a Prisma, pero con soporte para múltiples bases de datos SQL.

---

#### **Herramientas de Deploy:**

1. **Render**

   - **Tipo**: Plataforma cloud para backend y bases de datos.
   - **Qué es**: Simplifica el deploy de Node.js y PostgreSQL con integración Git.

2. **Heroku**

   - **Tipo**: Plataforma como servicio (PaaS).
   - **Qué es**: Popular para deployar apps fullstack con soporte para add-ons (ej: PostgreSQL).

3. **Docker**
   - **Tipo**: Contenedores de software.
   - **Qué es**: Empaqueta aplicaciones para garantizar consistencia entre entornos.
   - **Ejemplo de uso**: Deploy en AWS ECS o Kubernetes.

---

## **3. Serverless/JAMstack**

Arquitectura que combina frontend estático con funciones serverless.

### **Tecnologías Explicadas:**

1. **AWS Lambda**

   - **Tipo**: Servicio de funciones serverless.
   - **Qué es**: Ejecuta código en respuesta a eventos sin gestionar servidores.
   - **Ejemplo de uso**: Procesamiento de pagos, APIs bajo demanda.

2. **Vercel Serverless Functions**

   - **Tipo**: Funciones serverless integradas con Vercel.
   - **Qué es**: Permite escribir backend en Node.js/Python/Go junto al frontend.

3. **PlanetScale**
   - **Tipo**: Base de datos MySQL serverless.
   - **Qué es**: Compatible con Prisma y enfocada en escalabilidad horizontal.

---

## **4. PostgreSQL vs Alternativas**

### **PostgreSQL**

- **Fortalezas**: Transacciones complejas, JSONB para datos semiestructurados.
- **Débilidades**: Mayor consumo de recursos vs SQLite.

### **Alternativas:**

- **MongoDB**: Ideal para datos no estructurados (ej: apps de IoT).
- **SQLite**: Base de datos embebida en un solo archivo (ej: apps móviles).
- **Firestore**: NoSQL con sincronización en tiempo real (ej: apps de chat).

---

## **5. Recomendaciones por Tipo de Proyecto**

### **Para MVP (Prototipo Rápido):**

- **Tecnologías**: SvelteKit + Supabase + Vercel.
- **Razón**: Supabase ofrece auth y base de datos sin configurar servidores.

### **Para Aplicaciones Empresariales:**

- **Tecnologías**: Next.js (SSR) + NestJS + PostgreSQL (Docker en AWS).
- **Razón**: Escalabilidad, seguridad y mantenibilidad a largo plazo.

### **Para Aplicaciones en Tiempo Real:**

- **Tecnologías**: React + Firebase (Firestore) + Netlify.
- **Razón**: Firestore maneja actualizaciones instantáneas (ej: notificaciones).
