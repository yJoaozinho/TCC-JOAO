import React, { useState, useEffect } from 'react';
import Styles from "./post.module.css";
import { useRouter } from "next/router";
import LikeButton from "../likeButtton/likeButton";

function timeSince(date) {
    const now = new Date();
    const postDate = new Date(date);
    const differenceInSeconds = Math.floor((now - postDate) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInMonth = 2592000;
    const secondsInYear = 31536000;

    let elapsedTime;

    if (differenceInSeconds < secondsInMinute) {
        return `${differenceInSeconds} segundos atrás`;
    } else if (differenceInSeconds < secondsInHour) {
        elapsedTime = Math.floor(differenceInSeconds / secondsInMinute);
        return `${elapsedTime} minutos atrás`;
    } else if (differenceInSeconds < secondsInDay) {
        elapsedTime = Math.floor(differenceInSeconds / secondsInHour);
        return `${elapsedTime} horas atrás`;
    } else if (differenceInSeconds < secondsInMonth) {
        elapsedTime = Math.floor(differenceInSeconds / secondsInDay);
        return `${elapsedTime} dias atrás`;
    } else if (differenceInSeconds < secondsInYear) {
        elapsedTime = Math.floor(differenceInSeconds / secondsInMonth);
        return `${elapsedTime} meses atrás`;
    } else {
        elapsedTime = Math.floor(differenceInSeconds / secondsInYear);
        return `${elapsedTime} anos atrás`;
    }
}

export default function Post({chave, user, petId, nome, username, descricao, tempo }) {
    const router = useRouter();
    const [pet, setPet] = useState({});
    const [token, setToken] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            } else {
                console.log("Nenhum token encontrado.");
            }
        }

        async function fetchPets() {
            try {
                const response = await fetch(`http://localhost:2306/animal/${petId}`, {
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

                const petData = await response.json();
                setPet(petData);
            } catch (error) {
                setErro(error.message);
            }
        }

        fetchPets();
    }, [petId, token]);

    const tempoDesdeCriacao = timeSince(tempo);

    return (
        <div className={Styles.post}>
        <div className={Styles.container2}>
            <div className={Styles.container}>
                <div>
                    <svg width="50" height="50" stroke='gray'>
                        <rect width="50" height="100" />
                    </svg>
                    <svg width="100" height="50" stroke='gray'>
                        <rect width="150" height="40" />
                    </svg>
                    <svg width="30" height="30" stroke='gray'>
                        <rect width="30" height="30" />
                    </svg>
                </div>
                <div>
                    <svg width="180" height="50" stroke='gray'>
                        <rect width="180" height="50" />
                    </svg>
                </div>
                <div>
                    <svg width="30" height="30" stroke='gray'>
                        <rect width="30" height="30" />
                    </svg>
                </div>
            </div>
        </div>
            <div className={Styles.postHeader}>
                <img src="/do-utilizador.png" alt={`Foto do ${nome}`} />
                <div>
                    <div className={Styles.name}>{nome}</div>
                    <div className={Styles.timestamp}>
                        <button
                            className={Styles.arrobaButton}
                            onClick={() => router.push(`/outroUsuario/${user}`)}
                        >
                            @{username}
                        </button>
                        <button
                            className={Styles.arrobaButton}
                            onClick={() => router.push(`/perfilPet/${petId}`)}
                        >
                            @{pet.nome}
                        </button>
                        <span className={Styles.timeSince}>{tempoDesdeCriacao}</span>
                    </div>
                </div>
                <div className={Styles.raiPaLa}>
                    
                </div>
            </div>
            <div className={Styles.postContent}>{descricao}</div>
            <div className={Styles.postFooter}>
                <LikeButton postId={chave} />
            </div>
        </div>
    );
}
