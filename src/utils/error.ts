export class NotFoundError extends Error { 
    constructor(msg: string) { 
        super(msg); 
    }

    cause?: { 
        errorCode: 404, 
        message: 'Data not found'
    }
}