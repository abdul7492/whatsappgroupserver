import User from '../models/user.model.js'; 
import { uploadMultipleToCloudinary } from '../utils/cloudinary.js';

export const submitEntry = async (req, res) => {
  try {
    const imageUrls = await uploadMultipleToCloudinary(req.files.map(file => file.path));

    const newUser = new User({
      planAmount: req.body.amount,
      easypaisaName: req.body.payname,

      image1: imageUrls[0], 
    });

    await newUser.save();
    res.status(201).json({ message: 'Plan Entry successfully', user: newUser });
  } catch (error) {
    console.error('Error in Plan Entry :', error);
    res.status(500).json({ error: 'Server error, could not Plan Entry .' });
  }
};

export const getPlaninfo = async (req, res) => {
    try {
      const { amount } = req.params;
      const planAmount = parseInt(amount); // Convert string to number
      const today = new Date().setHours(0, 0, 0, 0);
  
      const entries = await User.find({
        planAmount,
        date: today,
        status: 'approved'
      });
  
      const participantCount = entries.length;
      const totalAmount = participantCount * planAmount;
      const payout = totalAmount * 0.975;
  
      res.json({ participantCount, totalAmount, payout });
    } catch (error) {
      console.error('Error fetching plan info:', error);
      res.status(500).json({ error: 'Server error, could not fetch plan info.' });
    }
  };
    
  export const setwinners = async (req, res) => {
    try {
      const plans = [50, 100, 500, 1000];
      const today = new Date().setHours(0, 0, 0, 0);
  
      const winners = [];
  
      for (let plan of plans) {
        const entries = await User.find({
          planAmount: plan,
          status: 'approved',
          date: today
        });
  
        if (entries.length > 0) {
          const randomIndex = Math.floor(Math.random() * entries.length);
          const winner = entries[randomIndex];
  
          await User.findByIdAndUpdate(winner._id, { isWinner: true });
  
          winners.push({ planAmount: plan, winnerId: winner._id });
        }
      }
  
      res.json({ message: 'Winners selected', winners });
    } catch (error) {
      console.error('Error setting winners:', error);
      res.status(500).json({ error: 'Server error, could not select winners.' });
    }
  };
  

  export const getwinners = async (req, res) => {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
  
      const winners = await User.find({
        isWinner: true,
        date: today
      });
  
      res.json(winners);
    } catch (error) {
      console.error('Error getting winners:', error);
      res.status(500).json({ error: 'Server error, could not get winners.' });
    }
  };
  
  export const rest = async (req, res) => {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
  
      await User.updateMany(
        { date: today },
        { $set: { status: 'cancelled', isWinner: false } }
      );
  
      res.json({ message: 'All entries reset for today.' });
    } catch (error) {
      console.error('Error resetting entries:', error);
      res.status(500).json({ error: 'Server error, could not reset entries.' });
    }
  };
  