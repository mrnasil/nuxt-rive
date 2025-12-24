import { defineEventHandler } from 'h3'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  const rootDir = process.cwd()
  const publicDir = join(rootDir, 'public')
  const assetsDir = join(rootDir, 'assets')

  interface RiveFile {
    path: string
    name: string
    size: string
    src: string
    fullPath: string
    mtime: string
    usagePath: string
  }

  function formatSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  function formatDate(date: Date): string {
    return date.toLocaleString()
  }

  async function getFiles(dir: string, base: string = '', prefix: string = '/', usagePrefix: string = '/', useFsSrc: boolean = false): Promise<RiveFile[]> {
    let results: RiveFile[] = []
    try {
      const list = await readdir(dir, { withFileTypes: true })
      for (const dirent of list) {
        const rel = join(base, dirent.name)
        const fullPath = join(dir, dirent.name)
        if (dirent.isDirectory()) {
          results = results.concat(await getFiles(fullPath, rel, prefix, usagePrefix, useFsSrc))
        }
        else {
          if (dirent.name.endsWith('.riv')) {
            const stats = await stat(fullPath)
            const normalizedFullPath = fullPath.replace(/\\/g, '/')
            results.push({
              path: prefix + rel.replace(/\\/g, '/'),
              name: dirent.name,
              size: formatSize(stats.size),
              src: useFsSrc ? `/_nuxt-rive/media?path=${encodeURIComponent(fullPath)}` : prefix + rel.replace(/\\/g, '/'),
              fullPath: normalizedFullPath,
              mtime: formatDate(stats.mtime),
              usagePath: usagePrefix + rel.replace(/\\/g, '/'),
            })
          }
        }
      }
    }
    catch {
      // ignore
    }
    return results
  }

  const publicFiles = await getFiles(publicDir, '', '/', '/')
  const assetsFiles = await getFiles(assetsDir, '', '/_nuxt/assets/', '~/assets/', true)
  const files = [...publicFiles, ...assetsFiles]

  const filesJson = JSON.stringify(files)

  return getHtml(filesJson)
})

