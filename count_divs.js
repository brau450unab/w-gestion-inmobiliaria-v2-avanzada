import fs from 'fs';

const html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');
const bodyStart = html.indexOf('<body');
const footerStart = html.indexOf('<footer');

const snippet = html.substring(bodyStart, footerStart);
const opens = (snippet.match(/<div[\s>]/g) || []).length;
const closes = (snippet.match(/<\/div>/g) || []).length;

console.log('Opened divs before footer:', opens, 'Closed divs before footer:', closes, 'Difference:', opens - closes);
