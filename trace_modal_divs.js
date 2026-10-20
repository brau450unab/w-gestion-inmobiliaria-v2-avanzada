import fs from 'fs';

const html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');
const lines = html.split('\n');

let balance = 0;
for (let i = 1873; i <= 2101; i++) {
    const line = lines[i];
    const opens = (line.match(/<div[\s>]/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    balance += (opens - closes);
    console.log(`L${i+1} [${opens > closes ? '+' + (opens-closes) : (opens < closes ? (opens-closes) : ' 0')}]: bal=${balance} | ${line.trim().substring(0, 70)}`);
}
