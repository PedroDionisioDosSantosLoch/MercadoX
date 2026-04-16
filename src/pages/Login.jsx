import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";

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
      const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuariosSalvos.find((u) => u.email === email && u.senha === senha);

      if (!usuario) {
        toast.current.show({
          severity: "error",
          summary: "Erro de Acesso",
          detail: "Usuário não encontrado ou senha incorreta.",
          life: 3000,
        });
        return;
      }

      localStorage.setItem("token", "123456");
      toast.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado!",
        life: 2000,
      });

      setTimeout(() => navigate("/loja"), 1000);
    } catch (erro) {
      const messages = erro.inner ? erro.inner.map(e => e.message) : [erro.message];
      messages.forEach(msg => {
        toast.current.show({ severity: "error", summary: "Atenção", detail: msg, life: 3000 });
      });
    }
  }

  
  const cardHeader = (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '22px',
        backgroundColor: '#f8fafc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #f1f5f9',
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.05)' 
      }}>
        <i className="pi pi-user" style={{ fontSize: '2.2rem', color: '#1e293b' }}></i>
      </div>
    </div>
  );

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      padding: '20px',
      fontFamily: '-apple-system, system-ui, sans-serif'
    }}>
      <Toast ref={toast} />

      <Card header={cardHeader} style={{ 
        width: '100%', 
        maxWidth: '400px', 
        border: 'none', 
        boxShadow: 'box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05)',
        textAlign: 'center'
      }}>
        
        <div style={{ margin: '20px 0 40px 0' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0' }}>Login</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Bem-vindo de volta ao Mercado X</p>
        </div>

        
        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FloatLabel style={{ width: '100%' }}>
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '12px', padding: '14px' }}
              />
              <label htmlFor="email">E-mail</label>
            </FloatLabel>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FloatLabel style={{ width: '100%' }}>
              <Password
                inputId="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                feedback={false}
                toggleMask
                inputStyle={{ borderRadius: '12px', padding: '14px', width: '100%' }}
                style={{ width: '100%' }}
              />
              <label htmlFor="senha">Senha</label>
            </FloatLabel>
          </div>

          <Button
            label="Entrar"
            icon="pi pi-sign-in"
            onClick={fazerLogin}
            style={{ 
              backgroundColor: '#0f172a', 
              border: 'none', 
              borderRadius: '12px', 
              padding: '16px',
              fontWeight: '600',
              marginTop: '10px'
            }}
          />

          <Link to="/" style={{ textDecoration: 'none', marginTop: '10px' }}>
            <Button 
              label="Voltar" 
              icon="pi pi-arrow-left"
              link 
              className="p-0"
              style={{ color: '#94a3b8', fontSize: '14px' }} 
            />
          </Link>
        </div>
      </Card>

      <div style={{ 
        position: 'absolute', 
        bottom: '30px', 
        color: '#e2e8f0', 
        fontSize: '11px', 
        letterSpacing: '3px' 
      }}>
        SECURE ACCESS
      </div>
    </div>
  );
}

export default Login;