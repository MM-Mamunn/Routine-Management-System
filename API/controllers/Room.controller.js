import express from "express";
const router = express.Router();
import pool from "../db.js";

const RoomAvailability = async (req, res) => {
  const { day, slot, building } = req.params;

  console.log("ROom check requested", day, slot);

  try {
    if (!slot || day < 0 || day > 6 || slot < 1 || slot > 6)
      return res.status(401).json("Invalid Credential ");
    if (!building) {
      const room = await pool.query(
        `select room from (
    select room, coalesce(code,'specialType') as code  from classroom natural left outer join 
      (select * from class where day = $1 and slot = $2) as t1
      ) as t2 where code ='specialType' `,
        [day, slot]
      );
      console.log(room.rows);
      res.json(room.rows);
    } 
    
    else {
      const rooms = await pool.query(
        `select room from (
    select room, coalesce(code,'specialType') as code  from classroom natural left outer join 
      (select * from class where day = $1 and slot = $2) as t1
      ) as t2 where code ='specialType' `,
        [day, slot]
      );
      // console.log(rooms.rows);
      
      if (Array.isArray(rooms.rows)) {        
        if (building == "CX" ) {          

            rooms.rows = rooms.rows.filter(row => row.room.includes(building) && !row.room.includes('CXB'));
        } 
        else if (building == "CXB" ) {          

            rooms.rows = rooms.rows.filter(row => row.room.includes(building) );
        } 
        else {
          rooms.rows = rooms.rows.filter(row => !row.room.includes('CXB') && !row.room.includes('CX'));
        }
        res.json(rooms.rows); // Send the filtered data
    } else {
        // Handle the case where res.rows is not defined or not an array
        res.json({ error: "No rows to process." });
    }

    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export { RoomAvailability };
