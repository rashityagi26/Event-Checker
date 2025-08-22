import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export async function createContext({ req }: { req: Request }): Promise<Context> {
  const prisma = new PrismaClient();
  
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  let user = undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email
      };
    } catch (error) {
      console.log('Invalid token:', error);
    }
  }

  return {
    prisma,
    user
  };
}






