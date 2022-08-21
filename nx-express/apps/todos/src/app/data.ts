import { Request, Response } from "express"
import { data } from "@nx-express/data"

export function dataHandler(req: Request, res: Response) {
  res.send({ message: 'Welcome to my-app! route', data: data() });
}
