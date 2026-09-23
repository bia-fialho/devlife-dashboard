export function registerServiceWorker() {
    if("serviceWorker" in navigator && import.meta.env.PROD) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js")
            .then((registro) => {
                console.log("Service Worker registrado com sucesso:", registro.scope);
            })
            .catch((error) => {
                console.error("Falha ao registrar o Service Worker:", error);

            })
            });
    }
}/  