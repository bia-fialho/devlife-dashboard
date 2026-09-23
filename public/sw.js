const APP_SHELL = [
    "/",
    "/manifest.webmanifest",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
];
self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open("app-shell").then((cache) => cache.
        addAll(APP_SHELL))
    );
});
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((nomes) =>
            Promise.all(
                nomes.filter((nome) => nome != CACHE_NAME).map((nome) => caches.delete(nome))
            )
        )
        .then(() => self.clients.claim())
    );
});
self.addEventListener("fetch", (event) => {
    const {request} = event;
    if (request.method !== "GET") return;

    event.respondWith(
        caches.match(request).then((respostaCache) => {
            const buscaNaRede = fetch((request).then((respostaRede) => {
                if(respostaDaRede && respostaDaRede.status === 200) {
                    const copia = respostaDaRede.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
                }
                return respostaDaRede;
            })
            .catch(() => respostaCache);
            return respostaEmCache || buscaNaRede;
        })

    );
})