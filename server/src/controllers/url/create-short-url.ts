import { Request, Response, NextFunction } from "express";
import { urlService } from "../../services";

export const createShortUrl = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const longUrl: string = req.body.longUrl;

        const shortenUrl = await urlService.createShortUrl(longUrl);

        return res.status(200).json({
            message: 'success',
            data: shortenUrl
        })
    } catch(error){
        console.error(error)
        next(error)
    }
}