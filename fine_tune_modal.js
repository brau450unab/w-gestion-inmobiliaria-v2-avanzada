import fs from 'fs';

let html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

// Ajustar proporciones del modal para que encaje 100% perfecto sin necesidad de scroll interno en desktop
html = html.replace('h-[260px] sm:h-[320px]', 'h-[220px] sm:h-[260px]');
html = html.replace(/modal-thumb relative h-16/g, 'modal-thumb relative h-13');
html = html.replace('p-6 overflow-y-auto grid', 'p-5 overflow-y-auto grid');

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', html, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', html, 'utf8');
console.log('✓ Tuned modal proportions for desktop/laptop viewport perfection.');
