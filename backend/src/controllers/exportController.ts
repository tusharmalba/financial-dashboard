import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { convertToCSV } from '../utils/csvHelper';

export const exportTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fields = [], filters = {} } = req.body;

    if (!Array.isArray(fields) || fields.length === 0) {
      res.status(400).json({ message: 'No fields selected for export' });
      return;
    }

    const transactions = await Transaction.find(filters).lean();

    const csv = convertToCSV(transactions, fields);

    res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (err: any) {
    console.error('CSV export error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
