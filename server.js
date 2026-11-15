import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import modelsRouter from './routes/models.js';
import inventoryRouter from './routes/inventory.js';
import dealersRouter from './routes/dealers.js';
import shopRouter from './routes/shop.js';
import experiencesRouter from './routes/experiences.js';
import bookingsRouter from './routes/bookings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/models', modelsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/dealers', dealersRouter);
app.use('/api/shop', shopRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api', bookingsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Dr. Ing. h.c. F. Porsche AG',
    service: 'Porsche International API Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Official Porsche International Backend API',
    endpoints: {
      health: '/api/health',
      models: '/api/models',
      inventory: '/api/inventory',
      dealers: '/api/dealers',
      shop: '/api/shop/products',
      experiences: '/api/experiences',
      testDrive: 'POST /api/test-drive',
      contact: 'POST /api/contact',
      newsletter: 'POST /api/newsletter'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found on Porsche API server' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Porsche Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  PORSCHE OFFICIAL BACKEND RUNNING ON PORT ${PORT} `);
  console.log(`  http://localhost:${PORT}/api/health           `);
  console.log(`===============================================`);
});
