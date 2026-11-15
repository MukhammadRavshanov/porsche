import express from 'express';

const router = express.Router();

let testDrives = [
  {
    bookingId: 'PORSCHE-TD-784912',
    modelId: '911-gt3-rs',
    modelName: '911 GT3 RS',
    dealerId: 'pc-stuttgart',
    fullName: 'Alexander Weber',
    email: 'alexander.weber@porsche-club.de',
    phone: '+49 171 8920194',
    preferredDate: '2026-11-20',
    message: 'Interested in track pack options and ceramic brakes.',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

const contactRequests = [];
const newsletterSubscribers = new Set();

// POST /api/test-drive
router.post('/test-drive', (req, res) => {
  const { modelId, modelName, dealerId, fullName, email, phone, preferredDate, message } = req.body;

  if (!fullName || !email || !modelName) {
    return res.status(400).json({ error: 'Please provide full name, email, and preferred model.' });
  }

  const booking = {
    bookingId: 'PORSCHE-TD-' + Math.floor(100000 + Math.random() * 900000),
    modelId,
    modelName,
    dealerId: dealerId || 'pc-stuttgart',
    fullName,
    email,
    phone,
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    message,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  testDrives.unshift(booking);

  res.status(201).json({
    success: true,
    message: `Test drive booking confirmed for ${modelName}. An official Porsche representative will contact you shortly.`,
    booking
  });
});

// GET /api/test-drives
router.get('/test-drives', (req, res) => {
  res.json({ total: testDrives.length, data: testDrives });
});

// PUT /api/test-drives/:id (update status - Confirmed, Completed, Cancelled)
router.put('/test-drives/:id', (req, res) => {
  const { status } = req.body;
  const booking = testDrives.find((b) => b.bookingId === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  booking.status = status || booking.status;
  res.json({ success: true, message: 'Booking status updated.', booking });
});

// DELETE /api/test-drives/:id
router.delete('/test-drives/:id', (req, res) => {
  const exists = testDrives.some((b) => b.bookingId === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  testDrives = testDrives.filter((b) => b.bookingId !== req.params.id);
  res.json({ success: true, message: 'Booking deleted.' });
});

// POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }

  const inquiry = {
    id: 'PORSCHE-INQ-' + Date.now().toString(36).toUpperCase(),
    name,
    email,
    subject: subject || 'General Porsche Inquiry',
    message,
    createdAt: new Date().toISOString()
  };

  contactRequests.push(inquiry);

  res.status(201).json({
    success: true,
    message: 'Your message has been received by Porsche International Customer Service.',
    inquiry
  });
});

// POST /api/newsletter
router.post('/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  newsletterSubscribers.add(email);
  res.json({
    success: true,
    message: 'You have successfully subscribed to the Porsche International Newsletter.'
  });
});

export default router;
