import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const experiencesData = JSON.parse(
  readFileSync(join(__dirname, '../data/experiences.json'), 'utf-8')
);

router.get('/', (req, res) => {
  res.json({
    total: experiencesData.length,
    data: experiencesData
  });
});

export default router;
