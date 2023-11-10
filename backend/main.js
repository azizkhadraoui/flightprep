import express from "express"
import mysql from "mysql"
import cors from "cors"
import 'dotenv/config'

const app = express();

const connection = mysql.createConnection({
    host: process.env.HOST, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect((error) => {
    if(error){
        console.error(error);
        return;
    }
    console.log('The database is successfully connected.');
})

// Set up middleware
app.use(express.json());
app.use(cors());

// Define routes and handlers
app.get("/", (req, res) => {
    res.json("this is the backend side")
});

app.get("/data/:xx/:yy", (req, res) => {
    const xx = req.params.xx;
    const yy = req.params.yy;
    const q = `SELECT * FROM questions WHERE id LIKE '${xx}-${yy}%'`;
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while querying the database' });
        }
        return res.json(data);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(8800, () => {
    console.log("Connected to backend");
});
