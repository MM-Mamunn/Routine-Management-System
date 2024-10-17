
import express from 'express';
import pool from '../../db.js';

//authorizeentication

const sectionRoutine= async(req,res)=>{
//   const { section  } = req.body;
  const section = req.params.slug;

  try {
    const user = await pool.query("SELECT * FROM class WHERE sec = $1 order by day , slot", [
        section
      ]);

    return res.status(200).json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



export { sectionRoutine};