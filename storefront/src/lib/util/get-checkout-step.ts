import { HttpTypes } from "@medusajs/types"

export function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1) {
    return "shipping-address"
  } else if (!cart.billing_address?.address_1) {
    return "billing-address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else if (
    !cart.payment_collection?.payment_sessions?.find(
      (paymentSession: any) => paymentSession.status === "pending"
    )
  ) {
    return "payment"
  } else if (!cart.email) {
    return "contact-information"
  } else {
    return null
  }
}
