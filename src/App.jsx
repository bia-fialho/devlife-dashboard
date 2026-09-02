import { useState } from 'react'
import Header from "./components/Header"
import './App.css'
import TaskCard from './components/TaskCard'

const tarefas = [
  {id:1, titulo: "Estudar React", categoria: "SENAI", prioridade: "alta"},
  {id:2, titulo: "Viagem Larissa", categoria: "SESI", prioridade: "baixa"},
  {id:3, titulo: "Prova de Magnetismo", categoria: "SESI", prioridade: "baixa"},
  {id:4, titulo: "Projeto Final", categoria: "SENAI", prioridade: "alta"},
];

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="min-h-screen bg-slate-100">
    <Header />

    <main className="max-w-4x1 mx-auto px-6 py-10">
      <h2 className="text-xl font-bold text-slate-700 mb-6">
        Minhas tarefinhas ({tarefas.length})
        </h2>

      <section className="grid gap-4 sm:grid-cols-2">
        {tarefas.map((tarefa) => (
        <TaskCard
        key={tarefa.id}
        titulo={tarefa.titulo}
        categoria={tarefa.categoria}
        prioridade={tarefa.prioridade}
        />
        ))}

      </section>
    </main>
   </div> 
  );
}

export default App
