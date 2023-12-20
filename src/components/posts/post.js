import Styles from "./post.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Post({ petId, nome, username, descricao }) {
  const router = useRouter();
  const idDoPet = petId;
  const [pet, setPet] = useState({});
  const [token, setToken] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          console.log("a porra do token do post:", token);
          setToken(token);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      } else {
        console.log("Nenhum token encontrado.");
      }
    }
    fetchPets();
    console.log("idzin", idDoPet);
    console.log("tokenzin", token);
    async function fetchPets() {
      try {
        const response = await fetch(
          `http://localhost:2306/animal/${idDoPet}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          throw new Error("Usuário não logado!");
        } else if (response.status === 403) {
          throw new Error("Acesso negado!");
        } else if (!response.ok) {
          throw new Error("Erro ao buscar pets");
        }

        const petiscos = await response.json();
        setPet(petiscos);
        console.log("dados do animal: ", petiscos);
      } catch (error) {
        setErro(error.message);
      }
    }
  }, [idDoPet, token]);

  return (
    <div className={Styles.post}>
      <div className={Styles.postHeader}>
        <img src="/peraul.jpg" alt={`Foto do ${nome}`} />
        <div>
          <div className={Styles.name}>{nome}</div>
          <div className={Styles.timestamp}>@{username}</div>
        </div>
        <div className={Styles.raiPaLa}>
          <button
            className={Styles.petButton}
            onClick={() => router.push(`/perfilPet/${idDoPet}`)}
          >
            @{pet.nome}
          </button>
        </div>
      </div>
      <div className={Styles.postContent}>{descricao}</div>
      <div className={Styles.postFooter}>
        <div className={Styles.heartContainer} title="Like">
          <input
            type="checkbox"
            className={Styles.checkbox}
            id="Give-It-An-Id"
          />
          <div className={Styles.svgContainer}>
            {/* Assegure-se de que os SVGs têm o atributo xmlns definido corretamente */}
            <svg
              viewBox="0 0 24 24"
              className={Styles.svgOutline}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Seu caminho SVG */}
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={Styles.svgFilled}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Seu caminho SVG */}
            </svg>
            <svg
              className={Styles.svgCelebrate}
              width="100"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Seus polígonos SVG */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
