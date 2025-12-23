import express from 'express';
import { getHealth } from './routs/health.js';
import { getBrief } from './routs/brief.js';
import { getTarget } from './routs/targets.js';

const port = 3000;
const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toISOString());
  next();
});

app.use((req, res, next) => {
  res.setHeader('X-Server-Start-Time', new Date().toLocaleTimeString());
  next();
});

app.use('/health', getHealth);
app.use('/briefing', getBrief);
app.use('/targets', getTarget);

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server listening on PORT ${port}`);
});
