import fs from 'fs';

let html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

// 1. LIMPIAR HEAD: Asegurar que el tag de animejs quede limpio sin código inline accidental
const badHeadScriptStart = html.indexOf('anime.min.js">');
if (badHeadScriptStart !== -1) {
    const badHeadScriptEnd = html.indexOf('</script>', badHeadScriptStart);
    if (badHeadScriptEnd !== -1 && badHeadScriptEnd - badHeadScriptStart > 30) {
        // Había código inline accidental en head
        html = html.substring(0, badHeadScriptStart) + 'anime.min.js"></script>' + html.substring(badHeadScriptEnd + 9);
        console.log('✓ Head anime.min.js tag cleaned cleanly.');
    }
}

// 2. ACTUALIZAR TOTAL SLIDES Y METADATOS DEL CARRUSEL A 5 SLIDES
const oldSlideLocationsPattern = /const slideLocations = \[[^\]]*\];/s;
const newSlideLocations = `const slideLocations = [
            "SECTOR EL GOLF · LAS CONDES",
            "SECTOR NUEVA COSTANERA · VITACURA",
            "SECTOR LA DEHESA · LO BARNECHEA",
            "SECTOR SAN DAMIÁN · LAS CONDES",
            "SECTOR CERRO CASTILLO · VIÑA DEL MAR"
        ];`;
html = html.replace(oldSlideLocationsPattern, newSlideLocations);

const oldSlideCoordsPattern = /const slideCoordinates = \[[^\]]*\];/s;
const newSlideCoords = `const slideCoordinates = [
            "LAS CONDES · SANTIAGO",
            "VITACURA · SANTIAGO",
            "LO BARNECHEA · SANTIAGO",
            "SAN DAMIÁN · SANTIAGO",
            "VIÑA DEL MAR · VALPARAÍSO"
        ];`;
html = html.replace(oldSlideCoordsPattern, newSlideCoords);

