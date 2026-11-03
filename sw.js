const V='dh-v5',A=['./','index.html','manifest.webmanifest','favicon.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* mạng trước, mất mạng thì dùng bản đã lưu; dữ liệu người dùng nằm ở IndexedDB nên không bao giờ qua đây */
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))))});
