import fs from 'fs';

let index = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

// ==========================================================
// 1. ADD CSS FOR SCROLL REVEALS, CONTACT HIGHLIGHT & ENGAGEMENT POPUP
// ==========================================================
const animeScrollStyles = `
        /* Anime.js Scroll Reveals & Motion Performance */
        .scroll-from-left, .scroll-from-right, .scroll-stagger-card {
            will-change: transform, opacity;
        }

        /* Contact Form Highlight Animation */
        .contact-form-highlight {
            position: relative;
            transition: box-shadow 0.6s ease, border-color 0.6s ease;
        }
        .contact-form-highlight.highlight-active {
            border-color: rgba(197, 168, 128, 0.6) !important;
            box-shadow: 0 0 50px rgba(197, 168, 128, 0.35), 0 25px 60px rgba(0, 0, 0, 0.6) !important;
        }
        .contact-form-highlight.highlight-active::before {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: inherit;
            padding: 1.5px;
            background: linear-gradient(135deg, rgba(197, 168, 128, 0.8), transparent 50%, rgba(16, 185, 129, 0.5));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            animation: borderPulse 3s ease-in-out infinite;
        }
        @keyframes borderPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }

        /* Engagement Concierge Popup */
        #concierge-engagement-popup {
            will-change: transform, opacity;
        }
`;

index = index.replace('</style>', `${animeScrollStyles}\n    </style>`);

// ==========================================================
// 2. EXPAND HERO SLIDESHOW: ADD MORE IMAGES (5 SLIDES)
// ==========================================================
const oldShowreelSlides = `<div class="absolute inset-0 w-full h-full pointer-events-none z-0" id="showreel-slides">
                            <!-- Slide 0: El Golf -->
                            <div class="showreel-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100" data-slide="0">
                                <div class="w-full h-full bg-cover bg-center transition-transform duration-[14000ms] ease-out will-change-transform scale-100" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9nJvuo4kP2Rui84oy8O3O9IhP-Ougaz8Y1ZSKHIJ2TpREoTNrOQ4-Ub9JRRgtV3CavdW-HA0Fk7bxih_cnTrduTTIVLXUDpGzb64sXFMVxYjbn_wZUCP3Y-mF1uBUoiWG_YRwsFU0Nm6qiH5mpCM5_ZYrTnW0NjsiMUk1fyxbDirktvwRtS9cZ6F4mM_URI6JN3LA6ebDntd1g09jmJ0qIQj5Tj0jV0oloCSp7qVMCULIlFw3G6DXw');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                            <!-- Slide 1: Vitacura -->
                            <div class="showreel-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 pointer-events-none" data-slide="1">
                                <div class="w-full h-full bg-cover bg-center transition-transform duration-[14000ms] ease-out will-change-transform scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-sEPztCFxVYo6Swu37m3xaPwbbSCmLhNinpxyVbNTIaQj00vgZGOh__wX8WrQi_4OraWi78PkHwYxma7AESIfTgG_7DpCYtOSYsPFWckufBTQPzeoG4je7-i_nSZfoD1IE1yAbETwMVl9cjFwi41YYhdVKeK6KvQ--OQ8tO2Hp5lVY5nFaGVWiFf57alhjv8Oq64fNMVX1jzmx9pvb77ebW96qGBJmeeDkRK4vi-S9OJvqwbm7t_uRA');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                            <!-- Slide 2: La Dehesa -->
                            <div class="showreel-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 pointer-events-none" data-slide="2">
                                <div class="w-full h-full bg-cover bg-center transition-transform duration-[14000ms] ease-out will-change-transform scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBH3b0UhbiRiJM-2pmGZZ2GeMBg1R3vc13trkNemq9tHOEPV2fPAS_WJpv7ksZhNkjSmvxw_WETOaGTpH1MVGShzaIfI3-rTm0ErHMj6Yv_0WTax83UrtXo7W0LVtlzc2xLDMa3EEo9tSBe6OBJCCNWdluJpTEyBowkUbPsS8B4sWrIxyZ1PzambAWf9vzqZcB8v31rduvoSXhIuuZaXBQ0-uV9YpFtPbP3TjNhojpX5lPOjfNaB5iGqQ');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                        </div>`;

