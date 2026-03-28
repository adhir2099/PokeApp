import { useState, useEffect } from "react";
import axios from "axios";
import { Pokemon } from "../interfaces";

export function useGenerations() {
  const [genData, setGenData] = useState<Pokemon[][]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await Promise.all(
        Array.from({ length: 9 }, (_, i) =>
          axios.get(`https://pokeapi.co/api/v2/generation/${i + 1}`).then(async (res) => {
            const species: { name: string; url: string }[] = res.data.pokemon_species;

            const results = await Promise.allSettled(
              species.map(async (s) => {
                const speciesRes = await axios.get(s.url);
                const defaultVariety = speciesRes.data.varieties.find(
                  (v: { is_default: boolean }) => v.is_default
                );
                if (!defaultVariety) throw new Error(`No default variety for ${s.name}`);

                const detail = await axios.get(defaultVariety.pokemon.url);
                const pokemon: Pokemon = {
                  id: detail.data.id,
                  name: s.name,
                  url: defaultVariety.pokemon.url,
                  imageUrl:
                    detail.data.sprites.other["official-artwork"].front_default ??
                    detail.data.sprites.front_default,
                };
                return pokemon;
              })
            );

            return results
              .filter((r): r is PromiseFulfilledResult<Pokemon> => r.status === "fulfilled" && r.value.imageUrl !== null)
              .map((r) => r.value)
              .sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
          })
        )
      );
      setGenData(all);
    };

    load();
  }, []);

  return genData;
}