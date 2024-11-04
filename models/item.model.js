import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    fullprice: { type: Number, required: true, min: 0 },
    popularity: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    releaseDate: { type: Date, required: true },
    type: { type: String, enum: ['movie', 'series'], required: true },
    language: [{ 
        type: String,
        enum: ['Hindi','Urdu', 'English', 'Both'],
    }],
    availableFormats: [{ 
        type: String, 
        enum: ['480p', '720p', '1080p', '4K'],
    }],
    isFreeToday: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    image1: { type: String }, // URL for image 1
    image2: { type: String }, // URL for image 2
    image3: { type: String }, // URL for image 3
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
