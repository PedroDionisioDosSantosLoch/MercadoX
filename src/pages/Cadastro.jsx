import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { InputSwitch } from "primereact/inputswitch";

import * as Yup from "yup";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .required("O email é obrigatório"),
  senha: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha")], "As senhas não coincidem")
    .required("Confirme a senha")
});

function Cadastro() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const toast = useRef(null);

  async function cadastrar() {
    try {
      
      await schema.validate(
        { nome, email, senha, confirmarSenha },
        { abortEarly: false }
      );

      
      if (!checked) {
        toast.current.show({
          severity: "warn",
          summary: "Atenção",
          detail: "Você precisa aceitar os termos!",
          life: 3000
        });
        return;
      }

      const usuariosSalvos =
        JSON.parse(localStorage.getItem("usuarios")) || [];

      const emailExiste = usuariosSalvos.some(
        (u) => u.email === email
      );

      if (emailExiste) {
        toast.current.show({
          severity: "error",
          summary: "Erro",
          detail: "Email já cadastrado!",
          life: 3000
        });
        return;
      }

      const novoUsuario = {
        nome,
        senha,
        email,
        ativo: checked
      };

      usuariosSalvos.push(novoUsuario);

      localStorage.setItem(
        "usuarios",
        JSON.stringify(usuariosSalvos)
      );

      toast.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Usuário cadastrado com sucesso!",
        life: 3000
      });

      
      setNome("");
      setSenha("");
      setConfirmarSenha("");
      setEmail("");
      setChecked(false);

    } catch (erro) {
      
      if (erro.inner) {
        erro.inner.forEach((e) => {
          toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: e.message,
            life: 3000
          });
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Erro",
          detail: erro.message,
          life: 3000
        });
      }
    }
  }

  return (
    <div>
      <Toast ref={toast} />

      <h1 style={{ textAlign: "center", fontSize: "40px" }}>
        Cadastro
      </h1>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <FloatLabel>
          <InputText
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: "200px" }}
          />
          <label htmlFor="nome">Nome do Usuário</label>
        </FloatLabel>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "200px" }}
          />
          <label htmlFor="email">Email do Usuário</label>
        </FloatLabel>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <FloatLabel>
          <Password
            inputId="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            feedback={false}
            inputStyle={{ width: "200px" }}
          />
          <label htmlFor="senha">Senha do Usuário</label>
        </FloatLabel>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <FloatLabel>
          <Password
            inputId="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            feedback={false}
            inputStyle={{ width: "200px" }}
          />
          <label htmlFor="confirmarSenha">Confirme sua Senha</label>
        </FloatLabel>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
        <InputSwitch
          checked={checked}
          onChange={(e) => setChecked(e.value)}
        />
        <span>Aceito os termos</span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          label="Cadastrar"
          severity="success"
          onClick={cadastrar}
          disabled={!checked}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button label="Voltar para Home" severity="secondary" />
        </Link>
      </div>
    </div>
  );
}

export default Cadastro;