const newShowreelSlides = `<div class="absolute inset-0 w-full h-full pointer-events-none z-0" id="showreel-slides">
                            <!-- Slide 0: El Golf -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-100" data-slide="0">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-100" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9nJvuo4kP2Rui84oy8O3O9IhP-Ougaz8Y1ZSKHIJ2TpREoTNrOQ4-Ub9JRRgtV3CavdW-HA0Fk7bxih_cnTrduTTIVLXUDpGzb64sXFMVxYjbn_wZUCP3Y-mF1uBUoiWG_YRwsFU0Nm6qiH5mpCM5_ZYrTnW0NjsiMUk1fyxbDirktvwRtS9cZ6F4mM_URI6JN3LA6ebDntd1g09jmJ0qIQj5Tj0jV0oloCSp7qVMCULIlFw3G6DXw');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                            <!-- Slide 1: Vitacura -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="1">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-sEPztCFxVYo6Swu37m3xaPwbbSCmLhNinpxyVbNTIaQj00vgZGOh__wX8WrQi_4OraWi78PkHwYxma7AESIfTgG_7DpCYtOSYsPFWckufBTQPzeoG4je7-i_nSZfoD1IE1yAbETwMVl9cjFwi41YYhdVKeK6KvQ--OQ8tO2Hp5lVY5nFaGVWiFf57alhjv8Oq64fNMVX1jzmx9pvb77ebW96qGBJmeeDkRK4vi-S9OJvqwbm7t_uRA');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                            <!-- Slide 2: La Dehesa -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="2">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBH3b0UhbiRiJM-2pmGZZ2GeMBg1R3vc13trkNemq9tHOEPV2fPAS_WJpv7ksZhNkjSmvxw_WETOaGTpH1MVGShzaIfI3-rTm0ErHMj6Yv_0WTax83UrtXo7W0LVtlzc2xLDMa3EEo9tSBe6OBJCCNWdluJpTEyBowkUbPsS8B4sWrIxyZ1PzambAWf9vzqZcB8v31rduvoSXhIuuZaXBQ0-uV9YpFtPbP3TjNhojpX5lPOjfNaB5iGqQ');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                            <!-- Slide 3: San Damián -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="3">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                            <!-- Slide 4: Viña del Mar -->
                            <div class="showreel-slide absolute inset-0 w-full h-full opacity-0 pointer-events-none" data-slide="4">
                                <div class="slide-bg w-full h-full bg-cover bg-center scale-105" style="background-image: url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80');"></div>
                                <div class="absolute inset-0 bg-gradient-to-t from-tech-base via-tech-base/75 to-tech-base/45"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-tech-base/90 via-tech-base/55 to-transparent"></div>
                            </div>
                        </div>`;

index = index.replace(oldShowreelSlides, newShowreelSlides);

// Update nav buttons for 5 slides
const oldNavButtons = `<div class="grid grid-cols-3 gap-2 w-full sm:w-auto">
                                <button class="showreel-nav-btn text-left p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-100 cursor-pointer" data-target="0" onclick="goToSlide(0)">
                                    <div class="font-label text-[9px] text-white/80 mb-1 font-bold truncate">01 EL GOLF</div>
                                    <div class="w-16 sm:w-24 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-0"></div>
                                    </div>
                                </button>
                                <button class="showreel-nav-btn text-left p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-40 cursor-pointer" data-target="1" onclick="goToSlide(1)">
                                    <div class="font-label text-[9px] text-white/80 mb-1 font-bold truncate">02 VITACURA</div>
                                    <div class="w-16 sm:w-24 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-1"></div>
                                    </div>
                                </button>
                                <button class="showreel-nav-btn text-left p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-40 cursor-pointer" data-target="2" onclick="goToSlide(2)">
                                    <div class="font-label text-[9px] text-white/80 mb-1 font-bold truncate">03 LA DEHESA</div>
                                    <div class="w-16 sm:w-24 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-2"></div>
                                    </div>
                                </button>
                            </div>`;

