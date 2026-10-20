import fs from 'fs';

// 1. UPDATE INDEX.HTML
let index = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

// Replace font links: ensure Material Symbols Outlined is properly loaded
const googleFontsUrbanist = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Urbanist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`;

// Replace lines 11-14 with googleFontsUrbanist
index = index.replace(
    /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">[\s\S]*?<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=JetBrains\+Mono[\s\S]*?display=swap" rel="stylesheet">/i,
    googleFontsUrbanist
);

// Update Tailwind config fontFamily in index.html
const oldTailwindFont = `"display": ["Playfair Display", "serif"],
                        "headline-lg": ["Playfair Display", "serif"],
                        "headline-md": ["Playfair Display", "serif"],
                        "headline-sm": ["Playfair Display", "serif"],
                        "serif": ["Playfair Display", "serif"],`;

const newTailwindFont = `"display": ["Urbanist", "sans-serif"],
                        "headline-lg": ["Urbanist", "sans-serif"],
                        "headline-md": ["Urbanist", "sans-serif"],
                        "headline-sm": ["Urbanist", "sans-serif"],
                        "serif": ["Urbanist", "sans-serif"],`;

index = index.replace(oldTailwindFont, newTailwindFont);

// Ensure style has robust Material Symbols and modern serif-luxury override
const materialSymbolsCss = `/* Material Symbols Outlined Fix: prevents uppercase breaking ligatures */
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined' !important;
            font-weight: normal;
            font-style: normal;
            font-size: 20px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none !important;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
            vertical-align: middle;
        }

        .font-serif-luxury {
            font-family: 'Urbanist', sans-serif !important;
            letter-spacing: -0.02em;
        }`;

index = index.replace(
    /\.font-serif-luxury\s*\{\s*font-family:\s*'Playfair Display',\s*serif;\s*\}/,
    materialSymbolsCss
);

// Fix "Gestión Fotográfica & Scan 3D"
index = index.replace(
    /<span class="material-symbols-outlined text-lg">view_in_ar<\/span>[\s\S]*?Gestión Fotográfica & Scan 3D<\/h4>/,
    `<span class="material-symbols-outlined text-lg">photo_camera</span>
                                </div>
                                <span class="font-label text-[10px] text-brand-cobalt uppercase tracking-widest font-semibold block mb-1">PRODUCCIÓN DIGITAL</span>
                                <h4 class="font-display font-semibold text-base text-tech-base mb-2">Fotografía Profesional & Video Dron</h4>`
);

// Fix "COMPLIANCE CERTIFICADO LEY N° 21.442 // REGISTRO NACIONAL DE ADMINISTRADORES MINVU"
index = index.replace(
    'COMPLIANCE CERTIFICADO LEY N° 21.442 // REGISTRO NACIONAL DE ADMINISTRADORES MINVU',
    'CUMPLIMIENTO NORMATIVO LEY N° 21.442 · REGISTRO NACIONAL DE ADMINISTRADORES MINVU'
);

// Replace double slashes // with middle dot · in badges and captions
index = index.replace(/<span>LO BARNECHEA \/\/ REF #LA-402<\/span>/g, '<span>LO BARNECHEA · REF #LA-402</span>');
index = index.replace(/<span>VITACURA \/\/ REF #VT-901<\/span>/g, '<span>VITACURA · REF #VT-901</span>');
index = index.replace(/<span>LAS CONDES \/\/ REF #EG-1200<\/span>/g, '<span>LAS CONDES · REF #EG-1200</span>');
index = index.replace(/<span>LAS CONDES \/\/ REF #SD-305<\/span>/g, '<span>LAS CONDES · REF #SD-305</span>');
index = index.replace(/<span>LO BARNECHEA \/\/ REF #LT-810<\/span>/g, '<span>LO BARNECHEA · REF #LT-810</span>');
index = index.replace(/<span>LAS CONDES \/\/ REF #SC-210<\/span>/g, '<span>LAS CONDES · REF #SC-210</span>');
index = index.replace(/DISPONIBILIDAD INMEDIATA \/\/ CATÁLOGO EXCLUSIVO/g, 'DISPONIBILIDAD INMEDIATA · PROPIEDADES EN CARTERA');
index = index.replace(/Motor de Búsqueda Fiduciario \/\/ Filtros de Enclaves/g, 'Filtros de Búsqueda · Selección por Comuna');
index = index.replace(/<span>LAS CONDES \/\/ REF #AR-ELGOLF<\/span>/g, '<span>LAS CONDES · REF #AR-ELGOLF</span>');
index = index.replace(/<span>VITACURA \/\/ REF #AR-SANDAMIAN<\/span>/g, '<span>VITACURA · REF #AR-SANDAMIAN</span>');
index = index.replace(/<span>PROVIDENCIA \/\/ REF #AR-CONQUISTADORES<\/span>/g, '<span>PROVIDENCIA · REF #AR-CONQUISTADORES</span>');
index = index.replace(/REF #VT-901 \/\/ ENCLAVE NUEVA COSTANERA/g, 'REF #VT-901 · SECTOR NUEVA COSTANERA');
index = index.replace(/Plano 01 \/\/ Terraza Solárium Nivel Superior/g, 'Plano 01 · Terraza y Nivel Superior');
index = index.replace(/<span>SANTIAGO \/\/ ALONSO DE CÓRDOVA • EL GOLF • LA DEHESA<\/span>/g, '<span>SANTIAGO · ALONSO DE CÓRDOVA • EL GOLF • LA DEHESA</span>');
index = index.replace(/\$\{refCode \|\| 'REF #VT-901'\} \/\/ ENCLAVE EXCLUSIVO/g, "${refCode || 'REF #VT-901'} · SECTOR EXCLUSIVO");
index = index.replace(/captionEl\.textContent = 'Vista Principal \/\/ Terraza y Fachada Exterior';/g, "captionEl.textContent = 'Vista Principal · Terraza y Fachada Exterior';");
index = index.replace(/captionEl\.textContent = 'Vista Interior \/\/ Living Comedor en Doble Altura';/g, "captionEl.textContent = 'Vista Interior · Living Comedor en Doble Altura';");

// Update serviceThemes badges and titles
index = index.replace("badge: 'RENTABILIDAD RESIDENCIAL // RESGUARDO FIDUCIARIO',", "badge: 'RENTABILIDAD RESIDENCIAL · RESGUARDO FIDUCIARIO',");
index = index.replace("badge: 'GESTIÓN DE COMUNIDADES // LEY N° 21.442',", "badge: 'GESTIÓN DE COMUNIDADES · LEY N° 21.442',");

// Clean and balance serviceThemes titles
index = index.replace(
    "title: 'Asesoría Estratégica para la <span class=\"text-secondary font-bold\">Compra y Venta de Propiedades</span>',",
    `title: 'Asesoría Estratégica en <br class="hidden sm:inline"><span class="text-secondary font-extrabold whitespace-nowrap">Compra y Venta de Propiedades</span>',`
);
index = index.replace(
    "title: 'Arriendo Seguro y Protección de su <span class=\"text-secondary font-bold\">Inversión Inmobiliaria</span>',",
    `title: 'Arriendo Seguro y Protección <br class="hidden sm:inline">de su <span class="text-secondary font-extrabold whitespace-nowrap">Inversión Inmobiliaria</span>',`
);
index = index.replace(
    "title: 'Administración Profesional para su <span class=\"text-secondary font-bold\">Edificio o Condominio</span>',",
    `title: 'Administración Profesional para su <br class="hidden sm:inline"><span class="text-secondary font-extrabold whitespace-nowrap">Edificio o Condominio</span>',`
);

// Update section-title in initial HTML
index = index.replace(
    /<h2 class="font-display font-normal text-3xl sm:text-5xl lg:text-6xl text-tech-base tracking-tight leading-tight" id="section-title">[\s\S]*?<\/h2>/,
    `<h2 class="font-display font-bold text-3xl sm:text-5xl lg:text-[54px] text-tech-base tracking-tight leading-tight text-balance" id="section-title">
                        Asesoría Estratégica en <br class="hidden sm:inline"><span class="text-secondary font-extrabold whitespace-nowrap">Compra y Venta de Propiedades</span>
                    </h2>`
);

// Ensure section title container is centered with mx-auto
index = index.replace(
    '<div class="text-center max-w-3xl mb-12">',
    '<div class="text-center max-w-3xl mx-auto mb-12">'
);

// Update Tab 2 subheader title: "Gestión Segura & Colocación de Arriendos Prime" -> "Gestión Segura & Arriendo de Propiedades"
index = index.replace(
    'Gestión Segura & Colocación de Arriendos Prime',
    'Gestión Segura & Arriendo de Propiedades'
);

// Add scroll-mt-28 to sections so anchor scrolls are not obscured by the 80px fixed header
index = index.replace('id="catalogo-activo"', 'id="catalogo-activo" class="scroll-mt-20 relative w-full py-28 px-6 md:px-12 lg:px-16 bg-[#FAF9F7] overflow-hidden transition-colors duration-700 bg-grid-blueprint-light"');
index = index.replace('class="relative w-full py-28 px-6 md:px-12 lg:px-16 bg-[#FAF9F7] overflow-hidden transition-colors duration-700 bg-grid-blueprint-light" id="catalogo-activo"', 'id="catalogo-activo" class="scroll-mt-20 relative w-full py-28 px-6 md:px-12 lg:px-16 bg-[#FAF9F7] overflow-hidden transition-colors duration-700 bg-grid-blueprint-light"');
index = index.replace('id="metodologia-fiduciaria" class="relative w-full py-20 px-6 md:px-12 lg:px-16 bg-white border-t border-black/5"', 'id="metodologia-fiduciaria" class="scroll-mt-24 relative w-full py-20 px-6 md:px-12 lg:px-16 bg-white border-t border-black/5"');
index = index.replace('id="contacto-asesor"', 'id="contacto-asesor" class="scroll-mt-20 w-full bg-[#080C12] py-28 px-6 md:px-12 lg:px-16 border-t border-tech-border-bright relative"');
index = index.replace('class="w-full bg-[#080C12] py-28 px-6 md:px-12 lg:px-16 border-t border-tech-border-bright relative" id="contacto-asesor"', 'id="contacto-asesor" class="scroll-mt-20 w-full bg-[#080C12] py-28 px-6 md:px-12 lg:px-16 border-t border-tech-border-bright relative"');

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', index, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', index, 'utf8');
console.log('✓ index.html and landing.html successfully updated.');


// 2. UPDATE SERVICIOS.HTML
let servicios = fs.readFileSync('Landing Page W Gestion Inmobiliaria/servicios.html', 'utf8');

// Ensure Material Symbols link is present in head of servicios.html
const headFontsServicios = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Urbanist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`;

