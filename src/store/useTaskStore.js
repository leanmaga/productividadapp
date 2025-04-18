import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  fetchTasks: async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) set({ tasks: data });
  },
  addTask: async (title) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, done: false }])
      .select();
    if (!error && data.length) {
      set((state) => ({ tasks: [data[0], ...state.tasks] }));
    }
  },
  toggleTask: async (id) => {
    const tasks = get().tasks;
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const { data, error } = await supabase
      .from("tasks")
      .update({ done: !task.done })
      .eq("id", id)
      .select();

    if (!error && data.length) {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? data[0] : t)),
      }));
    }
  },
}));
