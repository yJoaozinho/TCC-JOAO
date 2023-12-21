import Styles from "./postList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Post({ _id, nome, descricao, dono }) {
    const router = useRouter();
    const idDoPet = _id;
    const [pet, setPet] = useState({});
    const [token, setToken] = useState("");
    const [erro, setErro] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    console.log("a porra do token do post:", token);
                    setToken(token);
                } catch (error) {
                    console.error("Erro ao decodificar o token:", error);
                }
            } else {
                console.log("Nenhum token encontrado.");
            }
        }
        fetchPets();
        console.log("idzin", idDoPet);
        console.log("tokenzin", token);
        async function fetchPets() {
            try {
                const response = await fetch(
                    `http://localhost:2306/animal/${idDoPet}`,
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
                    throw new Error("Erro ao buscar pets");
                }

                const petiscos = await response.json();
                setPet(petiscos);
                console.log("dados do animal: ", petiscos);
            } catch (error) {
                setErro(error.message);
            }
        }
        async function buscarPerfil() {
            if (token && dono) {
              try {
                const response = await fetch(`http://localhost:2306/user/${dono}`, {
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
    }, [dono, idDoPet, token]);

    const excluirPost = async () => {
        try {
            const requestData = {
                pet: _id,
                owner: dono,
            };
            console.log(requestData)

            if (token) {
                const response = await fetch('http://localhost:2306/adoption', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestData)
                });

                if (response.status === 204) {
                    console.log('Adoção realizada com sucesso!');

                } else if (response.status === 401) {
                    const erroData = await response.json();
                    console.error('Erro:', erroData.mensagem);
                } else {
                    const erroData = await response.json();
                    console.error('Erro:', erroData);
                }
            }
        }
        catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className={Styles.post}>
            <div className={Styles.postHeader}>
                <img src="/peraul.jpg" alt={`Foto do ${nome}`} />
                <div>
                    <div className={Styles.name}>{nome}</div>
                    <div className={Styles.timestamp}>{userData.username}</div>
                </div>
                <div className={Styles.raiPaLa}>
                    <button
                        className={Styles.petButton}
                        onClick={() => router.push(`/perfilPet/${_id}`)}
                    >
                        @{nome}
                    </button>
                </div>
            </div>
            <div className={Styles.postContent}>{descricao}</div>
            <div className={Styles.postFooter}>
                <button className={Styles.petButton} onClick={handleAdoptClick}>
                    Excluir 
                </button>

            </div>
        </div>
    );
}
