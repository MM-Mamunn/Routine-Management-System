

// import pool from '../db.js';

// const studentCourseInsert = async(req,res)=>{
//   const { code,section  } = req.body;

//   const st_id= req.user.id;
  
//   try {
//     const user = await pool.query("SELECT * FROM class WHERE code = $1 and sec = $2" , [
//       code ,section
//     ]);

//     if (user.rows.length <= 0) {
//       return res.status(401).json("no such class");
//     }
    
//     const Check =await pool.query("SELECT * FROM student_course WHERE id = $1 and code = $2 and sec = $3" , [
//     st_id,code ,section
//     ]);

//     if (Check.rows.length > 0) {
//       return res.status(401).json("this course already Added");
//     }

//     const NewUser = await pool.query(`insert into student_course(id, code,sec)
// values
// ($1,$2,$3) RETURNING *;` , [
//         st_id,code,section
//       ]);
    
//     res.json(NewUser.rows)
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };



// export { studentCourseInsert };