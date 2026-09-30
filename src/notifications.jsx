// ⚠️ Chave PÚBLICA de EXEMPLO. Gere a sua própria antes de usar em produção
// (veja o comando abaixo) — nunca reaproveite uma chave de exemplo de guia.
// A chave PRIVADA correspondente NUNCA vai no código do front-end: ela
// mora só no servidor que envia os pushes.
const VAPID_PUBLIC_KEY =
"BBB4P_ZvVY64umR_Q-wOq0Zoj9BAABM21XuCAD04za53RfHFb_7JWQy" +
"S-VHR9f4u_OtJ6ljEU-j1uymGxFrc1bg";
function urlBase64ToUint8Array(base64String) {
const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
const rawData = atob(base64);
return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export function suportaNotificacoes() {
return "Notification" in window && "serviceWorker" in navigator;
}
// Pede permissão E cria a inscrição de push de verdade.
export async function ativarNotificacoes() {
if (!suportaNotificacoes()) return { ok: false, motivo: "sem-suporte" };
const permissao = await Notification.requestPermission();
if (permissao !== "granted") return { ok: false, motivo: "negada" };
const registro = await navigator.serviceWorker.ready;
try {
let subscription = await registro.pushManager.getSubscription();
if (!subscription) {
subscription = await registro.pushManager.subscribe({
userVisibleOnly: true, // obrigatório no Chrome
applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
});
}
// 🔜 Em produção: enviar `subscription` para o SEU backend salvar.
console.log("📬 Inscrição de push criada:", subscription.endpoint);
return { ok: true, subscription };
} catch (erro) {
// Em rede corporativa, VPN, alguns bloqueadores de anúncio ou
// navegadores em modo anônimo/automatizado, esta chamada FALHA — e é
// assim mesmo que deve se comportar: a notificação LOCAL continua
// funcionando normalmente, só o push remoto fica indisponível.
console.warn(
"⚠️ Não foi possível criar a inscrição de push (normal em redes restritas):",
erro.message
);
return { ok: false, motivo: "subscribe-falhou", erro };
}
}
// Mostra uma notificação LOCAL agora mesmo — 100% testável, sem servidor.
export async function notificarLocal(titulo, opcoes = {}) {
if (!suportaNotificacoes() || Notification.permission !== "granted") return;
const registro = await navigator.serviceWorker.ready;

await registro.showNotification(titulo, {
icon: "/icons/icon-192.png",
badge: "/icons/icon-192.png",
...opcoes,
});
}