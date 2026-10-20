import fs from 'fs';
import path from 'path';

const intranetPath = 'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/intranet.html';
const editorPath = 'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/editor.html';

let html = fs.readFileSync(intranetPath, 'utf8');

// 1. HEADER: Add Dual Mode Switcher and "Pedir al Dev" button
const headerSearch = '<!-- Live Site Preview -->';
const headerAddition = `
            <!-- DUAL MODE SWITCHER: CLIENTE (SEGURO) VS DESARROLLADOR PRO -->
            <div class="flex items-center bg-[#15171a] p-0.5 rounded-md border border-[#393d41] gap-1 text-[11px]">
                <button onclick="setEditorMode('client')" id="btn-mode-client" class="px-2.5 py-1 rounded bg-[#26292c] text-[#D4AF37] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm" title="Modo Seguro: Edición fácil de textos, imágenes, precios y reordenar secciones sin riesgo de romper el diseño">
                    <i class="fa-solid fa-shield-halved text-xs"></i>
                    <span class="hidden sm:inline font-bold">Modo Cliente</span>
                    <span class="sm:hidden font-bold">Cliente</span>
                </button>
                <button onclick="setEditorMode('dev')" id="btn-mode-dev" class="px-2.5 py-1 rounded text-[#a4afb7] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer" title="Modo Desarrollador Pro: Acceso a estilos CSS, layout, márgenes, padding y widgets avanzados">
                    <i class="fa-solid fa-code text-xs"></i>
                    <span class="hidden xl:inline">Desarrollador Pro</span>
                    <span class="xl:hidden">Pro</span>
                </button>
            </div>

            <!-- SOLICITAR CAMBIO AL DESARROLLADOR (WHATSAPP & EMAIL) -->
            <button onclick="openDeveloperRequestModal()" class="h-8 px-2.5 rounded bg-gradient-to-r from-amber-950/80 to-[#26292c] hover:from-amber-900 hover:to-[#32363b] text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 border border-amber-600/50 shadow transition-all cursor-pointer" title="Solicitar cambio complejo o nueva sección al desarrollador (+56965312618)">
                <i class="fa-solid fa-comments text-xs"></i>
                <span class="hidden md:inline text-[11px] font-semibold">Pedir al Dev</span>
            </button>
`;

if (!html.includes('id="btn-mode-client"')) {
    html = html.replace(headerSearch, headerAddition + '\n            ' + headerSearch);
}

// 2. SIDEBAR HEADER: Add Client sub-tabs for "Contenido" vs "Reordenar Secciones"
const sidebarHeaderSearch = '<div id="view-widgets" class="flex-1 flex flex-col overflow-hidden">';
const sidebarHeaderReplace = `<!-- CLIENT SUB-NAVIGATION IN VIEW WIDGETS -->
            <div id="client-subnav-bar" class="bg-[#1a1d20] border-b border-[#393d41] flex text-[11px] font-semibold">
                <button onclick="switchClientSubTab('catalog')" id="subtab-btn-catalog" class="flex-1 py-2 text-center el-tab-active flex items-center justify-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-th-large text-xs"></i> <span>Elementos</span>
                </button>
                <button onclick="switchClientSubTab('sections')" id="subtab-btn-sections" class="flex-1 py-2 text-center text-[#a4afb7] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-arrows-up-down text-xs text-[#D4AF37]"></i> <span>Reordenar Secciones</span>
                </button>
            </div>

            <!-- REORDER SECTIONS PANEL (MODO CLIENTE SEGURO) -->
            <div id="client-sections-panel" class="hidden flex-1 flex-col overflow-hidden bg-[#26292c]">
                <div class="p-3 bg-[#1e2124] border-b border-[#393d41]">
                    <div class="flex items-center justify-between">
                        <span class="font-heading font-bold text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                            <i class="fa-solid fa-layer-group text-[#D4AF37]"></i> Secciones de la Página
                        </span>
                        <button onclick="refreshSectionsReorderList()" class="text-[#a4afb7] hover:text-white text-xs p-1" title="Actualizar lista">
                            <i class="fa-solid fa-rotate-right"></i>
                        </button>
                    </div>
                    <p class="text-[10px] text-[#a4afb7] mt-1">Reordena o sube/baja secciones completas sin alterar el diseño.</p>
                </div>
                <div id="client-sections-list" class="flex-1 overflow-y-auto p-3 space-y-2">
                    <!-- Dynamic sections inserted by JS -->
                </div>
            </div>

            <div id="view-widgets" class="flex-1 flex flex-col overflow-hidden">`;