servicios = servicios.replace(
    /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">[\s\S]*?<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/css\/all\.min\.css">/i,
    headFontsServicios
);

// Ensure Material Symbols styling in servicios.html
const materialSymbolsCssServicios = `.material-symbols-outlined {
            font-family: 'Material Symbols Outlined' !important;
            font-weight: normal;
            font-style: normal;
            font-size: 20px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none !important;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
            vertical-align: middle;
        }`;

servicios = servicios.replace(
    /\.material-symbols-outlined\s*\{[\s\S]*?vertical-align:\s*middle;\s*\}/,
    materialSymbolsCssServicios
);

// Fix title wrapping: "Procedimiento de Trabajo • Paso a Paso"
servicios = servicios.replace(
    /<h2 class="font-display font-bold text-3xl sm:text-5xl text-tech-base tracking-tight">\s*Procedimiento de Trabajo • Paso a\s*<span class="text-secondary font-bold">Paso<\/span>\s*<\/h2>/,
    `<h2 class="font-display font-extrabold text-3xl sm:text-5xl text-tech-base tracking-tight text-balance">
                Procedimiento de Trabajo · <span class="text-secondary whitespace-nowrap">Paso a Paso</span>
            </h2>`
);
// Also match fallback if different format
servicios = servicios.replace(
    /Procedimiento de Trabajo • Paso a Paso/g,
    'Procedimiento de Trabajo · Paso a Paso'
);

