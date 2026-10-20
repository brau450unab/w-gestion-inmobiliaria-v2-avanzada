import fs from 'fs';

const intranetPath = 'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/intranet.html';
const editorPath = 'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/editor.html';

let html = fs.readFileSync(intranetPath, 'utf8');

const targetSelect = `        function selectCanvasElement(el) {
            if (selectedElement) {
                selectedElement.classList.remove('elementor-selected-element');
            }

            selectedElement = el;
            selectedElement.classList.remove('elementor-hovered-element');
            selectedElement.classList.add('elementor-selected-element');

            switchSidebarView('inspector');
            switchElementorTab('content');

            const tagName = el.tagName.toUpperCase();
            document.getElementById('insp-tag-type').innerText = \`\${tagName} • WIDGET\`;
            document.getElementById('insp-element-name').innerText = el.id || el.getAttribute('aria-label') || el.className.split(' ')[0] || tagName;

            const textGroup = document.getElementById('ctrl-text-group');
            const linkGroup = document.getElementById('ctrl-link-group');
            const imageGroup = document.getElementById('ctrl-image-group');

            if (tagName === 'IMG') {
                imageGroup.classList.remove('hidden');
                textGroup.classList.add('hidden');
                document.getElementById('ctrl-input-image').value = el.getAttribute('src') || '';
            } else {
                imageGroup.classList.add('hidden');
                textGroup.classList.remove('hidden');
                document.getElementById('ctrl-input-text').value = el.innerText || el.textContent;
            }

            if (tagName === 'A' || el.hasAttribute('href')) {
                linkGroup.classList.remove('hidden');
                document.getElementById('ctrl-input-link').value = el.getAttribute('href') || '';
            } else {
                linkGroup.classList.add('hidden');
            }

            const computed = window.getComputedStyle(el);
            document.getElementById('ctrl-font-size').value = parseInt(computed.fontSize) || 16;
            document.getElementById('label-font-size').innerText = computed.fontSize;
            document.getElementById('ctrl-hex-text').value = computed.color;
            document.getElementById('ctrl-font-weight').value = computed.fontWeight || '400';
            document.getElementById('ctrl-select-tag').value = tagName;

            positionFloatingBar(el);
        }`;

const replacementSelect = `        function selectCanvasElement(el) {
            if (!el) return;
            if (selectedElement) {
                selectedElement.classList.remove('elementor-selected-element');
            }

            selectedElement = el;
            selectedElement.classList.remove('elementor-hovered-element');
            selectedElement.classList.add('elementor-selected-element');

            const tagName = el.tagName.toUpperCase();
            const rawText = (el.innerText || el.textContent || '').trim();
            const previewText = rawText.slice(0, 18) || tagName;

            // 1. Update Contextual Badge (Figma / Stitch)
            const contextBadge = document.getElementById('sidebar-context-badge');
            const btnClear = document.getElementById('btn-clear-selection');
            if (contextBadge) contextBadge.innerText = \`\${tagName} • \${previewText}\`;
            if (btnClear) btnClear.classList.remove('hidden');

            // 2. Populate Inputs
            const textInput = document.getElementById('ctrl-input-text');
            const linkInput = document.getElementById('ctrl-input-link');
            const imageInput = document.getElementById('ctrl-input-image');

            if (tagName === 'IMG') {
                openSandwich('media');
                if (imageInput) imageInput.value = el.getAttribute('src') || '';
            } else {
                openSandwich('content');
                if (textInput) textInput.value = rawText;
            }

            if (tagName === 'A' || el.hasAttribute('href')) {
                if (linkInput) linkInput.value = el.getAttribute('href') || '';
            }

            // 3. Auto-detect property metadata if selecting card or text inside card
            const card = el.closest('[data-property-card]') || el.closest('.property-card') || el.closest('.glass-card-luxury') || el.closest('#catalogo-activo');
            if (card) {
                const ufEl = card.querySelector('.font-mono-num') || card.querySelector('[class*=\"UF\"]');
                if (ufEl && document.getElementById('ctrl-prop-uf')) {
                    document.getElementById('ctrl-prop-uf').value = ufEl.innerText.trim();
                }
            }

            // 4. Update font size and colors if elements exist
            try {
                const computed = window.getComputedStyle(el);
                const fontSizeInput = document.getElementById('ctrl-font-size');
                const fontSizeLabel = document.getElementById('label-font-size');
                if (fontSizeInput) fontSizeInput.value = parseInt(computed.fontSize) || 16;
                if (fontSizeLabel) fontSizeLabel.innerText = computed.fontSize;
            } catch(e) {}

            positionFloatingBar(el);
        }`;

if (html.includes(targetSelect)) {
    html = html.replace(targetSelect, replacementSelect);
} else {
    // If target not matching exactly, replace by regex
    html = html.replace(/function selectCanvasElement\(el\) \{[\s\S]*?positionFloatingBar\(el\);\s*\}/, replacementSelect.trim());
}

// Make switchSidebarView safe if called from legacy
html = html.replace('function switchSidebarView(view) {', `function switchSidebarView(view) {
            const viewWidgets = document.getElementById('view-widgets');
            const viewInspector = document.getElementById('view-inspector');
            if (!viewWidgets || !viewInspector) return;`);

fs.writeFileSync(intranetPath, html, 'utf8');
fs.writeFileSync(editorPath, html, 'utf8');
console.log('Successfully updated selectCanvasElement and switchSidebarView!');
