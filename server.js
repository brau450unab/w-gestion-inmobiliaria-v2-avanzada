import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3600;
const BACKUPS_DIR = path.join(__dirname, 'backups');
const AUTOSAVE_FILE = path.join(BACKUPS_DIR, 'autosave-draft.html');

if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon'
};

// Intelligent Chilean Luxury Real Estate Copywriting Engine (editor-agents)
function generateChileanLuxuryCopy(text, mode = 'elegante') {
  const clean = text.trim();

  if (mode === 'elegante') {
    if (clean.length < 30) {
      return `Residencia Exclusiva de Alto Estándar con Vistas Panorámicas Privilegiadas`;
    }
    return `Propiedad de arquitectura contemporánea y finas terminaciones en enclave residencial consolidado. Cuenta con amplios espacios iluminados naturalmente, terraza panorámica, seguridad integral 24/7 y conectividad directa a los principales centros de servicios y colegios.`;
  }

  if (mode === 'chile') {
    return `Exclusiva propiedad ubicada en el sector más cotizado de Santiago Oriente y la Costa Central (Viña del Mar / Concón). Excelente plusvalía en UF, conserjería de alta gama, control de acceso fiduciario y gastos comunes controlados bajo la Ley de Copropiedad N° 21.442.`;
  }

  if (mode === 'fiduciario') {
    return `Activo inmobiliario seleccionado bajo rigurosa auditoría de títulos, tasación comercial técnica y proyección fiduciaria para inversionistas patrimoniales. Gestión y comercialización directa a cargo de W Gestión Inmobiliaria.`;
  }

  if (mode === 'cta') {
    const ctas = [
      'AGENDAR VISITA PRIVADA',
      'SOLICITAR DOSSIER COMPLETO (UF)',
      'COORDINAR REUNIÓN CON EJECUTIVO',
      'CONSIGNAR PROPIEDAD EXCLUSIVA'
    ];
    return ctas[Math.floor(Math.random() * ctas.length)];
  }

  return clean;
}

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = urlObj.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // --- API: AI Real Estate Copywriting Assistant (editor-agents) ---
  if (pathname === '/api/ai/enhance-text' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { text = '', mode = 'elegante' } = JSON.parse(body);
        const enhanced = generateChileanLuxuryCopy(text, mode);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          mode: mode,
          original: text,
          enhanced: enhanced
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- API: Developer Request Channel ---
  if (pathname === '/api/developer-request' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { category = 'Modificación Avanzada', description = '', contactName = 'Cliente W Gestión' } = JSON.parse(body);
        
        const whatsAppPhone = '56965312618';
        const targetEmail = 'automatizable@gmail.com';

        const messageText = `*Solicitud de Cambio Avanzado - W Gestión Inmobiliaria*\n` +
          `• *Tipo:* ${category}\n` +
          `• *Cliente:* ${contactName}\n` +
          `• *Detalle:* ${description}\n` +
          `• *Fecha:* ${new Date().toLocaleString()}\n` +
          `• *Entorno:* V2 Avanzada`;

        const waLink = `https://wa.me/${whatsAppPhone}?text=${encodeURIComponent(messageText)}`;
        const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent('Solicitud de Cambio Avanzado - W Gestión Inmobiliaria')}&body=${encodeURIComponent(messageText)}`;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          waLink: waLink,
          mailtoLink: mailtoLink,
          message: 'Solicitud estructurada correctamente para envío.'
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- API: Publish Property Listing (Público sin registro) ---
  if (pathname === '/api/properties/publish' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const propertyData = JSON.parse(body);
        const DATA_DIR = path.join(__dirname, 'data');
        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        const ANUNCIOS_FILE = path.join(DATA_DIR, 'anuncios.json');
        let anuncios = [];
        if (fs.existsSync(ANUNCIOS_FILE)) {
          try {
            anuncios = JSON.parse(fs.readFileSync(ANUNCIOS_FILE, 'utf8'));
          } catch(e) { anuncios = []; }
        }

        const idCode = 'W-PROP-' + Math.floor(1000 + Math.random() * 9000);
        const newListing = {
          id: idCode,
          createdAt: new Date().toISOString(),
          status: 'Activo',
          ...propertyData
        };

        anuncios.unshift(newListing);
        fs.writeFileSync(ANUNCIOS_FILE, JSON.stringify(anuncios, null, 2), 'utf8');

        // Formulate WhatsApp message to broker
        const whatsAppPhone = '56965312618';
        const waMsg = `*Nuevo Anuncio Publicado (W Gestión)*\n` +
          `• *Código:* ${idCode}\n` +
          `• *Título:* ${propertyData.title || 'Sin título'}\n` +
          `• *Operación:* ${propertyData.operation || 'Venta'}\n` +
          `• *Tipo:* ${propertyData.propertyType || 'Inmueble'}\n` +
          `• *Ubicación:* ${propertyData.comuna || ''}, ${propertyData.region || ''}\n` +
          `• *Precio:* ${propertyData.price || ''} ${propertyData.currency || 'UF'}\n` +
          `• *Contacto:* ${propertyData.contactName || ''} (${propertyData.contactPhone || ''})\n` +
          `• *Fotos:* ${(propertyData.photos || []).length} cargadas\n` +
          `• *Asesoría W Gestión:* ${propertyData.needsAdvisory ? 'SÍ (Solicitada)' : 'No'}`;

        const waLink = `https://wa.me/${whatsAppPhone}?text=${encodeURIComponent(waMsg)}`;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          code: idCode,
          listing: newListing,
          waLink: waLink,
          message: 'Anuncio recibido y registrado exitosamente.'
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- API: Autosave draft ---
  if (pathname === '/api/autosave' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { html } = JSON.parse(body);
        if (!html) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'HTML ausente' }));
          return;
        }

        fs.writeFileSync(AUTOSAVE_FILE, html, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- API: Get Autosave Draft ---
  if (pathname === '/api/autosave' && req.method === 'GET') {
    if (fs.existsSync(AUTOSAVE_FILE)) {
      const stats = fs.statSync(AUTOSAVE_FILE);
      const html = fs.readFileSync(AUTOSAVE_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        exists: true,
        updatedAt: stats.mtime,
        size: stats.size,
        html: html
      }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, exists: false }));
    }
    return;
  }

  // --- API: Create Named Checkpoint ---
  if (pathname === '/api/create-checkpoint' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name = 'Punto de Control', html } = JSON.parse(body);
        if (!html) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'HTML requerido' }));
          return;
        }

        const safeName = name.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `checkpoint-${safeName}-${timestamp}.html`;
        const filePath = path.join(BACKUPS_DIR, fileName);

        fs.writeFileSync(filePath, html, 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          checkpoint: fileName,
          timestamp: new Date().toISOString(),
          message: `Punto de control "${name}" guardado exitosamente.`
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- API: Save & Publish HTML ---
  if (pathname === '/api/save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { html, filename = 'index.html' } = payload;

        if (!html || typeof html !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'HTML inválido o ausente' }));
          return;
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFileName = `revision-${timestamp}.html`;
        const backupFilePath = path.join(BACKUPS_DIR, backupFileName);

        const targetFilePath = path.join(__dirname, filename);
        if (fs.existsSync(targetFilePath)) {
          fs.copyFileSync(targetFilePath, backupFilePath);
        }

        fs.writeFileSync(targetFilePath, html, 'utf8');
        if (filename === 'index.html') {
          const mirrorPath = path.join(__dirname, 'landing.html');
          fs.writeFileSync(mirrorPath, html, 'utf8');
        }

        if (fs.existsSync(AUTOSAVE_FILE)) {
          fs.unlinkSync(AUTOSAVE_FILE);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Página actualizada y publicada con éxito en producción.',
          backup: backupFileName,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- API: List Revisions & Checkpoints ---
  if (pathname === '/api/revisions' && req.method === 'GET') {
    try {
      const files = fs.readdirSync(BACKUPS_DIR)
        .filter(f => f.endsWith('.html') && f !== 'autosave-draft.html')
        .map(name => {
          const stats = fs.statSync(path.join(BACKUPS_DIR, name));
          const isCheckpoint = name.startsWith('checkpoint-');
          return {
            filename: name,
            type: isCheckpoint ? 'checkpoint' : 'revision',
            title: isCheckpoint ? name.replace(/^checkpoint-/, '').replace(/-[0-9T\-_]+Z?\.html$/, '').replace(/_/g, ' ') : 'Revisión de Publicación',
            createdAt: stats.mtime,
            size: stats.size
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, revisions: files }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // --- API: Restore Backup ---
  if (pathname === '/api/restore' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { backupFileName, target = 'index.html' } = JSON.parse(body);
        const backupFilePath = path.join(BACKUPS_DIR, backupFileName);
        if (!fs.existsSync(backupFilePath)) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Respaldo no encontrado' }));
          return;
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const safetyBackup = path.join(BACKUPS_DIR, `safety-before-restore-${timestamp}.html`);
        const targetPath = path.join(__dirname, target);
        if (fs.existsSync(targetPath)) {
          fs.copyFileSync(targetPath, safetyBackup);
        }

        const content = fs.readFileSync(backupFilePath, 'utf8');
        fs.writeFileSync(targetPath, content, 'utf8');
        if (target === 'index.html') {
          fs.writeFileSync(path.join(__dirname, 'landing.html'), content, 'utf8');
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: `Restaurado ${backupFileName} exitosamente.` }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- Static File Serving ---
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Prohibido');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Recurso No Encontrado');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Servidor W Gestión Inmobiliaria V2 activo:`);
  console.log(`👉 Landing Page: http://localhost:${PORT}/`);
  console.log(`👉 Publicar Propiedad (Abierto): http://localhost:${PORT}/publicar-propiedad.html`);
  console.log(`👉 Editor Visual Modo Dual: http://localhost:${PORT}/intranet.html`);
  console.log(`=======================================================`);
});
