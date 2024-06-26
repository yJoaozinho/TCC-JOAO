import SideBar from "../src/components/sideBar/sideBar";
import Styles from "../styles/meusAnimais.module.css";
import PetCard from "../src/components/petCard/petCard";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";

export default function meusAnimais() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [erro, setErro] = useState("");
  const router = useRouter();

  const [pets, setPets] = useState([]);

  const onDelete = async (petId) => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:2306/animal/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
      } else {
        console.error("Erro ao excluir o pet.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          setUserId(decoded.sub);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      } else {
        console.log("Nenhum token encontrado.");
      }
    }

    async function fetchPets() {
      if (token) {
        try {
          const response = await fetch(`http://localhost:2306/animal/mypets`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 401) {
            throw new Error("Usuário não logado!");
          } else if (response.status === 403) {
            throw new Error("Acesso negado!");
          } else if (!response.ok) {
            throw new Error("Erro ao buscar pets");
          }

          const petiscos = await response.json();
          setPets(petiscos);
        } catch (error) {
          setErro(error.message);
        }
      }
    }
    fetchPets();
  }, [token, pets]);

  return (
    <div className={Styles.cardContainer}>
      <SideBar />
      <div className={Styles.container}>
        {pets?.map((pet) => (
          <div className={Styles.carde} key={pet._id}>
            <PetCard {...pet} />
            <button
              className={Styles.editButton}
              onClick={() => router.push(`/criarPost/${pet._id}`)}
            >
              Postar
            </button>
            <button
              className={Styles.editButton}
              onClick={() => router.push(`/editarPet/${pet._id}`)}
            >
              Editar Animal
            </button>
            <button
              className={Styles.deleteButton}
              onClick={() => onDelete(pet._id)}
            >
              Excluir
            </button>
            <button
              className={Styles.editButton}
              onClick={() => router.push(`/vacinas/${pet._id}`)}
            >
              Vacinas
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
