"use client";

import React, { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faWeight, faRulerVertical, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { PokemonDetail, Pokemon } from "./interfaces";
import { TYPE_COLORS } from "./constants";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";

interface Props {
  detail: PokemonDetail;
  evolutions: Pokemon[];
  onClose: () => void;
}

export const PokemonModal = ({ detail, evolutions, onClose }: Props) => {
  const [isShiny, setIsShiny] = useState(false);

  const primaryType = detail.types[0]?.type.name ?? "normal";
  const typeColor = TYPE_COLORS[primaryType] ?? { bg: "#888" };
  const artwork = isShiny
    ? detail.sprites.other["official-artwork"].front_shiny
    : detail.sprites.other["official-artwork"].front_default;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <div className="modal-glow" style={{ background: typeColor.bg, opacity: 0.15 }} />

        <button className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header */}
        <div className="modal-header">
          <Zoom>
            <Image
              src={artwork}
              alt={detail.name}
              width={160}
              height={160}
              className="modal-sprite"
              unoptimized
            />
          </Zoom>
          <div style={{ textAlign: "center" }}>
            <p className="modal-dex">#{String(detail.id).padStart(3, "0")}</p>
            <h2 className="modal-name">
              {detail.name.charAt(0).toUpperCase() + detail.name.slice(1)}
            </h2>
            <div style={{ marginTop: 8 }}>
              {detail.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>
            <button
              className="shiny-btn"
              onClick={() => setIsShiny(!isShiny)}
              title={isShiny ? "View Normal" : "View Shiny"}
            >
              <FontAwesomeIcon icon={isShiny ? faStar : faStarHalfAlt} />
              <span>{isShiny ? "Shiny" : "Normal"}</span>
            </button>
          </div>
        </div>

        {/* Weight / Height */}
        <div className="modal-stats-row">
          <div className="stat-pill">
            <FontAwesomeIcon icon={faWeight} style={{ marginRight: 6, opacity: 0.6 }} />
            <span className="stat-val">{detail.weight / 10}</span>
            <span className="stat-unit">kg</span>
          </div>
          <div className="stat-pill">
            <FontAwesomeIcon icon={faRulerVertical} style={{ marginRight: 6, opacity: 0.6 }} />
            <span className="stat-val">{detail.height / 10}</span>
            <span className="stat-unit">m</span>
          </div>
        </div>

        {/* Abilities */}
        <div className="modal-section">
          <h4 className="section-label">Abilities</h4>
          {detail.abilities.map((a) => (
            <span key={a.ability.name} className="ability-chip">
              {a.ability.name.replace("-", " ")}
            </span>
          ))}
        </div>

        {/* Base Stats */}
        <div className="modal-section">
          <h4 className="section-label">Base Stats</h4>
          {detail.stats.map((s) => (
            <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
          ))}
        </div>

        {/* Evolutions */}
        {evolutions.length > 0 && (
          <div className="modal-section">
            <h4 className="section-label">Evolution Chain</h4>
            <div className="evo-row">
              {evolutions.map((evo, i) => (
                <React.Fragment key={evo.name}>
                  {i > 0 && <span className="evo-arrow">→</span>}
                  <div className="evo-item">
                    <Image src={evo.imageUrl} alt={evo.name} width={64} height={64} unoptimized />
                    <p className="evo-name">
                      {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};