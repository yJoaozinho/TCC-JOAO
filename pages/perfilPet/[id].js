import Styles from "../../styles/perfilAnimal.module.css";
import SideBar from "../../src/components/sideBar/sideBar";
import FotoDePerfil from "../../src/components/fotoDePerfil/fotoDePerfil";
import PostDosPet from "../../src/components/userList/postDosPet";
import Carteira from "../../src/components/carteiraVacina/carteira";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function perfilPet() {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState(null);
  const [erro, setErro] = useState("");
  const [petData, setPetData] = useState({});
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [showAdoptButton, setShowAdoptButton] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          const id = decoded.sub;
          setUserId(id);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      } else {
        console.log("Nenhum token encontrado.");
      }
    }

    async function buscarPerfilPet() {
      if (token && id) {
        try {
          const response = await fetch(`http://localhost:2306/animal/${id}`, {
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

          const dadosPerfilPet = await response.json();
          console.log("Dados do pet:", dadosPerfilPet);
          setPetData(dadosPerfilPet);

          if (
            userId !== dadosPerfilPet.dono &&
            dadosPerfilPet.adocao === true
          ) {
            setShowAdoptButton(true);
          }

          buscarPerfilUsuario(dadosPerfilPet.dono);
        } catch (error) {
          setErro(error.message);
        }
      }
    }

    async function buscarPerfilUsuario(donoId) {
      if (token && donoId) {
        try {
          const response = await fetch(`http://localhost:2306/user/${donoId}`, {
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

          const dadosPerfilUsuario = await response.json();
          console.log("Dados do usuário:", dadosPerfilUsuario);
          setUserData(dadosPerfilUsuario);
        } catch (error) {
          setErro(error.message);
        }
      }
    }

    if (token && id) {
      buscarPerfilPet();
    }
  }, [token, id, userId]);

  const handleAdoptClick = async () => {
    try {
      const requestData = {
        pet: id,
        owner: petData.dono,
      };
      console.log(requestData);

      if (token) {
        const response = await fetch("http://localhost:2306/adoption", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 204) {
          console.log("Adoção realizada com sucesso!");
        } else if (response.status === 401) {
          const erroData = await response.json();
          console.error("Erro:", erroData.mensagem);
        } else {
          const erroData = await response.json();
          console.error("Erro:", erroData);
        }
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className={Styles.html}>
      <div className={Styles.container}>
        <SideBar />
        <div>
          <Carteira id = {id}/>
        </div>
        <div className={Styles.perfil}>
          <div className={Styles.botoesNav}>
            {showAdoptButton && (
              <button className={Styles.link} onClick={handleAdoptClick}>
                Solicitar adocao
              </button>
            )}
          </div>
          <div className={Styles.vemDeLadinho}>
            <FotoDePerfil h="110" w="140" />
            <div className={Styles.infosPrincipais}>
            <h3 className={Styles.nome}>
                <strong className={Styles.nome}></strong>
                {petData.nome}
              </h3>
              <h3 className={Styles.nickname}>
                <strong className={Styles.nome}></strong>@{userData.username}
              </h3>
              <h4 className={Styles.email}>
                {petData.tipo}
              </h4>
              <h4 className={Styles.email}>
                {petData.idade}
              </h4>
              <h4 className={Styles.email}>
                {petData.raca}
              </h4>
            </div>
          </div>
          <div className={Styles.infoUsuario}>
            <div className={Styles.campo}>
              <strong>Descricao:</strong>
              <br></br>
              <span className={Styles.quebra}>{petData.descricao}</span>
            </div>
          <div className={Styles.barra}></div>
          </div>
          <div>
            <PostDosPet id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
