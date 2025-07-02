"use server"

import Razorpay from "razorpay"
import connectDb from "@/db/connectDb";
import Payment from "@/models/paymentModel";

export const initiatePayment = async (formData) => {
    try {
        await connectDb();
        console.log("init pay ", formData);

        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { name, email, phone, amount, currency, message } = formData;

        // Validation
        if (!name || !email || !amount) {
            return { statusCode: 400, error: "Missing required fields" };
        }

        const options = {
            amount: amount * 100,
            currency: currency,
        };

        const order = await instance.orders.create(options);

        const payment = new Payment({
            name: name,
            email: email,
            phone: phone,
            amount: amount * 100,
            currency: currency,
            order_id: order.id,
            message: message
        });
        await payment.save();

        return order;
    } catch (error) {
        console.error("Payment error:", error);
        return { statusCode: 500, error: error.message || "Something went wrong" };
    }

}

export const getPaidUsers = async () => {
    try {
        await connectDb();
        const payments = await Payment.find({ done: true }).sort({ amount: -1 }).limit(5).lean();
        return JSON.parse(JSON.stringify(payments));
    } catch (error) {
        console.error("Error fetching paid users:", error);
        return { statusCode: 500, error: error.message || "Something went wrong" };
    }
}