const newNavButtons = `<div class="grid grid-cols-5 gap-1.5 sm:gap-2 w-full sm:w-auto">
                                <button class="showreel-nav-btn text-left p-1 sm:p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-100 cursor-pointer" data-target="0" onclick="goToSlide(0)">
                                    <div class="font-label text-[8px] sm:text-[9px] text-white/80 mb-1 font-bold truncate">01 EL GOLF</div>
                                    <div class="w-10 sm:w-16 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-0"></div>
                                    </div>
                                </button>
                                <button class="showreel-nav-btn text-left p-1 sm:p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-40 cursor-pointer" data-target="1" onclick="goToSlide(1)">
                                    <div class="font-label text-[8px] sm:text-[9px] text-white/80 mb-1 font-bold truncate">02 VITACURA</div>
                                    <div class="w-10 sm:w-16 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-1"></div>
                                    </div>
                                </button>
                                <button class="showreel-nav-btn text-left p-1 sm:p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-40 cursor-pointer" data-target="2" onclick="goToSlide(2)">
                                    <div class="font-label text-[8px] sm:text-[9px] text-white/80 mb-1 font-bold truncate">03 LA DEHESA</div>
                                    <div class="w-10 sm:w-16 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-2"></div>
                                    </div>
                                </button>
                                <button class="showreel-nav-btn text-left p-1 sm:p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-40 cursor-pointer" data-target="3" onclick="goToSlide(3)">
                                    <div class="font-label text-[8px] sm:text-[9px] text-white/80 mb-1 font-bold truncate">04 S. DAMIÁN</div>
                                    <div class="w-10 sm:w-16 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-3"></div>
                                    </div>
                                </button>
                                <button class="showreel-nav-btn text-left p-1 sm:p-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all opacity-40 cursor-pointer" data-target="4" onclick="goToSlide(4)">
                                    <div class="font-label text-[8px] sm:text-[9px] text-white/80 mb-1 font-bold truncate">05 VIÑA DEL MAR</div>
                                    <div class="w-10 sm:w-16 h-[2px] bg-white/10 overflow-hidden">
                                        <div class="slide-progress-bar h-full bg-white transition-[width] duration-100 ease-linear w-0" id="progress-4"></div>
                                    </div>
                                </button>
                            </div>`;

index = index.replace(oldNavButtons, newNavButtons);

// ==========================================================
// 3. ADD SCROLL-FROM-LEFT / RIGHT CLASSES TO COMPONENTS
// ==========================================================
// Metodología Teaser
index = index.replace(
    '<div class="space-y-4 max-w-2xl">',
    '<div class="space-y-4 max-w-2xl scroll-from-left">'
);
index = index.replace(
    '<div class="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">',
    '<div class="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0 scroll-from-right">'
);

// Contacto Asesor Section: Left info and Right wizard form highlight
index = index.replace(
    '<div class="lg:col-span-5 space-y-6 lg:sticky lg:top-32 text-white">',
    '<div class="lg:col-span-5 space-y-6 lg:sticky lg:top-32 text-white scroll-from-left">'
);
index = index.replace(
    '<div class="lg:col-span-7 bg-tech-card p-8 lg:p-10 rounded-sm border border-tech-border-bright shadow-[0_20px_60px_rgba(0,0,0,0.5)]">',
    '<div class="lg:col-span-7 bg-tech-card p-8 lg:p-10 rounded-sm border border-tech-border-bright shadow-[0_20px_60px_rgba(0,0,0,0.5)] contact-form-highlight scroll-from-right" id="contact-wizard-container">'
);

