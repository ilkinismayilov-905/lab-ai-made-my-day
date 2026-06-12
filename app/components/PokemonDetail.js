"use client";

import { useEffect, useState } from "react";
import { getPokemonId, getPokemonImage } from "../lib/pokeapi";
import styles from "./PokemonDetail.module.css";

// Expanded detail card shown on top of the page when a Pokemon is clicked.
// It fetches the full details (types, stats, height, weight) for that Pokemon.
export default function PokemonDetail({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      setDetails(data);
    }

    loadDetails();
  }, [pokemon]);

  const id = getPokemonId(pokemon.url);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <img className={styles.image} src={getPokemonImage(id)} alt={pokemon.name} />

        <h2 className={styles.name}>{pokemon.name}</h2>
        <p className={styles.id}>#{id}</p>

        {!details ? (
          <p className={styles.loading}>Loading details…</p>
        ) : (
          <div className={styles.details}>
            <div className={styles.types}>
              {details.types.map((t) => (
                <span className={styles.typeBadge} key={t.type.name}>
                  {t.type.name}
                </span>
              ))}
            </div>

            <p className={styles.measurement}>
              <strong>Height:</strong> {details.height / 10} m
            </p>
            <p className={styles.measurement}>
              <strong>Weight:</strong> {details.weight / 10} kg
            </p>

            <h3 className={styles.statsTitle}>Base stats</h3>
            {details.stats.map((s) => (
              <div className={styles.statRow} key={s.stat.name}>
                <span className={styles.statName}>{s.stat.name}</span>
                <span className={styles.statValue}>{s.base_stat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
