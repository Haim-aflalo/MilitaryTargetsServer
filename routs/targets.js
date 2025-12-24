import express from 'express';
import { hasSameProps, read, write } from '../utils/functions.js';

export const getTarget = express();

getTarget.use(express.json());

getTarget.get('/:id', async (req, res) => {
  try {
    const data = await read('./data/targets.json');
    for (let target of data['targets']) {
      return target.id == req.params.id
        ? res.status(200).send(target)
        : res.status(404).send('not found');
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

getTarget.get('/', async (req, res) => {
  try {
    const { region, status, priority } = req.query;
    const data = await read('./data/targets.json');
    const result = await data['targets'].filter(
      (target) =>
        target.region == region ||
        target.status == status ||
        target.priority == priority
    );
    res.status(200).send(result);
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

getTarget.post('/', async (req, res) => {
  try {
    const body = req.body;
    if (hasSameProps(body)) {
      const data = await read('./data/targets.json');
      body['CreatedAt'] = new Date().toISOString();
      data['targets'].push(body);
      await write('./data/targets.json', data);
      res.status(200).send(body, 'added');
    } else {
      res.status(400).send('body does not correspond');
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

getTarget.put('/:id', async (req, res) => {
  try {
    const data = await read('./data/targets.json');
    const body = req.body;
    const targetIndex = data['targets'].findIndex((t) => t.id == req.params.id);
    if (targetIndex !== -1) {
      data['targets'][targetIndex] = {
        ...data['targets'][targetIndex],
        ...body,
      };
      await write('./data/targets.json', data);
      res.status(200).json({ message: 'Target updated successfully' });
    } else {
      res.status(404).json({ error: 'Target not found' });
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

getTarget.delete('/:id', async (req, res) => {
  try {
    const data = await read('./data/targets.json');
    const targetIndex = data['targets'].findIndex((t) => t.id == req.params.id);
    if (targetIndex !== -1) {
      data['targets'].splice(targetIndex, 1);
      await write('./data/targets.json', data);
      res.status(200).json({ message: 'Target deleted' });
    } else {
      res.status(404).json({ error: 'Target not found' });
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});
