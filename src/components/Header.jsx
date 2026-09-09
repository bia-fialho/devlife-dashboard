import {useState} from "react";
import Relogio from "./Relogio";

function Header(){
    const [mostrarRelogio, setMostrarRelogio] = useState(true);
      return( 
        <header className="bg-slate-900 text-white px-8 py-4"> 
            <h1>Devlife Dashboard</h1>

            <div className="flex items-center gap-3">
                {}
                {mostrarRelogio && <Relogio />}

                <button
                onClick={() => setMostrarRelogio(!mostrarRelogio)}
           >
            {mostrarRelogio ? "Esconder relógio":"Mostrar relógio"}
            </button>
         </div>
     </header>
    );
}
export default Header;

// <Header