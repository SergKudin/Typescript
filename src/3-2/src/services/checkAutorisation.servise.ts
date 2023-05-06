import auth from 'basic-auth';
import { Request, Response, NextFunction } from 'express';

type AuthUser = {
  [key: string]: { password: string }
};

const users: AuthUser = {
  'admin': {
    password: process.env.ADMIN_PASS || 'admin'
  }
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = auth(req);
  if ((!user || !users[user.name]) || (users[user.name].password !== user.pass)) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Authorization Required');
  }
  return next();
};