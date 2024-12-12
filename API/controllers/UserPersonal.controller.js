import pool from "../db.js";

//authorizeentication

const personalRoutine = async (req, res) => {

  const st_id = req.user.id;

  try {
    const user = await pool.query(
      `select STRING_AGG(sec, ', ') AS sec,STRING_AGG(code, ', ') AS code, STRING_AGG(faculty, ', ') AS faculty,day, slot,STRING_AGG(room, ', ') AS room , STRING_AGG(class_id::TEXT, ', ') AS class_id from 
(select * from class natural join student_course where id = $1) as t
group by day , slot order by day , slot`,
      [st_id]
    );
    let final = [];
    for (let i = 0; i < user.rows.length; i++) {
      let temp = user.rows[i];
      let cnt = 1;
      while (
        i + 1 < user.rows.length &&
        user.rows[i + 1].day == temp.day &&
        user.rows[i + 1].code == temp.code &&
        user.rows[i + 1].room == temp.room &&
        user.rows[i + 1].faculty == temp.faculty
      ) {
        ++i;
        ++cnt;
      }
      let temp2 = { ...temp, count: cnt };
      final.push(temp2);
    }
    return res.status(200).json({ rows: final });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const Profile = async (req, res) => {

  const st_id = req.user.id;

  try {
    const data = await pool.query(
      `select id, name, sec, phone, email from student where id = $1`,
      [st_id]
    );
    
    return res.status(200).json({ rows: data.rows  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


const studentCourseInsert = async(req,res)=>{
  const { code,section  } = req.body;

  const st_id= req.user.id;
  
  try {
    const user = await pool.query("SELECT * FROM class WHERE code = $1 and sec = $2" , [
      code ,section
    ]);

    if (user.rows.length <= 0) {
      return res.status(401).json("no such class");
    }
    
    const Check =await pool.query("SELECT * FROM student_course WHERE id = $1 and code = $2 and sec = $3" , [
    st_id,code ,section
    ]);

    if (Check.rows.length > 0) {
      return res.status(401).json("this course already Added");
    }

    const NewUser = await pool.query(`insert into student_course(id, code,sec)
values
($1,$2,$3) RETURNING *;` , [
        st_id,code,section
      ]);
    
    res.json(NewUser.rows)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export { personalRoutine, Profile,studentCourseInsert};
