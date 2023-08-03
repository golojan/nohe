import { Request, Response, NextFunction } from "express";



class CronsController {

    public index(req: Request, res: Response) {
        res.send('Hello world');
    }
}

export default new CronsController;
