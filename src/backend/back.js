import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express();

let db;

function handleDisconnect() {
    db = mysql.createConnection({
        host: '154.49.245.103',
        user: 'u784106126_root',
        password: 'XTFqc^75q!',
        database: 'u784106126_air_exam'
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000); // Attempt to reconnect after 2 seconds
        } else {
            console.log('Connected to database.');
        }
    });

    db.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconnect on lost connection
        } else {
            throw err;
        }
    });
}

handleDisconnect();

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