// ==========================================================
// 4. INSERT FLOATING CONCIERGE ENGAGEMENT POPUP INTO BODY
// ==========================================================
const engagementPopupHtml = `
    <!-- =========================================================
         7. POP-UP DE ENGAGEMENT / ASESOR COMERCIAL ACTIVO (WHATSAPP)
         ========================================================= -->
    <div id="concierge-engagement-popup" class="fixed bottom-6 right-6 z-[100] max-w-sm sm:max-w-md w-[calc(100%-32px)] sm:w-[410px] rounded-sm overflow-hidden bg-[#0D121D]/95 backdrop-blur-xl border border-secondary/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(197,168,128,0.22)] text-white hidden flex-col transition-all">
        
        <!-- Magic UI Border Beam -->
        <div class="border-beam-container"><div class="border-beam-glow"></div></div>

        <!-- Encabezado con imagen del ejecutivo comercial interesado -->
        <div class="p-5 pb-3 flex items-start justify-between relative z-10 border-b border-white/10">
            <div class="flex items-center gap-3.5">
                <!-- Foto Ejecutiva -->
                <div class="relative w-12 h-12 rounded-full overflow-hidden border-2 border-secondary shadow-md shrink-0 bg-tech-card">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80" alt="Ejecutivo Comercial W Gestión" class="w-full h-full object-cover">
                    <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0D121D] rounded-full animate-pulse" title="Disponible ahora"></span>
                </div>
                <div>
                    <span class="font-label text-[9px] uppercase tracking-widest text-secondary font-bold flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> W GESTIÓN INMOBILIARIA
                    </span>
                    <h4 class="font-display font-extrabold text-base sm:text-lg text-white leading-tight mt-0.5">
                        Nos interesa que conversemos
                    </h4>
                    <p class="text-[11px] text-white/70 font-light leading-snug mt-0.5">
                        Cuéntanos si quieres más información sobre nuestras propiedades o administración.
                    </p>
                </div>
            </div>
            
            <button type="button" onclick="closeEngagementPopup()" class="text-white/40 hover:text-white p-1 rounded-sm transition-colors cursor-pointer" title="Cerrar">
                <span class="material-symbols-outlined text-lg">close</span>
            </button>
        </div>

        <!-- Contenido y Acciones: Botón Agendar Reunión ARRIBA con WhatsApp -->
        <div class="p-5 space-y-3.5 relative z-10">
            <!-- BOTÓN DESTACADO ARRIBA CON WHATSAPP -->
            <a href="https://wa.me/56985944821?text=Hola%20W%20Gesti%C3%B3n%2C%20me%20interesa%20conversar%20y%20agendar%20una%20reuni%C3%B3n%20para%20conocer%20m%C3%A1s%20informaci%C3%B3n%20de%20sus%20servicios." target="_blank" rel="noopener noreferrer" class="shimmer-button w-full py-3.5 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white font-label text-xs uppercase tracking-[0.18em] font-extrabold rounded-sm shadow-[0_0_25px_rgba(37,211,102,0.45)] flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                <i class="fa-brands fa-whatsapp text-lg"></i>
                <span>Agendar una reunión</span>
                <span class="material-symbols-outlined text-sm">north_east</span>
            </a>

            <!-- Mini Formulario Rápido -->
            <div class="bg-black/40 p-3.5 rounded-sm border border-white/10 space-y-2.5">
                <div class="text-[9px] font-label uppercase tracking-widest text-white/50 flex items-center justify-between">
                    <span>O ENVÍANOS TU CONTACTO</span>
                    <span class="text-emerald-400 font-mono text-[9px]">RESPUESTA EN 15 MIN</span>
                </div>
                
                <div class="space-y-2 text-xs font-label">
                    <select id="popup-interes" class="w-full bg-[#151B26] border border-white/15 text-white text-xs rounded-sm py-2 px-3 focus:outline-none focus:border-secondary transition-colors">
                        <option value="Compra-Venta de Propiedad">Me interesa Compra o Venta</option>
                        <option value="Arriendo Seguro">Me interesa Arriendo de Propiedad</option>
                        <option value="Administración de Condominio">Me interesa Administración de Condominio</option>
                        <option value="Asesoría General">Consulta General</option>
                    </select>

                    <div class="flex gap-2">
                        <input type="tel" id="popup-telefono" placeholder="Tu Teléfono / WhatsApp" class="flex-1 bg-[#151B26] border border-white/15 text-white text-xs rounded-sm py-2 px-3 placeholder-white/30 focus:outline-none focus:border-secondary transition-colors">
                        <button type="button" onclick="enviarPopupWhatsApp()" class="px-3.5 py-2 bg-secondary hover:bg-white hover:text-tech-base text-white font-bold uppercase tracking-wider text-[10px] rounded-sm transition-all flex items-center gap-1 cursor-pointer shrink-0">
                            <span>Enviar</span>
                            <i class="fa-brands fa-whatsapp text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between text-[10px] font-label text-white/40 pt-0.5">
                <span class="flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Atención preferente ejecutiva
                </span>
                <span class="font-mono">Santiago · Viña del Mar</span>
            </div>
        </div>
    </div>
`;

