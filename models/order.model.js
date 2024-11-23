import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    isAdmin: { type: Boolean, default: false },
    items: [ {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    } ],
    name: { type: String},
    whnum: { type: String},
    address: { type: String},
    totalPrice: { type: Number, default: 0 },
    image: { type: String }, 
    status: { type: String, enum: ['pending', 'confirmed', 'delivered', 'cancelled'], default: 'pending' },
    
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;