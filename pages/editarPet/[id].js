import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "../../styles/doar.module.css";
import SideBar from "../../src/components/sideBar/sideBar";
import Input from "../../src/components/input/input";

export default function editarPets() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const { id } = router.query;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [tipo, setTipo] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [adocao, setAdocao] = useState("");
  const [descricao, setDescricao] = useState("");

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

  const onClose = () => {
    router.push("/meusAnimais");
  };

  const teste = async (e) => {
    e.preventDefault();
    const formData = {
      nome,
      idade,
      tipo,
      raca,
      sexo,
      adocao,
      descricao,
    };

    const dataToSend = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    if (Object.keys(dataToSend).length === 0) {
      console.log("Nenhum campo preenchido. Não há dados para atualizar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:2306/animal/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.status === 200) {
        console.log("Pet atualizado com sucesso");
        router.push("/meusAnimais");
      } else {
        const erroData = await response.json();
        console.error("Erro de status:", response.status);
        console.error(
          "Mensagem de erro:",
          erroData.mensagem || "Erro ao atualizar pet"
        );
      }
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  return (
    <div className={Styles.central}>
      <SideBar />

      <div className={Styles.Content}>
        <form className={Styles.form} onSubmit={teste}>
        <img className={Styles.fechar} src="/angle-left.svg" onClick={onClose}/>
          <label className={Styles.labelTitle} htmlFor="nomeAnimal">
            <h1> Editar Pet</h1>
          </label>

          <Input
            type="text"
            placeholder="Nome "
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className={Styles.label} htmlFor="nome"></label>
          <Input
            type="text"
            placeholder="Idade "
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />

          <label className={Styles.label} htmlFor="idade"></label>
          <Input
            type="text"
            placeholder="Tipo "
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          <label className={Styles.label} htmlFor="idade"></label>
          <Input
            type="text"
            placeholder="Raça "
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          />

          <label className={Styles.label} htmlFor="tipo"></label>
          <Input
            type="text"
            placeholder="Genero "
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          />

          <label className={Styles.label} htmlFor="sexo"></label>
          <Input
            type="text"
            placeholder="Descricao "
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div>
            <div className={Styles.checkboxContainer}>
              <label className={`${Styles.label}`} htmlFor="adocao">
                Esta para Adoção ?
              </label>
              <div className={Styles.checkboxWrapper}>
                <Input
                  type="checkbox"
                  placeholder="Adocao ativa"
                  checked={adocao}
                  onChange={(e) => setAdocao(e.target.checked)}
                />
              </div>
            </div>

            <button className={Styles.button} type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
