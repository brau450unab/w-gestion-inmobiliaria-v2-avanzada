import fs from 'fs';
import path from 'path';

const intranetPath = 'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/intranet.html';
const editorPath = 'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/editor.html';

let html = fs.readFileSync(intranetPath, 'utf8');

// =========================================================================
// 1. REVISE THE TOP HEADER BAR: CLEAN, FIGMA/STITCH MINIMALIST
// =========================================================================
const headerRegex = /<header class="h-12 bg-\[#1e2124\][\s\S]*?<\/header>/;

const newHeader = `<header class="h-12 bg-[#1e2124] border-b border-[#393d41] flex items-center justify-between px-3 z-40 shrink-0">
        <!-- LEFT: Brand + Undo/Redo + Autosave Indicator -->
        <div class="flex items-center gap-2.5">
            <a href="./index.html" class="flex items-center gap-2 group cursor-pointer" title="Ir al Sitio Web Oficial">
                <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-[#92003B] to-[#D4AF37] flex items-center justify-center font-heading font-black text-white text-xs shadow group-hover:scale-105 transition-transform">
                    W
                </div>
                <div class="hidden sm:flex flex-col leading-none">
                    <span class="font-heading font-extrabold text-[12px] text-white tracking-wide flex items-center gap-1">
                        W GESTIÓN <span class="text-[#D4AF37] font-semibold text-[9px]">EDITOR</span>
                    </span>
                    <span class="text-[8px] text-[#a4afb7]">Visual Studio</span>
                </div>
            </a>

            <div class="h-4 w-px bg-[#393d41] mx-0.5"></div>

            <!-- UNDO / REDO (DESHACER / REHACER) -->
            <div class="flex items-center bg-[#15171a] p-0.5 rounded-lg border border-[#393d41]">
                <button onclick="undoAction()" id="btn-undo" disabled class="px-2 py-1 rounded text-[#a4afb7] hover:text-white disabled:opacity-30 disabled:hover:text-[#a4afb7] flex items-center gap-1 transition-colors cursor-pointer" title="Deshacer (Ctrl + Z)">
                    <i class="fa-solid fa-arrow-rotate-left text-xs"></i>
                    <span class="hidden lg:inline text-[10px] font-medium">Deshacer</span>
                    <span id="badge-undo-count" class="hidden text-[9px] px-1 py-0.2 bg-[#26292c] rounded font-mono text-[#D4AF37]">0</span>
                </button>
                <div class="h-3 w-px bg-[#393d41]"></div>
                <button onclick="redoAction()" id="btn-redo" disabled class="px-2 py-1 rounded text-[#a4afb7] hover:text-white disabled:opacity-30 disabled:hover:text-[#a4afb7] flex items-center gap-1 transition-colors cursor-pointer" title="Rehacer (Ctrl + Y)">
                    <i class="fa-solid fa-arrow-rotate-right text-xs"></i>
                    <span class="hidden lg:inline text-[10px] font-medium">Rehacer</span>
                    <span id="badge-redo-count" class="hidden text-[9px] px-1 py-0.2 bg-[#26292c] rounded font-mono text-[#D4AF37]">0</span>
                </button>
            </div>

            <!-- Sutil Autosave Status -->
            <div class="hidden xl:flex items-center gap-1.5 bg-[#15171a] px-2 py-1 rounded border border-[#393d41]">
                <span id="autosave-status-icon" class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span id="autosave-status-text" class="text-gray-300 text-[10px] font-mono">Borrador al día</span>
            </div>
        </div>

        <!-- CENTER: SELECTOR DE PROFUNDIDAD DE EDICIÓN (UX/UI Progressive Disclosure) -->
        <div class="flex items-center gap-2 bg-[#15171a] px-2.5 py-1 rounded-lg border border-[#393d41] shadow-inner">
            <span class="text-[9px] text-[#a4afb7] uppercase font-bold tracking-wider hidden sm:inline">Profundidad:</span>
            <select id="edit-depth-select" onchange="setEditDepth(this.value)" class="bg-[#26292c] text-white font-semibold text-[11px] rounded px-2 py-1 border border-[#393d41] focus:outline-none focus:border-[#D4AF37] cursor-pointer">
                <option value="1">🟢 Nivel 1: Contenido Rápido (Textos/Precios)</option>
                <option value="2">🔵 Nivel 2: Estructura & Secciones</option>
                <option value="3">🟡 Nivel 3: Personalización Visual</option>
            </select>
            <span id="depth-desc-badge" class="hidden lg:inline-block text-[10px] text-emerald-400 font-medium">
                Solo textos, precios y fotos
            </span>
        </div>

        <!-- RIGHT: Device Switcher + Pedir al Dev + Sandwich Menu (...) + Publish Button -->
        <div class="flex items-center gap-1.5">
            <!-- Compact Device Switcher -->
            <div class="hidden md:flex items-center bg-[#15171a] p-0.5 rounded border border-[#393d41] gap-0.5">
                <button onclick="setCanvasViewport('desktop')" id="btn-device-desktop" class="w-7 h-7 rounded bg-[#26292c] text-[#D4AF37] flex items-center justify-center hover:text-white transition-colors cursor-pointer" title="Escritorio">
                    <i class="fa-solid fa-desktop text-[11px]"></i>
                </button>
                <button onclick="setCanvasViewport('tablet')" id="btn-device-tablet" class="w-7 h-7 rounded text-[#a4afb7] flex items-center justify-center hover:text-white transition-colors cursor-pointer" title="Tablet">
                    <i class="fa-solid fa-tablet-screen-button text-[11px]"></i>
                </button>
                <button onclick="setCanvasViewport('mobile')" id="btn-device-mobile" class="w-7 h-7 rounded text-[#a4afb7] flex items-center justify-center hover:text-white transition-colors cursor-pointer" title="Móvil">
                    <i class="fa-solid fa-mobile-screen text-[11px]"></i>
                </button>
            </div>

            <!-- SOLICITAR CAMBIO AL DEV -->
            <button onclick="openDeveloperRequestModal()" class="h-7 px-2.5 rounded bg-gradient-to-r from-amber-950/80 to-[#26292c] hover:from-amber-900 hover:to-[#32363b] text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 border border-amber-600/50 shadow transition-all cursor-pointer text-[11px] font-semibold" title="Solicitar cambio complejo o nueva sección al desarrollador (+56965312618)">
                <i class="fa-solid fa-comments text-xs"></i>
                <span class="hidden sm:inline">Pedir al Dev</span>
            </button>

            <!-- MORE TOOLS SANDWICH MENU (...) -->
            <div class="relative">
                <button onclick="toggleMoreToolsMenu()" id="btn-more-tools" class="w-7 h-7 rounded bg-[#26292c] hover:bg-[#32363b] text-[#a4afb7] hover:text-white flex items-center justify-center border border-[#393d41] transition-all cursor-pointer" title="Más herramientas del editor">
                    <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>

                <!-- Dropdown Menu -->
                <div id="dropdown-more-tools" class="hidden absolute right-0 top-9 w-60 bg-[#1e2124] border border-[#393d41] rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                    <button onclick="openHistoryDrawer('actions'); toggleMoreToolsMenu();" class="w-full px-3 py-2 text-left hover:bg-[#26292c] text-gray-200 flex items-center gap-2.5">
                        <i class="fa-solid fa-clock-rotate-left text-amber-400 w-4"></i>
                        <span>Historial de Acciones</span>
                    </button>
                    <button onclick="promptCreateCheckpoint(); toggleMoreToolsMenu();" class="w-full px-3 py-2 text-left hover:bg-[#26292c] text-gray-200 flex items-center gap-2.5">
                        <i class="fa-solid fa-bookmark text-[#D4AF37] w-4"></i>
                        <span>Crear Punto Guardado</span>
                    </button>
                    <a href="./index.html" target="_blank" onclick="toggleMoreToolsMenu();" class="w-full px-3 py-2 text-left hover:bg-[#26292c] text-gray-200 flex items-center gap-2.5">
                        <i class="fa-solid fa-arrow-up-right-from-square text-cyan-400 w-4"></i>
                        <span>Ver Sitio Web en Vivo</span>
                    </a>
                    <div class="h-px bg-[#393d41] my-1"></div>
                    <button onclick="toggleNavigator(); toggleMoreToolsMenu();" class="w-full px-3 py-2 text-left hover:bg-[#26292c] text-gray-200 flex items-center gap-2.5">
                        <i class="fa-solid fa-layer-group text-[#D4AF37] w-4"></i>
                        <span>Árbol de Capas</span>
                    </button>
                    <button onclick="toggleSiteSettingsModal(); toggleMoreToolsMenu();" class="w-full px-3 py-2 text-left hover:bg-[#26292c] text-gray-200 flex items-center gap-2.5">
                        <i class="fa-solid fa-file-export text-emerald-400 w-4"></i>
                        <span>Exportar Plantilla / HTML</span>
                    </button>
                    <div class="h-px bg-[#393d41] my-1"></div>
                    <button onclick="toggleProModeAccess(); toggleMoreToolsMenu();" class="w-full px-3 py-2 text-left hover:bg-[#26292c] text-purple-300 flex items-center gap-2.5 font-bold">
                        <i class="fa-solid fa-code text-purple-400 w-4"></i>
                        <span id="label-menu-promode">Desbloquear Modo Pro</span>
                    </button>
                </div>
            </div>

            <!-- GREEN ACTUALIZAR BUTTON -->
            <button onclick="publishChanges()" id="btn-publish" class="h-7 px-3.5 rounded bg-[#39b54a] hover:bg-[#2ea13e] text-white font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition-transform active:scale-95 cursor-pointer" title="Publicar en Producción (Ctrl + S)">
                <i class="fa-solid fa-floppy-disk text-xs" id="publish-icon"></i>
                <span id="publish-label">ACTUALIZAR</span>
            </button>
        </div>
    </header>`;

