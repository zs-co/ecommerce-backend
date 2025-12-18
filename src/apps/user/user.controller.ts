import type { Request, Response } from 'express';
import { userService } from './user.service.js';
import { NotFoundError } from '../../utils/error.js';

export class UserController {
    /**
     * GET /users
     */
    public async list(req: Request, res: Response): Promise<void> {
        try {
            const { filter } = req.query;
            // base on filter list users
            const users = await userService.list();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * GET /users/:id
     */
    public async get(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (id == null) {
                res.status(400).send('Bad request: required user id');
                return;
            }
            const user = await userService.get(id);
            if (!user) {
                throw new NotFoundError('User not found');
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    /**
     * POST /users
     */
    public async post(req: Request, res: Response): Promise<void> {
        try {
            // Logic for data validation would happen here (or via middleware)
            console.log('user =>', req.body)
            const user = await userService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: 'Validation failed', details: error });
        }
    }

    /**
     * PUT /users/:id
     */
    public async put(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (id == null) {
                res.status(400).send('Bad request: required user id');
                return;
            }
            const user = await userService.update(id, req.body);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: 'Update failed' });
        }
    }

    /**
     * DELETE /users/:id
     */
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (id == null) {
                res.status(400).send('Bad request: required user id');
                return;
            }
            const result = await userService.delete(id);
            if (!result) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ error: 'Delete failed' });
        }
    }
}

export const userController = new UserController();