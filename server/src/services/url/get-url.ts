import { ValidationError } from "../../utils/ValidationError";
import { prisma } from "../../config/prisma";
import { decode } from "../../utils/decode";

export const getUrl = async (shortUrlId: string) => {
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
        throw new ValidationError("URL not found", 404 )
    }

    return longUrl;
}