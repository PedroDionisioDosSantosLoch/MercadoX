import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { InputSwitch } from "primereact/inputswitch";
import { Card } from "primereact/card";

import * as Yup from "yup";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("O email é obrigatório"),
  senha: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("A senha é obrigatória"),
  confirmarSenha: Yup.string().oneOf([Yup.ref("senha")], "As senhas não coincidem").required("Confirme a senha")
});

function Cadastro() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const toast = useRef(null);
  const navigate = useNavigate();

  async function cadastrar() {
    try {
      await schema.validate({ nome, email, senha, confirmarSenha }, { abortEarly: false });

      if (!checked) {
        toast.current.show({ severity: "warn", summary: "Termos", detail: "Aceite os termos para continuar.", life: 3000 });
        return;
      }

      const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
      if (usuariosSalvos.some((u) => u.email === email)) {
        toast.current.show({ severity: "error", summary: "Erro", detail: "E-mail já cadastrado.", life: 3000 });
        return;
      }

      usuariosSalvos.push({ nome, senha, email, ativo: checked });
      localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

      toast.current.show({ severity: "success", summary: "Sucesso", detail: "Conta criada!", life: 2000 });
      setTimeout(() => navigate("/loja"), 1000);
    } catch (erro) {
      const messages = erro.inner ? erro.inner.map(e => e.message) : [erro.message];
      messages.forEach(msg => toast.current.show({ severity: "error", summary: "Atenção", detail: msg, life: 3000 }));
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
        <i className="pi pi-user-plus" style={{ fontSize: '2.2rem', color: '#1e293b' }}></i>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
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
        boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.05)',
        textAlign: 'center'
      }}>
        
        <div style={{ margin: '20px 0 35px 0' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0' }}>Cadastro</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Crie sua conta no Mercado X</p>
        </div>

        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          
          <FloatLabel>
            <InputText id="nome" value={nome} onChange={(e) => setNome(e.target.value)} style={{ borderRadius: '12px', padding: '14px' }} />
            <label htmlFor="nome">Nome Completo</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderRadius: '12px', padding: '14px' }} />
            <label htmlFor="email">E-mail</label>
          </FloatLabel>

          <FloatLabel>
            <Password inputId="senha" value={senha} onChange={(e) => setSenha(e.target.value)} feedback={false} toggleMask 
              inputStyle={{ borderRadius: '12px', padding: '14px', width: '100%' }} style={{ width: '100%' }} />
            <label htmlFor="senha">Senha</label>
          </FloatLabel>

          <FloatLabel>
            <Password inputId="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} feedback={false} toggleMask 
              inputStyle={{ borderRadius: '12px', padding: '14px', width: '100%' }} style={{ width: '100%' }} />
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
          </FloatLabel>

          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "12px", 
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            margin: '5px 0'
          }}>
            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Aceito os termos</span>
          </div>

          <Button
            label="Criar Conta"
            icon="pi pi-check"
            onClick={cadastrar}
            style={{ 
              backgroundColor: '#0f172a', 
              border: 'none', 
              borderRadius: '12px', 
              padding: '16px',
              fontWeight: '600'
            }}
          />

          <Link to="/" style={{ textDecoration: "none" }}>
            <Button label="Voltar" icon="pi pi-arrow-left" link className="p-0" style={{ color: '#94a3b8', fontSize: '14px' }} />
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Cadastro;