import React, { useState, useEffect } from "react";
import Pet from "./pet";
import Styles from "./pet.module.css";

export default function PetList() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          console.log("Token encontrado:", storedToken);
          setToken(storedToken);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      } else {
        console.log("Nenhum token encontrado.");
      }
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("http://localhost:2306/animal/petstoadopt", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
          console.log("post aquis", data);
        } else {
          console.error("A resposta da API não é um array:", data);
        }
      })
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, [token]);

  return (
    <div className={Styles.es}>
      {posts.map((post) => (
        <Pet
          key={post.id}
          _id={post._id}
          nome={post.nome}
          tipo={post.tipo}
          descricao={post.descricao}
          dono={post.dono}
        />
      ))}
    </div>
  );
}
