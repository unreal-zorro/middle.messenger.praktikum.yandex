import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();
const root = path.join(__dirname, './dist');

app.use(express.static(root));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
