"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export function useCrud<T extends { id: string }>(table: string, orderBy?: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);

    let query = supabase.from(table).select("*");

    if (orderBy) {
      query = query.order(orderBy, { ascending: false });
    }

    const { data } = await query;

    if (data) setItems(data as T[]);

    setLoading(false);
  };

  const insert = async (payload: any) => {
  console.log("TABLE:", table);
  console.log("PAYLOAD:", payload);

  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error("Insert error:", error);
  }

  fetchItems();
};

const update = async (id: string, payload: any) => {
  const { error } = await supabase
    .from(table)
    .update(payload)
    .eq("id", id);

  if (error) console.error(error.message);

  fetchItems();
};

  const remove = async (id: string, payload:any) => {
    await supabase
    .from(table)
    .delete()
    .eq("id", id);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    fetchItems,
    insert,
    update,
    remove,
  };
}