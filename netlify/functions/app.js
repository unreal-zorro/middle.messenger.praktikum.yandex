import express from 'express';
import serverless from 'serverless-http';

const app = express();
const root = './dist';

app.use(express.static(root));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

export const handler = serverless(app);
