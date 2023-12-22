import React from "react";
import styles from "./petCard.module.css";

export default function PetCard({
  _idUsuario,
  _id,
  nome,
  idade,
  tipo,
  raca,
  sexo,
  adocao,
  descricao,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src="/sorria-todos-os-dias.png" alt={`Foto de ${nome}`} />
      </div>
      <div className={styles.info}>
        <h2>{nome}</h2>
        <p>
          <strong>Idade:</strong> {idade}
        </p>
        <p>
          <strong>Tipo:</strong> {tipo}
        </p>
        <p>
          <strong>Raça:</strong> {raca}
        </p>
        <p>
          <strong>Sexo:</strong> {sexo}
        </p>
        <p>
          <strong>Adoção:</strong> {adocao ? "Ativa" : "Desabilitada"}
        </p>
        {descricao && (
          <p>
            <strong>Descrição:</strong> {descricao}
          </p>
        )}
      </div>
    </div>
  );
}
