import User from '../models/user.model.js'; 
import { uploadMultipleToCloudinary } from '../utils/cloudinary.js';

export const submitEntry = async (req, res) => {
  try {
    const imageUrls = await uploadMultipleToCloudinary(req.files.map(file => file.path));

    const newUser = new User({
      planAmount: req.body.amount,
      easypaisaName: req.body.payname,

      image: imageUrls[0], 
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
    const pAmount = parseInt(amount);

    // Define the start and end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const entries = await User.find({
      planAmount: pAmount,
      status: { $in: ['approved', 'pending'] },
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const participantCount = entries.length;
    const totalAmount = participantCount * pAmount;
    const payout = totalAmount * 0.975;

    res.json({ participantCount, totalAmount, payout });
  } catch (error) {
    console.error('Error fetching plan info:', error);
    res.status(500).json({ error: 'Server error, could not fetch plan info.' });
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

  export const getusers = async (req, res) => {
    try {
      const entries = await User.find().sort({ createdAt: -1 });
      res.json(entries);
    } catch (error) {
      console.error('Error getting entries:', error);
      res.status(500).json({ error: 'Server error, could not get entries.' });
    }
  };
  
export const setwinner = async (req, res) => {
  try {
    const { id } = req.params;

    
    const user = await User.findById(id);
   
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isWinner: !user.isWinner },
    );

    res.json({
      message: `User ${updatedUser.isWinner ? 'set as winner' : 'unset as winner'}.`,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error toggling winner status:', error);
    res.status(500).json({ error: 'Server error, could not toggle winner.' });
  }
};  
 
  
  export const rest = async (req, res) => {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
  
      await User.updateMany(
        { date: today },
        { $set: { status: 'cancelled'} }
      );
  
      res.json({ message: 'All entries reset for today.' });
    } catch (error) {
      console.error('Error resetting entries:', error);
      res.status(500).json({ error: 'Server error, could not reset entries.' });
    }
  };
  
