import { useTaskStore } from "../store/useTaskStore";

export default function TaskList({ done }) {
  const { tasks, toggleTask } = useTaskStore();
  const filtered = tasks.filter((t) => t.done === done);

  return (
    <div
      className={`p-4 rounded text-black ${done ? "bg-blue-50" : "bg-red-50"}`}
    >
      <h2 className="font-semibold mb-2">
        {done ? "Tareas hechas" : "Tareas no hechas"}
      </h2>
      {filtered.map((task) => (
        <div
          key={task.id}
          onClick={() => toggleTask(task.id)}
          className="bg-white shadow-sm p-2 my-1 cursor-pointer rounded hover:bg-gray-100"
        >
          {task.title}
        </div>
      ))}
    </div>
  );
}