// Insert engagementPopupHtml before </body>
index = index.replace('</body>', `${engagementPopupHtml}\n</body>`);

// ==========================================================
// 5. UPDATE JAVASCRIPT: ADVANCED ANIME.JS AUTOMATIONS
// ==========================================================
// Check slideshow state variables and update to 5 slides
index = index.replace('const totalSlides = 3;', 'const totalSlides = 5;');

// Update slideLocations array
const oldSlideLocations = `const slideLocations = [
            { location: "SECTOR EL GOLF · LAS CONDES", zone: "SANTIAGO ORIENTE" },
            { location: "SECTOR NUEVA COSTANERA · VITACURA", zone: "VITACURA · SANTIAGO" },
            { location: "SECTOR LA DEHESA · LO BARNECHEA", zone: "LO BARNECHEA · SANTIAGO" }
        ];`;

const newSlideLocations = `const slideLocations = [
            { location: "SECTOR EL GOLF · LAS CONDES", zone: "SANTIAGO ORIENTE" },
            { location: "SECTOR NUEVA COSTANERA · VITACURA", zone: "VITACURA · SANTIAGO" },
            { location: "SECTOR LA DEHESA · LO BARNECHEA", zone: "LO BARNECHEA · SANTIAGO" },
            { location: "SECTOR SAN DAMIÁN · LAS CONDES", zone: "LAS CONDES · SANTIAGO" },
            { location: "BORDE COSTERO · VIÑA DEL MAR", zone: "LITORAL CENTRAL · VALPARAÍSO" }
        ];`;

index = index.replace(oldSlideLocations, newSlideLocations);

// Update goToSlide to use high-end Anime.js transitions
const oldGoToSlide = `function goToSlide(index) {
            currentSlide = index;
            pausedElapsedTime = 0;
            updateSlideUI(currentSlide);
            resetProgressBars();
            if (isPlaying) {
                startProgress();
            }
        }`;

const newGoToSlide = `function goToSlide(index) {
            const prevSlideIndex = currentSlide;
            currentSlide = index;
            pausedElapsedTime = 0;
            
            // Anime.js Banner Slideshow Transition
            if (window.anime) {
                const slides = document.querySelectorAll('.showreel-slide');
                const oldSlide = slides[prevSlideIndex];
                const newSlide = slides[currentSlide];

                if (oldSlide && newSlide && prevSlideIndex !== currentSlide) {
                    anime({
                        targets: oldSlide,
                        opacity: [1, 0],
                        duration: 800,
                        easing: 'easeOutCubic'
                    });
                    anime({
                        targets: newSlide,
                        opacity: [0, 1],
                        duration: 900,
                        easing: 'easeOutCubic'
                    });
                    const newBg = newSlide.querySelector('.slide-bg');
                    if (newBg) {
                        anime({
                            targets: newBg,
                            scale: [1.08, 1],
                            duration: 10000,
                            easing: 'easeOutSine'
                        });
                    }

                    // Transición sutil de ubicación y coordenadas
                    anime({
                        targets: ['#current-slide-location', '#current-gps-coords'],
                        translateY: [8, 0],
                        opacity: [0.3, 1],
                        duration: 500,
                        easing: 'easeOutCubic'
                    });
                }
            }

            updateSlideUI(currentSlide);
            resetProgressBars();
            if (isPlaying) {
                startProgress();
            }
        }`;

