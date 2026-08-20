import express from 'express';
import cors from 'cors';
import { db } from './storage.js';
import { hashPassword, createToken, verifyToken, authMiddleware } from './auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------------------------------------------------------------
// Auth: Admin login
// ---------------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }

  const users = db.read('users', []);
  const user = users.find((u) => u.username === username && u.passwordHash === hashPassword(password));

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = createToken(username);
  res.json({ token, user: { username: user.username, role: user.role } });
});

app.get('/api/admin/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// ---------------------------------------------------------------
// Trips (Pacotes de Viagem) - Public read, Admin write
// ---------------------------------------------------------------

// GET all trips (public)
app.get('/api/trips', (req, res) => {
  const trips = db.all('trips');
  res.json(trips);
});

// GET single trip (public)
app.get('/api/trips/:id', (req, res) => {
  const trip = db.find('trips', (t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Pacote não encontrado' });
  res.json(trip);
});

// POST create trip (admin)
app.post('/api/trips', authMiddleware, (req, res) => {
  const { title, description, destination, price, duration, imageUrl, highlights, includes, excludes, isActive } = req.body;
  
  if (!title || !destination || !price || !duration) {
    return res.status(400).json({ error: 'Campos obrigatórios: title, destination, price, duration' });
  }

  const newTrip = {
    id: crypto.randomUUID(),
    title,
    description: description || '',
    destination,
    price: Number(price),
    duration: Number(duration),
    imageUrl: imageUrl || '',
    highlights: highlights || [],
    includes: includes || [],
    excludes: excludes || [],
    isActive: isActive !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.insert('trips', newTrip);
  res.status(201).json(newTrip);
});

// PUT update trip (admin)
app.put('/api/trips/:id', authMiddleware, (req, res) => {
  const { title, description, destination, price, duration, imageUrl, highlights, includes, excludes, isActive } = req.body;
  
  const updated = db.update('trips', req.params.id, {
    title,
    description,
    destination,
    price: price !== undefined ? Number(price) : undefined,
    duration: duration !== undefined ? Number(duration) : undefined,
    imageUrl,
    highlights,
    includes,
    excludes,
    isActive,
    updatedAt: new Date().toISOString(),
  });

  if (!updated) return res.status(404).json({ error: 'Pacote não encontrado' });
  res.json(updated);
});

// DELETE trip (admin)
app.delete('/api/trips/:id', authMiddleware, (req, res) => {
  const deleted = db.remove('trips', req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Pacote não encontrado' });
  res.status(204).send();
});

// ---------------------------------------------------------------
// Leads (Contatos/Interessados) - Public create, Admin read/delete
// ---------------------------------------------------------------

// POST create lead (public - from contact form)
app.post('/api/leads', (req, res) => {
  const { name, email, phone, tripId, message } = req.body || {};
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const newLead = {
    id: crypto.randomUUID(),
    name,
    email,
    phone: phone || '',
    tripId: tripId || null,
    message: message || '',
    status: 'novo',
    createdAt: new Date().toISOString(),
  };

  db.insert('leads', newLead);
  res.status(201).json(newLead);
});

// GET all leads (admin)
app.get('/api/admin/leads', authMiddleware, (req, res) => {
  const leads = db.all('leads');
  // Sort by newest first
  leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(leads);
});

// PUT update lead status (admin)
app.put('/api/admin/leads/:id', authMiddleware, (req, res) => {
  const { status } = req.body;
  const validStatuses = ['novo', 'em_contato', 'convertido', 'perdido'];
  
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  const updated = db.update('leads', req.params.id, { status });
  if (!updated) return res.status(404).json({ error: 'Lead não encontrado' });
  res.json(updated);
});

// DELETE lead (admin)
app.delete('/api/admin/leads/:id', authMiddleware, (req, res) => {
  const deleted = db.remove('leads', req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Lead não encontrado' });
  res.status(204).send();
});

// ---------------------------------------------------------------
// Start server
// ---------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Trips API: http://localhost:${PORT}/api/trips`);
  console.log(`   Admin API: http://localhost:${PORT}/api/admin/*`);
});