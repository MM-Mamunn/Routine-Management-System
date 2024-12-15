
import express from 'express';
const router = express.Router();
import pool from '../db.js';


const RoomAvailability =async (req,res)=> {
  // const { day, slot } = req.body;
  
  const day = req.params.slug1 ;
  const slot = req.params.slug2;
  // console.log("login attempted");
  // console.log(id,password);
  console.log("ROom check requested",day,slot);
  
  try {
    if( !slot || day < 0 || day > 6 || slot < 1 || slot > 6) 
        return res.status(401).json("Invalid Credential ");
    const room =await pool.query(`select room from (
	select room, coalesce(code,'specialType') as code  from classroom natural left outer join 
	  (select * from class where day = $1 and slot = $2) as t1
    ) as t2 where code ='specialType' ` , [
        day, slot
        ]);
        console.log("data ",room.rows);
        
        res.json(room.rows)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


export { RoomAvailability};