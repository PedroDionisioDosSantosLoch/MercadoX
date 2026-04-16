function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Meu Painel</h2>
      <ul style={styles.menu}>
        <li>🏠 Home</li>
        <li>📊 Relatórios</li>
        <li>👤 Usuários</li>
        <li>⚙️ Config</li>
      </ul>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '220px',
    height: '100vh',
    background: '#111827',
    color: 'white',
    padding: '20px'
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    marginTop: '30px'
  }
}

export default Sidebar