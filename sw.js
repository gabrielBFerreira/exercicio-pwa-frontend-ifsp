const BASE_URL = "https://gabrielbferreira.github.io/exercicio-pwa-frontend-ifsp/"
const CACHE_NAME = "tabelabr2022";
const assets = [
  BASE_URL,
  `${BASE_URL}css/materialize.min.css`,
  `${BASE_URL}css/style.css`,
  `${BASE_URL}img/icon.png`,
  `${BASE_URL}js/app.js`,
  `${BASE_URL}js/instalar.js`,
  `${BASE_URL}js/materialize.min.js`,
  `${BASE_URL}index.html`,
  `${BASE_URL}manifest.json`,
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith( // busca conteudo em cache ou retorna resultado da request
    caches.match(event.request).then(response => {
      if (response) return response; // se encontrar cache igual ao resultado da chamada, retorna o cache
      
      const requestClone = event.request.clone(); // clona o objeto request para ser usado pelo cache e pelo browser
      
      return fetch(requestClone).then((response) => {        
        const responseCache = response.clone(); // clona o objeto response para ser usado pelo browser e pelo cache
        
        caches.open(CACHE_NAME).then((cache) => { // abre o cache e atualiza com o novo conteudo
          cache.put(event.request, responseCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});