// 3. MEJORAR updateSlideUI CON ANIME.JS PARA TRANSICIÓN DE TÍTULOS Y FOTOS
const oldUpdateSlideUIPattern = /function updateSlideUI\(index\) \{[\s\S]*?function nextSlide\(\)/;
const newUpdateSlideUI = `function updateSlideUI(index) {
            const slides = document.querySelectorAll('.showreel-slide');
            const navButtons = document.querySelectorAll('.showreel-nav-btn');
            const locationIndicator = document.getElementById('current-slide-location');
            const gpsIndicator = document.getElementById('current-gps-coords');

            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0', 'pointer-events-none');
                    slide.classList.add('opacity-100');
                    if (window.anime) {
                        anime({
                            targets: slide,
                            opacity: [0, 1],
                            duration: 1000,
                            easing: 'easeInOutQuad'
                        });
                        const bg = slide.querySelector('.slide-bg');
                        if (bg) {
                            anime({
                                targets: bg,
                                scale: [1.06, 1],
                                duration: 8000,
                                easing: 'easeOutSine'
                            });
                        }
                    }
                } else {
                    slide.classList.add('opacity-0', 'pointer-events-none');
                    slide.classList.remove('opacity-100');
                }
            });

            navButtons.forEach((btn, i) => {
                const progressBar = btn.querySelector('.slide-progress-bar');
                if (i === index) {
                    btn.classList.add('opacity-100', 'border-secondary/60', 'bg-white/10');
                    btn.classList.remove('opacity-40');
                } else {
                    btn.classList.remove('opacity-100', 'border-secondary/60', 'bg-white/10');
                    btn.classList.add('opacity-40');
                    if (progressBar) progressBar.style.width = '0%';
                }
            });

            if (locationIndicator && slideLocations[index]) {
                locationIndicator.textContent = slideLocations[index];
            }
            if (gpsIndicator && slideCoordinates[index]) {
                gpsIndicator.textContent = slideCoordinates[index];
            }

            // Animación sutil de los títulos del Hero al rotar
            if (window.anime) {
                anime({
                    targets: '#hero-eyebrow, #hero-main-title',
                    translateY: [8, 0],
                    opacity: [0.75, 1],
                    duration: 700,
                    easing: 'easeOutCubic'
                });
            }
        }

        function nextSlide()`;
html = html.replace(oldUpdateSlideUIPattern, newUpdateSlideUI);

// 4. MEJORAR openPropertyModal Y closeModalDirect CON ANIME.JS SPRING EASING
const oldModalFunctionsPattern = /function openPropertyModal\(title, price, refCode, location, m2, dorms, orientation\) \{[\s\S]*?function closeModalDirect\(\) \{[\s\S]*?\}/;
const newModalFunctions = `function openPropertyModal(title, price, refCode, location, m2, dorms, orientation) {
            const overlay = document.getElementById('property-modal-overlay');
            const card = document.getElementById('property-modal-card');
            if (!overlay || !card) return;

            document.getElementById('modal-prop-title').textContent = title || 'Penthouse Dúplex Nueva Costanera';
            document.getElementById('modal-ref-pill').textContent = \`\${refCode || 'REF #VT-901'} · SECTOR EXCLUSIVO\`;
            document.getElementById('modal-prop-price').textContent = price || 'UF 26.800';
            document.getElementById('modal-prop-location').innerHTML = \`<span class="material-symbols-outlined text-sm text-secondary">location_on</span><span>\${location || 'Vitacura, Región Metropolitana'}</span>\`;
            document.getElementById('modal-spec-util').textContent = m2 || '310 m²';
            document.getElementById('modal-spec-dorms').textContent = dorms || '4 Suites';

            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            document.body.style.overflow = 'hidden';

            if (window.anime) {
                anime({
                    targets: overlay,
                    opacity: [0, 1],
                    duration: 350,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: card,
                    scale: [0.86, 1],
                    opacity: [0, 1],
                    translateY: [40, 0],
                    duration: 550,
                    easing: 'spring(1, 80, 12, 0)'
                });
            }
        }

        function closeModalDirect() {
            const overlay = document.getElementById('property-modal-overlay');
            const card = document.getElementById('property-modal-card');
            if (!overlay) return;

            if (window.anime && card) {
                anime({
                    targets: card,
                    scale: [1, 0.92],
                    opacity: [1, 0],
                    translateY: [0, 25],
                    duration: 250,
                    easing: 'easeInCubic',
                    complete: () => {
                        overlay.classList.add('hidden');
                        overlay.classList.remove('flex');
                        document.body.style.overflow = 'auto';
                    }
                });
                anime({
                    targets: overlay,
                    opacity: [1, 0],
                    duration: 250,
                    easing: 'easeInQuad'
                });
            } else {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        }`;
html = html.replace(oldModalFunctionsPattern, newModalFunctions);

// 5. AGREGAR LÓGICA DE SCROLL REVEALS, HIGHLIGHT DEL FORMULARIO Y POP-UP CONCIERGE AL FINAL DEL SCRIPT PRINCIPAL
const advancedAnimeLogic = `
        /* ==========================================================
           E. ANIME.JS SCROLL REVEALS & HIGHLIGHT DEL FORMULARIO
           ========================================================== */
        function initScrollAnimations() {
            if (!window.anime) return;

            // Observador para elementos que vienen desde la izquierda y derecha
            const revealElements = document.querySelectorAll('.scroll-from-left, .scroll-from-right');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const isLeft = target.classList.contains('scroll-from-left');
                        
                        anime({
                            targets: target,
                            translateX: isLeft ? [-50, 0] : [50, 0],
                            opacity: [0, 1],
                            duration: 850,
                            easing: 'easeOutCubic'
                        });

                        observer.unobserve(target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => {
                // Estado inicial
                el.style.opacity = '0';
                observer.observe(el);
            });
        }

        /* Destacar y resaltar el formulario de contacto al momento de ir bajando */
        function initContactFormHighlight() {
            const formSection = document.getElementById('contacto-asesor');
            const wizardContainer = document.getElementById('contact-wizard-container');
            if (!formSection || !wizardContainer) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        wizardContainer.classList.add('highlight-active');
                        
                        if (window.anime) {
                            anime({
                                targets: wizardContainer,
                                scale: [0.98, 1.015, 1],
                                duration: 900,
                                easing: 'easeOutElastic(1, .8)'
                            });
                        }
                    }
                });
            }, {
                threshold: 0.25
            });

            observer.observe(formSection);
        }

        /* ==========================================================
           F. POP-UP DE ENGAGEMENT CONVERSACIONAL (2-3 MIN O RETORNO ARRIBA)
           "Nos interesa que conversemos. Cuéntanos si quieres más información."
           Botón "Agendar una reunión" arriba con logo WhatsApp y foto ejecutiva
           ========================================================== */
        let hasShownEngagement = false;
        let maxScrollY = 0;
        let pageOpenTime = Date.now();

        function initEngagementPopupTimer() {
            if (sessionStorage.getItem('w_engagement_closed') === 'true') {
                return;
            }

            // 1. Temporizador de 2 minutos (120 segundos)
            setTimeout(() => {
                if (!hasShownEngagement) {
                    showEngagementPopup();
                }
            }, 120000);

            // 2. Detección de si el cliente "vuelve arriba o se pierde":
            window.addEventListener('scroll', () => {
                const currentY = window.scrollY;
                if (currentY > maxScrollY) {
                    maxScrollY = currentY;
                }

                // Si navegó profundo (> 1100px) y luego regresa hacia arriba (< 380px)
                // tras al menos 15 segundos en la página:
                const elapsedSeconds = (Date.now() - pageOpenTime) / 1000;
                if (maxScrollY > 1100 && currentY < 380 && elapsedSeconds > 15 && !hasShownEngagement) {
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
                    translateY: [120, 0],
                    opacity: [0, 1],
                    scale: [0.93, 1],
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
                    translateY: [0, 100],
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

        // Inicializar al cargar el DOM
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
            initContactFormHighlight();
            initEngagementPopupTimer();
        });

        // Exponer funciones globales
        window.showEngagementPopup = showEngagementPopup;
        window.closeEngagementPopup = closeEngagementPopup;
        window.enviarPopupWhatsApp = enviarPopupWhatsApp;
`;

// Insertar antes del cierre de script </script>
const lastScriptEnd = html.lastIndexOf('</script>');
if (lastScriptEnd !== -1) {
    // Si ya contenía window.showEngagementPopup, remover la parte duplicada
    const existingSnippetPos = html.indexOf('/* ==========================================================\n           E. ANIME.JS SCROLL REVEALS', 10000);
    if (existingSnippetPos !== -1) {
        html = html.substring(0, existingSnippetPos) + advancedAnimeLogic + '\n    </script>' + html.substring(lastScriptEnd + 9);
    } else {
        html = html.substring(0, lastScriptEnd) + '\n' + advancedAnimeLogic + '\n    </script>' + html.substring(lastScriptEnd + 9);
    }
}

// 6. ASEGURAR QUE EL MODAL #concierge-engagement-popup ESTÉ PRESENTE ANTES DE </body>
if (!html.includes('id="concierge-engagement-popup"')) {
    const popupHtml = `
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
    html = html.replace('</body>', `${popupHtml}\n</body>`);
}

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', html, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', html, 'utf8');
console.log('✓ Successfully updated index.html and landing.html with anime.js features!');
