import { ValidationError } from "../../utils/ValidationError";
import { prisma } from "../../config/prisma";
import { encode } from "../../utils/encode";
import { redis } from "../../config/redis";

export const createShortUrl = async (longUrl: string) => {

    const url = await prisma.url.create({
        data: {
            longUrl,
        },
        select: {
            id: true,
            userId: true,
            longUrl: true,
            shortUrl: true,
            active: true,
            expiresAt: true
        }
    });

    // Encode the ID
    const encodedId: string = encode(url.id)

    //update the database
    const shortUrl = await prisma.url.update({
        where: {
            id: url.id
        },
        data: {
            shortUrl: encodedId
        },
        select: {
            id: true,
            userId: true,
            longUrl: true,
            shortUrl: true,
            active: true,
            expiresAt: true
        }
    })

    // Populate cache immediately
    await redis.set(`url:${encodedId}`, JSON.stringify(shortUrl), "EX", 86400);

    return shortUrl;
}