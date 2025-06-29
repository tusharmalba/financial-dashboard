// import express from 'express';
// import { getTransactions } from '../controllers/transactionController';

// const router = express.Router();

// // GET /api/transactions
// router.get('/', getTransactions);

// export default router;

import express from 'express';
import { getTransactions } from '../controllers/transactionController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// ✅ GET all transactions (protected)
router.get('/', protect, getTransactions);

export default router;
