import { useCart } from '../contexts/CartContext';

export default function CartButton({ openCart }) {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      onClick={openCart}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        cursor: "pointer",
        zIndex: 1000
      }}
    >
      {/* ÍCONE DO PRIME */}
      <i className="pi pi-shopping-cart" style={{ fontSize: "24px" }}></i>

      {/* BADGE (bolinha com número) */}
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: -8,
            right: -10,
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px"
          }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
}