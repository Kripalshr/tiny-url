import { ValidationError } from "../../utils/ValidationError";
import { prisma } from "../../config/prisma";
import { decode } from "../../utils/decode";
import { redis } from "../../config/redis";

export const getUrl = async (shortUrlId: string) => {
    // 1. Try to get from Redis
    const cachedUrl = await redis.get(`url:${shortUrlId}`);

    if (cachedUrl) {
        const urlData = JSON.parse(cachedUrl);

        // Asynchronously update click count in background
        prisma.url.update({
            where: { id: urlData.id },
            data: { clickCount: { increment: 1 } }
        }).catch(err => console.error("Failed to update click count in background:", err));

        return urlData;
    }

    // 2. Fallback to DB
    const decodedUrlId: number = decode(shortUrlId);

    const longUrl = await prisma.url.update({
        where: {
            id: decodedUrlId
        },
        data: {
            clickCount: {
                increment: 1
            }
        },
        select: {
            id: true,
            longUrl: true,
            clickCount: true,
            active: true,
            expiresAt: true
        }
    })

    if (!longUrl) {
        throw new ValidationError("URL not found", 404)
    }

    // 3. Save to Redis for next time (expires in 24 hours)
    await redis.set(`url:${shortUrlId}`, JSON.stringify(longUrl), "EX", 86400);

    return longUrl;
}