import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartComponent() {
  const data = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Día ${i + 1}`,
      score: Math.floor(Math.random() * 100),
    }));
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
}
