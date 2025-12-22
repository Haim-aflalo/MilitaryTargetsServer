import express from 'express';

export const getHealth = express();

getHealth.get('/', (req, res) => {
  res.json({
    status: 'ok',
    serverTime: new Date().toISOString(),
  });
});