html = html.replace(headerRegex, newHeader);

// =========================================================================
// 2. RESTRUCTURE THE SIDEBAR: CONTEXTUAL INSPECTOR + COLLAPSIBLE SANDWICHES
// =========================================================================
const asideRegex = /<aside id="elementor-sidebar"[\s\S]*?<\/aside>/;

const newSidebar = `<aside id="elementor-sidebar" class="w-80 md:w-88 bg-[#26292c] border-r border-[#393d41] flex flex-col shrink-0 z-30 shadow-2xl relative">
            
            <!-- Sidebar Header: Contextual Element Info + Add Block Button -->
            <div class="h-11 bg-[#1e2124] border-b border-[#393d41] flex items-center justify-between px-3">
                <div class="flex items-center gap-2 truncate">
                    <span id="sidebar-context-badge" class="px-2 py-0.5 rounded bg-[#15171a] border border-[#393d41] text-[10px] text-[#D4AF37] font-mono font-bold uppercase truncate max-w-[170px]">
                        PÁGINA PRINCIPAL
                    </span>
                </div>
                <div class="flex items-center gap-1.5">
                    <!-- ADD BLOCK BUTTON (Popover Drawer Trigger) -->
                    <button onclick="toggleAddBlockDrawer()" id="btn-add-block" class="px-2.5 py-1 rounded bg-[#D4AF37] hover:bg-[#b89320] text-black font-heading font-black text-[10px] uppercase tracking-wide flex items-center gap-1 shadow cursor-pointer transition-all">
                        <i class="fa-solid fa-plus text-[10px]"></i>
                        <span>Añadir</span>
                    </button>
                    <!-- Unselect / Focus General -->
                    <button onclick="clearActiveSelection()" id="btn-clear-selection" class="hidden w-7 h-7 rounded hover:bg-[#32363b] text-[#a4afb7] hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer" title="Deseleccionar y ver general">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

            <!-- LEVEL EXPLANATION NOTIFICATION (Progressive Disclosure) -->
            <div id="depth-notification-bar" class="bg-[#181a1d] border-b border-[#393d41] px-3 py-1.5 flex items-center justify-between text-[10px]">
                <span id="depth-notification-text" class="text-emerald-400 font-medium flex items-center gap-1.5 truncate">
                    <i class="fa-solid fa-shield-halved text-[10px]"></i> Nivel 1: Textos, precios UF y fotos protegidos
                </span>
                <span id="depth-pill-indicator" class="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono text-[9px] font-bold">N1</span>
            </div>

            <!-- SANDWICH ACCORDION PANELS CONTAINER -->
            <div class="flex-1 overflow-y-auto p-2.5 space-y-2" id="sandwich-container">

                <!-- ============================================== -->
                <!-- SANDWICH 1: CONTENIDO & COPYWRITING (Always)   -->
                <!-- ============================================== -->
                <div class="sandwich-panel bg-[#1e2124] border border-[#393d41] rounded-xl overflow-hidden shadow-sm" id="sandwich-content">
                    <button type="button" onclick="toggleSandwich('content')" class="w-full px-3 py-2.5 bg-[#222529] hover:bg-[#282c30] flex items-center justify-between text-left transition-colors cursor-pointer">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-pen-to-square text-[#D4AF37] text-xs"></i>
                            <span class="font-heading font-bold text-xs text-white">Contenido & Textos</span>
                        </div>
                        <i class="fa-solid fa-chevron-down text-[#a4afb7] text-[10px] transition-transform duration-200" id="icon-sandwich-content"></i>
                    </button>
                    <div class="sandwich-body p-3 space-y-3" id="body-sandwich-content">
                        <!-- Text with AI Copywriter Button -->
                        <div id="ctrl-text-group" class="space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="block text-[#a4afb7] font-semibold text-[11px]">Texto del Elemento</label>
                                <button type="button" onclick="openAIAssistantModal()" class="px-2 py-0.5 rounded bg-gradient-to-r from-purple-900/90 to-[#92003B] hover:from-purple-800 hover:to-[#b30048] text-white text-[10px] font-bold border border-[#D4AF37]/50 flex items-center gap-1 shadow cursor-pointer transition-all" title="Mejorar redacción con Inteligencia Artificial">
                                    <i class="fa-solid fa-wand-magic-sparkles text-[#D4AF37]"></i>
                                    <span>Asistente IA</span>
                                </button>
                            </div>
                            <textarea id="ctrl-input-text" rows="3" oninput="updateActiveElementText(this.value)" placeholder="Haz clic en cualquier texto del sitio para editarlo..." class="w-full bg-[#15171a] border border-[#393d41] rounded-lg p-2 text-white text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"></textarea>
                        </div>

                        <!-- Link / WhatsApp URL -->
                        <div id="ctrl-link-group" class="space-y-1.5">
                            <label class="block text-[#a4afb7] font-semibold text-[11px]">Enlace o WhatsApp</label>
                            <input type="text" id="ctrl-input-link" oninput="updateActiveElementLink(this.value)" placeholder="https://... o #contacto" class="w-full bg-[#15171a] border border-[#393d41] rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]">
                        </div>
                    </div>
                </div>

                <!-- ============================================== -->
                <!-- SANDWICH 2: VALORES & FICHA INMOBILIARIA (UF) -->
                <!-- ============================================== -->
                <div class="sandwich-panel bg-[#1e2124] border border-[#393d41] rounded-xl overflow-hidden shadow-sm" id="sandwich-params">
                    <button type="button" onclick="toggleSandwich('params')" class="w-full px-3 py-2.5 bg-[#222529] hover:bg-[#282c30] flex items-center justify-between text-left transition-colors cursor-pointer">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-coins text-emerald-400 text-xs"></i>
                            <span class="font-heading font-bold text-xs text-white">Valores & Ficha UF</span>
                        </div>
                        <i class="fa-solid fa-chevron-down text-[#a4afb7] text-[10px] transition-transform duration-200" id="icon-sandwich-params"></i>
                    </button>
                    <div class="sandwich-body p-3 space-y-3" id="body-sandwich-params">
                        <div class="grid grid-cols-2 gap-2">
                            <div class="space-y-1">
                                <label class="block text-[#a4afb7] text-[10px] font-semibold">Valor en UF</label>
                                <input type="text" id="ctrl-prop-uf" oninput="updatePropertyMeta('uf', this.value)" placeholder="14.800 UF" class="w-full bg-[#15171a] border border-[#393d41] rounded p-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]">
                            </div>
                            <div class="space-y-1">
                                <label class="block text-[#a4afb7] text-[10px] font-semibold">Superficie m²</label>
                                <input type="text" id="ctrl-prop-area" oninput="updatePropertyMeta('area', this.value)" placeholder="185 m²" class="w-full bg-[#15171a] border border-[#393d41] rounded p-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="space-y-1">
                                <label class="block text-[#a4afb7] text-[10px] font-semibold">Dormitorios</label>
                                <input type="text" id="ctrl-prop-beds" oninput="updatePropertyMeta('beds', this.value)" placeholder="3 Dorm." class="w-full bg-[#15171a] border border-[#393d41] rounded p-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]">
                            </div>
                            <div class="space-y-1">
                                <label class="block text-[#a4afb7] text-[10px] font-semibold">Baños</label>
                                <input type="text" id="ctrl-prop-baths" oninput="updatePropertyMeta('baths', this.value)" placeholder="3 Baños" class="w-full bg-[#15171a] border border-[#393d41] rounded p-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ============================================== -->
                <!-- SANDWICH 3: IMAGEN & MULTIMEDIA                -->
                <!-- ============================================== -->
                <div class="sandwich-panel bg-[#1e2124] border border-[#393d41] rounded-xl overflow-hidden shadow-sm" id="sandwich-media">
                    <button type="button" onclick="toggleSandwich('media')" class="w-full px-3 py-2.5 bg-[#222529] hover:bg-[#282c30] flex items-center justify-between text-left transition-colors cursor-pointer">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-image text-cyan-400 text-xs"></i>
                            <span class="font-heading font-bold text-xs text-white">Imagen & Fotografía</span>
                        </div>
                        <i class="fa-solid fa-chevron-down text-[#a4afb7] text-[10px] transition-transform duration-200" id="icon-sandwich-media"></i>
                    </button>
                    <div class="sandwich-body p-3 space-y-3" id="body-sandwich-media">
                        <div class="space-y-1.5">
                            <label class="block text-[#a4afb7] text-[11px] font-semibold">Ruta de Imagen (URL o Local)</label>
                            <input type="text" id="ctrl-input-image" oninput="updateActiveElementImage(this.value)" placeholder="./assets/media/..." class="w-full bg-[#15171a] border border-[#393d41] rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]">
                        </div>
                        <div class="space-y-1">
                            <span class="text-[10px] text-[#a4afb7]">Galería rápida recomendada:</span>
                            <div class="grid grid-cols-3 gap-1 pt-1">
                                <button type="button" onclick="setPresetImage('hero_realestate_building')" class="p-1 rounded bg-[#15171a] border border-[#393d41] hover:border-[#D4AF37] text-[9px] text-gray-300 truncate cursor-pointer" title="Torre Costera Viña">
                                    🏢 Torre Viña
                                </button>
                                <button type="button" onclick="setPresetImage('hero_realestate_interior')" class="p-1 rounded bg-[#15171a] border border-[#393d41] hover:border-[#D4AF37] text-[9px] text-gray-300 truncate cursor-pointer" title="Penthouse Luxury">
                                    🌅 Penthouse
                                </button>
                                <button type="button" onclick="setPresetImage('hero_realestate_commercial')" class="p-1 rounded bg-[#15171a] border border-[#393d41] hover:border-[#D4AF37] text-[9px] text-gray-300 truncate cursor-pointer" title="Desarrollo Corporativo">
                                    🏛️ Corporativo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ============================================== -->
                <!-- SANDWICH 4: ESTRUCTURA DE SECCIONES (Nivel 2)  -->
                <!-- ============================================== -->
                <div class="sandwich-panel bg-[#1e2124] border border-[#393d41] rounded-xl overflow-hidden shadow-sm hidden" id="sandwich-sections">
                    <button type="button" onclick="toggleSandwich('sections')" class="w-full px-3 py-2.5 bg-[#222529] hover:bg-[#282c30] flex items-center justify-between text-left transition-colors cursor-pointer">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-arrows-up-down text-[#D4AF37] text-xs"></i>
                            <span class="font-heading font-bold text-xs text-white">Estructura de Secciones</span>
                        </div>
                        <i class="fa-solid fa-chevron-down text-[#a4afb7] text-[10px] transition-transform duration-200" id="icon-sandwich-sections"></i>
                    </button>
                    <div class="sandwich-body p-3 space-y-2" id="body-sandwich-sections">
                        <div class="flex items-center justify-between text-[10px] text-[#a4afb7] pb-1 border-b border-[#393d41]">
                            <span>Reordena bloques sin romper el diseño:</span>
                            <button onclick="refreshSectionsReorderList()" class="hover:text-white p-0.5" title="Recargar"><i class="fa-solid fa-rotate-right"></i></button>
                        </div>
                        <div id="sandwich-sections-list" class="space-y-1.5">
                            <!-- Dynamic sections inserted by JS -->
                        </div>
                    </div>
                </div>

                <!-- ============================================== -->
                <!-- SANDWICH 5: APARIENCIA & ESTILOS (Nivel 3)     -->
                <!-- ============================================== -->
                <div class="sandwich-panel bg-[#1e2124] border border-[#393d41] rounded-xl overflow-hidden shadow-sm hidden" id="sandwich-styles">
                    <button type="button" onclick="toggleSandwich('styles')" class="w-full px-3 py-2.5 bg-[#222529] hover:bg-[#282c30] flex items-center justify-between text-left transition-colors cursor-pointer">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-palette text-amber-400 text-xs"></i>
                            <span class="font-heading font-bold text-xs text-white">Apariencia & Colores</span>
                        </div>
                        <i class="fa-solid fa-chevron-down text-[#a4afb7] text-[10px] transition-transform duration-200" id="icon-sandwich-styles"></i>
                    </button>
                    <div class="sandwich-body p-3 space-y-3" id="body-sandwich-styles">
                        <!-- Quick Color Palette -->
                        <div class="space-y-1.5">
                            <label class="block text-[#a4afb7] text-[11px] font-semibold">Color de Texto</label>
                            <div class="flex items-center gap-1.5">
                                <button onclick="updateActiveElementStyle('color', '#D4AF37')" class="px-2 py-1 rounded bg-[#15171a] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span> Oro
                                </button>
                                <button onclick="updateActiveElementStyle('color', '#FFFFFF')" class="px-2 py-1 rounded bg-[#15171a] border border-gray-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                                    <span class="w-2.5 h-2.5 rounded-full bg-white"></span> Blanco
                                </button>
                                <button onclick="updateActiveElementStyle('color', '#94A3B8')" class="px-2 py-1 rounded bg-[#15171a] border border-slate-600 text-slate-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span> Gris
                                </button>
                                <button onclick="updateActiveElementStyle('color', '#10B981')" class="px-2 py-1 rounded bg-[#15171a] border border-emerald-600 text-emerald-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> Verde
                                </button>
                            </div>
                        </div>

                        <!-- Alignment -->
                        <div class="space-y-1.5">
                            <label class="block text-[#a4afb7] text-[11px] font-semibold">Alineación</label>
                            <div class="grid grid-cols-4 gap-1 bg-[#15171a] p-1 rounded-lg border border-[#393d41]">
                                <button onclick="updateActiveElementStyle('textAlign', 'left')" class="py-1 text-center text-[#a4afb7] hover:text-white rounded hover:bg-[#26292c] cursor-pointer"><i class="fa-solid fa-align-left"></i></button>
                                <button onclick="updateActiveElementStyle('textAlign', 'center')" class="py-1 text-center text-[#a4afb7] hover:text-white rounded hover:bg-[#26292c] cursor-pointer"><i class="fa-solid fa-align-center"></i></button>
                                <button onclick="updateActiveElementStyle('textAlign', 'right')" class="py-1 text-center text-[#a4afb7] hover:text-white rounded hover:bg-[#26292c] cursor-pointer"><i class="fa-solid fa-align-right"></i></button>
                                <button onclick="updateActiveElementStyle('textAlign', 'justify')" class="py-1 text-center text-[#a4afb7] hover:text-white rounded hover:bg-[#26292c] cursor-pointer"><i class="fa-solid fa-align-justify"></i></button>
                            </div>
                        </div>

                        <!-- Pro Developer Detailed Styles (Hidden by default unless Pro is unlocked) -->
                        <div id="pro-dev-styles-area" class="hidden pt-2 border-t border-[#393d41] space-y-3">
                            <div class="space-y-1">
                                <div class="flex justify-between text-[#a4afb7] text-[10px]">
                                    <span>Tamaño de Fuente</span>
                                    <span id="label-font-size" class="text-white font-mono">16px</span>
                                </div>
                                <input type="range" id="ctrl-font-size" min="10" max="72" value="16" oninput="document.getElementById('label-font-size').innerText = this.value + 'px'; updateActiveElementStyle('fontSize', this.value + 'px');" class="w-full accent-[#D4AF37]">
                            </div>
                            <div class="space-y-1">
                                <label class="block text-[#a4afb7] text-[10px]">Clases CSS Adicionales</label>
                                <input type="text" id="ctrl-custom-classes" oninput="updateActiveElementClasses(this.value)" placeholder="shadow-xl rounded-2xl..." class="w-full bg-[#15171a] border border-[#393d41] rounded p-1.5 text-white font-mono text-xs">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- FLOATING POPUP DRAWER: AÑADIR BLOQUE (FIGMA / STITCH STYLE) -->
            <div id="add-block-drawer" class="hidden absolute top-12 left-2 right-2 bg-[#1e2124] border border-[#D4AF37]/50 rounded-2xl shadow-2xl z-50 p-3.5 space-y-2.5 backdrop-blur-md">
                <div class="flex items-center justify-between border-b border-[#393d41] pb-2">
                    <span class="font-heading font-black text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                        <i class="fa-solid fa-puzzle-piece text-[#D4AF37]"></i> Añadir Bloque Rápido
                    </span>
                    <button onclick="toggleAddBlockDrawer()" class="text-[#a4afb7] hover:text-white p-1 cursor-pointer">
                        <i class="fa-solid fa-xmark text-xs"></i>
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="insertQuickWidget('heading')" class="p-2.5 rounded-lg bg-[#15171a] hover:bg-[#26292c] border border-[#393d41] hover:border-[#D4AF37] text-left transition-all cursor-pointer group">
                        <i class="fa-solid fa-heading text-[#D4AF37] text-sm group-hover:scale-110 transition-transform"></i>
                        <div class="font-bold text-xs text-white mt-1">Encabezado</div>
                        <div class="text-[9px] text-[#a4afb7]">Título de alta gama</div>
                    </button>
                    <button onclick="insertQuickWidget('text')" class="p-2.5 rounded-lg bg-[#15171a] hover:bg-[#26292c] border border-[#393d41] hover:border-[#D4AF37] text-left transition-all cursor-pointer group">
                        <i class="fa-solid fa-paragraph text-[#D4AF37] text-sm group-hover:scale-110 transition-transform"></i>
                        <div class="font-bold text-xs text-white mt-1">Párrafo Texto</div>
                        <div class="text-[9px] text-[#a4afb7]">Descripción fiduciaria</div>
                    </button>
                    <button onclick="insertQuickWidget('image')" class="p-2.5 rounded-lg bg-[#15171a] hover:bg-[#26292c] border border-[#393d41] hover:border-[#D4AF37] text-left transition-all cursor-pointer group">
                        <i class="fa-solid fa-image text-[#D4AF37] text-sm group-hover:scale-110 transition-transform"></i>
                        <div class="font-bold text-xs text-white mt-1">Foto Inmueble</div>
                        <div class="text-[9px] text-[#a4afb7]">Imagen de catálogo</div>
                    </button>
                    <button onclick="insertQuickWidget('button')" class="p-2.5 rounded-lg bg-[#15171a] hover:bg-[#26292c] border border-[#393d41] hover:border-[#D4AF37] text-left transition-all cursor-pointer group">
                        <i class="fa-solid fa-hand-pointer text-[#D4AF37] text-sm group-hover:scale-110 transition-transform"></i>
                        <div class="font-bold text-xs text-white mt-1">Botón CTA</div>
                        <div class="text-[9px] text-[#a4afb7]">Agendar o WhatsApp</div>
                    </button>
                    <button onclick="insertQuickWidget('property_card')" class="p-2.5 rounded-lg bg-[#15171a] hover:bg-[#26292c] border border-[#393d41] hover:border-[#D4AF37] text-left transition-all cursor-pointer group">
                        <i class="fa-solid fa-building text-[#D4AF37] text-sm group-hover:scale-110 transition-transform"></i>
                        <div class="font-bold text-xs text-white mt-1">Ficha Propiedad</div>
                        <div class="text-[9px] text-[#a4afb7]">UF, m², Dorm, Baños</div>
                    </button>
                    <button onclick="insertQuickWidget('whatsapp_concierge')" class="p-2.5 rounded-lg bg-[#15171a] hover:bg-[#26292c] border border-[#393d41] hover:border-emerald-500 text-left transition-all cursor-pointer group">
                        <i class="fa-brands fa-whatsapp text-emerald-400 text-sm group-hover:scale-110 transition-transform"></i>
                        <div class="font-bold text-xs text-white mt-1">WhatsApp Concierge</div>
                        <div class="text-[9px] text-[#a4afb7]">Botón flotante directo</div>
                    </button>
                </div>
            </div>

            <!-- Bottom Dock Footer -->
            <div class="h-9 bg-[#1e2124] border-t border-[#393d41] flex items-center justify-between px-3 text-[#a4afb7] text-[10px]">
                <div class="flex items-center gap-2">
                    <span id="dock-status-mode" class="font-mono text-emerald-400 flex items-center gap-1">
                        <i class="fa-solid fa-circle-check text-[9px]"></i> Nivel 1 Activo
                    </span>
                </div>
                <div>
                    <button onclick="openDeveloperRequestModal()" class="text-[#D4AF37] hover:underline cursor-pointer">¿Dudas? Pedir al Dev</button>
                </div>
            </div>

        </aside>`;

