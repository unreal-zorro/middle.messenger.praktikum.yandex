import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const root = path.join(__dirname, '../dist');

app.use(express.static(root));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

export const handler = serverless(app);
