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

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("This is the backend side");
});

// Endpoint to fetch questions based on an array of question IDs
app.post("/data/questions", async (req, res) => {
    try {
        const questionIds = req.body.questionIds; // Assuming the frontend sends an array of question IDs in the request body
        if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty questionIds array in the request body' });
        }

        // Use parameterized queries to prevent SQL injection
        const q = 'SELECT * FROM questions WHERE TRIM(id) IN (?)';
        const [rows, fields] = await pool.query(q, [questionIds]);
        //console.log("Rows from the database:", rows);
        //console.log("Generated SQL Query:", pool.format(q, [questionIds])); 

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});

// Endpoint to fetch questions based on xx and yy parameters
app.get("/data/:xx/:yy", async (req, res) => {
    try {
        const xx = req.params.xx;
        const yy = req.params.yy;

        // Use parameterized queries to prevent SQL injection
        const q = 'SELECT * FROM questions WHERE id LIKE ?';
        const [rows, fields] = await pool.query(q, [`${xx}-${yy}%`]);

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});

// Improved error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
    next(err); 
});

app.listen(8800, () => {
    console.log("Connected to backend");
});