index = index.replace(oldGoToSlide, newGoToSlide);

// Update handleServiceTabSwitch to animate section title and badge with Anime.js
const oldTabSwitchAnim = `if (titleEl) titleEl.innerHTML = theme.title;
            if (badgeEl) badgeEl.innerHTML = \`<span class="w-1.5 h-1.5 bg-tech-base rounded-full"></span><span>\${theme.badge}</span>\`;
            if (subtitleEl) subtitleEl.innerHTML = theme.subtitle;`;

const newTabSwitchAnim = `if (titleEl) titleEl.innerHTML = theme.title;
            if (badgeEl) badgeEl.innerHTML = \`<span class="w-1.5 h-1.5 bg-tech-base rounded-full"></span><span>\${theme.badge}</span>\`;
            if (subtitleEl) subtitleEl.innerHTML = theme.subtitle;

            // Anime.js Transición suave de títulos y subtítulos
            if (window.anime) {
                anime({
                    targets: [badgeEl, titleEl, subtitleEl],
                    translateY: [16, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(60),
                    duration: 650,
                    easing: 'easeOutCubic'
                });
            }`;

index = index.replace(oldTabSwitchAnim, newTabSwitchAnim);

// Enhance openPropertyModal and closeModalDirect with Anime.js
const oldModalOpen = `function openPropertyModal(refCode) {
            const overlay = document.getElementById('property-modal-overlay');
            if (!overlay) return;
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            document.body.style.overflow = 'hidden';`;

const newModalOpen = `function openPropertyModal(refCode) {
            const overlay = document.getElementById('property-modal-overlay');
            const card = document.getElementById('property-modal-card');
            if (!overlay || !card) return;
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            document.body.style.overflow = 'hidden';

            // Anime.js Pop-up Animation al momento de activarse
            if (window.anime) {
                anime({
                    targets: overlay,
                    opacity: [0, 1],
                    duration: 300,
                    easing: 'linear'
                });
                anime({
                    targets: card,
                    scale: [0.92, 1],
                    translateY: [35, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'spring(1, 80, 12, 0)'
                });
            }`;

index = index.replace(oldModalOpen, newModalOpen);

const oldModalClose = `function closeModalDirect() {
            const overlay = document.getElementById('property-modal-overlay');
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        }`;

const newModalClose = `function closeModalDirect() {
            const overlay = document.getElementById('property-modal-overlay');
            const card = document.getElementById('property-modal-card');
            if (overlay && card && window.anime) {
                anime({
                    targets: card,
                    scale: [1, 0.94],
                    translateY: [0, 20],
                    opacity: [1, 0],
                    duration: 250,
                    easing: 'easeInCubic'
                });
                anime({
                    targets: overlay,
                    opacity: [1, 0],
                    duration: 250,
                    easing: 'easeInCubic',
                    complete: () => {
                        overlay.classList.add('hidden');
                        overlay.classList.remove('flex');
                        document.body.style.overflow = 'auto';
                    }
                });
            } else if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        }`;

index = index.replace(oldModalClose, newModalClose);

