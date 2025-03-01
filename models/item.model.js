import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    linkname: { type: String, unique: true, required: true },

    price: { type: Number, min: 0 },
    fullprice: { type: Number, min: 0 },
    popularity: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    size: [{ type: String}],
    fits: {type: String, enum: ['XS','Small', 'Medium', 'Large', 'XL']},
    isonsale: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String},
    image1: { type: String }, // URL for image 1
    image2: { type: String }, // URL for image 2
    image3: { type: String }, // URL for image 3
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
