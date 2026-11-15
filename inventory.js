import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = join(__dirname, '../data/inventory.json');

const router = express.Router();

const getInventoryData = () => {
  return JSON.parse(readFileSync(dataFilePath, 'utf-8'));
};

const saveInventoryData = (data) => {
  writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET /api/inventory
router.get('/', (req, res) => {
  try {
    const inventoryData = getInventoryData();
    const { family, condition, minPrice, maxPrice, fuelType, sort } = req.query;
    let results = [...inventoryData];

    if (family && family !== 'all') {
      results = results.filter(
        (v) => v.family.toLowerCase() === family.toLowerCase()
      );
    }

    if (condition && condition !== 'all') {
      results = results.filter(
        (v) => v.condition.toLowerCase().includes(condition.toLowerCase())
      );
    }

    if (fuelType && fuelType !== 'all') {
      results = results.filter(
        (v) => v.fuelType.toLowerCase() === fuelType.toLowerCase()
      );
    }

    if (minPrice) {
      results = results.filter((v) => v.price >= Number(minPrice));
    }

    if (maxPrice) {
      results = results.filter((v) => v.price <= Number(maxPrice));
    }

    // Sorting
    if (sort === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'mileage-asc') {
      results.sort((a, b) => a.mileage - b.mileage);
    } else if (sort === 'year-desc') {
      results.sort((a, b) => b.year - a.year);
    }

    res.json({
      total: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read inventory data' });
  }
});

// GET /api/inventory/:id
router.get('/:id', (req, res) => {
  const inventoryData = getInventoryData();
  const item = inventoryData.find((v) => v.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  res.json(item);
});

// POST /api/inventory - Add vehicle to Finder
router.post('/', (req, res) => {
  const { title, model, family, year, mileage, price, fuelType, condition, color, dealer, location, image, powerHp } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: 'Title and price are required.' });
  }

  const inventoryData = getInventoryData();
  const id = 'vin-wp' + Math.random().toString(36).substring(2, 10).toUpperCase();

  const newVehicle = {
    id,
    model: model || '911',
    family: family || '911',
    title,
    year: Number(year || 2024),
    mileage: Number(mileage || 0),
    mileageUnit: 'km',
    price: Number(price),
    currency: 'EUR',
    condition: condition || 'Porsche Approved',
    color: color || 'Guards Red',
    colorHex: req.body.colorHex || '#c3001e',
    interior: req.body.interior || 'Race-Tex Black',
    transmission: req.body.transmission || '7-speed PDK',
    fuelType: fuelType || 'Petrol',
    powerHp: Number(powerHp || 500),
    dealer: dealer || 'Porsche Centre Stuttgart-Zuffenhausen',
    location: location || 'Stuttgart, Germany',
    image: image || 'https://images.pistonheads.com/nimg/47438/blobid0.jpg',
    highlights: req.body.highlights || ['111-Point Technical Inspection', 'Porsche Approved Warranty']
  };

  inventoryData.unshift(newVehicle);
  saveInventoryData(inventoryData);

  res.status(201).json({
    success: true,
    message: 'Vehicle added to Porsche Finder inventory.',
    vehicle: newVehicle
  });
});

// PUT /api/inventory/:id - Update vehicle
router.put('/:id', (req, res) => {
  const inventoryData = getInventoryData();
  const index = inventoryData.findIndex((v) => v.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Vehicle not found.' });
  }

  const existing = inventoryData[index];
  const updated = {
    ...existing,
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : existing.price,
    mileage: req.body.mileage !== undefined ? Number(req.body.mileage) : existing.mileage,
    year: req.body.year !== undefined ? Number(req.body.year) : existing.year,
    powerHp: req.body.powerHp !== undefined ? Number(req.body.powerHp) : existing.powerHp
  };

  inventoryData[index] = updated;
  saveInventoryData(inventoryData);

  res.json({
    success: true,
    message: 'Vehicle updated successfully.',
    vehicle: updated
  });
});

// DELETE /api/inventory/:id - Remove vehicle
router.delete('/:id', (req, res) => {
  let inventoryData = getInventoryData();
  const exists = inventoryData.some((v) => v.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ error: 'Vehicle not found.' });
  }

  inventoryData = inventoryData.filter((v) => v.id !== req.params.id);
  saveInventoryData(inventoryData);

  res.json({
    success: true,
    message: 'Vehicle removed from inventory.'
  });
});

export default router;