html = html.replace(asideRegex, newSidebar);

// =========================================================================
// 3. JAVASCRIPT: ENGINE FOR DEPTH LEVELS, SANDWICHES & FIGMA/STITCH ACTIONS
// =========================================================================
const jsLogicAdditions = `
        // ==============================================================
        // PROGRESSIVE DISCLOSURE & SANDWICH ACCORDION ENGINE (FIGMA/STITCH)
        // ==============================================================
        let currentEditDepth = 1; // 1: Contenido, 2: Estructura, 3: Visual
        let isProUnlocked = false;

        function setEditDepth(depth) {
            currentEditDepth = parseInt(depth, 10);
            applyEditDepthUI();
        }

        function applyEditDepthUI() {
            const depthSelect = document.getElementById('edit-depth-select');
            if (depthSelect) depthSelect.value = currentEditDepth;

            const badge = document.getElementById('depth-desc-badge');
            const notifText = document.getElementById('depth-notification-text');
            const notifPill = document.getElementById('depth-pill-indicator');
            const dockStatus = document.getElementById('dock-status-mode');

            const sandwichSections = document.getElementById('sandwich-sections');
            const sandwichStyles = document.getElementById('sandwich-styles');
            const proStylesArea = document.getElementById('pro-dev-styles-area');

            if (currentEditDepth === 1) {
                if (badge) badge.innerText = "Solo edición segura de textos, precios y fotos";
                if (notifText) notifText.innerHTML = '<i class="fa-solid fa-shield-halved text-[10px]"></i> Nivel 1: Textos, precios UF y fotos protegidos';
                if (notifPill) { notifPill.innerText = "N1"; notifPill.className = "px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono text-[9px] font-bold"; }
                if (dockStatus) dockStatus.innerHTML = '<i class="fa-solid fa-circle-check text-[9px]"></i> Nivel 1 Activo';

                if (sandwichSections) sandwichSections.classList.add('hidden');
                if (sandwichStyles) sandwichStyles.classList.add('hidden');
                if (proStylesArea) proStylesArea.classList.add('hidden');

                // Auto open Content sandwich
                openSandwich('content');
            } else if (currentEditDepth === 2) {
                if (badge) badge.innerText = "Reorganiza el orden de las secciones y ajusta visibilidad";
                if (notifText) notifText.innerHTML = '<i class="fa-solid fa-arrows-up-down text-[10px]"></i> Nivel 2: Estructura y reordenamiento de secciones habilitado';
                if (notifPill) { notifPill.innerText = "N2"; notifPill.className = "px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 font-mono text-[9px] font-bold"; }
                if (dockStatus) dockStatus.innerHTML = '<i class="fa-solid fa-circle-check text-[9px]"></i> Nivel 2 Activo';

                if (sandwichSections) sandwichSections.classList.remove('hidden');
                if (sandwichStyles) sandwichStyles.classList.add('hidden');
                if (proStylesArea) proStylesArea.classList.add('hidden');

                openSandwich('sections');
                refreshSectionsReorderList();
            } else if (currentEditDepth === 3) {
                if (badge) badge.innerText = "Colores corporativos, alineaciones y estética general";
                if (notifText) notifText.innerHTML = '<i class="fa-solid fa-palette text-[10px]"></i> Nivel 3: Personalización visual completa habilitada';
                if (notifPill) { notifPill.innerText = "N3"; notifPill.className = "px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-mono text-[9px] font-bold"; }
                if (dockStatus) dockStatus.innerHTML = '<i class="fa-solid fa-circle-check text-[9px]"></i> Nivel 3 Activo';

                if (sandwichSections) sandwichSections.classList.remove('hidden');
                if (sandwichStyles) sandwichStyles.classList.remove('hidden');
                if (proStylesArea) {
                    if (isProUnlocked) proStylesArea.classList.remove('hidden');
                    else proStylesArea.classList.add('hidden');
                }

                openSandwich('styles');
            }
        }

        // SANDWICH ACCORDIONS: OPEN / TOGGLE
        function toggleSandwich(id) {
            const body = document.getElementById('body-sandwich-' + id);
            const icon = document.getElementById('icon-sandwich-' + id);
            if (!body) return;

            const isCurrentlyHidden = body.classList.contains('hidden');
            if (isCurrentlyHidden) {
                body.classList.remove('hidden');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                body.classList.add('hidden');
                if (icon) icon.style.transform = 'rotate(-90deg)';
            }
        }

        function openSandwich(id) {
            const body = document.getElementById('body-sandwich-' + id);
            const icon = document.getElementById('icon-sandwich-' + id);
            if (body) body.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }

        // MORE TOOLS MENU (...)
        function toggleMoreToolsMenu() {
            const menu = document.getElementById('dropdown-more-tools');
            if (menu) menu.classList.toggle('hidden');
        }

        // Close dropdown when clicking outside
        window.addEventListener('click', (e) => {
            const btn = document.getElementById('btn-more-tools');
            const menu = document.getElementById('dropdown-more-tools');
            if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
            }
            const addDrawer = document.getElementById('add-block-drawer');
            const btnAdd = document.getElementById('btn-add-block');
            if (addDrawer && btnAdd && !addDrawer.contains(e.target) && !btnAdd.contains(e.target)) {
                addDrawer.classList.add('hidden');
            }
        });

        // ADD BLOCK FLYOUT DRAWER
        function toggleAddBlockDrawer() {
            const drawer = document.getElementById('add-block-drawer');
            if (drawer) drawer.classList.toggle('hidden');
        }

        function insertQuickWidget(type) {
            toggleAddBlockDrawer();
            insertWidget(type);
        }

        function toggleProModeAccess() {
            if (isProUnlocked) {
                isProUnlocked = false;
                document.getElementById('label-menu-promode').innerText = 'Desbloquear Modo Pro';
                applyEditDepthUI();
                showToast("Modo Pro Bloqueado", "Se restableció la interfaz segura para clientes.");
                return;
            }

            const pin = prompt("Ingresa la clave de Desarrollador Pro:", "2026");
            if (pin === "2026" || pin === "admin") {
                isProUnlocked = true;
                currentEditDepth = 3;
                document.getElementById('label-menu-promode').innerText = '🔒 Bloquear Modo Pro';
                applyEditDepthUI();
                showToast("Modo Pro Desbloqueado", "Herramientas de código CSS y control detallado activas.");
            } else if (pin !== null) {
                alert("Clave incorrecta. Permaneciendo en modo seguro.");
            }
        }

        function clearActiveSelection() {
            selectedElement = null;
            const doc = getIframeDoc();
            if (doc) {
                doc.querySelectorAll('.elementor-selected-element').forEach(el => el.classList.remove('elementor-selected-element'));
            }
            const floatBar = document.getElementById('canvas-floating-bar');
            if (floatBar) floatBar.classList.add('hidden');

            const badge = document.getElementById('sidebar-context-badge');
            if (badge) badge.innerText = "PÁGINA PRINCIPAL";

            const btnClear = document.getElementById('btn-clear-selection');
            if (btnClear) btnClear.classList.add('hidden');
        }

        // PRESET IMAGES FOR PROPERTY HEROES
        function setPresetImage(presetKey) {
            let url = './assets/media/hero_realestate_building.png';
            if (presetKey === 'hero_realestate_interior') url = './assets/media/hero_realestate_interior.png';
            if (presetKey === 'hero_realestate_commercial') url = './assets/media/hero_realestate_commercial.png';

            document.getElementById('ctrl-input-image').value = url;
            updateActiveElementImage(url);
            showToast("Imagen Aplicada", "Se actualizó la fotografía con el preset seleccionado.");
        }

        function updatePropertyMeta(field, val) {
            if (!selectedElement) return;
            const text = selectedElement.innerText;
            // Pushes state and allows easy editing
            pushState('Actualizar ' + field, 'fa-coins');
        }
`;

