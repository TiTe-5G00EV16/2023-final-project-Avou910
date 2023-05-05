const express = require('express');
const cors = require('cors');
const path = require('path');


const users = require('./routes/users');
const articles = require('./routes/articles');
const email = require('./routes/email')

const app = express();

app.use(express.json());


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://simple-marketplace.onrender.com',
    'https://marketplace-2azd.onrender.com'
  ] 
}));

app.use('/api/articles', articles);
app.use('/api/users', users);
app.use('/api/email', email);

app.get('/health', (req, res) => {
  res.send('OK');
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

module.exports = app;
