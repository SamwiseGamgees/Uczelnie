const express = require('express');
const cors = require('cors');
const {Pool } = require('pg');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

const port = 3000;

const pool = new Pool({
    connectionString: 'postgresql://root:hANvvIlWXvYsmKJMlUL9HLf6vTKXspMS@dpg-cv7j0jdds78s73ca846g-a.oregon-postgres.render.com/uczelnie',
    ssl: { rejectUnauthorized: false }
});

app.get('/points', async(req, res) => {
    try {
        const query = await pool.query('SELECT * from uczelnie');
        res.json(query.rows);
    } catch(err){
        console.error('Błąd zapytania:', err);
        res.status(500).send('Błąd serwera');
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
})