// Add Scroll Observers and Engagement Pop-up logic before </script>
const advancedScriptLogic = `
        /* ==========================================================
           E. ANIME.JS SCROLL REVEALS & CONTACT HIGHLIGHT
           ========================================================== */
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
            initContactFormHighlight();
            initEngagementPopupTimer();
        });

        function initScrollAnimations() {
            if (!('IntersectionObserver' in window) || !window.anime) return;

            // 1. Elementos desplazándose desde la izquierda
            const leftObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target,
                            translateX: [-65, 0],
                            opacity: [0, 1],
                            duration: 850,
                            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.scroll-from-left').forEach(el => {
                el.style.opacity = '0';
                leftObserver.observe(el);
            });

            // 2. Elementos desplazándose desde la derecha
            const rightObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target,
                            translateX: [65, 0],
                            opacity: [0, 1],
                            duration: 850,
                            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.scroll-from-right').forEach(el => {
                el.style.opacity = '0';
                rightObserver.observe(el);
            });
        }

        /* 3. Formulario de contacto destacando y resaltando al momento de ir bajando */
        function initContactFormHighlight() {
            if (!('IntersectionObserver' in window)) return;

            const contactSection = document.getElementById('contacto-asesor');
            const formCard = document.getElementById('contact-wizard-container');

            if (!contactSection || !formCard) return;

            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        formCard.classList.add('highlight-active');
                        if (window.anime) {
                            anime({
                                targets: formCard,
                                scale: [0.97, 1.015, 1],
                                duration: 900,
                                easing: 'easeOutElastic(1, .8)'
                            });
                        }
                    } else {
                        formCard.classList.remove('highlight-active');
                    }
                });
            }, { threshold: 0.25 });

            contactObserver.observe(contactSection);
        }

        /* ==========================================================
           F. POP-UP DE ENGAGEMENT CONVERSACIONAL (2 MINUTOS O RETORNO)
           ========================================================== */
        let hasShownEngagement = false;
        let maxScrollY = 0;

        function initEngagementPopupTimer() {
            // Si el usuario ya cerró el popup en esta sesión, no insistir
            if (sessionStorage.getItem('w_engagement_closed') === 'true') {
                return;
            }

            // 1. Temporizador de 2 minutos (120 segundos)
            setTimeout(() => {
                if (!hasShownEngagement) {
                    showEngagementPopup();
                }
            }, 120000);

            // 2. Detección de "vuelve arriba o se pierde":
            window.addEventListener('scroll', () => {
                const currentY = window.scrollY;
                if (currentY > maxScrollY) {
                    maxScrollY = currentY;
                }

                // Si navegó profundo (> 1200px) y luego retrocede hacia la parte superior (< 400px)
                if (maxScrollY > 1200 && currentY < 400 && !hasShownEngagement) {
                    showEngagementPopup();
                }
            }, { passive: true });
        }

        function showEngagementPopup() {
            if (hasShownEngagement) return;
            hasShownEngagement = true;

            const popup = document.getElementById('concierge-engagement-popup');
            if (!popup) return;

            popup.classList.remove('hidden');
            popup.classList.add('flex');

            if (window.anime) {
                anime({
                    targets: popup,
                    translateY: [100, 0],
                    opacity: [0, 1],
                    scale: [0.94, 1],
                    duration: 850,
                    easing: 'spring(1, 80, 12, 0)'
                });
            }
        }

        function closeEngagementPopup() {
            const popup = document.getElementById('concierge-engagement-popup');
            if (!popup) return;

            if (window.anime) {
                anime({
                    targets: popup,
                    translateY: [0, 90],
                    opacity: [1, 0],
                    scale: [1, 0.94],
                    duration: 350,
                    easing: 'easeInCubic',
                    complete: () => {
                        popup.classList.add('hidden');
                        popup.classList.remove('flex');
                    }
                });
            } else {
                popup.classList.add('hidden');
                popup.classList.remove('flex');
            }
            sessionStorage.setItem('w_engagement_closed', 'true');
        }

        function enviarPopupWhatsApp() {
            const interes = document.getElementById('popup-interes')?.value || 'Servicios Inmobiliarios';
            const telefono = document.getElementById('popup-telefono')?.value || 'No especificado';
            
            const msg = \`Hola W Gestión Inmobiliaria, me interesa que conversemos sobre \${interes}. Mi contacto directo es \${telefono}.\`;
            const url = \`https://wa.me/56985944821?text=\${encodeURIComponent(msg)}\`;
            window.open(url, '_blank');
            closeEngagementPopup();
        }

        // Exponer globalmente para pruebas inmediatas
        window.showEngagementPopup = showEngagementPopup;
`;

index = index.replace('</script>', `${advancedScriptLogic}\n    </script>`);

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', index, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', index, 'utf8');
console.log('✓ Anime.js automations, engagement popup, more images & contact highlight successfully applied.');
