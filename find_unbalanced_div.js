import fs from 'fs';

const html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');
const bodyStart = html.indexOf('<body');
const footerStart = html.indexOf('<footer');

const lines = html.substring(0, footerStart).split('\n');
let balance = 0;
let lastUnbalancedLine = -1;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/<div[\s>]/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    balance += (opens - closes);
    if (i > 1650 && i < 2110) {
        // Log surrounding lines around section 5 and 6
        if (opens !== closes) {
            console.log(`Line ${i+1}: +${opens} -${closes} => running balance: ${balance}`);
        }
    }
}
console.log('Final balance before footer:', balance);
