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
    
