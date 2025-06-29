// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import transactionRoutes from './routes/transactionRoutes';
// import authRoutes from './routes/authRoutes';
// import exportRoutes from './routes/exportRoutes';





// dotenv.config();


// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI as string;

// app.use(cors());
// app.use(express.json());
// app.use('/api/transactions', transactionRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/export', exportRoutes);

// // Sample route
// app.get('/', (_req, res) => {
//   res.send('API is running...');
// });

// // Connect MongoDB and then start server
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err.message);
//   });
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import exportRoutes from './routes/exportRoutes'; // if you implemented export
import transactionRoutes from './routes/transactionRoutes';

// Register after /auth



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/export', exportRoutes); // Optional, based on your feature

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

