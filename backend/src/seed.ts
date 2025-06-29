import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Transaction } from './models/Transaction';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/finance';

const sampleData = [
  {
    date: new Date(),
    amount: 8000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly Salary - June',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 200,
    category: 'Groceries',
    type: 'expense',
    description: 'Bought groceries from D-Mart',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 1000,
    category: 'Rent',
    type: 'expense',
    description: 'Paid rent for June',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 300,
    category: 'Entertainment',
    type: 'expense',
    description: 'Netflix subscription',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 150,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity bill',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 500,
    category: 'Travel',
    type: 'expense',
    description: 'Cab to office',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 100,
    category: 'Dining',
    type: 'expense',
    description: 'Lunch with friends',
    status: 'pending',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 6000,
    category: 'Freelance',
    type: 'income',
    description: 'Freelance project for client A',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 750,
    category: 'Shopping',
    type: 'expense',
    description: 'Bought clothes',
    status: 'pending',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 1200,
    category: 'Medical',
    type: 'expense',
    description: 'Doctor consultation',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 400,
    category: 'Fuel',
    type: 'expense',
    description: 'Filled petrol',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 9500,
    category: 'Salary',
    type: 'income',
    description: 'Monthly Salary - July',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 220,
    category: 'Groceries',
    type: 'expense',
    description: 'Vegetables and snacks',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 280,
    category: 'Dining',
    type: 'expense',
    description: 'Zomato delivery',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 10000,
    category: 'Bonus',
    type: 'income',
    description: 'Quarterly bonus',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 1800,
    category: 'Education',
    type: 'expense',
    description: 'Online course',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 350,
    category: 'Maintenance',
    type: 'expense',
    description: 'Apartment maintenance',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 700,
    category: 'Gifts',
    type: 'expense',
    description: 'Birthday gift',
    status: 'pending',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 500,
    category: 'Travel',
    type: 'expense',
    description: 'Auto fare to city',
    status: 'cleared',
    user: 'admin',
  },
  {
    date: new Date(),
    amount: 5000,
    category: 'Freelance',
    type: 'income',
    description: 'Side project payment',
    status: 'cleared',
    user: 'admin',
  },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    await Transaction.deleteMany({});
    await Transaction.insertMany(sampleData);
    console.log('✅ Seeded sample data');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
