import type { Request, Response, NextFunction } from 'express';
export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    // custom working on middleware errors... 
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });

}