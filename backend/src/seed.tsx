import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Transaction } from './models/Transaction';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
const seedData = [
  {
    date: '2025-06-25',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'June Salary',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: '2025-06-25',
    amount: 200,
    category: 'Groceries',
    type: 'expense',
    description: 'Milk and Bread',
    status: 'cleared',
    user: 'admin',
  },
];

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  await Transaction.deleteMany(); // optional: clears old data
  await Transaction.insertMany(seedData);
  console.log('✅ Seeded transactions!');
  process.exit();
};

seed();