if (!html.includes('id="client-subnav-bar"')) {
    html = html.replace(sidebarHeaderSearch, sidebarHeaderReplace);
}

// 3. INSPECTOR: Add "✨ Asistente IA" Button to Text Field and Client Safe Banner
const textGroupSearch = '<div id="ctrl-text-group" class="space-y-1.5">\n                        <label class="block text-[#a4afb7] font-semibold text-[11px]">Texto del Elemento</label>';
const textGroupReplace = `<div id="ctrl-text-group" class="space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label class="block text-[#a4afb7] font-semibold text-[11px]">Texto del Elemento</label>
                            <button type="button" onclick="openAIAssistantModal()" class="px-2 py-0.5 rounded bg-gradient-to-r from-purple-900/90 to-[#92003B] hover:from-purple-800 hover:to-[#b30048] text-white text-[10px] font-bold border border-[#D4AF37]/50 flex items-center gap-1 shadow cursor-pointer transition-all" title="Mejorar redacción con Inteligencia Artificial">
                                <i class="fa-solid fa-wand-magic-sparkles text-[#D4AF37]"></i>
                                <span>Asistente IA</span>
                            </button>
                        </div>`;

if (!html.includes('openAIAssistantModal()')) {
    html = html.replace(textGroupSearch, textGroupReplace);
}

// Client Safe Banner in Inspector
const inspectorTabsSearch = '<!-- The 3 Classic Elementor Tabs -->';
const inspectorTabsAddition = `<!-- CLIENT SAFE MODE NOTICE -->
                <div id="inspector-client-safe-banner" class="bg-[#1a1d20] border-b border-[#393d41] px-3.5 py-2 flex items-center justify-between text-[11px]">
                    <span class="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <i class="fa-solid fa-shield-halved text-xs"></i> Edición Segura de Contenido
                    </span>
                    <button onclick="openDeveloperRequestModal()" class="text-[#D4AF37] hover:underline text-[10px] font-medium flex items-center gap-1">
                        ¿Cambio de estilo? Pedir al Dev &rarr;
                    </button>
                </div>
`;

if (!html.includes('id="inspector-client-safe-banner"')) {
    html = html.replace(inspectorTabsSearch, inspectorTabsAddition + '\n                ' + inspectorTabsSearch);
}

