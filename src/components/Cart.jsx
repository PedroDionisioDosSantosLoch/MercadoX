import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(product) {
    setCart(prev => {
      const item = prev.find(p => p.id === product.id);
      if (item) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeItem(id) {
    setCart(prev => prev.filter(p => p.id !== id));
  }

  function updateQuantity(id, quantity) {
    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity } : p
      )
    );
  }

  function getTotal() {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}