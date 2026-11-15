import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = join(__dirname, '../data/models.json');

const router = express.Router();

const getModelsData = () => {
  return JSON.parse(readFileSync(dataFilePath, 'utf-8'));
};

const saveModelsData = (data) => {
  writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET /api/models
router.get('/', (req, res) => {
  try {
    const modelsData = getModelsData();
    const { family, fuelType, search } = req.query;
    let results = [...modelsData];

    if (family && family !== 'all') {
      results = results.filter(
        (m) => m.family.toLowerCase() === family.toLowerCase()
      );
    }

    if (fuelType && fuelType !== 'all') {
      results = results.filter(
        (m) => m.fuelType.toLowerCase() === fuelType.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.family.toLowerCase().includes(q) ||
          m.tagline?.toLowerCase().includes(q)
      );
    }

    res.json({
      count: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read models data' });
  }
});

// GET /api/models/:id
router.get('/:id', (req, res) => {
  const modelsData = getModelsData();
  const model = modelsData.find(
    (m) => m.id.toLowerCase() === req.params.id.toLowerCase()
  );

  if (!model) {
    return res.status(404).json({ error: 'Porsche model not found' });
  }

  res.json(model);
});

// POST /api/models - Add new model (Admin)
router.post('/', (req, res) => {
  const { name, family, startingPrice, powerHp, acceleration, topSpeed, fuelType, heroImage, description, tagline } = req.body;

  if (!name || !startingPrice) {
    return res.status(400).json({ error: 'Model name and starting price are required.' });
  }

  const modelsData = getModelsData();
  const id = req.body.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const newModel = {
    id,
    name,
    family: family || '911',
    familyTitle: family || '911',
    category: req.body.category || 'Coupe',
    fuelType: fuelType || 'Petrol',
    startingPrice: Number(startingPrice),
    currency: 'EUR',
    powerKw: Math.round(Number(powerHp || 500) * 0.735),
    powerHp: Number(powerHp || 500),
    acceleration: acceleration || '3.5 s',
    topSpeed: topSpeed || '300 km/h',
    transmission: req.body.transmission || '8-speed Porsche Doppelkupplung (PDK)',
    drivetrain: req.body.drivetrain || 'Rear-wheel drive',
    consumption: req.body.consumption || '11.5 l/100 km',
    co2: req.body.co2 || '260 g/km',
    tagline: tagline || 'Driven by Dreams.',
    description: description || 'Engineered with pure sports car DNA.',
    heroImage: heroImage || 'https://images.pistonheads.com/nimg/47438/blobid0.jpg',
    gallery: [heroImage || 'https://images.pistonheads.com/nimg/47438/blobid0.jpg'],
    colors: req.body.colors || [
      { id: 'guards-red', name: 'Guards Red', hex: '#c3001e', type: 'Special', price: 0 },
      { id: 'racing-yellow', name: 'Racing Yellow', hex: "#fad403", type: 'Special', price: 0 },
      { id: 'gt-silver', name: 'GT Silver Metallic', hex: '#9e9e9e', type: 'Metallic', price: 1250 }
    ],
    wheels: req.body.wheels || [
      { id: 'standard-forged', name: '20/21-inch Forged Lightweight Wheels', price: 0, size: '20/21 inch' }
    ],
    interiors: req.body.interiors || [
      { id: 'race-tex-black', name: 'Standard Interior in Black Race-Tex', price: 0, colorHex: '#1a1a1a' }
    ],
    packages: req.body.packages || [
      { id: 'sport-chrono', name: 'Sport Chrono Package', price: 2400, category: 'Performance' }
    ]
  };

  modelsData.push(newModel);
  saveModelsData(modelsData);

  res.status(201).json({
    success: true,
    message: `Model ${name} created successfully.`,
    model: newModel
  });
});

// PUT /api/models/:id - Update existing model (Admin)
router.put('/:id', (req, res) => {
  const modelsData = getModelsData();
  const index = modelsData.findIndex((m) => m.id.toLowerCase() === req.params.id.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ error: 'Model not found.' });
  }

  const existing = modelsData[index];
  const updated = {
    ...existing,
    ...req.body,
    startingPrice: req.body.startingPrice !== undefined ? Number(req.body.startingPrice) : existing.startingPrice,
    powerHp: req.body.powerHp !== undefined ? Number(req.body.powerHp) : existing.powerHp,
    powerKw: req.body.powerHp !== undefined ? Math.round(Number(req.body.powerHp) * 0.735) : existing.powerKw
  };

  modelsData[index] = updated;
  saveModelsData(modelsData);

  res.json({
    success: true,
    message: `Model ${updated.name} updated successfully.`,
    model: updated
  });
});

// DELETE /api/models/:id - Delete model (Admin)
router.delete('/:id', (req, res) => {
  let modelsData = getModelsData();
  const exists = modelsData.some((m) => m.id.toLowerCase() === req.params.id.toLowerCase());

  if (!exists) {
    return res.status(404).json({ error: 'Model not found.' });
  }

  modelsData = modelsData.filter((m) => m.id.toLowerCase() !== req.params.id.toLowerCase());
  saveModelsData(modelsData);

  res.json({
    success: true,
    message: 'Model removed successfully.'
  });
});

export default router;
