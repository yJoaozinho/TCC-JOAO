import Styles from "../../styles/criarPost.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "../../src/components/sideBar/sideBar";

export default function criarPost() {
  const [erro, setErro] = useState("");
  const [descricao, setDescricao] = useState("");
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const { id } = router.query;

  const onClose = () => {
    router.push("/meusAnimais");
    console.log(id);
  };

  const onSend = () => {
    if (token) {
      criarPost(id, descricao);
      router.push("/meusAnimais");
      console.log(id);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          console.log("Token encontrado:", storedToken);
          setToken(storedToken);
          const decoded = jwtDecode(storedToken);
          setUser(decoded.sub);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      } else {
        console.log("Nenhum token encontrado.");
      }
    }

    async function buscarPerfil() {
      try {
        if (token) {
          const response = await fetch(`http://localhost:2306/user/${user}`, {
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
            throw new Error("Erro ao buscar informações do usuário");
          }

          const dadosPerfil = await response.json();
          setUserData(dadosPerfil);
        }
      } catch (error) {
        setErro(error.message);
      }
    }

    buscarPerfil();
  }, [id, token, user]);

  async function criarPost(id, descricao) {
    try {
      const postData = {
        pet: id,
        descricao: descricao,
      };

      if (token) {
        const response = await fetch("http://localhost:2306/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        });

        if (response.status === 201) {
          const responseData = await response.json();
          console.log("Post criado:", responseData.mensagem);
        } else if (response.status === 401) {
          const erroData = await response.json();
          console.error("Erro:", erroData.mensagem);
        } else if (response.status === 403) {
          const erroData = await response.json();
          console.error("Erro:", erroData.mensagem);
        } else {
          console.error("Erro desconhecido ao criar o post.");
        }
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <div className={Styles.raul}>
    <SideBar/>
      <div className={Styles.postContainer}>
        <div className={Styles.userInfo}>
          <div>
            <div className={Styles.userName}>{userData.nome}</div>
            <div className={Styles.username}>@{userData.username}</div>
          </div>
        </div>
        <input
          className={Styles.inputBox}
          name="descricao"
          placeholder="Sobre o que está pensando?"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <div className={Styles.buttons}>
          <button
            className={`${Styles.button} ${Styles.cancel}`}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`${Styles.button} ${Styles.post}`}
            onClick={onSend}
          >
            Postar
          </button>
        </div>
      </div>
    </div>
  );
}
