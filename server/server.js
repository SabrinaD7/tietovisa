require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const conf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dateStrings: false,
  timezone: '+00:00'
};

app.listen(PORT, function () {
  console.log('Server running on port ' + PORT);
});

// Hakee kaikki kysymykset
app.get('/questions', async (req, res) => {
  try {
    const connection = await mysql.createConnection(conf);
    const [rows] = await connection.execute('SELECT * FROM questions');
    res.json(rows);
    connection.end(); // Käytetään end()-metodia yhteyden sulkemiseen
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Virhe haettaessa kysymyksiä' });
  }
});

// Hakee kysymyksen annetun ID:n perusteella
app.get('/questions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(conf);
    const [rows] = await connection.execute('SELECT * FROM questions WHERE id = ?', [id]);
    res.json(rows[0]);
    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Virhe haettaessa kysymystä' });
  }
});

// Lisää uusi kysymys vastausvaihtoehdoilla
app.post('/questions', async (req, res) => {
  const { question_text, option1, option2, option3, option4, correct_option } = req.body;
  try {
    const connection = await mysql.createConnection(conf);
    await connection.execute('INSERT INTO questions (question_text, option1, option2, option3, option4, correct_option) VALUES (?, ?, ?, ?, ?, ?)', [question_text, option1, option2, option3, option4, correct_option]);
    res.json({ message: 'Kysymys lisätty!' });
    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Virhe lisättäessä kysymystä' });
  }
});