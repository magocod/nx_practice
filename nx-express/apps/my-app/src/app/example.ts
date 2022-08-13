import { Request, Response } from "express"

export function example(req: Request, res: Response) {
  res.send({ message: 'Welcome to my-app! route' });
}
