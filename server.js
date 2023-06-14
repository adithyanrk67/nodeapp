const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'node_db',
  password: 'Frds@1234567890',
  port: 5432,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error');
    } else {
      const users = result.rows;
      res.render('index', { users });
    }
  });
});

// Add user route
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
    }
    res.redirect('/');
  });
});

const PORT = 3040;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

