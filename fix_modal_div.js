import fs from 'fs';

let html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

const targetSnippet = `                                </div>
                            </div>

                        <!-- Miniaturas Interactivas -->`;

const replacementSnippet = `                                </div>
                            </div>
                        </div>

                        <!-- Miniaturas Interactivas -->`;

if (html.includes(targetSnippet)) {
    html = html.replace(targetSnippet, replacementSnippet);
    console.log('✓ Successfully inserted missing </div> for modal main image container!');
} else {
    console.log('Error: targetSnippet not found.');
}

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', html, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', html, 'utf8');
