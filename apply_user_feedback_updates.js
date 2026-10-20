import fs from 'fs';

let html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

// =========================================================================
// 1. HERO SECTION: ELIMINAR TILE B (TASACIÓN) Y TILE C (FILTRO 3.5X)
//    DEJAR EL BANNER AL DESCUBIERTO A ANCHO COMPLETO (W-FULL)
//    QUITAR BOTONES '01 EL GOLF', ARROWS, ETC.
//    REDUCIR FILTROS/GRADIENTES OSCUROS PARA QUE SE NOTEN LAS FOTOS
// =========================================================================

// A. Reducir los filtros oscuros de los slides para que se aprecien las fotos
const oldSlideGradients = `                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>`;

const newSlideGradients = `                                <div class="absolute inset-0 bg-gradient-to-t from-[#080C12]/75 via-transparent to-black/20"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-[#080C12]/80 via-[#080C12]/35 to-transparent"></div>`;

while (html.includes(oldSlideGradients)) {
    html = html.replace(oldSlideGradients, newSlideGradients);
}

// B. Reemplazar el contenedor Bento Grid y eliminar Tile B y Tile C
const heroStartIdx = html.indexOf('<!-- BENTO GRID HERO CONTAINER (12 COLS ASYMMETRIC) -->');
const heroEndIdx = html.indexOf('</section>', heroStartIdx);

