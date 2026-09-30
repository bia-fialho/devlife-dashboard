// Suporte: Chrome/Edge/Opera sim; Firefox e Safari NÃO implementam esta
// API — por isso o feature detection abaixo é obrigatório.
export function suportaBackgroundSync() {
return "serviceWorker" in navigator && "SyncManager" in window;
}
export async function agendarSincronizacao(tag = "sincronizar-tarefas") {
if (!suportaBackgroundSync()) {
console.warn(
"Background Sync não suportado neste navegador — sem problema,",
"os dados já estão salvos localmente."
);
return false;
}
try {
const registro = await navigator.serviceWorker.ready;
await registro.sync.register(tag);
console.log(`🔄 Sincronização "${tag}" agendada — vai disparar quando a rede
voltar.`);
return true;
} catch (erro) {
console.error("Falha ao agendar Background Sync:", erro);
return false;
}
}