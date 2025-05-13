const express = require('express');
const cors = require('cors');
const {Pool } = require('pg');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

const port = 3000;

const pool = new Pool({
<<<<<<< HEAD
    connectionString: 'postgresql://postgres:PROJEKT123@db.bemdgbvzsmanginuzuxl.supabase.co:5432/postgres',
=======
    connectionString: 'postgresql://postgres:PROJEKT123@db.ylbyuvzaoaruwstbgpjd.supabase.co:5432/postgres',
>>>>>>> 39d91420802f64af877119e72f8b85a010013225
    ssl: { rejectUnauthorized: false }
});

app.get('/points', async(req, res) => {
    try {
        const query = await pool.query('SELECT * from User');
        res.json(query.rows);
    } catch(err){
        console.error('Błąd zapytania:', err);
        res.status(500).send('Błąd serwera');
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
})