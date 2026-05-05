
import {use, useState} from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function Dashboard(){
  const [section, setSection] = useState("Perfil");

  return (
    <div style={{padding: "20px"}}>
      <h1>Dashboard</h1>

      <div style={{marginBottom: "20px"}}>
        <Button label="Perfil" onClick={() => setSection("Perfil")} />
        <Button label="Pedidos" onClick={() => setSection("Pedidos")} />
        <Button label="Logout" onClick={() => setSection("Logout")} />
        
      </div>

       {section === "perfil" && (
        <div>
          <h2>Perfil</h2>
          <p>Nome: Usuário</p>
          <p>Email: usuario@email.com</p>
        </div>
      )}

      {section === "pedidos" && (
        <div>
          <h2>Pedidos</h2>
          <p>Nenhum pedido ainda</p>
        </div>
      )}

      {section === "favoritos" && (
        <div>
          <h2>Favoritos</h2>
          <p>Você não tem favoritos</p>
        </div>
      )}
    </div>
  );
}
    

import { Link, Outlet, Route } from "react-router-dom";
import './dashboard.css'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate('../loja');
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Painel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <Link to="/dashboard" className="Link">Home</Link>
          <Link to="/dashboard/relatorios" className="Link">Relatórios</Link>
          <Link to="/dashboard/usuarios" className="Link">Usuários</Link>
        </nav>

        <button className="Voltar" onClick={handleVoltar}><h1>Voltar Loja</h1></button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

