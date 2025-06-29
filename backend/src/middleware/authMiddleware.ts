import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const JWT_SECRET = process.env.JWT_SECRET;

  console.log("AUTH HEADER:", authHeader);
  console.log("JWT_SECRET in protect:", JWT_SECRET);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!JWT_SECRET) {
    console.error("JWT_SECRET is undefined");
    res.status(500).json({ message: 'JWT secret not defined in env' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
