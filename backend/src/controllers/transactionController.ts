import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      sortBy = 'date',
      order = 'desc',
      category,
      status,
      user,
      q
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Filters
    const filters: any = {};
    if (category) filters.category = category;
    if (status) filters.status = status;
    if (user) filters.user = user;
    if (q) {
      filters.description = { $regex: q, $options: 'i' };
    }

    // Sort
    const sort: Record<string, 1 | -1> = {
      [sortBy as string]: order === 'asc' ? 1 : -1,
    };

    // Query DB
    const transactions = await Transaction.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Transaction.countDocuments(filters);

    // ✅ Respond
    res.status(200).json({
      data: transactions,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error: any) {
    console.error('❌ Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
