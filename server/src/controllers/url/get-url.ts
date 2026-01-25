import { Request, Response, NextFunction } from "express";
import { urlService } from "../../services";

export const getUrl = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const shortUrlId: string = <string>req.params.shortUrlId;

        const getUrl = await urlService.getUrl(shortUrlId);

        if (getUrl.expiresAt !== null) {
            return res.redirect(302, getUrl.longUrl )
        } else {
            return res.redirect(getUrl.longUrl)
        }
    } catch(error){
        console.error(error)
        next(error)
    }
}