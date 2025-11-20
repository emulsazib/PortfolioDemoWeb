const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

const professionalSummary = {
  headline: 'Product-minded Full-Stack Developer',
  blurb:
    'I help founders and teams ship delightful user experiences by combining thoughtful UX, performant frontends, and reliable APIs.',
};

const projects = [
  {
    id: 1,
    title: 'Realtime Collaboration Suite',
    stack: ['TypeScript', 'React', 'WebSockets'],
    description:
      'Designed collaborative whiteboarding with presence indicators, optimistic updates, and end-to-end encryption.',
    link: 'https://example.com/collab',
  },
  {
    id: 2,
    title: 'Data Storytelling Platform',
    stack: ['Next.js', 'D3', 'Node.js'],
    description:
      'Built interactive narratives for climate-tech startups, turning raw telemetry into digestible dashboards.',
    link: 'https://example.com/story',
  },
  {
    id: 3,
    title: 'Creator Commerce Engine',
    stack: ['Express', 'MongoDB', 'Stripe'],
    description:
      'Shipped checkout flows, subscription tiers, and analytics for indie creators serving 20k+ monthly customers.',
    link: 'https://example.com/commerce',
  },
];

const timeline = [
  {
    year: '2024',
    milestone: 'Led platform modernization for a sustainability startup, cutting render time by 42%.',
  },
  {
    year: '2023',
    milestone: 'Mentored 5 junior engineers and launched a design system adopted across 3 product teams.',
  },
  {
    year: '2022',
    milestone: 'Scaled an IoT analytics API to ingest 2B events/day with zero downtime migrations.',
  },
];

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/summary', (_req, res) => {
  res.json(professionalSummary);
});

app.get('/api/projects', (_req, res) => {
  res.json({ projects });
});

app.get('/api/timeline', (_req, res) => {
  res.json({ timeline });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      status: 'error',
      message: 'Name, email, and message are required.',
    });
  }

  res.status(201).json({
    status: 'ok',
    message: 'Thanks for reaching out — your note is en route!',
  });
});

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server ready on http://localhost:${PORT}`);
});
