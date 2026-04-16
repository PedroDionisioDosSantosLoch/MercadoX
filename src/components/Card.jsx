function Card({ titulo, valor }) {
  return (
    <div style={styles.card}>
      <h4>{titulo}</h4>
      <h2>{valor}</h2>
    </div>
  )
}

const styles = {
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '220px',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)'
  }
}

export default Card