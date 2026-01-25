export class ValidationError extends Error {
    statusCode: number;
    errors?: Record<string, string>;

    constructor(message: string, statusCode?: number, errors?: Record<string, string>) {
        super(message);
        this.statusCode = statusCode || 400; // HTTP Bad Request
        this.errors = errors;

        // Fix prototype chain (TypeScript)
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
