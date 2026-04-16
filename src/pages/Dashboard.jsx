export default function Dashboard() {
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2>Painel</h2>
        <p>🏠 Home</p>
        <p>📊 Relatórios</p>
        <p>👤 Usuários</p>
        <p>⚙️ Config</p>
      </aside>

      <main style={styles.content}>
        <h1>Dashboard</h1>

        <div style={styles.cards}>
          <div style={styles.card}>💰 Vendas: R$ 5.000</div>
          <div style={styles.card}>👤 Clientes: 120</div>
          <div style={styles.card}>📦 Pedidos: 38</div>
          <div style={styles.card}>📈 Lucro: R$ 2.300</div>
        </div>
      </main>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f5f5f5'
  },
  sidebar: {
    width: '220px',
    background: '#111827',
    color: 'white',
    padding: '20px'
  },
  content: {
    flex: 1,
    padding: '20px'
  },
  cards: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginTop: '20px'
  },
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    minWidth: '200px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
}