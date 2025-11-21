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
    github: 'https://github.com/emulsazib/collab-suite',
  },
  {
    id: 2,
    title: 'Data Storytelling Platform',
    stack: ['Next.js', 'D3', 'Node.js'],
    description:
      'Built interactive narratives for climate-tech startups, turning raw telemetry into digestible dashboards.',
    link: 'https://example.com/story',
    github: 'https://github.com/emulsazib/data-story',
  },
  {
    id: 3,
    title: 'Creator Commerce Engine',
    stack: ['Express', 'MongoDB', 'Stripe'],
    description:
      'Shipped checkout flows, subscription tiers, and analytics for indie creators serving 20k+ monthly customers.',
    link: 'https://example.com/commerce',
    github: 'https://github.com/emulsazib/commerce-engine',
  },
  {
    id: 4,
    title: 'Portfolio Demo Website',
    stack: ['Express', 'Node.js', 'Vanilla JS'],
    description:
      'Modern full-stack portfolio website with multi-page navigation, dark mode, and API-driven content.',
    github: 'https://github.com/emulsazib/PortfolioDemoWeb',
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

const achievements = [
  {
    id: 1,
    title: 'Hackathon Winner 2024',
    description: 'Won first place in the regional coding hackathon with a real-time collaboration tool.',
    image: '/images/Cover.jpg',
    date: 'March 2024',
  },
  {
    id: 2,
    title: 'Open Source Contributor',
    description: 'Contributed to major open-source projects with 1000+ stars on GitHub.',
    image: '/images/rightabout.jpg',
    date: '2023',
  },
  {
    id: 3,
    title: 'Tech Conference Speaker',
    description: 'Presented at Web Dev Summit 2024 on modern full-stack architecture.',
    image: '/images/profile.jpg',
    date: 'May 2024',
  },
  {
    id: 4,
    title: 'Published Developer',
    description: 'Authored technical articles and tutorials with 50k+ reads across platforms.',
    image: '/images/Cover.jpg',
    date: '2023-2024',
  },
];

const blogPosts = [
  {
    id: 1,
    title: 'Building Modern Full-Stack Applications',
    excerpt: 'A comprehensive guide to building scalable, maintainable full-stack applications using modern technologies.',
    content: `# Building Modern Full-Stack Applications

Building modern full-stack applications requires a deep understanding of both frontend and backend technologies. In this post, I'll share my insights on creating scalable and maintainable applications.

## Getting Started

The first step in building a modern application is choosing the right technology stack. Consider factors like:

- Team expertise
- Project requirements
- Scalability needs
- Time constraints

## Architecture Patterns

Modern applications often follow certain architectural patterns that help with maintainability and scalability.

### Microservices vs Monolith

Choosing between microservices and monolithic architecture depends on your specific use case. Microservices offer better scalability but come with added complexity.

## Best Practices

1. **Code Quality**: Maintain clean, readable code
2. **Testing**: Write comprehensive tests
3. **Documentation**: Keep documentation up to date
4. **Performance**: Optimize for speed and efficiency

![Code Example](/images/profile.jpg)

## Conclusion

Building modern applications is an ongoing journey. Stay updated with the latest technologies and best practices.`,
    author: 'Emul Sajib',
    date: 'January 15, 2024',
    tags: ['Full Stack', 'Development', 'Architecture'],
  },
  {
    id: 2,
    title: 'The Power of Express.js and Node.js',
    excerpt: 'Exploring why Express.js and Node.js have become the go-to choices for building fast and scalable backend services.',
    content: `# The Power of Express.js and Node.js

Express.js has revolutionized backend development by providing a simple yet powerful framework built on Node.js.

## Why Express.js?

Express.js offers:

- Minimalist approach
- Fast performance
- Rich middleware ecosystem
- Great community support

## Building APIs

Express makes it incredibly easy to build RESTful APIs. Here's a simple example:

\`\`\`javascript
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});
\`\`\`

## Middleware

One of Express's strongest features is its middleware system, which allows you to add functionality at various points in the request/response cycle.

## Conclusion

Express.js and Node.js provide a powerful combination for building modern backend services.`,
    author: 'Emul Sajib',
    date: 'February 10, 2024',
    tags: ['Node.js', 'Express', 'Backend'],
  },
  {
    id: 3,
    title: 'Modern CSS Techniques for Beautiful UIs',
    excerpt: 'Discover advanced CSS techniques and modern approaches to creating stunning user interfaces.',
    content: `# Modern CSS Techniques for Beautiful UIs

Modern CSS offers powerful features that make it easier than ever to create beautiful, responsive user interfaces.

## CSS Grid and Flexbox

CSS Grid and Flexbox are game-changers for layout design. They provide:

- Flexible layouts
- Easy alignment
- Responsive design capabilities

## CSS Variables

CSS custom properties (variables) allow for:

- Theme switching
- Dynamic styling
- Better maintainability

## Animations

Modern CSS animations can create smooth, performant transitions without JavaScript.

## Conclusion

By leveraging modern CSS techniques, you can create stunning UIs that are both beautiful and performant.`,
    author: 'Emul Sajib',
    date: 'March 5, 2024',
    tags: ['CSS', 'Frontend', 'Design'],
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

app.get('/api/achievements', (_req, res) => {
  res.json({ achievements });
});

app.get('/api/blog', (_req, res) => {
  // Return all blog posts with minimal data for listing
  const posts = blogPosts.map(({ id, title, excerpt, author, date, tags }) => ({
    id,
    title,
    excerpt,
    author,
    date,
    tags,
  }));
  res.json({ posts });
});

app.get('/api/blog/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({
      status: 'error',
      message: 'Blog post not found.',
    });
  }

  res.json(post);
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

// Route handler for HTML pages
const htmlPages = ['projects', 'achievements', 'blog'];

htmlPages.forEach((page) => {
  app.get(`/${page}`, (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', `${page}.html`));
  });
});

// Blog post page
app.get('/blog-post', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog-post.html'));
});

// Default route - serve index.html for home page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for other paths (should be last)
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server ready on http://localhost:${PORT}`);
});
