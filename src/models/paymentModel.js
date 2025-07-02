import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    order_id: { type: String, required: true },
    message: { type: String, required: true },
    done: { type: Boolean, default: false },
}, {timestamps: true});

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;