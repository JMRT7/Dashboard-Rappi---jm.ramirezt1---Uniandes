# 📊 Rappi Store Availability Dashboard

> Dashboard interactivo para el análisis de disponibilidad de tiendas en la red Rappi, con visualizaciones en tiempo real, métricas KPI y asistente de IA integrado.

**Autor:** Juan Manuel Ramírez Tamayo  
**Institución:** Universidad de los Andes — Ingeniería de Sistemas y Computación  
**Período analizado:** Febrero 01–11, 2026 · 7,240 registros · Intervalo de 5 minutos  
**Demo en Google AI Studio:** [🔗 Abrir aplicación](https://ai.studio/apps/aa15b349-bdf0-4abe-a3f6-7db522b38ce4)

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Métricas y KPIs](#métricas-y-kpis)
- [Análisis de Datos](#análisis-de-datos)
- [ChatBot Analista](#chatbot-analista)
- [Internacionalización](#internacionalización)
- [Conclusiones](#conclusiones)

---

## 📌 Descripción General

El **Rappi Store Availability Dashboard** es una herramienta de monitoreo y análisis que visualiza la disponibilidad de tiendas online en la plataforma Rappi durante un período de 11 días consecutivos. El sistema procesa 7,240 registros capturados en intervalos de 5 minutos, permitiendo explorar patrones horarios, tendencias diarias y KPIs operacionales clave.

El dashboard fue desarrollado como parte de un proyecto académico en la **Universidad de los Andes** y combina visualización de datos interactiva con un asistente de inteligencia artificial capaz de responder preguntas en lenguaje natural sobre los datos.

---

## ✨ Funcionalidades

### 📈 Panel de KPIs Interactivo
Cuatro tarjetas de métricas principales que filtran dinámicamente todos los gráficos al hacer clic:

| KPI | Valor | Descripción |
|-----|-------|-------------|
| Tiendas Promedio | **27.2k** | Promedio global durante los 11 días |
| Pico Histórico | **98.1k** | Máximo absoluto registrado en el período |
| Disponibilidad | **99.92%** | Uptime ponderado por tiempo |
| Mediana | **30.5k** | Percentil 50 (p50) del período |

### 🕐 Control de Rango Temporal
- Slider de doble punta para explorar subperíodos específicos
- Recalcula todos los KPIs y gráficos en tiempo real
- Rango completo disponible: Feb 01 06:10 → Feb 11 08:00

### 📊 Visualizaciones

- **Serie de Tiempo:** Gráfica principal con tiendas online por intervalo de 5 minutos, mostrando valor máximo, mínimo y promedio móvil.
- **Promedio Diario:** Gráfica de barras con el promedio de tiendas activas por día. La barra de mayor valor se resalta en naranja intenso.
- **Rango Mín–Máx:** Banda sombreada que muestra la variación diaria entre el valor mínimo y máximo, con la línea de promedio superpuesta.
- **Tabla de Métricas Diarias:** Tabla detallada con mínimo, promedio, máximo y barra de tendencia visual para cada uno de los 11 días.

### 🌗 Modo Claro / Oscuro
- Tema switchable con persistencia en `localStorage`
- Optimizado para ambos modos visuales
- Transiciones animadas entre temas

### 🌐 Soporte Multilenguaje
Interfaz completamente traducida con cambio dinámico sin recarga de página:
- 🇪🇸 Español
- 🇺🇸 English
- 🇧🇷 Português

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Rol en el Proyecto |
|------------|---------|-------------------|
| React + TypeScript | 19 / 5.8 | Framework principal de UI con tipado estático |
| Vite | 6.2 | Bundler ultra-rápido y servidor de desarrollo |
| Recharts | 3.8 | Gráficas interactivas de series de tiempo y barras |
| Tailwind CSS | 4.1 | Sistema de estilos utilitarios y diseño responsivo |
| Motion (Framer) | 12.23 | Animaciones fluidas y transiciones de interfaz |
| Gemini API | 1.29 | Motor del ChatBot analista en lenguaje natural |
| Lucide React | 0.546 | Biblioteca de iconografía del sistema de diseño |

---

## 🚀 Instalación

### Prerrequisitos

- Node.js `>= 18.x`
- npm `>= 9.x` o yarn `>= 1.22.x`
- Clave de API de Google Gemini (para el ChatBot)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd rappi-store-availability-dashboard

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y añadir tu clave de Gemini API:
# VITE_GEMINI_API_KEY=tu_clave_aqui

# 4. Iniciar servidor de desarrollo
npm run dev
```

### Build para producción

```bash
npm run build
npm run preview
```

---

## 💻 Uso

### Navegación principal

1. **Barra superior:** Muestra el rango de fechas activo y el total de registros cargados. Desde aquí puedes cambiar el idioma y alternar entre modo claro/oscuro.

2. **Control de datos (slider):** Arrastra los extremos del slider para delimitar el subperíodo de análisis. Todos los gráficos y KPIs se actualizan automáticamente.

3. **Tarjetas KPI:** Haz clic en cualquier tarjeta (Promedio, Pico, Disponibilidad, Mediana) para filtrar y resaltar esa métrica en los gráficos.

4. **Gráficas:**
   - Pasa el cursor sobre la serie de tiempo para ver valores exactos en cada punto.
   - La gráfica de barras resalta automáticamente el día con mayor promedio.
   - La banda Mín–Máx permite identificar días con alta variabilidad.

5. **Tabla de métricas:** Consulta el resumen día a día con la columna `vs Media` que indica cuánto se desvió cada jornada del promedio global.

6. **ChatBot:** Escribe cualquier pregunta en lenguaje natural sobre los datos. Consulta la sección [ChatBot Analista](#chatbot-analista) para ejemplos de uso.

---

## 🗂️ Estructura del Proyecto

```
rappi-store-availability-dashboard/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── KPICards/          # Tarjetas de métricas principales
│   │   ├── TimeSeriesChart/   # Gráfica de serie de tiempo
│   │   ├── DailyBarChart/     # Gráfica de promedio diario
│   │   ├── MinMaxChart/       # Gráfica de rango mín-máx
│   │   ├── MetricsTable/      # Tabla de métricas por día
│   │   ├── RangeSlider/       # Control de rango temporal
│   │   └── ChatBot/           # Asistente de IA
│   ├── hooks/
│   │   ├── useTheme.ts        # Lógica de modo claro/oscuro
│   │   ├── useLanguage.ts     # Lógica de internacionalización
│   │   └── useDataFilter.ts   # Lógica de filtrado por rango
│   ├── i18n/
│   │   ├── es.ts              # Traducciones en español
│   │   ├── en.ts              # Traducciones en inglés
│   │   └── pt.ts              # Traducciones en portugués
│   ├── data/
│   │   └── storeAvailability.ts  # Dataset procesado (7,240 registros)
│   ├── types/
│   │   └── index.ts           # Tipos TypeScript compartidos
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 📊 Métricas y KPIs

### Indicadores Clave de Desempeño (Feb 01–11, 2026)

```
Tiendas Promedio ........... 27,200  (promedio global · 11 días)
Pico Histórico ............. 98,100  (máximo absoluto registrado)
Disponibilidad ............. 99.92%  (ponderado por tiempo)
Mediana (p50) .............. 30,500  (percentil 50 del período)
```

### Tabla de Métricas por Día

| Fecha | Promedio | Mínimo | Máximo | vs Media |
|-------|----------|--------|--------|----------|
| 01 Feb | 25,465 | 37 | 93,618 | -1.8k |
| 02 Feb | 25,570 | 28 | 97,058 | -1.7k |
| 03 Feb | 27,538 | 0 | 93,888 | +0.3k |
| 04 Feb | 28,366 | 0 | 98,021 | +1.1k |
| 05 Feb | 26,451 | 0 | 98,093 | -0.8k |
| 06 Feb | 28,079 | 0 | 96,213 | +0.9k |
| 07 Feb | 25,918 | 155 | 93,236 | -1.3k |
| 08 Feb | 28,540 | 101 | 97,912 | +1.3k |
| 09 Feb | 27,665 | 22 | 76,967 | +0.4k |
| 10 Feb | 25,266 | 0 | 83,222 | -2.0k |
| 11 Feb | **30,630** | 82 | 97,166 | **+3.4k** |

> 💡 El **11 de febrero** registró el mayor promedio diario del período con 30,630 tiendas online.

---

## 🤖 ChatBot Analista

El ChatBot está impulsado por la **API de Gemini** y actúa como analista experto en disponibilidad de tiendas Rappi. Tiene acceso completo al dataset del período y puede responder en los tres idiomas disponibles.

### Preguntas sugeridas

```
¿Cuál fue el día con más tiendas?
¿Cuándo fue el mínimo histórico?
¿Hay algún patrón semanal?
Dame un resumen ejecutivo del período.
¿A qué hora del día se registra el pico operativo?
¿Cuántos días estuvieron por encima del promedio?
```

### Cómo funciona

1. El contexto del dataset se inyecta automáticamente en cada consulta.
2. El modelo analiza los datos y responde con insights concretos.
3. Las respuestas incluyen valores numéricos extraídos directamente del dataset.
4. El idioma de la respuesta se adapta al idioma seleccionado en la interfaz.

---

## 🌐 Internacionalización

El sistema de i18n fue implementado con cambio dinámico sin recarga de página. Para añadir un nuevo idioma:

1. Crea un archivo en `src/i18n/xx.ts` (donde `xx` es el código ISO del idioma).
2. Copia la estructura de `es.ts` y traduce todos los valores.
3. Registra el nuevo idioma en `src/hooks/useLanguage.ts`.
4. Añade la bandera y la opción en el selector de idioma del header.

---

## 📝 Conclusiones

1. **Alta disponibilidad operativa:** El sistema mantuvo **99.92% de uptime** durante los 11 días, superando el umbral SLA de 99.9%. Los episodios con 0 tiendas fueron aislados y sin impacto acumulado.

2. **Crecimiento sostenido:** Las tiendas online crecieron de 25,464 (Feb 01) a 30,630 (Feb 11), un incremento de aproximadamente **20% en 11 días**, con tendencia positiva sostenida.

3. **Patrón horario bien definido:** Ciclo diario claro con arranque lento a las 06:00 h (~13k tiendas), pico operativo a las 08:00 h (~67k tiendas) y actividad nocturna sostenida a las 00:00 h (~41k tiendas).

4. **Herramienta de monitoreo robusta:** El dashboard combina visualizaciones interactivas, control temporal granular y un asistente de IA conversacional, formando una solución integral para monitorear la red de tiendas Rappi.

---

## 🔗 Actividad

Accede a la aplicación en vivo desde Google AI Studio:

👉 **[https://ai.studio/apps/aa15b349-bdf0-4abe-a3f6-7db522b38ce4](https://ai.studio/apps/aa15b349-bdf0-4abe-a3f6-7db522b38ce4)**

---

## 👤 Autor

**Juan Manuel Ramírez Tamayo**  
Universidad de los Andes  
Ingeniería de Sistemas y Computación  
Bogotá, Colombia · 2026

---

*Rappi Store Availability Dashboard · © 2026 Todos los derechos reservados*
