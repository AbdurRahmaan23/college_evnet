const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const events = [
  { id: 1, title: 'Math Lecture', description: 'An introduction to linear algebra.', date: '2023-09-10T10:00:00Z' },
  { id: 2, title: 'Science Fair', description: 'Annual science fair with various exhibits.', date: '2023-09-15T09:00:00Z' },
  { id: 3, title: 'Art Exhibition', description: 'Showcase of student artwork.', date: '2023-09-20T12:00:00Z' }
];

app.get('/events', (req, res) => {
  res.json(events);
});

app.get('/events/:id', (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

app.post('/events', (req, res) => {
  const newEvent = {
    id: events.length + 1,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.put('/events/:id', (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (event) {
    event.title = req.body.title;
    event.description = req.body.description;
    event.date = req.body.date;
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

app.delete('/events/:id', (req, res) => {
  const eventIndex = events.findIndex(e => e.id == req.params.id);
  if (eventIndex !== -1) {
    events.splice(eventIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Event not found');
  }
});

app.listen(port, () => {
  console.log(`College Events API running at http://localhost:${port}`);
});
