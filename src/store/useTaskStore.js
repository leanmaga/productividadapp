import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";

// Crear una instancia de Supabase solo en el cliente
const createSupabaseClient = () => {
  // Verificar que estamos en el navegador
  if (typeof window !== "undefined") {
    // Asegúrate de que estas variables estén disponibles en tu entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    return createClient(supabaseUrl, supabaseKey);
  }
  return null;
};

// Store con inicialización perezosa
export const useTaskStore = create((set, get) => {
  // Verificar que estamos en el cliente antes de crear Supabase
  const isClient = typeof window !== "undefined";
  const supabase = isClient ? createSupabaseClient() : null;

  return {
    tasks: [],

    fetchTasks: async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) set({ tasks: data });
    },

    addTask: async (title) => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title, done: false }])
        .select();

      if (!error && data.length) {
        set((state) => ({ tasks: [data[0], ...state.tasks] }));
      }
    },

    toggleTask: async (id) => {
      if (!supabase) return;

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
  };
});
