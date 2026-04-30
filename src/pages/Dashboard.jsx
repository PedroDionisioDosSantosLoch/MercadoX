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
