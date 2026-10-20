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

  // --- API: Autosave draft ---
  if (pathname === '/api/autosave' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { html } = payload;
        if (!html) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'HTML ausente' }));
          return;
        }

        fs.writeFileSync(AUTOSAVE_FILE, html, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          timestamp: new Date().toISOString(),
          message: 'Borrador guardado automáticamente.'
        }));
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

  // --- API: Save & Publish HTML from Elementor Editor ---
  if (pathname === '/api/save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { html, filename = 'index.html', label = 'Publicación Manual' } = payload;

        if (!html || typeof html !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'HTML inválido o ausente' }));
          return;
        }

        // 1. Create timestamped backup of current file before overwriting
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFileName = `revision-${timestamp}.html`;
        const backupFilePath = path.join(BACKUPS_DIR, backupFileName);

        const targetFilePath = path.join(__dirname, filename);
        if (fs.existsSync(targetFilePath)) {
          fs.copyFileSync(targetFilePath, backupFilePath);
        }

        // 2. Write new HTML to target and mirror if index.html
        fs.writeFileSync(targetFilePath, html, 'utf8');
        if (filename === 'index.html') {
          const mirrorPath = path.join(__dirname, 'landing.html');
          fs.writeFileSync(mirrorPath, html, 'utf8');
        }

        // Remove old autosave draft once explicitly published
        if (fs.existsSync(AUTOSAVE_FILE)) {
          fs.unlinkSync(AUTOSAVE_FILE);
        }

        console.log(`[API /api/save] ✅ Archivo ${filename} actualizado. Respaldo creado: ${backupFileName}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Página actualizada y publicada con éxito en producción.',
          backup: backupFileName,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        console.error('[API /api/save] ❌ Error:', err);
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

  // --- API: Restore Backup or Checkpoint ---
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

        // Before restoring, take a safety backup of current state
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

  // Security: prevent path traversal outside root
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

    // Handle partial range requests (for video streaming)
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Servidor W Gestión Inmobiliaria V2 activo:`);
  console.log(`👉 Landing Page: http://localhost:${PORT}/`);
  console.log(`👉 Elementor Visual Builder: http://localhost:${PORT}/intranet.html`);
  console.log(`👉 Elementor Direct Alias: http://localhost:${PORT}/editor.html`);
  console.log(`=======================================================`);
});