// 4. MODALS: Insert AI Copywriting Modal & Developer Request Modal before closing body
const modalsCode = `
    <!-- ============================================== -->
    <!-- MODAL 1: ASISTENTE IA COPYWRITING (editor-agents) -->
    <!-- ============================================== -->
    <div id="modal-ai-copywriter" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#1e2124] border border-[#D4AF37]/60 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-[#393d41] pb-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-700 to-[#D4AF37] flex items-center justify-center text-white text-base shadow">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div>
                        <h3 class="font-heading font-black text-white text-sm uppercase tracking-wide">Asistente IA Copywriting</h3>
                        <p class="text-[10px] text-[#a4afb7]">Especializado en Bienes Raíces de Lujo en Chile</p>
                    </div>
                </div>
                <button onclick="closeAIAssistantModal()" class="text-[#a4afb7] hover:text-white p-1 cursor-pointer">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <!-- Input Text -->
            <div class="space-y-1">
                <label class="block text-[#a4afb7] text-[11px] font-semibold">Texto Base o Idea Inicial:</label>
                <textarea id="ai-input-text" rows="2" placeholder="Escribe una frase o descripción breve..." class="w-full bg-[#15171a] border border-[#393d41] rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"></textarea>
            </div>

            <!-- Modes Grid -->
            <div class="space-y-1.5">
                <label class="block text-[#a4afb7] text-[11px] font-semibold">Selecciona el Estilo de Redacción:</label>
                <div class="grid grid-cols-2 gap-2">
                    <button type="button" onclick="selectAIMode('elegante')" id="ai-mode-btn-elegante" class="ai-mode-selector p-2.5 rounded-lg border border-[#D4AF37] bg-[#D4AF37]/10 text-left cursor-pointer transition-all">
                        <div class="font-bold text-xs text-white flex items-center gap-1.5">
                            <i class="fa-solid fa-gem text-[#D4AF37]"></i> Elegante / Quiet Luxury
                        </div>
                        <div class="text-[9px] text-[#a4afb7] mt-0.5">Alta gama, refinado, terminaciones y plusvalía</div>
                    </button>
                    <button type="button" onclick="selectAIMode('chile')" id="ai-mode-btn-chile" class="ai-mode-selector p-2.5 rounded-lg border border-[#393d41] bg-[#15171a] hover:bg-[#26292c] text-left cursor-pointer transition-all">
                        <div class="font-bold text-xs text-white flex items-center gap-1.5">
                            <i class="fa-solid fa-map-location-dot text-emerald-400"></i> Vocabulario Chileno
                        </div>
                        <div class="text-[9px] text-[#a4afb7] mt-0.5">Santiago Oriente, Viña del Mar, UF, Copropiedad</div>
                    </button>
                    <button type="button" onclick="selectAIMode('fiduciario')" id="ai-mode-btn-fiduciario" class="ai-mode-selector p-2.5 rounded-lg border border-[#393d41] bg-[#15171a] hover:bg-[#26292c] text-left cursor-pointer transition-all">
                        <div class="font-bold text-xs text-white flex items-center gap-1.5">
                            <i class="fa-solid fa-scale-balanced text-blue-400"></i> Fiduciario & Legal
                        </div>
                        <div class="text-[9px] text-[#a4afb7] mt-0.5">Auditoría de títulos, tasación técnica, Ley 21.442</div>
                    </button>
                    <button type="button" onclick="selectAIMode('cta')" id="ai-mode-btn-cta" class="ai-mode-selector p-2.5 rounded-lg border border-[#393d41] bg-[#15171a] hover:bg-[#26292c] text-left cursor-pointer transition-all">
                        <div class="font-bold text-xs text-white flex items-center gap-1.5">
                            <i class="fa-solid fa-bullseye text-amber-400"></i> Llamado a la Acción (CTA)
                        </div>
                        <div class="text-[9px] text-[#a4afb7] mt-0.5">Agendar visita privada, solicitar dossier UF</div>
                    </button>
                </div>
            </div>

            <!-- Action Button -->
            <button type="button" onclick="triggerAIGeneration()" id="btn-ai-generate" class="w-full bg-[#D4AF37] hover:bg-[#b89320] text-black font-heading font-black py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-950/40">
                <i class="fa-solid fa-wand-magic-sparkles text-xs" id="ai-icon-generate"></i>
                <span id="ai-label-generate">GENERAR PROPUESTA CON IA</span>
            </button>

            <!-- Result Box -->
            <div id="ai-result-box" class="space-y-1.5 hidden">
                <div class="flex items-center justify-between">
                    <span class="text-[10px] text-[#D4AF37] font-mono font-bold uppercase">Resultado Sugerido:</span>
                    <span class="text-[9px] text-emerald-400 font-mono flex items-center gap-1"><i class="fa-solid fa-check"></i> Listo para aplicar</span>
                </div>
                <textarea id="ai-output-text" rows="3" class="w-full bg-[#15171a] border border-[#D4AF37] rounded-lg p-2.5 text-white text-xs focus:outline-none leading-relaxed"></textarea>
                <div class="flex items-center justify-end gap-2 pt-1">
                    <button type="button" onclick="copyAIText()" class="px-3 py-1.5 rounded bg-[#26292c] hover:bg-[#32363b] text-gray-300 text-xs flex items-center gap-1 cursor-pointer">
                        <i class="fa-solid fa-copy text-xs"></i> Copiar
                    </button>
                    <button type="button" onclick="applyAITextToElement()" class="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow">
                        <i class="fa-solid fa-check text-xs"></i> Aplicar al Elemento
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================== -->
    <!-- MODAL 2: SOLICITAR CAMBIO AL DESARROLLADOR    -->
    <!-- ============================================== -->
    <div id="modal-developer-request" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#1e2124] border border-[#393d41] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-[#393d41] pb-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#92003B] to-[#D4AF37] flex items-center justify-center text-white text-base shadow">
                        <i class="fa-solid fa-comments"></i>
                    </div>
                    <div>
                        <h3 class="font-heading font-black text-white text-sm uppercase tracking-wide">Solicitar Cambio Avanzado al Desarrollador</h3>
                        <p class="text-[10px] text-[#a4afb7]">Canal directo con el programador web para ajustes a medida</p>
                    </div>
                </div>
                <button onclick="closeDeveloperRequestModal()" class="text-[#a4afb7] hover:text-white p-1 cursor-pointer">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <div class="bg-[#15171a] p-3 rounded-lg border border-[#393d41] text-[11px] text-gray-300 space-y-1">
                <div class="flex items-center gap-1.5 text-[#D4AF37] font-bold">
                    <i class="fa-solid fa-circle-info"></i> ¿Para qué sirve este canal?
                </div>
                <p>Usa este canal si necesitas crear una nueva sección interactiva, integrar formularios a un CRM, modificar la paleta corporativa o agregar animaciones personalizadas complejas.</p>
            </div>

            <!-- Form Fields -->
            <div class="space-y-3">
                <div>
                    <label class="block text-[#a4afb7] text-[11px] font-semibold mb-1">Tipo de Requerimiento:</label>
                    <select id="dev-req-category" class="w-full bg-[#15171a] border border-[#393d41] rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-[#D4AF37]">
                        <option value="Nueva Sección a Medida">Nueva Sección a Medida (Galería, Testimonios, etc.)</option>
                        <option value="Modificación Estructural de Diseño">Modificación Estructural de Maquetación / Grillas</option>
                        <option value="Ajuste de Colores y Tipografía">Ajuste de Paleta de Colores y Tipografía Global</option>
                        <option value="Animaciones e Interactividad">Animaciones Especiales (Anime.js / Scroll)</option>
                        <option value="Integración Externa / CRM / Pagos">Integración Externa (CRM, Base de Datos, Pagos)</option>
                        <option value="Otro Requerimiento Especial">Otro Requerimiento Especial</option>
                    </select>
                </div>

                <div>
                    <label class="block text-[#a4afb7] text-[11px] font-semibold mb-1">Tu Nombre o Empresa:</label>
                    <input type="text" id="dev-req-name" value="W Gestión Inmobiliaria" class="w-full bg-[#15171a] border border-[#393d41] rounded-lg p-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]">
                </div>

                <div>
                    <label class="block text-[#a4afb7] text-[11px] font-semibold mb-1">Detalle del requerimiento:</label>
                    <textarea id="dev-req-desc" rows="3" placeholder="Describe qué sección o funcionalidad necesitas agregar o modificar..." class="w-full bg-[#15171a] border border-[#393d41] rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-[#D4AF37]"></textarea>
                </div>
            </div>

            <!-- Send Buttons -->
            <div class="pt-2 space-y-2">
                <button type="button" onclick="sendDeveloperRequest('whatsapp')" class="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading font-black py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/40">
                    <i class="fa-brands fa-whatsapp text-sm"></i>
                    <span>Enviar Solicitud por WhatsApp (+56 9 6531 2618)</span>
                </button>
                <button type="button" onclick="sendDeveloperRequest('email')" class="w-full bg-[#26292c] hover:bg-[#32363b] text-white border border-[#393d41] font-heading font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-all cursor-pointer">
                    <i class="fa-solid fa-envelope text-xs text-[#D4AF37]"></i>
                    <span>Enviar por Correo Electrónico (automatizable@gmail.com)</span>
                </button>
            </div>
        </div>
    </div>
`;