// Fix "5 Divisiones de Intervención Corporativa"
servicios = servicios.replace(
    /<h2 class="font-display font-bold text-3xl sm:text-5xl text-tech-base tracking-tight">\s*5 Divisiones de Intervención Corporativa\s*<\/h2>/,
    `<h2 class="font-display font-extrabold text-3xl sm:text-5xl text-tech-base tracking-tight text-balance">
                5 Divisiones de <span class="text-secondary whitespace-nowrap">Asesoría Inmobiliaria</span>
            </h2>`
);

// Fix "SANTIAGO // VIÑA DEL MAR"
servicios = servicios.replace('<span>SANTIAGO // VIÑA DEL MAR</span>', '<span>SANTIAGO · VIÑA DEL MAR</span>');

// Add scroll-mt-28 to sections in servicios.html
servicios = servicios.replace('id="procedimiento"', 'id="procedimiento" class="scroll-mt-24 py-24 px-6 md:px-12 lg:px-16 max-w-[1700px] mx-auto"');
servicios = servicios.replace('class="py-24 px-6 md:px-12 lg:px-16 max-w-[1700px] mx-auto" id="procedimiento"', 'id="procedimiento" class="scroll-mt-24 py-24 px-6 md:px-12 lg:px-16 max-w-[1700px] mx-auto"');
servicios = servicios.replace('id="divisiones"', 'id="divisiones" class="scroll-mt-24 py-24 px-6 md:px-12 lg:px-16 bg-[#F5F2EC] border-t border-black/5"');
servicios = servicios.replace('class="py-24 px-6 md:px-12 lg:px-16 bg-[#F5F2EC] border-t border-black/5" id="divisiones"', 'id="divisiones" class="scroll-mt-24 py-24 px-6 md:px-12 lg:px-16 bg-[#F5F2EC] border-t border-black/5"');

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/servicios.html', servicios, 'utf8');
console.log('✓ servicios.html successfully updated.');
