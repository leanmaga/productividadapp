"use client";
import TaskList from "../components/TaskList";
import ProductivityScore from "../components/ProductivityScore";
import { useTaskStore } from "../store/useTaskStore";
import { useEffect } from "react";

export default function Home() {
  const { tasks, fetchTasks, addTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    const title = prompt("¿Qué tarea hiciste hoy?");
    if (title) addTask(title);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">
        ¿Qué tan productivo fuiste hoy?
      </h1>
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Añadir tarea
      </button>
      <div className="grid grid-cols-2 gap-6">
        <TaskList done={true} />
        <TaskList done={false} />
      </div>
      <ProductivityScore />
    </main>
  );
}
