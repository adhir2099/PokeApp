import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Pokemon } from "../interfaces";

const dedup = (arr: Pokemon[]) => {
  const seen = new Set<string>();
  return arr.filter((p) => (seen.has(p.url) ? false : seen.add(p.url) && true));
};

export function usePokemonList() {
  const [list, setList] = useState<Pokemon[]>([]);
  const [filtered, setFiltered] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPage = useCallback(async (off: number): Promise<Pokemon[]> => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${off}`);
    return Promise.all(
      res.data.results.map(async (p: { name: string; url: string }) => {
        const detail = await axios.get(p.url);
        return {
          ...p,
          id: detail.data.id,
          imageUrl: detail.data.sprites.other["official-artwork"].front_default,
        };
      })
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPage(0).then((data) => {
      setList(data);
      setFiltered(data);
      setIsLoading(false);
    });
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const next = offset + 20;
    setOffset(next);
    const newData = await fetchPage(next);
    setList((prev) => dedup([...prev, ...newData]));
    setFiltered((prev) => dedup([...prev, ...newData]));
    setIsLoading(false);
  }, [isLoading, offset, fetchPage]);

  return { list, filtered, setFiltered, isLoading, loadMore };
}