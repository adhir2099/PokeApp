"use client";

import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Pokemon, PokemonDetail } from "./components/interfaces";
import { GENERATIONS } from "./components/constants";
import { usePokemonList } from "./components/hooks/usePokemonList";
import { useGenerations } from "./components/hooks/useGenerations";
import { useInfiniteScroll } from "./components/hooks/useInfiniteScroll";
import { fetchPokemonDetail } from "./components/utils/fetchPokemonDetail";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonModal } from "./components/PokemonModal";
// import { GlobalStyles } from "./components/GlobalStyles";

const Main: React.FC = () => {
  const { list, filtered, setFiltered, isLoading, loadMore } = usePokemonList();
  const genData = useGenerations();
  useInfiniteScroll(loadMore, isLoading);

  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectKey, setSelectKey] = useState(0);
  const [modalData, setModalData] = useState<{
    detail: PokemonDetail;
    evolutions: Pokemon[];
  } | null>(null);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    if (!q) return setFiltered(list);

    const local = list.filter((p) => p.name.toLowerCase().includes(q));
    if (local.length) return setFiltered(local);

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${q}`);
      setFiltered([{
        id: res.data.id,
        name: res.data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${q}`,
        imageUrl: res.data.sprites.other["official-artwork"].front_default,
      }]);
      setErrorMsg("");
    } catch {
      setFiltered([]);
      setErrorMsg(`No Pokémon found for "${q}"`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFiltered(list);
    setErrorMsg("");
    setSelectKey((k) => k + 1);
  };

  const handleGenSelect = async (url: string) => {
    if (!url) return;
    try {
      const res = await axios.get(url);
      setFiltered([{
        id: res.data.id,
        name: res.data.name,
        url,
        imageUrl: res.data.sprites.other["official-artwork"].front_default,
      }]);
      setErrorMsg("");
    } catch {
      setFiltered([]);
    }
  };

  const handleCardClick = async (pokemon: Pokemon) => {
    try {
      const data = await fetchPokemonDetail(pokemon.url);
      setModalData(data);
      setErrorMsg("");
    } catch {
      setErrorMsg("Failed to load Pokémon details. Please try again.");
    }
  };

  return (
    <>

      <header className="site-header">
        <div className="pokeball-icon" />
        <h1 className="site-title">PokéApp</h1>
      </header>

      <main className="page">
        {errorMsg && <div className="error-bar">{errorMsg}</div>}

        {/* Search */}
        <div className="search-wrap">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search Pokémon by name…"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={handleClearSearch}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        {/* Generation dropdowns */}
        <div className="gen-grid">
          {genData.map((generation, genIndex) => (
            <select
              key={`${selectKey}-${genIndex}`}
              className="gen-select"
              defaultValue=""
              onChange={(e) => handleGenSelect(e.target.value)}
            >
              <option value="" disabled>
                {GENERATIONS[genIndex]}
              </option>
              {generation.map((pokemon, index) => (
                <option key={index} value={pokemon.url}>
                  {`${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Grid */}
        <div className="poke-grid">
          {filtered.map((p, i) => (
            <PokemonCard
              key={`${p.url}-${i}`}
              pokemon={p}
              onClick={() => handleCardClick(p)}
            />
          ))}
        </div>

        {/* Clear button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <button
            onClick={handleClearSearch}
            style={{
              padding: "10px 48px",
              background: "#1e2533",
              border: "1px solid #252d3d",
              borderRadius: "10px",
              color: "#e0e6f0",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffd600")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#252d3d")}
          >
            Clear
          </button>
        </div>

        {isLoading && (
          <div className="loading-row">
            <FontAwesomeIcon icon={faSpinner} spin />
            Loading Pokémon…
          </div>
        )}
      </main>

      {modalData && (
        <PokemonModal
          detail={modalData.detail}
          evolutions={modalData.evolutions}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
};

export default Main;