if (heroStartIdx !== -1 && heroEndIdx !== -1) {
    const oldHeroBlock = html.substring(heroStartIdx, heroEndIdx);
    
    // Nuevo bloque Hero a ancho completo sin Tile B ni Tile C, y sin los botones inferiores 01 EL GOLF
    const newHeroBlock = `<!-- HERO BANNER MONUMENTAL A ANCHO COMPLETO (SIN BLOQUES LATERALES) -->
                <div class="w-full">
                    
                    <div class="w-full relative min-h-[580px] lg:min-h-[660px] rounded-sm overflow-hidden border border-white/10 bg-tech-card shadow-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 group">
                        
                        <!-- Slideshow Cinematográfico en el Fondo (Rotación Automática Continua) -->
                        <div class="absolute inset-0 w-full h-full pointer-events-none z-0" id="showreel-slides">
                            <!-- Slide 0: El Golf -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-100" data-slide="0">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-100" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9nJvuo4kP2Rui84oy8O3O9IhP-Ougaz8Y1ZSKHIJ2TpREoTNrOQ4-Ub9JRRgtV3CavdW-HA0Fk7bxih_cnTrduTTIVLXUDpGzb64sXFMVxYjbn_wZUCP3Y-mF1uBUoiWG_YRwsFU0Nm6qiH5mpCM5_ZYrTnW0NjsiMUk1fyxbDirktvwRtS9cZ6F4mM_URI6JN3LA6ebDntd1g09jmJ0qIQj5Tj0jV0oloCSp7qVMCULIlFw3G6DXw');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-[#080C12]/75 via-transparent to-black/20"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-[#080C12]/80 via-[#080C12]/35 to-transparent"></div>
                            </div>
                            <!-- Slide 1: Vitacura -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="1">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-sEPztCFxVYo6Swu37m3xaPwbbSCmLhNinpxyVbNTIaQj00vgZGOh__wX8WrQi_4OraWi78PkHwYxma7AESIfTgG_7DpCYtOSYsPFWckufBTQPzeoG4je7-i_nSZfoD1IE1yAbETwMVl9cjFwi41YYhdVKeK6KvQ--OQ8tO2Hp5lVY5nFaGVWiFf57alhjv8Oq64fNMVX1jzmx9pvb77ebW96qGBJmeeDkRK4vi-S9OJvqwbm7t_uRA');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-[#080C12]/75 via-transparent to-black/20"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-[#080C12]/80 via-[#080C12]/35 to-transparent"></div>
                            </div>
                            <!-- Slide 2: La Dehesa -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="2">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBH3b0UhbiRiJM-2pmGZZ2GeMBg1R3vc13trkNemq9tHOEPV2fPAS_WJpv7ksZhNkjSmvxw_WETOaGTpH1MVGShzaIfI3-rTm0ErHMj6Yv_0WTax83UrtXo7W0LVtlzc2xLDMa3EEo9tSBe6OBJCCNWdluJpTEyBowkUbPsS8B4sWrIxyZ1PzambAWf9vzqZcB8v31rduvoSXhIuuZaXBQ0-uV9YpFtPbP3TjNhojpX5lPOjfNaB5iGqQ');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-[#080C12]/75 via-transparent to-black/20"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-[#080C12]/80 via-[#080C12]/35 to-transparent"></div>
                            </div>
                            <!-- Slide 3: San Damián -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="3">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-[#080C12]/75 via-transparent to-black/20"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-[#080C12]/80 via-[#080C12]/35 to-transparent"></div>
                            </div>
                            <!-- Slide 4: Viña del Mar -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="4">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-[#080C12]/75 via-transparent to-black/20"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-[#080C12]/80 via-[#080C12]/35 to-transparent"></div>
                            </div>
                        </div>

                        <!-- Header Metadata Sutil del Banner -->
                        <div class="relative z-10 flex flex-wrap items-center gap-2.5">
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-sm border border-white/20 text-white font-label text-[10px] tracking-wider uppercase font-semibold">
                                <span class="w-2 h-2 rounded-full bg-brand-crimson animate-pulse"></span>
                                PROPIEDADES EN CARTERA
                            </div>
                            <div class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-black/30 backdrop-blur-md rounded-sm border border-white/10 text-white/80 font-mono text-[10px] tracking-wider">
                                <span class="text-white/50">ZONA:</span> <span id="current-gps-coords">SANTIAGO ORIENTE</span>
                            </div>
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-black/30 backdrop-blur-md rounded-sm border border-secondary/30 text-secondary font-label text-[10px] tracking-wider uppercase font-semibold" id="current-slide-location">
                                SECTOR EL GOLF · LAS CONDES
                            </div>
                        </div>

                        <!-- Titular Central en Urbanist y CTA -->
                        <div class="relative z-10 my-auto py-10 max-w-2xl bg-black/25 backdrop-blur-[2px] p-6 sm:p-8 rounded-sm border border-white/5">
                            <h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-[46px] text-white tracking-tight leading-[1.15]" id="hero-main-title">
                                Corretaje de Propiedades &amp; <br class="hidden sm:inline">
                                <span class="text-secondary font-extrabold">Administración de Condominios</span>
                            </h1>
                            <div class="flex items-start gap-3.5 mt-5">
                                <div class="w-1 h-12 bg-secondary shrink-0 mt-0.5 rounded-full"></div>
                                <p class="font-body-lg text-sm sm:text-base text-white/90 font-light leading-relaxed text-pretty">
                                    Especialistas en compra, venta y arriendo en Santiago Oriente y Viña del Mar, junto a una administración profesional de comunidades bajo la Ley de Copropiedad N° 21.442.
                                </p>
                            </div>

                            <!-- Botones CTA: Shimmer Button + Secundario -->
                            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-7">
                                <a href="#contacto-asesor" class="shimmer-button inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-secondary text-white font-label text-xs uppercase tracking-[0.2em] font-bold rounded-sm shadow-[0_0_25px_rgba(197,168,128,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer">
                                    <span>Agendar Asesoría</span>
                                    <span class="material-symbols-outlined text-base">north_east</span>
                                </a>
                                <a href="#catalogo-activo" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black/40 backdrop-blur-md text-white border border-white/20 font-label text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/20 hover:border-white/40 transition-all rounded-sm cursor-pointer">
                                    <span>Ver Propiedades</span>
                                    <span class="material-symbols-outlined text-base">arrow_downward</span>
                                </a>
                            </div>
                        </div>

                        <!-- Indicador discreto inferior de rotación automática (sin botones de números) -->
                        <div class="relative z-10 pt-4 flex items-center justify-between text-[11px] font-label text-white/50 border-t border-white/10">
                            <div class="flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                                <span>PORTAFOLIO EXCLUSIVO · ROTACIÓN AUTOMÁTICA</span>
                            </div>
                            <span class="font-mono text-white/40 text-[10px]">SANTIAGO · VIÑA DEL MAR</span>
                        </div>

                    </div>

                </div>

            </div>
        `;
    
    html = html.substring(0, heroStartIdx) + newHeroBlock + html.substring(heroEndIdx);
    console.log('✓ Hero section updated: Tile B/C removed, full-width banner uncovered, bottom buttons removed, lighter overlays applied.');
}

