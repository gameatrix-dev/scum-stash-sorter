import { useCallback, useEffect, useState } from "react";

export type QtyMap = Record<string, number>;

const KEY = "scum-skup-qty";
const EVENT = "scum-skup-qty-change";

let store: QtyMap = {};
let loaded = false;

function load(): QtyMap {
  if (loaded || typeof window === "undefined") return store;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) store = JSON.parse(raw) as QtyMap;
  } catch {
    store = {};
  }
  return store;
}

function persist(next: QtyMap) {
  store = next;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Ilości sztuk współdzielone między listą a ekranem szczegółów. */
export function useQty() {
  const [qty, setQtyState] = useState<QtyMap>({});

  useEffect(() => {
    setQtyState(load());
    const sync = () => setQtyState({ ...store });
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const setItemQty = useCallback((slug: string, value: number) => {
    const v = Math.max(0, Math.floor(value) || 0);
    persist({ ...store, [slug]: v });
  }, []);

  const clear = useCallback(() => persist({}), []);

  return { qty, setItemQty, clear };
}
