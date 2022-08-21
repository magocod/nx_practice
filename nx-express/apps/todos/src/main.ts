/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
// import { dataHandler } from "./app/data";

import { appFactory } from './app.factory';

// export const app = express();

// app.get('/', (req, res) => {
//   res.json({ message: '...' });
// });
//
// app.get('/data', dataHandler);

export const app = appFactory();

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
