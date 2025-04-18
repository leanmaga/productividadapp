import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

export default function ProductivityScore() {
  const { tasks } = useTaskStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const doneCount = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const score = total ? Math.round((doneCount / total) * 100) : 0;

  const data = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Día ${i + 1}`,
      score: Math.floor(Math.random() * 100),
    }));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-black">Puntaje:</h3>
      <p className="text-4xl font-bold text-black">{score}</p>
      <div className="w-full h-40 mt-4">
        {/* {isClient && (
        //   <ResponsiveContainer width="100%" height="100%">
        //     <LineChart data={data}>
        //       <CartesianGrid strokeDasharray="3 3" />
        //       <XAxis dataKey="day" />
        //       <YAxis />
        //       <Tooltip />
        //       <Line type="monotone" dataKey="score" stroke="#3b82f6" />
        //     </LineChart>
        //   </ResponsiveContainer>
        )} */}
      </div>
    </div>
  );
}
