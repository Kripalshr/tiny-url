const BASE62 = process.env.BASE62 || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SECRET_SALT = Number(process.env.SECRET_SALT) || 123456; // fallback if not set

if (!process.env.SECRET_SALT) {
    console.warn("SECRET_SALT not set in env. Using default (not recommended for production).");
}

export const decode =  (code: string): number => {
    let num = 0;
    for (let i = 0; i < code.length; i++) {
        const index = BASE62.indexOf(code[i]);
        if (index === -1) throw new Error(`Invalid character "${code[i]}" in code`);
        num = num * 62 + index;
    }
    return num - SECRET_SALT;
}