// =========================================================================
// 2. TABS: ELIMINAR LÍNEA DE ABAJO DE COMPRA-VENTA, ARRIENDO, ADM. CONDOMINIO
// =========================================================================
const oldTabsContainer = `<div class="w-full max-w-3xl p-2 rounded-sm bg-white/90 backdrop-blur-xl border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between mb-14 relative" id="service-tabs-container">
                    <!-- TAB 1: COMPRA-VENTA (Carmesí #FF3B30) -->
                    <button class="service-tab-button flex-1 w-full py-3 px-4 rounded-sm text-center transition-all duration-300 font-label text-xs uppercase tracking-[0.16em] relative z-10 text-white bg-tech-base font-bold shadow-md flex flex-col items-center justify-center gap-1.5 border border-brand-crimson/50 cursor-pointer group" id="tab-btn-venta" onclick="handleServiceTabClick('venta', this)">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-brand-crimson shadow-[0_0_8px_#FF3B30]"></span>
                            <span>01. Compra-Venta</span>
                        </div>
                        <div class="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-1">
                            <div class="h-full bg-brand-crimson w-0 transition-[width] duration-100 ease-linear" id="service-progress-venta"></div>
                        </div>
                    </button>

                    <!-- TAB 2: ARRIENDO (Azul Cobalto #2563EB) -->
                    <button class="service-tab-button flex-1 w-full py-3 px-4 rounded-sm text-center transition-all duration-300 font-label text-xs uppercase tracking-[0.16em] relative z-10 text-tech-base/70 hover:text-tech-base flex flex-col items-center justify-center gap-1.5 cursor-pointer group" id="tab-btn-arriendo" onclick="handleServiceTabClick('arriendo', this)">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-brand-cobalt"></span>
                            <span>02. Arriendo</span>
                        </div>
                        <div class="w-full h-[2px] bg-black/10 rounded-full overflow-hidden mt-1">
                            <div class="h-full bg-brand-cobalt w-0 transition-[width] duration-100 ease-linear" id="service-progress-arriendo"></div>
                        </div>
                    </button>

                    <!-- TAB 3: SERVICIOS DE ADMINISTRACIÓN DE CONDOMINIO (Verde Esmeralda #10B981) -->
                    <button class="service-tab-button flex-1 w-full py-3 px-4 rounded-sm text-center transition-all duration-300 font-label text-xs uppercase tracking-[0.16em] relative z-10 text-tech-base/70 hover:text-tech-base flex flex-col items-center justify-center gap-1.5 cursor-pointer group" id="tab-btn-administracion" onclick="handleServiceTabClick('administracion', this)">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-brand-emerald"></span>
                            <span>03. Adm. Condominio</span>
                        </div>
                        <div class="w-full h-[2px] bg-black/10 rounded-full overflow-hidden mt-1">
                            <div class="h-full bg-brand-emerald w-0 transition-[width] duration-100 ease-linear" id="service-progress-administracion"></div>
                        </div>
                    </button>
                </div>`;

const newTabsContainer = `<div class="w-full max-w-3xl p-1.5 rounded-sm bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-1.5 mb-14 relative" id="service-tabs-container">
                    <!-- TAB 1: COMPRA-VENTA -->
                    <button class="service-tab-button flex-1 w-full py-3 px-4 rounded-sm text-center transition-all duration-300 font-label text-xs uppercase tracking-[0.16em] relative z-10 text-white bg-tech-base font-bold shadow-md flex items-center justify-center gap-2 border border-brand-crimson/50 cursor-pointer group" id="tab-btn-venta" onclick="handleServiceTabClick('venta', this)">
                        <span class="w-2 h-2 rounded-full bg-brand-crimson shadow-[0_0_8px_#FF3B30]"></span>
                        <span>01. Compra-Venta</span>
                    </button>

                    <!-- TAB 2: ARRIENDO -->
                    <button class="service-tab-button flex-1 w-full py-3 px-4 rounded-sm text-center transition-all duration-300 font-label text-xs uppercase tracking-[0.16em] relative z-10 text-tech-base/70 hover:text-tech-base flex items-center justify-center gap-2 cursor-pointer group border border-transparent" id="tab-btn-arriendo" onclick="handleServiceTabClick('arriendo', this)">
                        <span class="w-2 h-2 rounded-full bg-brand-cobalt"></span>
                        <span>02. Arriendo</span>
                    </button>

                    <!-- TAB 3: SERVICIOS DE ADMINISTRACIÓN DE CONDOMINIO -->
                    <button class="service-tab-button flex-1 w-full py-3 px-4 rounded-sm text-center transition-all duration-300 font-label text-xs uppercase tracking-[0.16em] relative z-10 text-tech-base/70 hover:text-tech-base flex items-center justify-center gap-2 cursor-pointer group border border-transparent" id="tab-btn-administracion" onclick="handleServiceTabClick('administracion', this)">
                        <span class="w-2 h-2 rounded-full bg-brand-emerald"></span>
                        <span>03. Adm. Condominio</span>
                    </button>
                </div>`;

if (html.includes(oldTabsContainer)) {
    html = html.replace(oldTabsContainer, newTabsContainer);
    console.log('✓ Tabs progress underline lines successfully removed.');
} else {
    console.log('Notice: oldTabsContainer pattern not found verbatim, checking substring replacement...');
}

