import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
/*const db = mysql.createConnection({
  host:'154.49.245.103',
  user:'u784106126_root',
  password:'XTFqc^75q!',
  database:'u784106126_air_exam'
})*/
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'aziz989120011012003',
  database:'air_exam'
})

app.use(express.json())
app.use(cors());
app.get("/",(req,res) => {
    res.json("this is the backend side")
})
app.get("/data",(req,res) => {
    const q = " SELECT * FROM questions LIMIT 10; "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

})
app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
app.listen(8800, () =>{console.log("connected to backend")
});