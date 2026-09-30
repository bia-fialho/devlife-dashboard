export function registerServiceWorker() {
if ("serviceWorker" in navigator && import.meta.env.PROD) {

window.addEventListener("load", () => {
navigator.serviceWorker
.register("/sw.js")
.then((registro) => {
console.log("✅ Service Worker registrado:", registro.scope);
})
.catch((erro) => {
console.error("❌ Falha ao registrar o Service Worker:", erro);
});
});
}
}