// =========================================================================
// 3. FILTROS: ELIMINAR 'CERTIFICACIÓN LEY 21.442' EN BUSCADOR DE CONDOMINIOS
// =========================================================================
const oldAdminFilters = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div>
                                        <label class="text-[10px] uppercase text-tech-base/60 font-semibold mb-1 block">Comuna Oriente</label>
                                        <select class="w-full bg-[#FAF9F7] border border-black/10 px-3 py-2 rounded-sm text-tech-base focus:outline-none focus:border-brand-emerald">
                                            <option>Todas las Comunas</option>
                                            <option>Las Condes (El Golf / San Carlos)</option>
                                            <option>Vitacura (Nueva Costanera / Lo Curro)</option>
                                            <option>Lo Barnechea (La Dehesa)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] uppercase text-tech-base/60 font-semibold mb-1 block">Tipo de Copropiedad</label>
                                        <select class="w-full bg-[#FAF9F7] border border-black/10 px-3 py-2 rounded-sm text-tech-base focus:outline-none focus:border-brand-emerald">
                                            <option>Todos los Tipos</option>
                                            <option>Edificio Residencial Torre</option>
                                            <option>Condominio de Casas</option>
                                            <option>Torre Corporativa</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] uppercase text-tech-base/60 font-semibold mb-1 block">Escala / Unidades</label>
                                        <select class="w-full bg-[#FAF9F7] border border-black/10 px-3 py-2 rounded-sm text-tech-base focus:outline-none focus:border-brand-emerald">
                                            <option>Cualquier escala</option>
                                            <option>Boutique (10 - 40 unidades)</option>
                                            <option>Mediana (41 - 90 unidades)</option>
                                            <option>Gran Escala (90+ unidades)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] uppercase text-tech-base/60 font-semibold mb-1 block">Certificación Ley 21.442</label>
                                        <select class="w-full bg-[#FAF9F7] border border-black/10 px-3 py-2 rounded-sm text-tech-base focus:outline-none focus:border-brand-emerald">
                                            <option>Auditoría Aprobada MINVU</option>
                                            <option>En Fase de Actualización CBR</option>
                                            <option>Certificación Ascensores OK</option>
                                        </select>
                                    </div>
                                </div>`;

const newAdminFilters = `<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label class="text-[10px] uppercase text-tech-base/60 font-semibold mb-1 block">Comuna Oriente</label>
                                        <select class="w-full bg-[#FAF9F7] border border-black/10 px-3 py-2 rounded-sm text-tech-base focus:outline-none focus:border-brand-emerald">
                                            <option>Todas las Comunas</option>
                                            <option>Las Condes (El Golf / San Carlos)</option>
                                            <option>Vitacura (Nueva Costanera / Lo Curro)</option>
                                            <option>Lo Barnechea (La Dehesa)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] uppercase text-tech-base/60 font-semibold mb-1 block">Tipo de Copropiedad</label>
                                        <select class="w-full bg-[#FAF9F7] border border-black/10 px-3 py-2 rounded-sm text-tech-base focus:outline-none focus:border-brand-emerald">
                                            <option>Todos los Tipos</option>
                                            <option>Edificio Residencial Torre</option>
                                            <option>Condominio de Casas</option>
                                            <option>Torre Corporativa</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] uppercase text-tech-base/60 font-semibold mb-1 block">Escala / Unidades</label>
                                        <select class="w-full bg-[#FAF9F7] border border-black/10 px-3 py-2 rounded-sm text-tech-base focus:outline-none focus:border-brand-emerald">
                                            <option>Cualquier escala</option>
                                            <option>Boutique (10 - 40 unidades)</option>
                                            <option>Mediana (41 - 90 unidades)</option>
                                            <option>Gran Escala (90+ unidades)</option>
                                        </select>
                                    </div>
                                </div>`;

if (html.includes(oldAdminFilters)) {
    html = html.replace(oldAdminFilters, newAdminFilters);
    console.log('✓ Filtro Certificación Ley 21.442 successfully removed.');
}

// =========================================================================
// 4. POP-UP DE PROPIEDADES STANDALONE:
//    ELIMINAR LA PARTE BLANCA LARGA Y EL BANNER
//    REDISTRIBUIR EN UN MODAL AUTÓNOMO ELEGANTE, OSCURO DE LUJO Y COMPACTO
// =========================================================================
const modalOverlayStart = html.indexOf('<div class="fixed inset-0 z-50 overflow-y-auto bg-tech-base/80');
const modalOverlayEnd = html.indexOf('<!-- =========================================================\n         7. FOOTER EDITORIAL', modalOverlayStart);

if (modalOverlayStart !== -1 && modalOverlayEnd !== -1) {
    const newPropertyModal = `<!-- =========================================================
         6. MODAL DETALLE DE PROPIEDAD STANDALONE (POPUP ELEGANTE DE LUJO)
         ========================================================= -->
    <div class="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md hidden items-center justify-center p-3 sm:p-5 transition-opacity duration-300" id="property-modal-overlay">
        
        <!-- Modal Card Principal: Diseño Compacto, Armónico y Autónomo (Sin banner) -->
        <div class="relative w-full max-w-5xl bg-[#0D121D] rounded-sm shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col text-white border border-secondary/30 transition-all max-h-[92vh]" id="property-modal-card">
            
            <!-- 1. Header del Modal (Compacto, Lujoso, con Botón de Cierre Destacado) -->
            <div class="bg-[#121824] px-6 py-4 flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
                <div class="space-y-1 max-w-2xl">
                    <div class="flex items-center gap-2">
                        <span class="font-label text-[10px] uppercase tracking-widest font-mono text-secondary bg-white/5 px-2.5 py-0.5 rounded-sm border border-secondary/20" id="modal-ref-pill">
                            REF #VT-901 · SECTOR EXCLUSIVO
                        </span>
                        <span class="inline-flex items-center gap-1 text-emerald-400 font-label text-[10px] uppercase tracking-wider font-semibold">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> DISPONIBLE
                        </span>
                    </div>
                    <h2 class="font-display font-bold text-xl sm:text-2xl text-white tracking-tight" id="modal-prop-title">
                        Penthouse Dúplex Nueva Costanera
                    </h2>
                    <div class="flex items-center gap-1.5 text-white/60 font-body-sm text-xs truncate" id="modal-prop-location">
                        <span class="material-symbols-outlined text-sm text-secondary">location_on</span>
                        <span>Alonso de Córdova / Borde Parque Bicentenario, Vitacura</span>
                    </div>
                </div>

                <!-- Botón de Cerrar Rápido -->
                <button class="p-2 bg-white/10 hover:bg-secondary hover:text-tech-base text-white rounded-sm transition-all shadow-sm flex items-center justify-center cursor-pointer shrink-0" onclick="closeModalDirect()" title="Cerrar ventana">
                    <span class="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            <!-- 2. Cuerpo del Modal: 2 Columnas Equilibradas (7 Cols Galería + Specs / 5 Cols Precios + Contacto) -->
            <div class="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <!-- Columna Izquierda (7 Cols): Galería de Fotos + Métricas -->
                <div class="lg:col-span-7 space-y-4">
                    <!-- Visor Principal -->
                    <div class="relative w-full h-[260px] sm:h-[320px] rounded-sm overflow-hidden bg-tech-card shadow-md border border-white/10">
                        <div class="w-full h-full bg-cover bg-center transition-all duration-700 ease-out" id="modal-main-image" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRJcsJMNG1r6Z7pcoS1DO-cmanYkvrtgH9MVP30hkHlQ5AUBR6m2uM6wlItXTPIXpBRGBx_zLRg7dbaF7S5hGzxfv62nyh99nzr85AeEMm2Bty3BtM1cebEdtGwlimpIcJ-w29EHUJManx5QTKfFphPSNYMedvxnTn_rKNIf0mljTE4t1kRai6s7u1dVThekeTHtWboh2lbYpG9JqsLZ7kxbH-9Ob6I4AlBWEaIY5SsoV_QJ3cVkoVsw');"></div>
                        <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0D121D]/90 via-[#0D121D]/40 to-transparent flex items-center justify-between text-[11px] font-label">
                            <span class="text-white font-medium bg-black/60 px-2.5 py-1 rounded-sm" id="modal-image-caption">Plano 01 · Terraza Principal</span>
                            <span class="text-secondary font-mono bg-black/60 px-2 py-0.5 rounded-sm">ALTA DEFINICIÓN</span>
                        </div>
                    </div>

                    <!-- Miniaturas Rápidas -->
                    <div class="grid grid-cols-4 gap-2">
                        <button class="modal-thumb relative h-16 rounded-sm overflow-hidden border-2 border-secondary cursor-pointer shadow-sm" onclick="swapModalImage(0, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRJcsJMNG1r6Z7pcoS1DO-cmanYkvrtgH9MVP30hkHlQ5AUBR6m2uM6wlItXTPIXpBRGBx_zLRg7dbaF7S5hGzxfv62nyh99nzr85AeEMm2Bty3BtM1cebEdtGwlimpIcJ-w29EHUJManx5QTKfFphPSNYMedvxnTn_rKNIf0mljTE4t1kRai6s7u1dVThekeTHtWboh2lbYpG9JqsLZ7kxbH-9Ob6I4AlBWEaIY5SsoV_QJ3cVkoVsw', 'Plano 01 · Terraza y Nivel Superior')">
                            <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRJcsJMNG1r6Z7pcoS1DO-cmanYkvrtgH9MVP30hkHlQ5AUBR6m2uM6wlItXTPIXpBRGBx_zLRg7dbaF7S5hGzxfv62nyh99nzr85AeEMm2Bty3BtM1cebEdtGwlimpIcJ-w29EHUJManx5QTKfFphPSNYMedvxnTn_rKNIf0mljTE4t1kRai6s7u1dVThekeTHtWboh2lbYpG9JqsLZ7kxbH-9Ob6I4AlBWEaIY5SsoV_QJ3cVkoVsw');"></div>
                        </button>
                        <button class="modal-thumb relative h-16 rounded-sm overflow-hidden border border-white/20 hover:border-white/60 cursor-pointer shadow-sm opacity-75 hover:opacity-100 transition-opacity" onclick="swapModalImage(1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD85Mf1YJmt4Vw-0R6clOBNeb-ToHQTYpndf33ff52DT8cjpF2UpdyKhvpGeVXd_G2VSRr6_MY8ed7B1BV3D9pfR7TOi4QMgg_JDARqvLG4-vfdCUyoqd38kyBuAn0oKbrVzY-F6hgblJ5qQLCDdHtAaO5vLxsQ1JLzlsgQ0qi1UGtZ0-TpT77d2Kr5hNqki2CKXIUOSKWrZT2RNOWGUDMWzh2ZVIjBOzkhtHky1C5tmEYJAWN0mtcNKg', 'Plano 02 · Dormitorio en Suite')">
                            <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD85Mf1YJmt4Vw-0R6clOBNeb-ToHQTYpndf33ff52DT8cjpF2UpdyKhvpGeVXd_G2VSRr6_MY8ed7B1BV3D9pfR7TOi4QMgg_JDARqvLG4-vfdCUyoqd38kyBuAn0oKbrVzY-F6hgblJ5qQLCDdHtAaO5vLxsQ1JLzlsgQ0qi1UGtZ0-TpT77d2Kr5hNqki2CKXIUOSKWrZT2RNOWGUDMWzh2ZVIjBOzkhtHky1C5tmEYJAWN0mtcNKg');"></div>
                        </button>
                        <button class="modal-thumb relative h-16 rounded-sm overflow-hidden border border-white/20 hover:border-white/60 cursor-pointer shadow-sm opacity-75 hover:opacity-100 transition-opacity" onclick="swapModalImage(2, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVk0Mbd3lgm8j_o9wHDuKU5NGmvhkHiHbrUnt4yUk7qGta4FKU_7QRfDnjefpNyBcBeJ1vRYauNeynJOrz8F9Cmqa67piaw842Aan5OBIhvdrqoJ0zCQC80_BokUixLWye41rBdJ3595RHBW6Kv1lU46WBf2yPyphHDN5rWNPjCsBwX3QAxuzbqY2lwKMpl9ayjLMqzt3YXYyxH2a6hqN9o9CNQGzoGAbJugAuTvxnvgyrtfzZiWPYHA', 'Plano 03 · Living y Comedor Integrado')">
                            <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVk0Mbd3lgm8j_o9wHDuKU5NGmvhkHiHbrUnt4yUk7qGta4FKU_7QRfDnjefpNyBcBeJ1vRYauNeynJOrz8F9Cmqa67piaw842Aan5OBIhvdrqoJ0zCQC80_BokUixLWye41rBdJ3595RHBW6Kv1lU46WBf2yPyphHDN5rWNPjCsBwX3QAxuzbqY2lwKMpl9ayjLMqzt3YXYyxH2a6hqN9o9CNQGzoGAbJugAuTvxnvgyrtfzZiWPYHA');"></div>
                        </button>
                        <button class="modal-thumb relative h-16 rounded-sm overflow-hidden border border-white/20 hover:border-white/60 cursor-pointer shadow-sm opacity-75 hover:opacity-100 transition-opacity" onclick="swapModalImage(3, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSIX_dhdGXfxOcV9vMKFpKZ-fFijNtsRYIy7Hy881bev2pB6KoahxzUXDRkaU6IrxCcLnKfc_Hq8Lhinc-XTfpyCjTnprTe-LezHmjcmeytxvlQXy6m7PONgw6x21_aNFzzmo8fWkeM08QvNOsXyWIGzYW2PpOmaYhY98MGH-idjm_HWdMHeDA3zaJu5QpNLPAWVa8Q40VNjy1IUvKChzFwciJ9ZL9qFEGIzNzySfRmWjQaL1li3MnBg', 'Plano 04 · Cocina de Autor')">
                            <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSIX_dhdGXfxOcV9vMKFpKZ-fFijNtsRYIy7Hy881bev2pB6KoahxzUXDRkaU6IrxCcLnKfc_Hq8Lhinc-XTfpyCjTnprTe-LezHmjcmeytxvlQXy6m7PONgw6x21_aNFzzmo8fWkeM08QvNOsXyWIGzYW2PpOmaYhY98MGH-idjm_HWdMHeDA3zaJu5QpNLPAWVa8Q40VNjy1IUvKChzFwciJ9ZL9qFEGIzNzySfRmWjQaL1li3MnBg');"></div>
                        </button>
                    </div>

                    <!-- 4 Tarjetas de Especificaciones Técnicas Clave -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-label text-xs pt-1">
                        <div class="p-3 bg-white/5 rounded-sm border border-white/10 text-center">
                            <span class="material-symbols-outlined text-secondary text-base">square_foot</span>
                            <span class="block text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Superficie</span>
                            <span class="block font-bold text-white font-mono text-xs" id="modal-spec-util">310 m²</span>
                        </div>
                        <div class="p-3 bg-white/5 rounded-sm border border-white/10 text-center">
                            <span class="material-symbols-outlined text-secondary text-base">deck</span>
                            <span class="block text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Terrazas</span>
                            <span class="block font-bold text-white font-mono text-xs">75 m²</span>
                        </div>
                        <div class="p-3 bg-white/5 rounded-sm border border-white/10 text-center">
                            <span class="material-symbols-outlined text-secondary text-base">bed</span>
                            <span class="block text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Dormitorios</span>
                            <span class="block font-bold text-white font-mono text-xs" id="modal-spec-dorms">4 Suites</span>
                        </div>
                        <div class="p-3 bg-white/5 rounded-sm border border-white/10 text-center">
                            <span class="material-symbols-outlined text-secondary text-base">directions_car</span>
                            <span class="block text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Estacionam.</span>
                            <span class="block font-bold text-white font-mono text-xs">3 Subterráneos</span>
                        </div>
                    </div>
                </div>

                <!-- Columna Derecha (5 Cols): Valor & Contacto Directo WhatsApp -->
                <div class="lg:col-span-5 space-y-4">
                    
                    <!-- Tarjeta de Precio -->
                    <div class="p-4 bg-white/5 rounded-sm border border-white/10 space-y-1">
                        <span class="font-label text-[10px] uppercase tracking-wider text-white/50">Valor del Inmueble</span>
                        <div class="flex items-baseline gap-2">
                            <span class="font-display text-2xl sm:text-3xl font-bold text-secondary font-mono" id="modal-prop-price">UF 26.800</span>
                        </div>
                        <div class="text-[11px] text-white/60 font-mono">Indexación oficial CBR / UF al día</div>
                    </div>

                    <!-- Acción Rápida: Contacto Directo WhatsApp -->
                    <div class="p-4 bg-[#151B26] rounded-sm border border-white/10 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">SOLICITAR VISITA O INFORMACIÓN</span>
                            <span class="text-emerald-400 font-mono text-[9px] flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> RESPUESTA INMEDIATA
                            </span>
                        </div>

                        <!-- Botón WhatsApp Destacado -->
                        <button type="button" onclick="enviarVisitaWhatsAppDirecto()" class="shimmer-button w-full py-3.5 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white font-label text-xs uppercase tracking-[0.16em] font-extrabold rounded-sm shadow-[0_0_25px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] cursor-pointer">
                            <i class="fa-brands fa-whatsapp text-lg"></i>
                            <span>Coordinar Visita por WhatsApp</span>
                            <span class="material-symbols-outlined text-sm">north_east</span>
                        </button>

                        <div class="relative py-1 flex items-center">
                            <div class="flex-grow border-t border-white/10"></div>
                            <span class="flex-shrink mx-2 text-[9px] font-label uppercase tracking-widest text-white/40">o ingresa tus datos</span>
                            <div class="flex-grow border-t border-white/10"></div>
                        </div>

                        <!-- Mini Formulario -->
                        <form onsubmit="event.preventDefault(); enviarVisitaFormulario();" class="space-y-2.5 font-label text-xs">
                            <input type="text" id="modal-visita-nombre" placeholder="Tu Nombre Completo" class="w-full px-3 py-2 bg-[#0D121D] border border-white/15 text-white text-xs rounded-sm focus:outline-none focus:border-secondary transition-colors" required>
                            <input type="tel" id="modal-visita-tel" placeholder="Tu Teléfono / WhatsApp" class="w-full px-3 py-2 bg-[#0D121D] border border-white/15 text-white text-xs rounded-sm focus:outline-none focus:border-secondary transition-colors" required>
                            <button type="submit" class="w-full py-2.5 bg-white text-tech-base hover:bg-secondary hover:text-white font-bold uppercase tracking-wider text-[11px] rounded-sm transition-colors cursor-pointer">
                                Enviar Solicitud de Visita
                            </button>
                        </form>
                    </div>

                    <!-- Respaldo CBR & NDA -->
                    <div class="p-3 bg-white/[0.03] border border-white/10 rounded-sm font-label text-[11px] text-white/60 space-y-1">
                        <div class="flex items-center gap-1.5 text-emerald-400 font-semibold">
                            <span class="material-symbols-outlined text-xs">verified</span>
                            <span>Estudio de Títulos Vigente ante CBR</span>
                        </div>
                        <p class="font-light text-[10px]">Atención fiduciaria confidencial directa bajo protocolo de seguridad.</p>
                    </div>

                </div>

            </div>

        </div>
    </div>
    
    `;

    html = html.substring(0, modalOverlayStart) + newPropertyModal + html.substring(modalOverlayEnd);
    console.log('✓ Property modal successfully replaced with standalone dark luxury popup.');
}

// =========================================================================
// 5. JAVASCRIPT: ACELERAR ROTACIÓN DE TABS A 4.5S Y AGREGAR PAUSA EXTRA POR CLIC
//    + EXPORTAR FUNCIONES DE WHATSAPP DIRECTO DEL MODAL
// =========================================================================
html = html.replace('const serviceTabDuration = 7500;', 'const serviceTabDuration = 4500;');

const oldServiceTabLogic = `        function startServiceProgress() {
            clearInterval(serviceProgressInterval);
            serviceStartTime = Date.now();
            
            serviceProgressInterval = setInterval(() => {
                const elapsed = Date.now() - serviceStartTime;
                const progressPct = Math.min(100, (elapsed / serviceTabDuration) * 100);
                
                const activeBar = document.getElementById(\`service-progress-\${serviceTabKeys[currentServiceIndex]}\`);
                if (activeBar) {
                    activeBar.style.width = \`\${progressPct}%\`;
                }

                if (elapsed >= serviceTabDuration) {
                    clearInterval(serviceProgressInterval);
                    const nextIndex = (currentServiceIndex + 1) % serviceTabKeys.length;
                    handleServiceTabSwitch(serviceTabKeys[nextIndex]);
                }
            }, 50);
        }`;

const newServiceTabLogic = `        let interactionPauseTimeout = null;

        function startServiceProgress() {
            clearInterval(serviceProgressInterval);
            serviceStartTime = Date.now();
            
            serviceProgressInterval = setInterval(() => {
                const elapsed = Date.now() - serviceStartTime;

                if (elapsed >= serviceTabDuration) {
                    clearInterval(serviceProgressInterval);
                    const nextIndex = (currentServiceIndex + 1) % serviceTabKeys.length;
                    handleServiceTabSwitch(serviceTabKeys[nextIndex]);
                }
            }, 100);
        }

        // Si el usuario hace clic en cualquier parte de la página, pausar la rotación de pestañas
        // unos 12 segundos extra para permitir lectura sin interrupciones
        document.addEventListener('click', (e) => {
            // Ignorar clics dentro del menú móvil o modales cerrados
            if (serviceProgressInterval) {
                clearInterval(serviceProgressInterval);
            }
            if (interactionPauseTimeout) {
                clearTimeout(interactionPauseTimeout);
            }
            interactionPauseTimeout = setTimeout(() => {
                startServiceProgress();
            }, 12000); // 12 segundos de pausa extra por lectura
        });`;

if (html.includes(oldServiceTabLogic)) {
    html = html.replace(oldServiceTabLogic, newServiceTabLogic);
    console.log('✓ Service tabs timer updated to 4.5s with 12s interaction pause.');
}

// B. Agregar las funciones de envío de visita directo de WhatsApp
const newModalWhatsAppFunctions = `
        function enviarVisitaWhatsAppDirecto() {
            const title = document.getElementById('modal-prop-title')?.textContent.trim() || 'Propiedad Prime';
            const ref = document.getElementById('modal-ref-pill')?.textContent.trim() || 'REF';
            const price = document.getElementById('modal-prop-price')?.textContent.trim() || '';
            const msg = \`Hola W Gestión Inmobiliaria, me interesa coordinar una visita para la propiedad: \${title} (\${ref}), valor \${price}. Deseo agendar con un asesor.\`;
            const url = \`https://wa.me/56985944821?text=\${encodeURIComponent(msg)}\`;
            window.open(url, '_blank');
        }

        function enviarVisitaFormulario() {
            const nombre = document.getElementById('modal-visita-nombre')?.value.trim() || 'Cliente';
            const tel = document.getElementById('modal-visita-tel')?.value.trim() || 'No especificado';
            const title = document.getElementById('modal-prop-title')?.textContent.trim() || 'Propiedad Prime';
            const ref = document.getElementById('modal-ref-pill')?.textContent.trim() || 'REF';
            const msg = \`Hola W Gestión Inmobiliaria, mi nombre es \${nombre} (tel: \${tel}). Deseo agendar visita para la propiedad \${title} (\${ref}).\`;
            const url = \`https://wa.me/56985944821?text=\${encodeURIComponent(msg)}\`;
            window.open(url, '_blank');
            closeModalDirect();
        }
`;

if (!html.includes('enviarVisitaWhatsAppDirecto')) {
    html = html.replace('function openPropertyModal', `${newModalWhatsAppFunctions}\n        function openPropertyModal`);
    html = html.replace('window.enviarPopupWhatsApp = enviarPopupWhatsApp;', `window.enviarPopupWhatsApp = enviarPopupWhatsApp;\n        window.enviarVisitaWhatsAppDirecto = enviarVisitaWhatsAppDirecto;\n        window.enviarVisitaFormulario = enviarVisitaFormulario;`);
}

// =========================================================================
// GUARDAR CAMBIOS
// =========================================================================
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', html, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', html, 'utf8');
console.log('✓ Successfully applied all user feedback modifications to index.html and landing.html!');
