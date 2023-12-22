import Styles from "./postList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Poste({ _id, nome, descricao, dono }) {
    const router = useRouter();
    const idPost = _id;
    
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
    }, [dono, token]);

    

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
                        
                    >
                        @{nome}
                    </button>
                </div>
            </div>
            <div className={Styles.postContent}>{descricao}</div>
            <div className={Styles.postFooter}>
                

            </div>
        </div>
    );
}
