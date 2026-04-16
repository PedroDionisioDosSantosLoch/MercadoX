function Navbar() {
  return (
    <div style={styles.nav}>
      <h3>Dashboard</h3>
      <p>Olá, Usuário 👋</p>
    </div>
  )
}

const styles = {
  nav: {
    background: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
}

export default Navbar