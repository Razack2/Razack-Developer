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

  const insert = async (payload: Partial<T>) => {
    await supabase.from(table).insert(payload as any);
    fetchItems();
  };

  const update = async (id: string, payload: Partial<T>) => {
    await supabase.from(table).update(payload as any).eq("id", id);
    fetchItems();
  };

  const remove = async (id: string) => {
    await supabase.from(table).delete().eq("id", id);
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