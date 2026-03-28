import Image from "next/image";
import { Pokemon } from "./interfaces";

interface Props {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: Props) => {
  const dexNum = pokemon.id ?? Number(pokemon.url.split("/").filter(Boolean).pop());

  return (
    <div onClick={onClick} className="poke-card">
      <div className="card-number">#{String(dexNum).padStart(3, "0")}</div>
      <div className="card-img-wrap">
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={96}
          height={96}
          className="card-img"
          unoptimized
        />
      </div>
      <h3 className="card-name">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h3>
    </div>
  );
};