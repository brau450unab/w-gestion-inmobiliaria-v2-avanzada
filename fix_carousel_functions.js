import fs from 'fs';

let html = fs.readFileSync('Landing Page W Gestion Inmobiliaria/index.html', 'utf8');

const targetBeforeNext = `        function nextSlide() {`;
const functionsToAdd = `        function goToSlide(index) {
            clearInterval(progressInterval);
            currentSlide = index;
            pausedElapsedTime = 0;
            updateSlideUI(currentSlide);
            if (isPlaying) {
                startProgress();
            }
        }

        function startProgress() {
            clearInterval(progressInterval);
            progressStartTime = Date.now() - pausedElapsedTime;
            
            progressInterval = setInterval(() => {
                if (!isPlaying) return;
                const elapsed = Date.now() - progressStartTime;
                const pct = Math.min(100, (elapsed / slideDuration) * 100);
                
                const activeBar = document.getElementById(\`progress-\${currentSlide}\`);
                if (activeBar) {
                    activeBar.style.width = \`\${pct}%\`;
                }

                if (elapsed >= slideDuration) {
                    clearInterval(progressInterval);
                    pausedElapsedTime = 0;
                    nextSlide();
                }
            }, 50);
        }

        function nextSlide() {`;

html = html.replace(targetBeforeNext, functionsToAdd);

// También asegurar que goToSlide esté expuesta globalmente para los botones con onclick="goToSlide(n)"
if (!html.includes('window.goToSlide = goToSlide;')) {
    html = html.replace('window.showEngagementPopup = showEngagementPopup;', `window.goToSlide = goToSlide;\n        window.nextSlide = nextSlide;\n        window.prevSlide = prevSlide;\n        window.togglePlayPause = togglePlayPause;\n        window.openPropertyModal = openPropertyModal;\n        window.closeModalDirect = closeModalDirect;\n        window.showEngagementPopup = showEngagementPopup;`);
}

fs.writeFileSync('Landing Page W Gestion Inmobiliaria/index.html', html, 'utf8');
fs.writeFileSync('Landing Page W Gestion Inmobiliaria/landing.html', html, 'utf8');
console.log('✓ Added goToSlide, startProgress, and global window exports successfully!');