function getHtml(filesJson: string) {
  return `
<!DOCTYPE html>
<html class="dark">
<head>
  <title>Nuxt Rive Assets</title>
  <style>
    :root {
      --bg: #151515;
      --surface: #1e1e1e;
      --border: #333333;
      --primary: #00dc82;
      --text: #e2e8f0;
      --text-muted: #a3a3a3;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }
    
    body { 
      font-family: 'Inter', 'RoobertPRO', 'Roobert', sans-serif; 
      color: var(--text); 
      background: var(--bg); 
      margin: 0; 
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Top Bar */
    header {
      flex-shrink: 0;
      height: 64px;
      z-index: 50;
      background: rgba(21, 21, 21, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .logo-icon {
      color: var(--primary);
      width: 24px;
      height: 24px;
    }

    .actions {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .search-container {
      position: relative;
      width: 100%;
      max-width: 400px;
    }
    
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      width: 16px;
      height: 16px;
      pointer-events: none;
    }

    input[type="text"] {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.5rem 0.5rem 0.5rem 2.25rem;
      color: var(--text);
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
    }
    
    input[type="text"]:focus {
      border-color: var(--primary);
    }
    
    .icon-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .icon-btn:hover {
      background: var(--surface);
      color: var(--primary);
      border-color: var(--primary);
    }
    
    /* Layout */
    .layout-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    /* Grid */
    main {
      padding: 2rem;
      flex: 1;
      overflow-y: auto;
    }

    .grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
      gap: 1.5rem; 
    }

    .card { 
      background: transparent; 
      border: 1px solid transparent; 
      border-radius: 8px; 
      overflow: hidden; 
      display: flex; 
      flex-direction: column; 
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }

    .card:hover {
      background: #33333330;
    }
    
    .card.selected {
      background: #33333330;
      border-color: var(--primary);
    }

    .preview-container { 
      width: 100%; 
      aspect-ratio: 1; 
      background-image: 
        linear-gradient(45deg, #2a2a2a 25%, transparent 25%), 
        linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, #2a2a2a 75%), 
        linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      background-color: #1a1a1a;
      border-radius: 6px;
      border: 1px solid var(--border);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.2s;
    }
    
    .card:hover .preview-container {
      border-color: var(--text-muted);
    }

    canvas { 
      max-width: 100%; 
      max-height: 100%; 
    }

    .info {
      padding: 0.75rem 0.25rem;
    }

    .filename {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.25rem;
    }

    .meta {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
    }

    /* List View Overrides */
    .grid.list-view {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .grid.list-view .card {
      flex-direction: row;
      align-items: center;
      padding: 0.5rem;
      border: 1px solid transparent;
    }
    
    .grid.list-view .card:hover {
      background: var(--surface);
      border-color: var(--border);
    }
    
    .grid.list-view .card.selected {
      border-color: var(--primary);
    }

    .grid.list-view .preview-container {
      width: 48px;
      height: 48px;
      min-width: 48px;
      margin-right: 1rem;
      border: 1px solid var(--border);
      background-size: 10px 10px;
    }

    .grid.list-view .info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    
    .grid.list-view .filename {
      margin: 0;
      font-size: 0.95rem;
    }
    .grid.list-view .meta {
      gap: 1rem;
    }

    /* Details Panel */
    aside {
      width: 0;
      background: var(--surface);
      border-left: 1px solid var(--border);
      overflow-y: auto;
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    
    aside.open {
      width: 320px;
    }
    
    .drawer-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    
    .drawer-title {
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px;
    }
    
    .close-btn:hover {
      color: var(--text);
    }

    .drawer-content {
      padding: 1rem;
      flex-grow: 1;
      overflow-y: auto;
    }

    .detail-group {
      margin-bottom: 1.5rem;
    }
    
    .detail-group h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--text-muted);
      margin: 0 0 0.5rem 0;
      letter-spacing: 0.05em;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .detail-label {
      color: var(--text-muted);
    }
    
    .detail-value {
      color: var(--text);
      text-align: right;
      word-break: break-all;
      max-width: 60%;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .action-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.5rem;
      border-radius: 6px;
      font-size: 0.85rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
      text-decoration: none;
    }
    
    .action-btn:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
    
    .code-block {
      background: #111;
      padding: 0.75rem;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.8rem;
      color: var(--text-muted);
      position: relative;
      cursor: pointer;
      border: 1px solid transparent;
      transition: border-color 0.2s;
      white-space: pre-wrap;
      word-break: break-all;
    }
    
    .code-block:hover {
      border-color: var(--primary);
      color: var(--text);
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--primary);
      color: #000;
      font-weight: 600;
      padding: 0.5rem 1.5rem;
      border-radius: 999px;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 100;
    }
    
    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem;
      color: var(--text-muted);
    }
  </style>
  <script src="https://unpkg.com/@rive-app/canvas@latest"></script>
</head>
<body>
  <header>
    <h1>
      <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M.643 1.475c0 .814.668 1.475 1.49 1.475H14.49q2.112 0 3.48 1.29q1.366 1.291 1.366 3.32q0 1.875-1.367 3.072q-1.366 1.169-3.479 1.168H9.12c-.824 0-1.491.66-1.491 1.475s.667 1.475 1.491 1.475h5.93l5.342 8.482q.497.768 1.398.768q.995 0 1.398-.768q.403-.8-.155-1.69l-4.753-7.56q1.926-.861 3.044-2.52q1.119-1.69 1.119-3.902q0-2.244-1.026-3.934q-.993-1.69-2.795-2.643Q16.82 0 14.49 0H2.134C1.311 0 .643.66.643 1.475"/>
      </svg>
      Rive Assets
    </h1>
    <div class="actions">
      <div class="search-container">
        <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" id="search" placeholder="Search assets..." autocomplete="off">
      </div>
      <button id="viewToggle" class="icon-btn" title="Toggle View">
        <!-- Grid Icon -->
        <svg id="iconGrid" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <!-- List Icon -->
        <svg id="iconList" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </div>
  </header>

  <div class="layout-container">
    <main>
      <div id="grid" class="grid"></div>
    </main>

    <aside id="drawer">
      <div class="drawer-header">
        <span class="drawer-title">Details</span>
        <button class="close-btn" onclick="closeDrawer()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="drawer-content">
        <div class="detail-group">
          <h3>Details</h3>
          <div class="detail-row">
            <span class="detail-label">Filename</span>
            <span class="detail-value" id="d-filename"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Filepath</span>
            <span class="detail-value" id="d-filepath" style="font-family:monospace"></span>
          </div>
           <div class="detail-row">
            <span class="detail-label">Public Path</span>
            <span class="detail-value" id="d-publicpath" style="font-family:monospace"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Size</span>
            <span class="detail-value" id="d-size"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Last Modified</span>
            <span class="detail-value" id="d-mtime"></span>
          </div>
        </div>

        <div class="detail-group">
          <h3>Actions</h3>
          <div class="actions-grid">
            <a id="btn-download" href="#" download class="action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </a>
            <button id="btn-copy-path" class="action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 0 0 1 2-2h9a2 0 0 1 2 2v1"/></svg>
              Copy Path
            </button>
          </div>
        </div>

        <div class="detail-group">
          <h3>Component Code</h3>
          <div class="code-block" id="snippet-link" title="Click to copy"></div>
        </div>
      </div>
    </aside>
  </div>

  <div id="toast" class="toast">Copied to clipboard!</div>

  <script>
    const files = ${filesJson};
    const grid = document.getElementById('grid');
    const searchInput = document.getElementById('search');
    const viewToggle = document.getElementById('viewToggle');
    const iconGrid = document.getElementById('iconGrid');
    const iconList = document.getElementById('iconList');
    const toast = document.getElementById('toast');
    const drawer = document.getElementById('drawer');
    
    // Details Elements
    const dFilename = document.getElementById('d-filename');
    const dFilepath = document.getElementById('d-filepath');
    const dPublicpath = document.getElementById('d-publicpath');
    const dSize = document.getElementById('d-size');
    const dMtime = document.getElementById('d-mtime');
    const btnDownload = document.getElementById('btn-download');
    const btnCopyPath = document.getElementById('btn-copy-path');
    const snippetLink = document.getElementById('snippet-link');

    let toastTimeout;
    let selectedFileSrc = null;

    // View State
    const savedView = localStorage.getItem('nuxt-rive-view') || 'grid';
    let isListView = savedView === 'list';
    updateViewIcon();

    function toggleView() {
      isListView = !isListView;
      localStorage.setItem('nuxt-rive-view', isListView ? 'list' : 'grid');
      updateViewIcon();
    }

    function updateViewIcon() {
      if (isListView) {
        grid.classList.add('list-view');
        iconList.style.display = 'none'; // Show Grid icon to switch back
        iconGrid.style.display = 'block';
      } else {
        grid.classList.remove('list-view');
        iconList.style.display = 'block'; // Show List icon to switch to list
        iconGrid.style.display = 'none';
      }
    }

    viewToggle.addEventListener('click', toggleView);

    function selectFile(file, cardElement) {
        selectedFileSrc = file.src;
        
        // Highlight card
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        cardElement.classList.add('selected');

        // Populate drawer
        dFilename.textContent = file.name;
        dFilepath.textContent = file.fullPath;
        dPublicpath.textContent = file.path;
        dSize.textContent = file.size;
        dMtime.textContent = file.mtime;

        btnDownload.href = file.src;
        btnDownload.download = file.name;
        
        btnCopyPath.onclick = () => copyToClipboard(file.src);
        
        let linkSnippet;
        if (file.usagePath.startsWith('~/')) {
            const varName = file.name.replace(/[^a-zA-Z0-9]/g, '') + 'Anim';
            linkSnippet = \`<script setup>
import \${varName} from '\${file.usagePath}'
<\\/script>

<template>
  <NuxtRive :rive-params="{ src: \${varName} }" />
</template>\`;
        } else {
            linkSnippet = \`<NuxtRive :rive-params="{ src: '\${file.usagePath}' }" />\`;
        }
        
        snippetLink.innerText = linkSnippet; // Use innerText to preserve newlines
        snippetLink.onclick = () => copyToClipboard(linkSnippet);

        // Open drawer
        drawer.classList.add('open');
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        selectedFileSrc = null;
    }

    // Expose closeDrawer to window
    window.closeDrawer = closeDrawer;

    function render(filter = '') {
      grid.innerHTML = '';
      const filtered = files.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()));
      
      if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">No assets found</div>';
        return;
      }

      filtered.forEach(file => {
        const card = document.createElement('div');
        card.className = 'card';
        // Add selected class if re-rendering while active (search)
        if (selectedFileSrc === file.src) card.classList.add('selected');
        
        card.onclick = () => selectFile(file, card);
        
        card.innerHTML = \`
          <div class="preview-container">
            <canvas data-src="\${file.src}" width="250" height="250"></canvas>
          </div>
          <div class="info">
            <div class="filename" title="\${file.name}">\${file.name}</div>
            <div class="meta">
              <span>\${file.size}</span>
            </div>
          </div>
        \`;
        grid.appendChild(card);
      });

      // Initialize Rive
      document.querySelectorAll('canvas').forEach(canvas => {
          const src = canvas.dataset.src;
          new rive.Rive({
              src: src,
              canvas: canvas,
              autoplay: true,
              layout: new rive.Layout({
                  fit: rive.Fit.Contain,
                  alignment: rive.Alignment.Center,
              }),
          });
      });
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast();
      });
    }

    function showToast() {
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }

    searchInput.addEventListener('input', (e) => render(e.target.value));
    
    // Initial Render
    render();
  </script>
</body>
</html>
  `
}
