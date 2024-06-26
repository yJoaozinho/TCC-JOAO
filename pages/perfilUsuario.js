import Styles from "../styles/perfilUsuario.module.css";
import SideBar from "../src/components/sideBar/sideBar";
import FotoDePerfil from "../src/components/fotoDePerfil/fotoDePerfil";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ImageUpload from "../src/components/imagens/imageUpload";
import UserList from "../src/components/userList/UserList";

export default function perfilUsuario() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [erro, setErro] = useState("");
  const [userData, setUserData] = useState({});

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

    async function buscarPerfil() {
      if (token && userId) {
        try {
          const response = await fetch(`http://localhost:2306/user/${userId}`, {
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
        } catch (error) {
          setErro(error.message);
        }
      }
    }

    buscarPerfil();
  }, [token, userId]);

  const handleEdit = async (e) => {
    router.push("/infoUser");
  };

  return (
    <div className={Styles.html}>
      <div className={Styles.container}>
        <SideBar />
        <div className={Styles.perfil}>
          <ImageUpload userId = {userId}/>

          <div className={Styles.botoesNav}>
           
            <button className={Styles.link} onClick={handleEdit}>
              informações Pessoais
            </button>
          </div>
          <div className={Styles.vemDeLadinho}>
            <FotoDePerfil userId = {userId} />
            <div className={Styles.infosPrincipais}>
              <h3 className={Styles.nome}>
                <strong className={Styles.nome}></strong>
                {userData.nome}
              </h3>
              <h3 className={Styles.nickname}>
                <strong className={Styles.nome}></strong>@{userData.username}
              </h3>
              <h4 className={Styles.email}>
                {userData.email}
              </h4>
              <h4 className={Styles.email}>
                {userData.cidade}
              </h4>
              <h4 className={Styles.email}>
                {userData.estado}
              </h4>
            </div>
          </div>

          <div className={Styles.infoUsuario}>
            <div className={Styles.campo}>
              <strong>Biografia</strong>
              <br></br>
              <span className={Styles.quebra}>{userData.biografia}</span>
            </div>
          </div>
          <div className={Styles.barra}></div>
          <div className={Styles.timeline}>
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}
