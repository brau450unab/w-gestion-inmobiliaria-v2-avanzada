import fs from 'fs';

const indexHtml = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');
const serviciosHtml = fs.readFileSync('Landing Page W Gestion Inmobiliaria/servicios.html', 'utf8');

console.log('=== SECTIONS IN INDEX.HTML ===');
const sectionMatches = indexHtml.match(/<section[^>]*id="([^"]*)"[^>]*>/gi) || [];
sectionMatches.forEach(s => {
    const id = s.match(/id="([^"]*)"/i)[1];
    console.log(' - Section ID:', id);
});

console.log('\n=== HEADINGS AND TITLES IN INDEX.HTML ===');
const hMatches = indexHtml.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || [];
hMatches.forEach((h, idx) => {
    const tag = h.match(/<h([1-4])/i)[1];
    const text = h.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    const cls = (h.match(/class="([^"]*)"/i) || [])[1] || '';
    const isCentered = cls.includes('text-center');
    console.log(`[${idx+1}] <h${tag}> [${isCentered ? 'CENTER' : 'LEFT/OTHER'}] ${text}`);
});

console.log('\n=== HEADINGS AND TITLES IN SERVICIOS.HTML ===');
const sMatches = serviciosHtml.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || [];
sMatches.forEach((h, idx) => {
    const tag = h.match(/<h([1-4])/i)[1];
    const text = h.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    const cls = (h.match(/class="([^"]*)"/i) || [])[1] || '';
    const isCentered = cls.includes('text-center');
    console.log(`[${idx+1}] <h${tag}> [${isCentered ? 'CENTER' : 'LEFT/OTHER'}] ${text}`);
});
