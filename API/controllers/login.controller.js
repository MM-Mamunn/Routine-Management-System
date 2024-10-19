
import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import pool from '../db.js';
import {jwtGenerator} from '../utils/jwtGenerator.js';


const login =async (req,res)=> {
  const { id, password } = req.body;

  try {
    if(!id || !password) 
        return res.status(401).json("Invalid Credential 1");
    const user = await pool.query("SELECT * FROM student WHERE id = $1", [
      id
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential 2");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential 3");
    }
    const jwtToken = jwtGenerator(user.rows[0].id,user.rows[0].type);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// router.post("/verify", authorize, (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

export { login};