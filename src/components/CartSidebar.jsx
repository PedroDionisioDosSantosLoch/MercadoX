import { useCart } from '../contexts/CartContext';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

export default function CartSidebar({ isOpen, closeCart }) {
  const { cart, removeItem, updateQuantity, getTotal } = useCart();

  
  const customHeader = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem', color: '#0f172a' }}></i>
      <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>Meu Carrinho</h2>
    </div>
  );

  return (
    <Sidebar 
      visible={isOpen} 
      onHide={closeCart} 
      position="right" 
      header={customHeader}
      style={{ width: '350px', fontFamily: '-apple-system, system-ui, sans-serif' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        
       
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#94a3b8' }}>
              <i className="pi pi-cart-minus" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ 
                display: 'flex', 
                gap: '15px', 
                marginBottom: '20px', 
                paddingBottom: '15px', 
                borderBottom: '1px solid #f1f5f9' 
              }}>
                <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.title}</p>
                  <p style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: '700' }}>R$ {item.price.toFixed(2)}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button 
                      icon="pi pi-minus" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      className="p-button-rounded p-button-text p-button-sm"
                      style={{ color: '#0f172a', width: '25px', height: '25px' }}
                    />
                    <span style={{ fontWeight: '600' }}>{item.quantity}</span>
                    <Button 
                      icon="pi pi-plus" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                      className="p-button-rounded p-button-text p-button-sm"
                      style={{ color: '#0f172a', width: '25px', height: '25px' }}
                    />
                    
                    <Button 
                      icon="pi pi-trash" 
                      onClick={() => removeItem(item.id)} 
                      className="p-button-rounded p-button-danger p-button-text p-button-sm"
                      style={{ marginLeft: 'auto' }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        
        {cart.length > 0 && (
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ color: '#64748b', fontWeight: '500' }}>Total:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
                R$ {getTotal().toFixed(2)}
              </span>
            </div>
            
            <Button 
              label="Finalizar Compra" 
              icon="pi pi-check" 
              style={{ 
                width: '100%', 
                backgroundColor: '#0f172a', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '15px' 
              }} 
            />
          </div>
        )}
      </div>
    </Sidebar>
  );
}