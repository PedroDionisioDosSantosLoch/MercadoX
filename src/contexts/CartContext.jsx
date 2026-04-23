import { createContext, useContext, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);


  function addItem(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

 
  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }


  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

 
  function getTotal() {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}