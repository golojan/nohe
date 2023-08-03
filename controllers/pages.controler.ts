import { Request, Response, NextFunction } from "express";



class PagesController {

    public index(req: Request, res: Response) {
        res.send('Hello world');
    }
}

export default new PagesController;