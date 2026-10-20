import fs from 'fs';

let index = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

// 1. Refine Bento Hero Title: perfect 2-line wrap
const oldHeroTitle = `<h1 class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                                Corretaje de Propiedades &amp; <br class="hidden sm:inline">
                                <span class="text-secondary font-extrabold">Administración de Condominios</span>
                            </h1>`;

const newHeroTitle = `<h1 class="font-display font-extrabold text-2xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-[1.15]">
                                Corretaje de Propiedades &amp; <br class="hidden sm:inline">
                                <span class="text-secondary font-extrabold">Administración de Condominios</span>
                            </h1>`;

index = index.replace(oldHeroTitle, newHeroTitle);

// 2. Refine Border Beam CSS so it's super smooth and visible across all browsers
const oldBorderBeamCss = `@keyframes border-beam {
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
        }`;

const newBorderBeamCss = `@keyframes border-beam {
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
            width: 140px;
            background: linear-gradient(to right, #C5A880, #E2B170, transparent);
            offset-path: rect(0 auto auto 0 round 4px);
            animation: border-beam 6.5s linear infinite;
        }
        
        /* Magic UI Pulse Glow */
        .magic-pulse {
            animation: magicPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes magicPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.96); }
        }`;

index = index.replace(oldBorderBeamCss, newBorderBeamCss);

// 3. Make sure landing.html is also updated
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', index, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', index, 'utf8');
console.log('✓ Hero Bento typography and border beam refined.');
