import { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'

export default function Loja() {
  const [produtos, setProdutos] = useState([])
  const [visible, setVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const { addItem } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
  }, [])

  const visualizarDetalhes = (produto) => {
    setSelectedProduct(produto)
    setVisible(true)
  }

  const renderHeader = (produto) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
      }}
    >
      <img
        src={produto.image}
        alt={produto.title}
        style={{ height: '150px', objectFit: 'contain', width: '100%' }}
      />
    </div>
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '40px 20px',
        fontFamily: '-apple-system, system-ui, sans-serif',
      }}
    >
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
        style={{ width: '350px' }}
      >
        {selectedProduct && (
          <div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <h2>{selectedProduct.title}</h2>
            <p
              style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}
            >
              R$ {selectedProduct.price.toFixed(2)}
            </p>
            <hr />
            <p style={{ color: '#64748b', lineHeight: '1.5' }}>
              {selectedProduct.description}
            </p>
            <Button
              label="Adicionar ao Carrinho"
              icon="pi pi-shopping-cart"
              className="p-button-success"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => addItem(selectedProduct)}
            />
          </div>
        )}
      </Sidebar>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Nossos Produtos</h1>
        <p>Explore as melhores ofertas do Mercado X</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {produtos.map((p) => (
          <Card
            key={p.id}
            header={renderHeader(p)}
            style={{
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                height: '100px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              <h3 style={{ fontSize: '16px', color: '#1e293b' }}>{p.title}</h3>
              <p style={{ fontSize: '20px', fontWeight: '700' }}>
                R$ {p.price.toFixed(2)}
              </p>
            </div>

            <Button
              label="Adicionar"
              icon="pi pi-shopping-cart"
              onClick={() => addItem(p)}
              style={{
                backgroundColor: '#0f172a',
                border: 'none',
                borderRadius: '8px',
                width: '100%',
                padding: '12px',
                fontWeight: '600',
                marginBottom: '10px',
              }}
            />

            <Button
              label="Exibir Detalhes"
              icon="pi pi-arrow-right"
              onClick={() => visualizarDetalhes(p)}
              style={{
                backgroundColor: '#0f172a',
                border: 'none',
                borderRadius: '8px',
                width: '100%',
                padding: '12px',
              }}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}
