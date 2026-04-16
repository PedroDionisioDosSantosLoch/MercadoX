import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

export default function Home() {
  const navigate = useNavigate()

  // Header focado na centralização absoluta e minimalismo
  const header = (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      paddingTop: '50px' // Espaço generoso no topo
    }}>
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '24px',
        backgroundColor: '#f8fafc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #f1f5f9'
      }}>
        <i className="pi pi-shopping-bag" style={{ fontSize: '2.5rem', color: '#1e293b' }}></i>
      </div>
    </div>
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff', // Fundo puro
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      <Card 
        header={header} 
        style={{ 
          width: '100%', 
          maxWidth: '380px', 
          border: 'none',
          boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.05)', // Sombra suave para profundidade
          textAlign: 'center'
        }}
      >
        <div style={{ margin: '30px 0 50px 0' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#0f172a',
            letterSpacing: '-1px',
            margin: '0'
          }}>
            Mercado X
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '10px' }}>
            Projeto
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Button
            label="Entrar"
            onClick={() => navigate('/login')}
            style={{ 
              backgroundColor: '#0f172a', 
              border: 'none',
              borderRadius: '12px',
              padding: '18px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          />

          <Button
            label="Criar conta"
            link
            onClick={() => navigate('/cadastro')}
            style={{ 
              color: '#64748b',
              fontSize: '14px',
              fontWeight: '500'
            }}
          />
        </div>
      </Card>

      
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        fontSize: '12px', 
        color: '#cbd5e1', 
        fontWeight: '500',
        letterSpacing: '2px'
      }}>
        MERCADO X • 2026
      </div>
    </div>
  )
}