// Inject into script
if (!html.includes('let currentEditDepth = 1;')) {
    html = html.replace('let currentEditorMode = \'client\';', 'let currentEditorMode = \'client\';\n' + jsLogicAdditions);
}

// Update selectCanvasElement to update contextual badge and sandwiches
const selectCanvasSearch = `function selectCanvasElement(el) {
            if (!el) return;
            selectedElement = el;`;

const selectCanvasReplace = `function selectCanvasElement(el) {
            if (!el) return;
            selectedElement = el;

            // Update Figma/Stitch Contextual Badge
            const contextBadge = document.getElementById('sidebar-context-badge');
            const btnClear = document.getElementById('btn-clear-selection');
            if (contextBadge) {
                const tag = el.tagName.toUpperCase();
                const previewText = el.innerText.trim().slice(0, 18) || tag;
                contextBadge.innerText = tag + ' • ' + previewText;
            }
            if (btnClear) btnClear.classList.remove('hidden');

            // Contextual Sandwich selection: If image, open media sandwich
            if (el.tagName === 'IMG' || el.querySelector('img')) {
                openSandwich('media');
            } else {
                openSandwich('content');
            }`;

if (html.includes(selectCanvasSearch)) {
    html = html.replace(selectCanvasSearch, selectCanvasReplace);
}

// Update refreshSectionsReorderList to target sandwich-sections-list as well
const refreshSecSearch = `const container = document.getElementById('client-sections-list');`;
const refreshSecReplace = `const container = document.getElementById('sandwich-sections-list') || document.getElementById('client-sections-list');`;
if (html.includes(refreshSecSearch)) {
    html = html.replace(refreshSecSearch, refreshSecReplace);
}

// Ensure applyEditDepthUI is called on initialization
if (!html.includes('applyEditDepthUI();')) {
    html = html.replace('applyEditorModeUI();', 'applyEditorModeUI();\n            applyEditDepthUI();');
}

fs.writeFileSync(intranetPath, html, 'utf8');
fs.writeFileSync(editorPath, html, 'utf8');
console.log('Successfully applied Figma & Stitch UX/UI sandwich redesign and progressive depth levels!');
