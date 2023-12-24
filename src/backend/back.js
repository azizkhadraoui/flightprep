import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import { escape } from "mysql2";
import multer from "multer";


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


app.use(express.json({ limit: '10mb' }));

app.use(cors());

app.get("/", (req, res) => {
    res.json("This is the backend side");
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
         cb(null, "./public")
    },
    filename: function (req, file, cb) {
         cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
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
        console.log(pool.format(q, [`${xx}-${yy}%`]));

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});


app.get("/data/search/s/:qu", async (req, res) => {
    try {
        const qu = req.params.qu;
        const q = 'SELECT * FROM questions WHERE question LIKE ?';
        const queryString = `%${qu}%`; 
        const [rows, fields] = await pool.query(q, [queryString]);
        console.log(pool.format(q, [queryString]));

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});



// Endpoint to fetch questions based on xx and yy parameters, excluding specified ids
app.get("/data/:xx/:yy/exclude/:excludedIds", async (req, res) => {
    try {
        const xx = req.params.xx;
        const yy = req.params.yy;
        const excludedIds = req.params.excludedIds.split(','); // Assuming ids are passed as a comma-separated string

        // Use parameterized queries to prevent SQL injection
        const q = 'SELECT * FROM questions WHERE id LIKE ? AND TRIM(id) NOT IN (?)';
        const [rows, fields] = await pool.query(q, [`${xx}-${yy}%`, excludedIds]);
        console.log("SQL Query:", pool.format(q, [`${xx}-${yy}%`, excludedIds]));


        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});
app.get("/data/real-exam-true/:xx/:yy", async (req, res) => {
    try {
        const xx = req.params.xx;
        const yy = req.params.yy;
        const q = 'SELECT * FROM questions WHERE real_exam = true AND id LIKE ?';
        const [rows, fields] = await pool.query(q, [`${xx}-${yy}%`]);

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});

// Endpoint to fetch questions where real_exam is false or null and id matches a pattern
app.get("/data/real-exam-false-or-null/:xx/:yy", async (req, res) => {
    try {
        const xx = req.params.xx;
        const yy = req.params.yy;
        const q = 'SELECT * FROM questions WHERE (real_exam = false OR real_exam IS NULL) AND id LIKE ?';
        const [rows, fields] = await pool.query(q, [`${xx}-${yy}%`]);

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});

// Endpoint to fetch questions where recently_changed is true and id matches a pattern
app.get("/data/recently-changed-true/:xx/:yy", async (req, res) => {
    try {
        const xx = req.params.xx;
        const yy = req.params.yy;
        const q = 'SELECT * FROM questions WHERE recently_changed = true AND id LIKE ?';
        const [rows, fields] = await pool.query(q, [`${xx}-${yy}%`]);

        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});
// Endpoint to fetch all questions
app.get('/api/questions', async (req, res) => {
    try {
        const q = 'SELECT * FROM questions limit 100';
        const [rows, fields] = await pool.query(q);
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
});

// Endpoint to delete a question by ID
app.delete('/api/remove/:id', async (req, res) => {
    try {
        const questionId = req.params.id;
        console.log('DELETE request received');
        console.log('ID:', questionId);

        const deleteQuery = 'DELETE FROM questions WHERE id = ?';
        const [result] = await pool.query(deleteQuery, [questionId]);

        if (result.affectedRows > 0) {
            console.log('Question deleted successfully');
            return res.status(200).json({ success: true, message: 'Question deleted successfully' });
        } else {
            console.log('Question not found');
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
    } catch (err) {
        console.error('Error deleting question:', err);

        if (err.code === 'ER_PARSE_ERROR' || err.code === 'ER_BAD_DB_ERROR') {
            console.error('Bad request or database error');
            return res.status(400).json({ error: 'Bad request or database error' });
        }
        console.error('Internal server error');
        return res.status(500).json({ error: 'An error occurred while deleting the question' });
    }
});


// Endpoint to create a new question with annexe file
app.post('/api/create', upload.single('annexe'), async (req, res) => {
    try {
        const questionData = req.body;
        const annexeFile = req.file; 
        const annexeValue = annexeFile ? annexeFile.buffer.toString('base64') : null;

        const q = `
    INSERT INTO questions
    (question, A, B, C, D, correct, status, seen_in, free_trial, compass, annexe, idd, real_exam, recently_changed)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

        const [result] = await pool.query(q, [
            questionData.question,
            questionData.A || null,
            questionData.B || null,
            questionData.C || null,
            questionData.D || null,
            questionData.correct,
            questionData.status,
            questionData.seen_in || null,
            questionData.free_trial || null,
            questionData.compass || null,
            annexeValue,
            questionData.idd || null,
            questionData.real_exam || null,
            questionData.recently_changed || null
        ]);

        console.log('Database result:', result);
        res.status(200).json({ success: true, message: 'Question added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the question' });
    }
});

// Endpoint to update a question by ID
app.put('/api/update/:id', upload.single('annexe'), async (req, res) => {
    try {
        const questionId = req.params.id;
        const updatedQuestionData = req.body;
        const annexeValue = null;

        if (req.file && req.file.buffer) {
            annexeValue = req.file.buffer.toString('base64');
        }
        console.log('Received data for update:', updatedQuestionData);

        const q = `
            UPDATE questions
            SET
                question = ?,
                A = ?,
                B = ?,
                C = ?,
                D = ?,
                correct = ?,
                status = ?,
                seen_in = ?,
                free_trial = ?,
                compass = ?,
                annexe = ?,
                idd = ?,
                real_exam = ?,
                recently_changed = ?
            WHERE id = ?
        `;

        const [result] = await pool.query(q, [
            updatedQuestionData.question,
            updatedQuestionData.A,
            updatedQuestionData.B,
            updatedQuestionData.C,
            updatedQuestionData.D,
            updatedQuestionData.correct,
            updatedQuestionData.status,
            updatedQuestionData.seen_in,
            updatedQuestionData.free_trial,
            updatedQuestionData.compass,
            annexeValue,
            updatedQuestionData.idd,
            updatedQuestionData.real_exam,
            updatedQuestionData.recently_changed,
            questionId
        ]);

        console.log('Database result:', result);

        if (result.affectedRows > 0) {
            console.log(req.body.annexe);
            return res.status(200).json({ success: true, message: 'Question updated successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while updating the question' });
    }
});

// Endpoint to get question details by ID
app.get('/api/getQuestion/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query('SELECT * FROM questions WHERE id = ?', id);

        if (result.length === 0) {
            res.status(404).json({ error: 'Question not found' });
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching question details' });
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
