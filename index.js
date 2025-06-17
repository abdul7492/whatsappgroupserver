import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes.js';
import itemRoutes from './routes/item.routes.js';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.routes.js';
import axios from 'axios'; // Import axios for the reloadWebsite function

dotenv.config();

const app = express();

// URL and interval for reloading the website (preventing Render from sleeping)
const url = `https://whatsappgroupserver-qpup.onrender.com`; // Replace with your Render backend URL
const interval = 30000; // 30 seconds

// Function to reload the website periodically
function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log('Website reloaded');
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
}

// Set interval to reload the website
setInterval(reloadWebsite, interval);

// Allowed origins for CORS
const allowedOrigins = [
  'https://whatsappgrouplinks2025.snapmoviehd.com',
  'https://www.whatsappgrouplinks2025.snapmoviehd.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ajjkawinner.snapmoviehd.com',
  'https://www.ajjkawinner.snapmoviehd.com',
  'https://snapmoviehd.com',
  'https://www.snapmoviehd.com',
  'https://join.snapmoviehd.com',
  'https://www.join.snapmoviehd.com',
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    },
    credentials: true
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/akw', userRoutes);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
