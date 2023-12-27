import React, { useState, useEffect } from 'react';
import Styles from "./post.module.css";
import { useRouter } from "next/router";

export default function NotificacaoComponent({ owner, adopter, pet, tome }) {
    const router = useRouter();
    const [adotanteData, setAdotanteData] = useState({});
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [petData, setPetData] = useState({});
    const [idAdot, setIdAdot] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setIdAdot(tome);
    }, [tome]);

    useEffect(() => {
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

                    if (!response.ok) {
                        throw new Error('Erro ao buscar informações do pet');
                    }

                    const dadosPerfilPet = await response.json();
                    setPetData(dadosPerfilPet);
                } catch (error) {
                    setError(error.message);
                }
            }
        }

        buscarPerfilPet();
    }, [token, pet]);

    const handleAccept = () => {
        aceitarAdocao(idAdot);
    };

    const handleReject = () => {
        rejeitarAdot(idAdot);
    };

    async function aceitarAdocao(id) {
        try {
            const response = await fetch(`http://localhost:2306/adoption/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 202) {
                console.log("Adoção aceita com sucesso.");
               
            } else {
                const erroData = await response.json();
                throw new Error(erroData.mensagem || "Erro ao aceitar adoção");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    async function rejeitarAdot(id) {
        try {
            const response = await fetch(`http://localhost:2306/adoption/torefuse/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                console.log("Adoção recusada com sucesso.");
                
            } else {
                const erroData = await response.json();
                throw new Error(erroData.mensagem || "Erro ao recusar adoção");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    }

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
            <div className={Styles.expandSection}>
                <button onClick={toggleExpand} className={Styles.expandButton}>
                    {isExpanded ? '▲' : '▼'}
                </button>
                <div style={{ display: isExpanded ? 'block' : 'none' }}>
                   
                    <p>Contatos do adotante</p>
                    <div>
                        {adotanteData.email}
                        {adotanteData.numero}
                    </div>
                </div>
            </div>
            <div className={Styles.postFooter}>
                <button className={Styles.actionButton} onClick={handleAccept}>Aceitar</button>
                <button className={Styles.actionButton} onClick={handleReject}>Recusar</button>
            </div>
        </div>
    );
}