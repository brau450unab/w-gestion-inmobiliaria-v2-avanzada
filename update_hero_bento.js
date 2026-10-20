import fs from 'fs';

// Read index.html
let index = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

// 1. Add Magic UI and Bento Grid CSS keyframes to <style>
const bentoMagicCss = `
        /* ==========================================================
           MAGIC UI & 21ST.DEV BENTO GRID ANIMATIONS
           ========================================================== */
        /* Border Beam Animation */
        @keyframes border-beam {
            100% {
                offset-distance: 100%;
            }
        }
        .border-beam-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            border-radius: inherit;
            border: 1.5px solid transparent;
            mask: linear-gradient(transparent, transparent), linear-gradient(#000, #000);
            mask-composite: intersect;
            -webkit-mask-composite: source-in;
            mask-clip: padding-box, border-box;
            z-index: 20;
        }
        .border-beam-glow {
            position: absolute;
            aspect-ratio: 1;
            width: 130px;
            background: linear-gradient(to right, #C5A880, #E2B170, transparent);
            offset-path: rect(0 auto auto 0 round 8px);
            animation: border-beam 7s linear infinite;
        }

        /* Shimmer Button */
        .shimmer-button {
            position: relative;
            overflow: hidden;
            isolation: isolate;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .shimmer-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -120%;
            width: 240%;
            height: 100%;
            background: linear-gradient(
                115deg,
                transparent 0%,
                rgba(255, 255, 255, 0.08) 25%,
                rgba(255, 255, 255, 0.45) 50%,
                rgba(255, 255, 255, 0.08) 75%,
                transparent 100%
            );
            transform: skewX(-22deg);
            animation: shimmerSlide 4.5s ease-in-out infinite;
            pointer-events: none;
        }
        @keyframes shimmerSlide {
            0% { left: -140%; }
            35%, 100% { left: 140%; }
        }

        /* Bento Card Hover Depth */
        .bento-card-hover {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .bento-card-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(197, 168, 128, 0.15);
        }
`;

// Insert bentoMagicCss into <style> before </style>
index = index.replace('</style>', `${bentoMagicCss}\n    </style>`);

// 2. Replace current hero section with Animated Bento Grid Hero
const oldHeroRegex = /<!-- =========================================================\s*2\. BANNER HERO SHOWREEL VANGUARDISTA\s*========================================================= -->[\s\S]*?<!-- =========================================================\s*3\. SELECTOR DE 3 SERVICIOS CON GLOW TECH & EFECTO AGUA/i;

