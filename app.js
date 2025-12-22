import express from 'express';
import morgan from 'morgan';
import { getHealth } from './routs/health.js';
import { getBrief } from './routs/brief.js';
import { getTarget } from './routs/targets.js';

const port = 3000;
const app = express();

app.use(morgan(':method :url :status :response-time ms'));
app.use('/health', getHealth);
app.use('/briefing', getBrief);
app.use('/targets', getTarget);

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server listening on PORT ${port}`);
});
