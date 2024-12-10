import React from 'react'
import PaymentComponent from '../../components/PaymentComponent/PaymentComponent'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
const PaymentPage = () => {
  const initialOptions = {
    "client-id": "AbVWRo_jIMcSKsV6B7V3Ag1mqvNUdz_847m3BrprH_Y_0RKZnmrOKWmiWQK9tUNELf-PaTpYn3TXaByA",
    currency: "USD",
    intent: "capture",
  };
  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PaymentComponent />
      </PayPalScriptProvider>

    </div>
  )
}

export default PaymentPage
