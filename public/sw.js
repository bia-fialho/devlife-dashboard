const CACHE_NAME = "devlife-cache-v1";
// "App shell": arquivos que NÓS controlamos o nome. O JS/CSS gerado pelo
// Vite tem nomes com hash (ex.: index-CM4rt_y8.js) que mudam a cada build —
// por isso NÃO os listamos aqui; eles entram no cache dinamicamente, na
// primeira vez que são pedidos (veja o "fetch" abaixo).
const APP_SHELL = [
"/",
"/manifest.webmanifest",
"/icons/icon-192.png",
"/icons/icon-512.png",
];
// INSTALL: dispara quando o navegador baixa o sw.js pela primeira vez.
self.addEventListener("install", (event) => {
self.skipWaiting();
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
);
});
// ACTIVATE: dispara depois do install. Momento certo para apagar caches antigos.
self.addEventListener("activate", (event) => {
event.waitUntil(
caches
.keys()
.then((nomes) =>
Promise.all(
nomes
.filter((nome) => nome !== CACHE_NAME)

.map((nome) => caches.delete(nome))
)
)
.then(() => self.clients.claim())
);
});
// FETCH: dispara a CADA requisição. Estratégia "stale-while-revalidate":
// responde com o cache IMEDIATAMENTE se existir, e em paralelo busca na
// rede para atualizar o cache silenciosamente para a próxima vez.
self.addEventListener("fetch", (event) => {
const { request } = event;
// Só interceptamos GET — POST/PUT não fazem sentido em cache.
if (request.method !== "GET") return;
event.respondWith(
caches.match(request).then((respostaEmCache) => {
const buscaNaRede = fetch(request)
.then((respostaDaRede) => {
if (respostaDaRede && respostaDaRede.status === 200) {
const copia = respostaDaRede.clone();
caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
}
return respostaDaRede;
})
.catch(() => respostaEmCache);
return respostaEmCache || buscaNaRede;
})
);
});

// SYNC: disparado pelo NAVEGADOR (não pelo nosso JS) assim que a conexão
// volta, para qualquer tag registrada via registro.sync.register(tag).
self.addEventListener("sync", (event) => {
if (event.tag !== "sincronizar-tarefas") return;
event.waitUntil(
self.clients.matchAll().then((clientes) => {
clientes.forEach((cliente) =>
cliente.postMessage({ tipo: "SINCRONIZADO", em: new Date().toISOString() })
);
})
);
});

self.addEventListener("push", (event) => {
const dados = event.data
? event.data.json()
: { titulo: "DevLife Dashboard", corpo: "Você tem uma novidade." };
event.waitUntil(
self.registration.showNotification(dados.titulo, {
body: dados.corpo,
icon: "/icons/icon-192.png",
badge: "/icons/icon-192.png",
})
);
});