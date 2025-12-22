import express from 'express';

export const getBrief = express();

getBrief.get('/', (req, res) => {
  if (req.headers.client_unit) {
    res.json({
      unit: req.headers.client_unit,
      message: 'briefing delivered',
    });
  } else {
    res.status(404).send('Not Found');
  }
});
