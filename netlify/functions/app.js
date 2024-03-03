import express from 'express';
import serverless from 'serverless-http';
import path from 'path';

const app = express();
const root = path.join('../../dist');

app.use(express.static(root));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

export const handler = serverless(app);
