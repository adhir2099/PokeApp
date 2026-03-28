import { useState, useEffect } from "react";
import axios from "axios";
import { Pokemon } from "../interfaces";

export function useGenerations() {
  const [generationData, setGenerationData] = useState<Pokemon[][]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await Promise.all(
        Array.from({ length: 9 }, (_, i) =>
          axios.get(`https://pokeapi.co/api/v2/generation/${i + 1}`).then(async (res) => {
            const species = res.data.pokemon_species;
            const pokes = await Promise.all(
              species.map(async (s: { name: string; url: string }) => {
                const detail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${s.name}`);
                return {
                  id: detail.data.id,
                  name: s.name,
                  url: `https://pokeapi.co/api/v2/pokemon/${s.name}`,
                  imageUrl: detail.data.sprites.other["official-artwork"].front_default,
                };
              })
            );
            return pokes.sort((a, b) => a.id - b.id);
          })
        )
      );
      setGenerationData(all);
    };
    load();
  }, []);

  return generationData;
}