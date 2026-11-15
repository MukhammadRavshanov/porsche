import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const dealersData = JSON.parse(
  readFileSync(join(__dirname, '../data/dealers.json'), 'utf-8')
);

// GET /api/dealers
router.get('/', (req, res) => {
  const { city, country, search } = req.query;
  let results = [...dealersData];

  if (city) {
    results = results.filter((d) =>
      d.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  if (country) {
    results = results.filter((d) =>
      d.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q)
    );
  }

  res.json({
    total: results.length,
    data: results
  });
});

export default router;
