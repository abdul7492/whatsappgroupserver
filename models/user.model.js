import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  planAmount: Number,
  easypaisaName: String,
  image: { type: String }, 
  status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
  isWinner: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
