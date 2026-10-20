import fs from 'fs';

const files = [
    'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/intranet.html',
    'c:/Users/BraulioAM/Downloads/landing vulca/Landing Page W Gestion Inmobiliaria - V2 Avanzada/editor.html'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the duplicate declarations
    content = content.replace(
        /function switchSidebarView\(view\) \{\s*const viewWidgets = document\.getElementById\('view-widgets'\);\s*const viewInspector = document\.getElementById\('view-inspector'\);\s*if \(!viewWidgets \|\| !viewInspector\) return;\s*const viewWidgets = document\.getElementById\('view-widgets'\);\s*const viewInspector = document\.getElementById\('view-inspector'\);/,
        `function switchSidebarView(view) {
            const viewWidgets = document.getElementById('view-widgets');
            const viewInspector = document.getElementById('view-inspector');
            if (!viewWidgets || !viewInspector) return;`
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed duplicate declarations in', file);
}
