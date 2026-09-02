const prioridadeEstilo = {
    alta: "bd-red-100 text-red-700",
    media: "bg-yellow-100 text-yellow-700",
    baixa: "bg-green-100 text-green-700",
};

function TaskCard({titulo, categoria, prioridade}){
    return(
        <article className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border border-slate-100">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                    {categoria}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full $prioridadeEstilo[prioridade]`}>
                    {prioridade}
                </span>
            </div>
            <h2 className="text-lg font-semibold text-slate-800">{titulo}</h2>
        </article>
    );
}
export default TaskCard;