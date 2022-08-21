import * as express from 'express';
import { dataHandler } from "./app/data";

export function appFactory(): express.Express {
  const app = express();

  app.get('/', (req, res) => {
    res.json({ message: '...' });
  });

  app.get('/data', dataHandler);

  return app;
}
