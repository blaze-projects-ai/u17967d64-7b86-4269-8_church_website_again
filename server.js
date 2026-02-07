const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function loadJSON(filename) {
  const filePath = path.join(__dirname, 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

app.get('/', (req, res) => {
  const events = loadJSON('events.json').slice(0, 3);
  res.render('home', {
    title: 'Grace Community Church',
    currentPage: 'home',
    upcomingEvents: events
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us - Grace Community Church',
    currentPage: 'about'
  });
});

app.get('/events', (req, res) => {
  const events = loadJSON('events.json');
  res.render('events', {
    title: 'Events & Services - Grace Community Church',
    currentPage: 'events',
    events
  });
});

app.get('/sermons', (req, res) => {
  const sermons = loadJSON('sermons.json');
  res.render('sermons', {
    title: 'Sermons - Grace Community Church',
    currentPage: 'sermons',
    sermons
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - Grace Community Church',
    currentPage: 'contact',
    messageSent: false
  });
});

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Contact form submission:', { name, email, subject, message });
  res.render('contact', {
    title: 'Contact Us - Grace Community Church',
    currentPage: 'contact',
    messageSent: true
  });
});

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found - Grace Community Church',
    currentPage: ''
  });
});

app.listen(PORT, () => {
  console.log(`Grace Community Church website running at http://localhost:${PORT}`);
});
