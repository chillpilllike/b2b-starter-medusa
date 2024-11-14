import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { getCustomer } from "@lib/data/customer"
import CartDrawer from "../cart-drawer"
import { CartProvider } from "@lib/context/cart-context"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)
  const customer = await getCustomer()

  return (
    <CartProvider cart={cart}>
      <CartDrawer customer={customer} />
    </CartProvider>
  )
}
