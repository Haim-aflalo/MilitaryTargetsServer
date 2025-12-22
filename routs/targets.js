import express from 'express';
import fs from 'fs';
export const getTarget = express();

getTarget.get('/:id', async (req, res) => {
  const data = JSON.parse(
    await fs.promises.readFile('./data/targets.json', 'utf-8')
  );
  for (let target of data) {
    target.id == req.params.id
      ? res.send(target)
      : res.status(404).send('not found');
  }
});

getTarget.get('/', async (req, res) => {
  const { region, status, minPriority } = req.query;
  const data = JSON.parse(
    await fs.promises.readFile('./data/targets.json', 'utf-8')
  );
  const result = await data.filter(
    (target) =>
      target.region == region ||
      target.status == status ||
      target.minPriority == minPriority
  );
  res.send(result);
});
