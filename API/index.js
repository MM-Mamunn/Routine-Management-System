import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db.js';
import register from "./routes/registration.route.js";
import test from "./routes/studentCourseInsert.route.js";
import login from "./routes/login.route.js";
import sectionRoutine from "./routes/sectionRoutes/section.route.js"
const router = express.Router();

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/register',register)
app.use('/api/student_course_insert',test)
app.use('/api/login',login)
app.use('/api/section',sectionRoutine)


// app.get('/data', async (req, res) => {
//     try {
//       // Perform a simple query to get all rows from a table
//       const result = await pool.query('SELECT * FROM course');
      
//       // Send the result rows as JSON
//       res.json(result.rows);
//     } catch (err) {
//       // Handle the error
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });


  app.listen(3000, () => {
    console.log(`Server is starting on port 3000`);
  });