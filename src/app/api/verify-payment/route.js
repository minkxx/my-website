import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/paymentModel";
import connectDb from "@/db/connectDb";


export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)

    // Check if razorpayOrderId is present on the server
    let p = await Payment.findOne({ order_id: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "Order Id not found" })
    }

    // Verify the payment
    try {
        let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, process.env.RAZORPAY_KEY_SECRET)
        console.log("Payment Verification: ", xx)

        if (xx) {
            // Update the payment status
            const updatedPayment = await Payment.findOneAndUpdate({ order_id: body.razorpay_order_id }, { done: "true" }, { new: true })
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/buycoffee`)
        }

        else {
            return NextResponse.json({ success: false, message: "Payment Verification Failed" })
        }
    } catch (error) { console.error(error) }

}