const newBentoHeroHtml = `<!-- =========================================================
         2. HERO BENTO GRID ANIMADO (SHADCN / 21ST.DEV & MAGIC UI)
         ========================================================= -->
    <main class="w-full">
        <section class="relative w-full bg-[#080C12] pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden flex flex-col justify-center" id="hero-showreel-section">
            <!-- Ambient Blueprint Grid & Glow -->
            <div class="absolute inset-0 bg-grid-blueprint pointer-events-none opacity-50 z-0"></div>
            <div class="absolute -top-32 right-1/4 w-[650px] h-[650px] rounded-full bg-secondary/10 blur-[150px] pointer-events-none z-0"></div>

            <div class="max-w-[1700px] w-full mx-auto relative z-10">
                
                <!-- BENTO GRID HERO CONTAINER (12 COLS ASYMMETRIC) -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    
                    <!-- ==============================================
                         TILE A: PRINCIPAL HERO BENTO (Span 8 Cols)
                         ============================================== -->
                    <div class="lg:col-span-8 relative min-h-[560px] lg:min-h-[640px] rounded-sm overflow-hidden border border-white/10 bg-tech-card shadow-2xl flex flex-col justify-between p-6 sm:p-10 group">
                        
                        <!-- Slideshow Cinematográfico en el Fondo -->
                        <div class="absolute inset-0 w-full h-full pointer-events-none z-0" id="showreel-slides">
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
                        </div>

                        <!-- Header Metadata del Bento Principal -->
                        <div class="relative z-10 flex flex-wrap items-center gap-2.5">
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-sm border border-white/20 text-white font-label text-[10px] tracking-wider uppercase font-semibold">
                                <span class="w-2 h-2 rounded-full bg-brand-crimson animate-pulse"></span>
                                PROPIEDADES EN CARTERA
                            </div>
                            <div class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 backdrop-blur-md rounded-sm border border-white/10 text-white/70 font-mono text-[10px] tracking-wider">
                                <span class="text-white/40">ZONA:</span> <span id="current-gps-coords">SANTIAGO ORIENTE</span>
                            </div>
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md rounded-sm border border-white/10 text-secondary font-label text-[10px] tracking-wider uppercase font-semibold" id="current-slide-location">
                                SECTOR EL GOLF · LAS CONDES
                            </div>
                        </div>

                        <!-- Titular Central en Urbanist -->
                        <div class="relative z-10 my-auto py-8 max-w-2xl">
                            <h1 class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                                Corretaje de Propiedades &amp; <br class="hidden sm:inline">
                                <span class="text-secondary font-extrabold">Administración de Condominios</span>
                            </h1>
                            <div class="flex items-start gap-3.5 mt-5">
                                <div class="w-1 h-12 bg-secondary shrink-0 mt-0.5 rounded-full"></div>
                                <p class="font-body-lg text-sm sm:text-base text-white/85 font-light leading-relaxed text-pretty">
                                    Especialistas en compra, venta y arriendo en Santiago Oriente y Viña del Mar, junto a una administración profesional de comunidades bajo la Ley de Copropiedad N° 21.442.
                                </p>
                            </div>

                            <!-- Botones CTA: Shimmer Button + Secundario -->
                            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-7">
                                <a href="#contacto-asesor" class="shimmer-button inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-secondary text-white font-label text-xs uppercase tracking-[0.2em] font-bold rounded-sm shadow-[0_0_25px_rgba(197,168,128,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer">
                                    <span>Agendar Asesoría</span>
                                    <span class="material-symbols-outlined text-base">north_east</span>
                                </a>
                                <a href="#catalogo-activo" class="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-label text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/20 hover:border-white/40 transition-all rounded-sm cursor-pointer">
                                    <span>Ver Propiedades</span>
                                    <span class="material-symbols-outlined text-base">arrow_downward</span>
                                </a>
                            </div>
                        </div>

                        <!-- Barra de Diapositivas Integrada -->
                        <div class="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div class="grid grid-cols-3 gap-2 w-full sm:w-auto">
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
                            </div>
                            <div class="flex items-center gap-1.5 self-end sm:self-auto">
                                <button aria-label="Diapositiva previa" class="w-7 h-7 rounded-sm bg-white/5 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" onclick="prevSlide()">
                                    <span class="material-symbols-outlined text-sm">west</span>
                                </button>
                                <button aria-label="Pausa o play" class="w-7 h-7 rounded-sm bg-white/5 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" id="toggle-play-btn" onclick="togglePlayPause()">
                                    <span class="material-symbols-outlined text-sm" id="play-pause-icon">pause</span>
                                </button>
                                <button aria-label="Siguiente diapositiva" class="w-7 h-7 rounded-sm bg-white/5 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" onclick="nextSlide()">
                                    <span class="material-symbols-outlined text-sm">east</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    <!-- ==============================================
                         COLUMNA DERECHA BENTO (Span 4 Cols)
                         ============================================== -->
                    <div class="lg:col-span-4 flex flex-col justify-between gap-5">
                        
                        <!-- BENTO TILE B: TELEMETRÍA PATRIMONIAL CON BORDER BEAM -->
                        <div class="relative overflow-hidden rounded-sm border border-white/10 bg-tech-card p-6 sm:p-7 flex flex-col justify-between shadow-xl group hover:border-secondary/40 transition-all bento-card-hover flex-1">
                            <!-- Magic UI Border Beam -->
                            <div class="border-beam-container"><div class="border-beam-glow"></div></div>

                            <div>
                                <div class="flex items-center justify-between mb-3.5">
                                    <span class="font-label text-[10px] text-secondary uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                                        <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                                        MERCADO INMOBILIARIO CHILENO
                                    </span>
                                    <span class="font-mono text-[9px] text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">UF DIARIA</span>
                                </div>

                                <h3 class="font-display font-bold text-xl sm:text-2xl text-white mb-2 tracking-tight">
                                    Tasación &amp; Telemetría en UF
                                </h3>
                                <p class="text-xs text-white/70 font-light leading-relaxed mb-4">
                                    Valuación comercial fiduciaria y conciliación financiera en tiempo real para compradores, propietarios e inversionistas.
                                </p>

                                <!-- Indicadores Numéricos Bento -->
                                <div class="grid grid-cols-2 gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-sm font-mono mb-2">
                                    <div>
                                        <div class="text-[9px] text-white/50 uppercase tracking-wider">UF Referencial</div>
                                        <div class="text-base sm:text-lg font-bold text-secondary font-mono-num">$37.940</div>
                                        <div class="text-[9px] text-emerald-400 font-sans">Indexación al día</div>
                                    </div>
                                    <div>
                                        <div class="text-[9px] text-white/50 uppercase tracking-wider">Conciliación</div>
                                        <div class="text-base sm:text-lg font-bold text-white font-mono-num">1 a 1</div>
                                        <div class="text-[9px] text-white/50 font-sans">0 desfase bancario</div>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-label">
                                <span class="text-white/60">AUDITORÍA ACTIVA</span>
                                <span class="text-emerald-400 font-bold flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> CBR &amp; NOTARÍAS
                                </span>
                            </div>
                        </div>

                        <!-- BENTO TILE C: SEGURIDAD LEGAL Y LEY 21.442 -->
                        <div class="relative overflow-hidden rounded-sm border border-white/10 bg-tech-card p-6 sm:p-7 flex flex-col justify-between shadow-xl group hover:border-brand-emerald/40 transition-all bento-card-hover flex-1">
                            <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-brand-emerald/10 rounded-full blur-2xl group-hover:bg-brand-emerald/20 transition-all pointer-events-none"></div>

                            <div>
                                <div class="flex items-center justify-between mb-3.5">
                                    <span class="font-label text-[10px] text-brand-emerald uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                                        <span class="w-2 h-2 rounded-full bg-brand-emerald"></span>
                                        RESPALDO JURÍDICO &amp; COPROPIEDAD
                                    </span>
                                    <span class="font-label text-[9px] text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">MINVU</span>
                                </div>

                                <h3 class="font-display font-bold text-xl sm:text-2xl text-white mb-2 tracking-tight">
                                    Filtro 3.5x &amp; Ley N° 21.442
                                </h3>
                                <p class="text-xs text-white/70 font-light leading-relaxed mb-4">
                                    Certificación de rentas líquidas con DICOM Platinum y administración de comunidades inscrita en el Registro Nacional de Administradores.
                                </p>

                                <div class="space-y-2 mb-2 font-label text-xs text-white/90">
                                    <div class="flex items-center gap-2">
                                        <span class="material-symbols-outlined text-sm text-brand-emerald">verified</span>
                                        <span>Estudio de títulos CBR 30 años sin contingencias</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="material-symbols-outlined text-sm text-secondary">gavel</span>
                                        <span>Contratos blindados con firma notarial FEA</span>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                                <a href="servicios.html#procedimiento" class="text-xs font-label uppercase tracking-widest text-secondary hover:text-white transition-colors flex items-center gap-1.5 font-bold group-hover:translate-x-1 duration-300">
                                    <span>Ver Procedimiento en 6 Pasos</span>
                                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        <!-- =========================================================
         3. SELECTOR DE 3 SERVICIOS CON GLOW TECH & EFECTO AGUA`;

index = index.replace(oldHeroRegex, newBentoHeroHtml);

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', index, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', index, 'utf8');

console.log('✓ Hero Bento Grid with Magic UI Border Beam & Shimmer Button successfully written.');
