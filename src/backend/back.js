import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();

const pool = mysql.createPool({
    host: '154.49.245.103',
    user: 'u784106126_root',
    password: 'XTFqc^75q!',
    database: 'u784106126_air_exam',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Set up middleware
app.use(express.json());
app.use(cors());

// Define routes and handlers
app.get("/", (req, res) => {
    res.json("This is the backend side");
});

app.get("/data/:xx/:yy", async (req, res) => {
    try {
        const xx = req.params.xx;
        const yy = req.params.yy;
        const q = `SELECT * FROM questions WHERE id LIKE '${xx}-${yy}%'`;

        const [rows, fields] = await pool.query(q);
        
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next(err); // Call next to pass the error to the next middleware
});

// Start the server
app.listen(8800, () => {
    console.log("Connected to backend");
});
