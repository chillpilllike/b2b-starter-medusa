"use client"

import { setContactDetails } from "@lib/data/cart"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { clx, Container, Heading, Text } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { useFormState } from "react-dom"
import ContactDetailsForm from "../contact-details-form"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

const ContactDetails = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "contact-details"
  const isCompleted =
    cart?.shipping_address?.address_1 &&
    cart.shipping_methods &&
    cart.shipping_methods?.length > 0 &&
    cart.billing_address?.address_1 &&
    cart.payment_collection?.payment_sessions &&
    cart.payment_collection?.payment_sessions?.length > 0 &&
    cart?.email

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "contact-details"), {
      scroll: false,
    })
  }

  const [message, formAction] = useFormState(setContactDetails, null)

  return (
    <Container>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row items-center justify-between w-full">
          <Heading
            level="h2"
            className={clx(
              "flex flex-row text-xl gap-x-2 items-center font-medium",
              {
                "opacity-50 pointer-events-none select-none":
                  !isOpen && !isCompleted,
              }
            )}
          >
            Contact Details
            {!isOpen && isCompleted && <CheckCircleSolid />}
          </Heading>

          {!isOpen && isCompleted && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                data-testid="edit-contact-details-button"
              >
                Edit
              </button>
            </Text>
          )}
        </div>
        {(isOpen || isCompleted) && <Divider />}
        {isOpen ? (
          <form action={formAction}>
            <div className="pb-8">
              <ContactDetailsForm customer={customer} cart={cart} />
              <div className="flex flex-col gap-y-2 items-end">
                <SubmitButton
                  className="mt-6"
                  data-testid="submit-address-button"
                >
                  Review order
                </SubmitButton>
                <ErrorMessage
                  error={message}
                  data-testid="address-error-message"
                />
              </div>
            </div>
          </form>
        ) : (
          cart &&
          isCompleted && (
            <div className="text-small-regular">
              <div
                className="flex flex-col w-full gap-y-2"
                data-testid="contact-details-summary"
              >
                <Text className="txt-medium text-ui-fg-subtle">
                  {cart.email}
                </Text>
                {cart.metadata?.notes ? (
                  <div>
                    <Divider />
                    <Text className="txt-medium text-ui-fg-subtle pt-2">
                      Note: {cart.metadata?.notes as string}
                    </Text>
                  </div>
                ) : null}
              </div>
            </div>
          )
        )}
      </div>
    </Container>
  )
}

export default ContactDetails