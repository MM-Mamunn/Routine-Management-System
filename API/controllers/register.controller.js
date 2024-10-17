
import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import pool from '../db.js';
// const jwtGenerator = require("../utils/jwtGenerator");
import {jwtGenerator} from '../utils/jwtGenerator.js';
// const authorize = require("../middleware/authorize");

//authorizeentication

const register= async(req,res)=>{
  const { id,password ,name,section  } = req.body;

  try {
    const user = await pool.query("SELECT * FROM student WHERE id = $1", [
      id
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    
    let newUser = await pool.query(
      "INSERT INTO student (id, password,name, sec) VALUES ($1, $2, $3,$4) RETURNING *",
      [id,bcryptPassword,name,section]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// router.post("/login", validInfo, async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
//       email
//     ]);

//     if (user.rows.length === 0) {
//       return res.status(401).json("Invalid Credential");
//     }

//     const validPassword = await bcrypt.compare(
//       password,
//       user.rows[0].user_password
//     );

//     if (!validPassword) {
//       return res.status(401).json("Invalid Credential");
//     }
//     const jwtToken = jwtGenerator(user.rows[0].user_id);
//     return res.json({ jwtToken });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// router.post("/verify", authorize, (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

export { register};