
import express from 'express';
const router = express.Router();
import pool from '../db.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const test= async(req,res)=>{
  const { code,sec  } = req.body;

  const st_id= req.user.id;
  
  try {
    const user = await pool.query("SELECT * FROM class WHERE code = $1 and sec = $2" , [
      code ,sec
    ]);

    if (user.rows.length <= 0) {
      return res.status(401).json("no such class");
    }
    
    const unique_code = user.rows[0].class_id;
    console.log(unique_code);
    
    const Check =await pool.query("SELECT * FROM student_course WHERE id = $1 and class_id = $2" , [
    st_id,unique_code
    ]);

    if (Check.rows.length > 0) {
      return res.status(401).json("this course already Added");
    }

    console.log(Check.rows.length);
    
    const NewUser = await pool.query(`insert into student_course(id, class_id)
values
($1,$2) RETURNING *;` , [
        st_id,unique_code
      ]);
    ;
    console.log(NewUser.rows);
    res.json(NewUser.rows)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



export { test};