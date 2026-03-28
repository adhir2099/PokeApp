import axios from "axios";
import { Pokemon, PokemonDetail, EvolutionChain } from "../interfaces";

export async function fetchPokemonDetail(url: string): Promise<{
  detail: PokemonDetail;
  evolutions: Pokemon[];
}> {
  const res = await axios.get(url);
  const detail: PokemonDetail = res.data;
  const specRes = await axios.get(res.data.species.url);
  const evoRes = await axios.get(specRes.data.evolution_chain.url);

  const evolutions: Pokemon[] = [];

  const walk = async (chain: EvolutionChain) => {
    const d = await axios.get(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
    evolutions.push({
      id: d.data.id,
      name: chain.species.name,
      url: `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`,
      imageUrl: d.data.sprites.other?.home.front_default ?? d.data.sprites.front_default,
    });
    for (const next of chain.evolves_to) await walk(next);
  };

  await walk(evoRes.data.chain);
  return { detail, evolutions };
}