if (!html.includes('id="modal-ai-copywriter"')) {
    html = html.replace('<!-- NOTIFICATION TOAST NOTIFIER -->', modalsCode + '\n    <!-- NOTIFICATION TOAST NOTIFIER -->');
}

// 5. JAVASCRIPT: Logic for Dual Mode, AI Assistant, and Section Reordering
const jsAdditions = `
        // ==============================================
        // DUAL MODE ENGINE: CLIENTE SEGURO VS PRO
        // ==============================================
        let currentEditorMode = 'client'; // Default safe mode
        let currentAIMode = 'elegante';

        function setEditorMode(mode) {
            if (mode === 'dev' && currentEditorMode === 'client') {
                const pin = prompt("Ingresa la clave de Desarrollador Pro (o presiona Aceptar para continuar):", "2026");
                if (pin === null) return;
                if (pin.trim() !== "2026" && pin.trim() !== "admin") {
                    alert("Clave incorrecta. Permaneciendo en Modo Cliente Seguro.");
                    return;
                }
            }

            currentEditorMode = mode;
            applyEditorModeUI();
            showToast(mode === 'client' ? "Modo Cliente Activado" : "Modo Desarrollador Activado",
                      mode === 'client' ? "Interfaz protegida contra errores de diseño." : "Herramientas avanzadas de CSS y DOM desbloqueadas.");
        }

        function applyEditorModeUI() {
            const btnClient = document.getElementById('btn-mode-client');
            const btnDev = document.getElementById('btn-mode-dev');
            const tabStyle = document.getElementById('tab-btn-style');
            const tabAdvanced = document.getElementById('tab-btn-advanced');
            const safeBanner = document.getElementById('inspector-client-safe-banner');
            const tagSelector = document.getElementById('ctrl-select-tag')?.parentElement;
            const subnavBar = document.getElementById('client-subnav-bar');

            if (currentEditorMode === 'client') {
                btnClient.className = "px-2.5 py-1 rounded bg-[#26292c] text-[#D4AF37] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm";
                btnDev.className = "px-2.5 py-1 rounded text-[#a4afb7] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer";
                
                // Hide technical tabs in inspector
                if (tabStyle) tabStyle.classList.add('hidden');
                if (tabAdvanced) tabAdvanced.classList.add('hidden');
                if (safeBanner) safeBanner.classList.remove('hidden');
                if (tagSelector) tagSelector.classList.add('hidden');
                if (subnavBar) subnavBar.classList.remove('hidden');

                // Always force Content tab in client mode
                switchElementorTab('content');
            } else {
                btnDev.className = "px-2.5 py-1 rounded bg-[#26292c] text-[#D4AF37] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm";
                btnClient.className = "px-2.5 py-1 rounded text-[#a4afb7] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer";
                
                // Show technical tabs in inspector
                if (tabStyle) tabStyle.classList.remove('hidden');
                if (tabAdvanced) tabAdvanced.classList.remove('hidden');
                if (safeBanner) safeBanner.classList.add('hidden');
                if (tagSelector) tagSelector.classList.remove('hidden');
            }
        }

        function switchClientSubTab(tab) {
            const btnCat = document.getElementById('subtab-btn-catalog');
            const btnSec = document.getElementById('subtab-btn-sections');
            const viewWidgets = document.getElementById('view-widgets');
            const panelSections = document.getElementById('client-sections-panel');

            if (tab === 'catalog') {
                btnCat.className = "flex-1 py-2 text-center el-tab-active flex items-center justify-center gap-1.5 cursor-pointer";
                btnSec.className = "flex-1 py-2 text-center text-[#a4afb7] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer";
                viewWidgets.classList.remove('hidden');
                panelSections.classList.add('hidden');
            } else {
                btnSec.className = "flex-1 py-2 text-center el-tab-active flex items-center justify-center gap-1.5 cursor-pointer";
                btnCat.className = "flex-1 py-2 text-center text-[#a4afb7] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer";
                viewWidgets.classList.add('hidden');
                panelSections.classList.remove('hidden');
                refreshSectionsReorderList();
            }
        }

        // ==============================================
        // SECTION REORDERING (SAFE DOM SWAPPING)
        // ==============================================
        function getMajorSections() {
            const doc = getIframeDoc();
            if (!doc || !doc.body) return [];
            return Array.from(doc.querySelectorAll('body > section, body > header, body > footer, main > section, [id="catalogo-activo"], [id="metodologia-fiduciaria"], [id="contacto-asesor"]'));
        }

        function refreshSectionsReorderList() {
            const container = document.getElementById('client-sections-list');
            if (!container) return;
            container.innerHTML = '';

            const sections = getMajorSections();
            if (sections.length === 0) {
                container.innerHTML = '<p class="text-[11px] text-[#a4afb7] text-center py-4">No se detectaron secciones independientes.</p>';
                return;
            }

            sections.forEach((sec, idx) => {
                const title = sec.getAttribute('aria-label') || sec.id || sec.tagName.toLowerCase();
                const card = document.createElement('div');
                card.className = "bg-[#1e2124] border border-[#393d41] rounded-lg p-2.5 flex items-center justify-between text-white hover:border-[#D4AF37]/50 transition-colors";
                card.innerHTML = \`
                    <div class="flex items-center gap-2 truncate cursor-pointer" onclick="focusSectionByIndex(\${idx})">
                        <span class="w-5 h-5 rounded-full bg-[#15171a] text-[#D4AF37] font-mono text-[10px] flex items-center justify-center font-bold">\${idx + 1}</span>
                        <span class="text-xs font-semibold truncate capitalize">\${title.replace(/-/g, ' ')}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <button onclick="moveSectionByIndex(\${idx}, 'up')" \${idx === 0 ? 'disabled' : ''} class="w-6 h-6 rounded bg-[#15171a] hover:bg-[#26292c] disabled:opacity-30 disabled:hover:bg-[#15171a] text-[#a4afb7] hover:text-white flex items-center justify-center text-[10px] cursor-pointer" title="Subir sección">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button onclick="moveSectionByIndex(\${idx}, 'down')" \${idx === sections.length - 1 ? 'disabled' : ''} class="w-6 h-6 rounded bg-[#15171a] hover:bg-[#26292c] disabled:opacity-30 disabled:hover:bg-[#15171a] text-[#a4afb7] hover:text-white flex items-center justify-center text-[10px] cursor-pointer" title="Bajar sección">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                \`;
                container.appendChild(card);
            });
        }

        function focusSectionByIndex(index) {
            const sections = getMajorSections();
            if (sections[index]) {
                sections[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                selectCanvasElement(sections[index]);
            }
        }

        function moveSectionByIndex(index, direction) {
            const sections = getMajorSections();
            const target = sections[index];
            if (!target) return;

            const parent = target.parentNode;
            if (direction === 'up' && index > 0) {
                const prev = sections[index - 1];
                parent.insertBefore(target, prev);
            } else if (direction === 'down' && index < sections.length - 1) {
                const next = sections[index + 1];
                parent.insertBefore(next, target);
            }

            pushState('Reordenar Sección: ' + (target.id || target.tagName), 'fa-arrows-up-down');
            refreshSectionsReorderList();
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast("Sección Reordenada", "Se actualizó la jerarquía del sitio correctamente.");
        }

        // ==============================================
        // AI COPYWRITING ASSISTANT ENGINE (editor-agents)
        // ==============================================
        function openAIAssistantModal() {
            const modal = document.getElementById('modal-ai-copywriter');
            const inputText = document.getElementById('ai-input-text');
            const outputBox = document.getElementById('ai-result-box');

            if (outputBox) outputBox.classList.add('hidden');

            // Pre-fill with active element text if available
            if (selectedElement) {
                inputText.value = selectedElement.innerText.trim();
            } else {
                inputText.value = "Exclusiva residencia en Santiago Oriente con plusvalía garantizada.";
            }

            selectAIMode('elegante');
            modal.classList.remove('hidden');
        }

        function closeAIAssistantModal() {
            document.getElementById('modal-ai-copywriter').classList.add('hidden');
        }

        function selectAIMode(mode) {
            currentAIMode = mode;
            document.querySelectorAll('.ai-mode-selector').forEach(btn => {
                btn.className = "ai-mode-selector p-2.5 rounded-lg border border-[#393d41] bg-[#15171a] hover:bg-[#26292c] text-left cursor-pointer transition-all";
            });
            const activeBtn = document.getElementById('ai-mode-btn-' + mode);
            if (activeBtn) {
                activeBtn.className = "ai-mode-selector p-2.5 rounded-lg border border-[#D4AF37] bg-[#D4AF37]/10 text-left cursor-pointer transition-all";
            }
        }

        async function triggerAIGeneration() {
            const inputText = document.getElementById('ai-input-text').value.trim();
            const btn = document.getElementById('btn-ai-generate');
            const icon = document.getElementById('ai-icon-generate');
            const label = document.getElementById('ai-label-generate');
            const outputBox = document.getElementById('ai-result-box');
            const outputText = document.getElementById('ai-output-text');

            if (!inputText) {
                alert("Por favor escribe una frase o idea para generar el texto.");
                return;
            }

            btn.disabled = true;
            icon.className = "fa-solid fa-spinner fa-spin text-xs";
            label.innerText = "PROCESANDO COPYWRITING CON IA...";

            try {
                const res = await fetch('/api/ai/enhance-text', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: inputText, mode: currentAIMode })
                });
                const data = await res.json();

                if (data.success && data.enhanced) {
                    outputText.value = data.enhanced;
                    outputBox.classList.remove('hidden');
                } else {
                    alert("No se pudo generar el texto. Intenta nuevamente.");
                }
            } catch (err) {
                console.error("Error al consultar Asistente IA:", err);
                // Fallback copy
                outputText.value = "Propiedad de alta gama con finas terminaciones en enclave residencial exclusivo. Conectividad y plusvalía asegurada.";
                outputBox.classList.remove('hidden');
            } finally {
                btn.disabled = false;
                icon.className = "fa-solid fa-wand-magic-sparkles text-xs";
                label.innerText = "GENERAR PROPUESTA CON IA";
            }
        }

        function applyAITextToElement() {
            const outputText = document.getElementById('ai-output-text').value.trim();
            if (!outputText) return;

            if (selectedElement) {
                selectedElement.innerText = outputText;
                document.getElementById('ctrl-input-text').value = outputText;
                pushState('Mejora con Asistente IA', 'fa-wand-magic-sparkles');
                showToast("Texto Actualizado con IA", "Se aplicó el nuevo contenido fiduciario.");
            } else {
                alert("Selecciona un elemento en la página para aplicar este texto.");
            }
            closeAIAssistantModal();
        }

        function copyAIText() {
            const text = document.getElementById('ai-output-text').value;
            navigator.clipboard.writeText(text);
            showToast("Texto Copiado", "Copiado al portapapeles.");
        }

        // ==============================================
        // DEVELOPER REQUEST CHANNEL (WHATSAPP & EMAIL)
        // ==============================================
        function openDeveloperRequestModal() {
            document.getElementById('modal-developer-request').classList.remove('hidden');
        }

        function closeDeveloperRequestModal() {
            document.getElementById('modal-developer-request').classList.add('hidden');
        }

        async function sendDeveloperRequest(channel) {
            const category = document.getElementById('dev-req-category').value;
            const contactName = document.getElementById('dev-req-name').value.trim() || 'Cliente W Gestión';
            const description = document.getElementById('dev-req-desc').value.trim();

            if (!description) {
                alert("Por favor describe brevemente qué cambio o sección necesitas solicitar.");
                return;
            }

            try {
                const res = await fetch('/api/developer-request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category, contactName, description })
                });
                const data = await res.json();

                if (data.success) {
                    if (channel === 'whatsapp' && data.waLink) {
                        window.open(data.waLink, '_blank');
                    } else if (channel === 'email' && data.mailtoLink) {
                        window.location.href = data.mailtoLink;
                    }
                    showToast("Solicitud Generada", "Abriendo canal de comunicación con el desarrollador.");
                    closeDeveloperRequestModal();
                }
            } catch (err) {
                console.error("Error al estructurar solicitud:", err);
                const msg = encodeURIComponent(\`Solicitud: \${category}\\nCliente: \${contactName}\\nDetalle: \${description}\`);
                if (channel === 'whatsapp') {
                    window.open(\`https://wa.me/56965312618?text=\${msg}\`, '_blank');
                } else {
                    window.location.href = \`mailto:automatizable@gmail.com?subject=Solicitud%20Cambio&body=\${msg}\`;
                }
                closeDeveloperRequestModal();
            }
        }
`;

if (!html.includes('currentEditorMode =')) {
    html = html.replace('let selectedElement = null;', 'let selectedElement = null;\n' + jsAdditions);
}

// Ensure applyEditorModeUI is called on initialization
if (!html.includes('applyEditorModeUI();')) {
    html = html.replace('window.addEventListener(\'DOMContentLoaded\', checkAutosaveOnLoad);', 'window.addEventListener(\'DOMContentLoaded\', () => {\n            checkAutosaveOnLoad();\n            applyEditorModeUI();\n        });');
}

fs.writeFileSync(intranetPath, html, 'utf8');
fs.writeFileSync(editorPath, html, 'utf8');
console.log('Successfully updated intranet.html and editor.html with Dual Mode, AI Copywriter, and Developer Request Channel!');
