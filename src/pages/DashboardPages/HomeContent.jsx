export default function HomeContent() {
  return (
    <div>
      <h1>Dashboard Principal</h1>
      <div>
        <ul>
            <li>Vendas: R$ {localStorage.getItem('totalVendas') || '0.00'}</li>
            <li>Clientes: {localStorage.getItem('usuarios') ? JSON.parse(localStorage.getItem('usuarios')).length : 0}</li>
        </ul>
      </div>
    </div>
  );
}