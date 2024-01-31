import Styles from "./ptImage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export default function FotoDePerfil({ id }) {
    const petId = id;
    const [imageUrl, setImageUrl] = useState({});
    const [token, setToken] = useState(null);
    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                  setToken(storedToken);
                  try {
                  console.log("ta quazse")
                  teste()
                  fetchImage(storedToken, userId)
                   
                  } catch (error) {
                    console.error("Erro ao decodificar o token:", error);
                  }
                } else {
                  console.log("Nenhum token encontrado.");
                }
              
            }
        })();
    }, [userId]);

    const fetchImage = async (token, id) => {
        try {
            const response = await fetch(`http://localhost:2306/animal/pic/${petId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const imageUrl = await response.json()
                console.log("URL da imagem recebida da API:", imageUrl); 
                setImageUrl(imageUrl);
            } else {
                console.error("Falha ao buscar a imagem de perfil. Status:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar a imagem de perfil:", error);
        }
    };
    const teste = () => {
        console.log(imageUrl);
    };
    

    return (
        <div className={Styles.container}>
            {imageUrl && (
                <Image
                    src={imageUrl.pic}
                    alt='Foto de perfil'
                    width={200}
                    height={200}
                    className={Styles.fotoDePerfil}
                    unoptimized={true}
                />
            )}
        </div>
    );
}
