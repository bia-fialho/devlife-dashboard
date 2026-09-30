import { useState, useEffect } from "react";
import {
suportaNotificacoes,
ativarNotificacoes,
notificarLocal,
} from "../notifications";
function NotificationPrompt() {
const [permissao, setPermissao] = useState(
suportaNotificacoes() ? Notification.permission : "unsupported"
);
const [carregando, setCarregando] = useState(false);
// Se a permissão já foi concedida numa visita anterior, garantimos a
// inscrição de push SEM esperar um clique — sem isso, quem já tinha
// aceitado nunca geraria a subscription real.
useEffect(() => {
if (permissao === "granted") {
ativarNotificacoes().catch((erro) =>
console.warn("Inscrição de push adiada:", erro)
);
}
}, [permissao]);


async function handleAtivar() {
setCarregando(true);
const resultado = await ativarNotificacoes();
setPermissao(Notification.permission);
setCarregando(false);
if (resultado.ok) {
notificarLocal("DevLife Dashboard", {
body: "Notificações ativadas! Vamos te avisar sobre tarefas importantes.",
});
}
}
if (permissao === "unsupported" || permissao === "denied") return null;
if (permissao === "granted") {
return (
<div
className={`bg-slate-800 text-slate-200 text-sm px-6 py-2
flex items-center justify-between flex-wrap gap-2`}
>
<span>🔔 Notificações ativadas.</span>
<button
onClick={() =>
notificarLocal("DevLife Dashboard", {
body: "Esta é uma notificação de teste 🚀",
})
}
className={`text-xs font-semibold underline decoration-dotted hover:text-white
focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded px-1`}
>
Testar notificação
</button>
</div>
);
}
return (
<div
className={`bg-slate-800 text-slate-200 px-6 py-3
flex items-center justify-between flex-wrap gap-3`}
>
<p className="text-sm">🔔 Quer ser avisado quando concluir uma tarefa importante?

</p>
<button
onClick={handleAtivar}
disabled={carregando}
className={`bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white
text-sm font-bold px-4 py-1.5 rounded-lg focus:outline-none focus:ring-2
focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800`}
>
{carregando ? "Ativando..." : "Ativar notificações"}
</button>
</div>
);
}
export default NotificationPrompt;