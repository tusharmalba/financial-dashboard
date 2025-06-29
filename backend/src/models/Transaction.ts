import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'cleared'],
      default: 'pending',
    },
    user: {
      type: String, // Later replace with user ref if needed
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
