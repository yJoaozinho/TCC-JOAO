import React, { useState, useEffect } from "react";
import NotificacaoComponent from "./NotificacaoComponent";

export default function NotList() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [token, setToken] = useState("");

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
    if (!token) {
      return;
    }

    fetch("http://localhost:2306/adoption/myAdoptionsNotAnswered", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        if (Array.isArray(data)) {
          // Removendo possíveis duplicatas baseadas no '_id'
          const uniqueData = Array.from(new Set(data.map(item => item._id)))
            .map(id => {
              return data.find(item => item._id === id);
            });

          setNotificacoes(uniqueData);
        } else {
          console.error("A resposta da API não é um array:", data);
        }
      })
      .catch((error) => console.error("Erro ao buscar notificações:", error));
  }, [token]);

  if (notificacoes.length === 0) {
    return <div>Nenhuma notificação encontrada.</div>;
  }

  return (
    <div>
      {notificacoes.map((notificacao) => (
        <NotificacaoComponent
          key={notificacao._id}
          owner={notificacao.owner}
          adopter={notificacao.adopter}
          pet={notificacao.pet}
          tome={notificacao._id}
        />
      ))}
    </div>
  );
}
