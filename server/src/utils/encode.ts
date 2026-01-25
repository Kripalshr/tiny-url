const BASE62 = process.env.BASE62 || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SECRET_SALT = Number(process.env.SECRET_SALT) || 123456;

if (!process.env.SECRET_SALT) {
    console.warn("SECRET_SALT not set in env. Using default (not recommended for production).");
}

export const encode =  (id: number): string => {
    let num: number = id + SECRET_SALT;
    let encoded: string = '';

    if (num <= 0) return '0';

    while (num > 0) {
        const remainder = num % 62;
        encoded = BASE62[remainder] + encoded
        num = Math.floor(num / 62);
    }

    return encoded
}