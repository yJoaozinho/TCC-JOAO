import React, { useState, useEffect } from 'react';
import Styles from "./post.module.css";
import { useRouter } from "next/router";
import LikeButton from "../likeButtton/likeButton";

export default function Post({chave, user, petId, nome, username, descricao }) {
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

    return (
        <div className={Styles.post}>
            <div className={Styles.postHeader}>
                <img src="/peraul.jpg" alt={`Foto do ${nome}`} />
                <div>
                    <div className={Styles.name}>{nome}</div>
                    <div className={Styles.timestamp}>
                        <button
                            className={Styles.petButton}
                            onClick={() => router.push(`/outroUsuario/${user}`)}
                        >
                            @{username}
                        </button>
                    </div>
                </div>
                <div className={Styles.raiPaLa}>
                    <button
                        className={Styles.petButton}
                        onClick={() => router.push(`/perfilPet/${petId}`)}
                    >
                        @{pet.nome}
                    </button>
                </div>
            </div>
            <div className={Styles.postContent}>{descricao}</div>
            <div className={Styles.postFooter}>
                <LikeButton postId={chave} />
            </div>
        </div>
    );
}
