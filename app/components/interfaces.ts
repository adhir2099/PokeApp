export interface Pokemon {
  id?: number;
  name: string;
  url: string;
  imageUrl: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  species: { url: string };
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string; front_shiny: string };
      home: { front_default: string };
    };
  };
}

export interface EvolutionChain {
  species: { name: string };
  evolves_to: EvolutionChain[];
}