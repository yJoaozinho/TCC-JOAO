import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar from "../../src/components/sideBar/sideBar";
import Input from "../../src/components/input/input";
import Styles from "../../styles/doar.module.css";

export default function Vacinas() {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const { id } = router.query;

    const [vacina, setVacina] = useState('');
    const [revacinacao, setRevacinacao] = useState('');
    const [data, setData] = useState('');

    
    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
  
        if (token) {
          try {
            console.log("a porra do token :", token);
            setToken(token);
          } catch (error) {
            console.error("Erro ao decodificar o token:", error);
          }
        } else {
          console.log("Nenhum token encontrado.");
        }
      }
    }, [id]);

    const teste = async (e) => {
        e.preventDefault();

        if (!id) {
            console.error("idPet não está definido");
            return; 
        }

        const formData = {
          vacina,
          revacinacao,
          data,
          id
        };
    
        try {
          const response = await fetch(`http://localhost:2306/vaccination/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });
    
          if (response.status === 201) {
            console.log("Vacina criada com sucesso");
            router.push("/meusAnimais");
          } else {
            const erroData = await response.json();
            console.error("Erro de status:", response.status);
            console.error(
              "Mensagem de erro:",
              erroData.mensagem || "Erro ao criar vacina"
            );
          }
        } catch (error) {
          console.error("Erro:", error.message);
        }
    };

    return (
        <div>
            <SideBar />
            <div className={Styles.depressao} >
                <form className={Styles.form} onSubmit={teste}>
                    <img className={Styles.fechar} src="/angle-left.svg"  />

                    <label className={Styles.labelTitle} htmlFor="nomeAnimal">
                        <h1>Vacina</h1>
                    </label>

                    <Input
                        type="text"
                        placeholder="Vacina"
                        value={vacina}
                        onChange={(e) => setVacina(e.target.value)}
                    />

                    <Input
                        type="text"
                        placeholder="Revacinacao"
                        value={revacinacao}
                        onChange={(e) => setRevacinacao(e.target.value)}
                    />

                    <Input
                        type="text"
                        placeholder="Data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />

                    <button className={Styles.button} type="submit">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    )
}
