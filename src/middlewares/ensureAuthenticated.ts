import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'edc038fa909a460a73448bfc5c9af047'
    ) as IPayload;

    const usersRepository = new UsersRepository();

    usersRepository.findById(user_id);

    next();
  } catch (error) {
    throw new Error('Invalid token!');
  }
}
