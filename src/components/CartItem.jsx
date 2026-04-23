import {useCart} from '../contexts/CartContext';

export default function CartButton ({openCart}) {
  const {cart} = useCart();

  const totalItems = cart.reduce ((total, item ) => total + item.quantity, 0);
  return (
    <button onClick={openCart}>
      Carrinho({totalItems})
    </button>
  );
}
