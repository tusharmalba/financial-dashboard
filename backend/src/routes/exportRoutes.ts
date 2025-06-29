import express from 'express';
import { exportTransactions } from '../controllers/exportController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, exportTransactions);

router.post('/debug', (req, res) => {
  console.log('DEBUG HEADERS:', req.headers);
  res.send('OK');
});


export default router;
