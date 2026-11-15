import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = join(__dirname, '../data/shop.json');

const router = express.Router();

const getShopData = () => {
  return JSON.parse(readFileSync(dataFilePath, 'utf-8'));
};

const saveShopData = (data) => {
  writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

const orders = [];

// GET /api/shop/products
router.get('/products', (req, res) => {
  try {
    const shopData = getShopData();
    const { category, search } = req.query;
    let results = [...shopData];

    if (category && category !== 'all') {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    res.json({
      total: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read shop products' });
  }
});

// POST /api/shop/products - Add product (Admin)
router.post('/products', (req, res) => {
  const { title, category, price, description, image, badge } = req.body;
  if (!title || !price) {
    return res.status(400).json({ error: 'Product title and price are required.' });
  }

  const shopData = getShopData();
  const id = 'prod-' + Date.now().toString(36);

  const newProduct = {
    id,
    title,
    category: category || 'Accessories',
    price: Number(price),
    currency: 'EUR',
    description: description || 'Official Porsche Design merchandise.',
    image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    badge: badge || 'Exclusive',
    inStock: true
  };

  shopData.push(newProduct);
  saveShopData(shopData);

  res.status(201).json({
    success: true,
    message: 'Product added successfully.',
    product: newProduct
  });
});

// PUT /api/shop/products/:id - Update product (Admin)
router.put('/products/:id', (req, res) => {
  const shopData = getShopData();
  const index = shopData.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const existing = shopData[index];
  const updated = {
    ...existing,
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : existing.price
  };

  shopData[index] = updated;
  saveShopData(shopData);

  res.json({
    success: true,
    message: 'Product updated successfully.',
    product: updated
  });
});

// DELETE /api/shop/products/:id - Delete product (Admin)
router.delete('/products/:id', (req, res) => {
  let shopData = getShopData();
  const exists = shopData.some((p) => p.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  shopData = shopData.filter((p) => p.id !== req.params.id);
  saveShopData(shopData);

  res.json({
    success: true,
    message: 'Product removed from catalog.'
  });
});

// POST /api/shop/checkout
router.post('/checkout', (req, res) => {
  const { items, customer, paymentMethod } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const orderId = 'PORSCHE-ORD-' + Date.now().toString(36).toUpperCase();
  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const newOrder = {
    orderId,
    items,
    customer: customer || { name: 'Porsche Client' },
    paymentMethod: paymentMethod || 'Porsche Card / Apple Pay',
    total,
    currency: 'EUR',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully. Thank you for choosing Porsche Design.',
    order: newOrder
  });
});

export default router;
