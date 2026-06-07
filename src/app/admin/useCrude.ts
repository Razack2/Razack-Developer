"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/app/lib/supabaseClient";

type CrudPayload = Record<string, unknown>;

export function useCrud<T extends { id: string }>(
  table: string,
  orderBy?: string
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);

    let query = supabase.from(table).select("*");

    if (orderBy) {
      query = query.order(orderBy, { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error(error.message);
    }

    if (data) {
      setItems(data as T[]);
    }

    setLoading(false);
  }, [table, orderBy]);

  const insert = async (payload: CrudPayload) => {
    console.log("TABLE:", table);
    console.log("PAYLOAD:", payload);

    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      console.error("Insert error:", error.message);
      return;
    }

    await fetchItems();
  };

  const update = async (
    id: string,
    payload: CrudPayload
  ) => {
    const { error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error.message);
      return;
    }

    await fetchItems();
  };

  const remove = async (id: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error.message);
      return;
    }

    await fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    fetchItems,
    insert,
    update,
    remove,
  };
}