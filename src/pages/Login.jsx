import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";

import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("O email é obrigatório"),

  senha: Yup.string()
    .min(6, "A Senha deve conter 6 caracteres")
    .required("A senha é obrigatória"),
});

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const toast = useRef(null);
  const navigate = useNavigate();

  async function fazerLogin() {
    try {
      await schema.validate({ email, senha }, { abortEarly: false });

      const usuariosSalvos =
        JSON.parse(localStorage.getItem("usuarios")) || [];

      const usuario = usuariosSalvos.find(
        (u) => u.email === email && u.senha === senha
      );

      if (!usuario) {
        toast.current.show({
          severity: "error",
          summary: "Erro",
          detail: "Email ou senha inválidos!",
          life: 3000,
        });
        return;
      }

      localStorage.setItem("token", "123456");

      toast.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado com sucesso!",
        life: 3000,
      });

      setEmail("");
      setSenha("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (erro) {
      if (erro.inner) {
        erro.inner.forEach((e) => {
          toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: e.message,
            life: 3000,
          });
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Erro",
          detail: erro.message,
          life: 3000,
        });
      }
    }
  }

  return (
    <div>
      <Toast ref={toast} />

      <h1 style={{ textAlign: "center", fontSize: "40px" }}>
        Login
      </h1>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "200px" }}
          />
          <label htmlFor="email">Email</label>
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
            toggleMask
          />
          <label htmlFor="senha">Senha</label>
        </FloatLabel>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          label="Entrar"
          severity="success"
          onClick={fazerLogin}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button label="Voltar" severity="secondary" />
        </Link>
      </div>
    </div>
  );
}

export default Login;