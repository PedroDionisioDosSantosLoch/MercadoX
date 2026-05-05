export default function Relatorios() {
  const itens = JSON.parse(localStorage.getItem('itensVendidos') || '[]');

  return (
    <div>
      <h1>Relatórios de Vendas</h1>
      <div className="card" style={{ marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '10px' }}>Produto</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>{item.title}</td>
                <td>R$ {item.price?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}