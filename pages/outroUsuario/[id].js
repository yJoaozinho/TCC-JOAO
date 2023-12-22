import React, { useState, useEffect } from "react";
import Styles from "../../styles/perfilOthers.module.css";
import SideBar from "../../src/components/sideBar/sideBar";
import FotoDePerfil from "../../src/components/fotoDePerfil/fotoDePerfil";
import FollowButton from "../../src/components/likeButtton/followButton";
import PosteList from "../../src/components/userList/posteList";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export default function outroUser() {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState(null);
  const [erro, setErro] = useState("");
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

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

      const followedStatus = localStorage.getItem(`followed-${id}`);
      setIsFollowed(followedStatus === "true");
    }
  }, [id]);

  useEffect(() => {
    const buscarPerfil = async () => {
      if (token && id) {
        try {
          const response = await fetch(`http://localhost:2306/user/${id}`, {
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
            throw new Error("Erro ao buscar informações do pet");
          }

          const dadosPerfil = await response.json();
          setUserData(dadosPerfil);

          if (userId !== dadosPerfil._id) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        } catch (error) {
          setErro(error.message);
        }
      }
    };

    if (token && id) {
      buscarPerfil();
    }
  }, [token, id, userId]);

  const handleFollowClick = () => {
    setIsFollowed(true);
    localStorage.setItem(`followed-${id}`, "true");
  };

  return (
    <div className={Styles.html}>
      <div className={Styles.container}>
        <SideBar />
        <div className={Styles.perfil}>
          <div className={Styles.botoesNav}>
            {showButton && (
              <FollowButton
                isFollowed={isFollowed}
                onFollowClick={handleFollowClick}
              />
            )}
          </div>
          <div className={Styles.vemDeLadinho}>
            <FotoDePerfil h="110" w="140" />
            <div className={Styles.infosPrincipais}>
              <h3 className={Styles.nome}>
                <strong className={Styles.nickname}>{userData.nome}</strong> - @
                {userData.username}
              </h3>
              <h4>
                {" "}
                {userData.cidade} - {userData.estado}
              </h4>
            </div>
          </div>
          <div className={Styles.infoUsuario}>
            <div className={Styles.campo}>
              <strong>Descrição:</strong>
              <br></br>
              <span className={Styles.quebra}>{userData.biografia}</span>
            </div>
            <div className={Styles.barra}></div>
          </div>
          <div>
            <PosteList id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
