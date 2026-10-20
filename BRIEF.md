# UI Design Brief: Rediseño Minimalista del Editor Visual (Figma & Stitch UX/UI)

- **Goal**: Transformar el editor visual de W Gestión Inmobiliaria en una interfaz limpia, despejada y sin sobrecarga cognitiva, inspirada en Figma y Google Stitch, mediante niveles progresivos de edición, paneles "sandwich" plegables y un inspector contextual.
- **Primary User & Task**: El cliente comercial y gestor inmobiliario, cuya tarea prioritaria es actualizar rápidamente precios (UF/CLP), fotografías, textos fiduciarios y reordenar secciones sin riesgo de romper el diseño ni verse abrumado por controles técnicos.
- **Lead Element**: El lienzo visual central (Canvas-First), flanqueado por una barra de herramientas despejada y un inspector lateral que solo muestra lo relevante al elemento seleccionado.

---

## 1. Principios UX/UI Aplicados (`/uxui-principles`)

1. **Progressive Disclosure (Divulgación Progresiva):**
   - En lugar de mostrar 40 campos y botones simultáneos, los controles se revelan únicamente cuando el usuario los necesita (selección de elemento, nivel de profundidad activo, acordeones expandibles).
2. **Hick's Law (Ley de Hick):**
   - El tiempo de decisión y la fatiga visual disminuyen al reducir drásticamente el número de opciones visibles. Agrupar herramientas secundarias en un menú `...` libera el 60% del espacio en la cabecera.
3. **Miller's Law (Ley de Miller - Chunks 5 a 7):**
   - Máximo de 3 a 5 grupos de controles en pantalla a la vez, organizados en paneles sandwich (acordeones).
4. **Contextual Property Inspector (Patrón Figma & Stitch):**
   - El panel lateral adapta su contenido al elemento que el usuario hace clic. Si hace clic en un texto, ve solo edición de texto + `✨ Asistente IA`. Si hace clic en una imagen, ve solo reemplazo de imagen. Si no selecciona nada, ve la estructura general de la página.

---

## 2. Los 3 Niveles de Profundidad de Edición (Dropdown Central)

Selector ubicado en el centro de la barra superior con badge dinámico y texto explicativo:

| Nivel | Nombre | Alcance / Controles Habilitados | Explicación en UI |
| :--- | :--- | :--- | :--- |
| **Nivel 1** | **Contenido Rápido** *(Por defecto)* | Solo textos, precios UF/CLP, fotos y botón `✨ Asistente IA`. Cero riesgo de rotura. | *"Modo ultra-seguro: Solo edición rápida de textos, precios y fotos."* |
| **Nivel 2** | **Estructura & Secciones** | Reordenar bloques (`🔼 Subir`, `🔽 Bajar`), alternar visibilidad de secciones y duplicar tarjetas. | *"Modo estructural: Ajusta el orden y visualización de las secciones del sitio."* |
| **Nivel 3** | **Personalización Visual** | Colores de marca, variantes tipográficas, alineaciones, redondeo de bordes y acceso a 'Pedir al Dev' o 'Modo Pro'. | *"Modo visual: Personaliza la estética de tarjetas, botones y colores corporativos."* |

---

## 3. Paneles "Sandwich" Colapsables (Acordeones Estilo Figma/Stitch)

Cada bloque del inspector se organiza como un acordeón compacto:
- **Cabecera del Sandwich:** Icono temático + Título del grupo + Indicador de estado + Chevron (`fa-chevron-down` / `fa-chevron-right`).
- **Comportamiento:** Clic en la cabecera expande o colapsa el grupo con animación suave.
- **Grupos tipo Sandwich:**
  1. `🥪 Contenido & Texto` (Texto, Enlace, Asistente IA)
  2. `🥪 Valores & Parámetros Inmobiliarios` (UF, CLP, Superficie m², Dormitorios, Baños)
  3. `🥪 Imagen & Multimedia` (Selector de foto, URL, vista previa)
  4. `🥪 Estructura de Secciones` (Nivel 2: Lista jerárquica con subir/bajar)
  5. `🥪 Apariencia & Estilos` (Nivel 3: Color, fondo, bordes)

---

## 4. Header Despejado y Minimalista

- **Izquierda:** Logo compacto + Deshacer/Rehacer (`Ctrl+Z`/`Ctrl+Y`) con badge + Indicador de autoguardado sutil ("Al día").
- **Centro:** Selector de Profundidad de Edición en Dropdown con color distintivo (Verde Nivel 1, Azul Nivel 2, Dorado Nivel 3) y subtítulo explicativo.
- **Derecha:**
  - Botón de asistencia directa: `💬 Pedir al Dev` (WhatsApp/Email).
  - Menú sandwich `...` (Despliega: Historial de Cambios, Checkpoints guardados, Ver Web, Exportar HTML/JSON).
  - Botón verde principal de acción: `ACTUALIZAR / PUBLICAR`.

---

## 5. Inserción de Nuevos Bloques (Sin saturar el panel)

- Se retira el catálogo estático permanente que ocupaba toda la barra lateral.
- Se reemplaza por un botón compacto `+ Añadir Elemento` en la parte superior del panel que despliega un cajón emergente o drawer limpio cuando el usuario realmente desea insertar un nuevo bloque.

---

## 6. Scope Limits & Recorded Assumptions

- **Scope Limits:**
  - No se modifica el código base de producción de la versión básica (V1 congelada).
  - Los endpoints de backend (`/api/ai/enhance-text`, `/api/developer-request`, `/api/autosave`, etc.) se mantienen intactos.
- **Recorded Assumptions:**
  - La clave de desbloqueo para herramientas de Desarrollador Pro (`2026`) se mantiene disponible dentro del menú `...` o en el Nivel 3 para emergencias del programador.
  - El diseño seguirá usando Tailwind CSS v4 para asegurar fluidez y consistencia visual con el resto del proyecto.
