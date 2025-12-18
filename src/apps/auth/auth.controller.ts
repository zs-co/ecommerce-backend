import type { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { validateLogin, validateRegister } from './auth.validations.js';

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { valid, errors } = validateRegister(req.body);
      if (!valid) { res.status(400).json({ errors }); return; }
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { valid, errors } = validateLogin(req.body);
      if (!valid) { res.status(400).json({ errors }); return; }
      const { email, password } = req.body;
      const response = await authService.login(email, password);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async me(req: Request, res: Response): Promise<void> {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    // remove any sensitive fields
    const u = { ...user.toObject() };
    delete (u as any).password;
    res.status(200).json(u);
  }
}

export const authController = new AuthController();
