import React, { useState, useEffect } from 'react';
import Styles from "./post.module.css";
import { useRouter } from "next/router";

export default function NotificacaoComponent({ owner, adopter, pet, tome }) {
    const router = useRouter();
    const [adotanteData, setAdotanteData] = useState({});
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [petData, setPetData] = useState({});

    useEffect(() => {
        // A lógica para obter o token permanece igual
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            } else {
                console.log("Nenhum token encontrado.");
            }
        }
    }, []);

    useEffect(() => {
        async function fetchAdotante() {
            if (!adopter || !token) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:2306/user/${adopter}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar informações do adotante");
                }

                const ata = await response.json();
                setAdotanteData(ata);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchAdotante();
    }, [adopter, token]);
    useEffect(() => {
        async function buscarPerfilPet() {
          if (token && pet) {
            try {
              const response = await fetch(`http://localhost:2306/animal/${pet}`, {
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
      }, [token, pet]);

    const handleAccept = () => {
        console.log("Notificação aceita");
    };

    const handleReject = () => {
        console.log("Notificação recusada");
    };

    return (
        <div className={Styles.post}>
            <div className={Styles.postHeader}>

                <div>
                    <div className={Styles.name}>Notificação</div>
                </div>
            </div>
            <div className={Styles.postContent}>
                <button
                    className={Styles.petButton}
                    onClick={() => router.push(`/outroUsuario/${adopter}`)}
                >
                    @{adotanteData.username}
                </button>
                {" "}deseja adotar seu animal{" "}
                <button
                    className={Styles.petButton}
                    onClick={() => router.push(`/perfilPet/${pet}`)}
                >
                    @{petData.nome}
                </button>
            </div>
            <div className={Styles.postFooter}>
                <button className={Styles.actionButton} onClick={handleAccept}>Aceitar</button>
                <button className={Styles.actionButton} onClick={handleReject}>Recusar</button>
            </div>
        </div>
    );
}