import { useState, useEffect} from 'react';

function Relogio(){
    const [hora, setHora] = useState(new Date().toLocaleTimeString ());
    useEffect (() => {
        console.log("Relógio MONTADO - Intervalo ligado");

        const intervalo = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
        }, 1000);

        return() => {
            console.log("Relogio DESMONTADO");
            clearInterval(intervalo);
        };
    }, []); 
    return (
        <span className="font-mono text-emerald-400 text-sm bg-slate-800 px-3 py-1 rounded-lg">
            {hora}
        </span>
    );
}
export default Relogio;