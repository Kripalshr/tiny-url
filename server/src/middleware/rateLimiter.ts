import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 60 *1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: true,
})

export default apiLimiter