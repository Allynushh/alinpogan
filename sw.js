/* ALPODEC PWA: cache only the app shell, never authenticated API responses. */
const CACHE='alpodec-shell-v4';
const SHELL=['/','/index.html','/app.html','/alpodec-icon.svg','/icon-180.png','/icon-192.png','/icon-512.png','/manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('alpodec-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;if(req.mode==='navigate'){event.respondWith(fetch(new Request(req,{cache:'no-store'})).catch(()=>caches.match(url.pathname==='/app.html'?'/app.html':'/index.html')));return}if(SHELL.includes(url.pathname)){event.respondWith(fetch(new Request(req,{cache:'no-store'})).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy))}return response}).catch(()=>caches.match(req)));}});
