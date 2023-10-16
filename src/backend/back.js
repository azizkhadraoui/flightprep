import express from "express"
import mysql from "mysql"
import cors from "cors"

try {
    const app = express();
    const db = mysql.createConnection({
        host:'154.49.245.103',
        user:'u784106126_root',
        password:'XTFqc^75q!',
        database:'u784106126_air_exam'
    })

    app.use(express.json())
    app.use(cors());

    app.get("/",(req,res) => {
        res.json("this is the backend side")
    })

    app.get("/data/:xx/:yy",(req,res) => {
        const xx = req.params.xx;
        const yy = req.params.yy;
        const q = `SELECT * FROM questions WHERE id LIKE '${xx}-${yy}%'`;
        db.query(q,(err,data)=>{
            if(err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred while querying the database' });
            }
            return res.json(data)
        })
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    app.listen(8800, () => {
        console.log("connected to backend")
    })
    .on('error', console.error.bind(console, 'connection error:'));
} catch (error) {
    console.error('An error occurred:', error);
}
