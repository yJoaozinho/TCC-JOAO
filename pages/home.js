import Styles from "../styles/home.module.css";
import Styles1 from "../styles/modelAdoçãoRequest.module.css";
import SideBar from "../src/components/sideBar/sideBar";
import PostsList from "../src/components/postList/postList";
import { useState, useEffect } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [adots, setAdots] = useState({});
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [adotanteData, setAdotanteData] = useState({});
  const [id, setId] = useState("");
  const [petData, setPetData] = useState({});
  const [idAdot, setIdAdot] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const onAccept = (idAdot) => {
    aceitarAdocao(idAdot);
    setShowModal(false);
  };

  const onRejet = (idAdot) => {
    rejeitarAdot(idAdot);
    setShowModal(false);
  };

  async function rejeitarAdot(idAdot) {


    try {
      const response = await fetch(`http://localhost:2306/adoption/${idAdot}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Adoção aceita com sucesso.");

      } else {
        const erroData = await response.json();
        throw new Error(erroData.mensagem || "Erro ao aceitar adoção");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }


  async function aceitarAdocao(idAdot) {


    try {
      const response = await fetch(`http://localhost:2306/adoption/${idAdot}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Adoção aceita com sucesso.");
        setShowNotificationModal(true);

      } else {
        const erroData = await response.json();
        throw new Error(erroData.mensagem || "Erro ao aceitar adoção");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

   useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);

      } else {
        console.log("Nenhum token encontrado.");
      }
    }

    async function fetchAdots() {
      if (token) {
        try {
          const response = await fetch(`http://localhost:2306/adoption/my`, {
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
            throw new Error("Erro ao buscar adoções pendentes");
          }

          const adoptionsPending = await response.json();
          console.log("Adoções pendentes: ", adoptionsPending);
          console.log("adotante: ", adoptionsPending.pet);
          console.log("pet: ", adoptionsPending.adopter);
          setId(adoptionsPending.pet);
          setIdAdot(adoptionsPending._id);

          if (adoptionsPending) {
            setShowModal(true);
            fetchAdotante(adoptionsPending.adopter);
            setAdots(adoptionsPending);
          }
        } catch (error) {
          setError(error.message);
        }
      }
    }

    async function fetchAdotante(adopterId) {
      try {
        const response = await fetch(
          `http://localhost:2306/user/${adopterId}`,
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
          throw new Error("Erro ao buscar informações do adotante");
        }

        const ata = await response.json();
        setAdotanteData(ata);
        console.log('atarr ', ata);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchAdots();
  }, [token, setShowModal]);

  useEffect(() => {
    async function buscarPerfilPet() {
      if (token && id) {
        try {
          const response = await fetch(`http://localhost:2306/animal/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.status === 401) {
            throw new Error('Usuário não logado!');
          } else if (response.status === 403) {
            throw new Error('Acesso negado!');
          } else if (!response.ok) {
            throw new Error('Erro ao buscar informações do pet');
          }

          const dadosPerfilPet = await response.json();
          console.log('Dados do pet:', dadosPerfilPet);
          setPetData(dadosPerfilPet);
        } catch (error) {
          setError(error.message);
        }
      }
    }

    buscarPerfilPet();
  }, [token, id]);

  return (
    <div className={Styles.meinha}>
      <SideBar />
      <div className={Styles.content}>
        <div className="timeline">
          <PostsList />
        </div>

        {showModal && (
          <div className={Styles1.modal}>
            <div className={Styles1.modalContent}>
              <span
                className={Styles1.closeBtn}
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <p className={Styles1.p}>
                {adotanteData.nome} Esse usuario dedeja adotar seu animal {petData.nome}
              </p>
              <button
                className={Styles1.confirmar}
                onClick={() => {
                  onAccept(idAdot);
                }}
              >
                Sim
              </button>
              <button
                className={Styles.cancelar}
                onClick={() => onRejet(idAdot)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {showNotificationModal && (
          <div className={Styles.modalNotification}>
            <div className={Styles.modalNotificationHeader}>
              <span
                className={Styles.modalNotificationCloseBtn}
                onClick={() => setShowNotificationModal(false)}
              >
                &times;
              </span>
              <h4>Notificação</h4>
            </div>
            <div className={Styles.modalNotificationContent}>
              Adoção aceita com sucesso!
            </div>
            <button
              className={Styles.modalNotificationConfirmBtn}
              onClick={() => setShowNotificationModal(false)}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
