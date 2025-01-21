import pool from "../db.js";

//authorizeentication

const personalRoutine = async (req, res) => {
  const st_id = req.user.id;
  console.log("Personal routine attepted by ", st_id);

  try {
    const user = await pool.query(
      `SELECT 
    STRING_AGG(sec, ', ' ORDER BY sec) AS sec,
    STRING_AGG(code, ', ' ORDER BY code) AS code,
    STRING_AGG(faculty, ', ' ORDER BY faculty) AS faculty,
    day, 
    slot,
    STRING_AGG(room, ', ' ORDER BY room) AS room,
    STRING_AGG(class_id::TEXT, ', ' ORDER BY class_id) AS class_id
FROM (
    SELECT * 
    FROM class 
    NATURAL JOIN student_course 
    WHERE id = $1 
    ORDER BY code, faculty
) AS t
GROUP BY day, slot
ORDER BY day, slot;
`,
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
  console.log("profile attempted by ", st_id);

  try {
    const data = await pool.query(
      `select id, name, sec, phone, email from student where id = $1`,
      [st_id]
    );

    return res.status(200).json({ rows: data.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const studentCourseInsert = async (req, res) => {
  const { code, section } = req.body;

  const st_id = req.user.id;

  try {
    const user = await pool.query(
      "SELECT * FROM class WHERE code = $1 and sec = $2",
      [code, section]
    );

    if (user.rows.length <= 0) {
      return res.status(401).json("no such class");
    }

    const Check = await pool.query(
      "SELECT * FROM student_course WHERE id = $1 and code = $2 and sec = $3",
      [st_id, code, section]
    );

    if (Check.rows.length > 0) {
      return res.status(401).json("this course already Added");
    }

    const Count = await pool.query(
      `select * from
(
select  count(*) from
(
select temp1.day,temp1.slot from
(select * from class natural join student_course where student_course.id = $1)
as temp1
join

(select * from class where code = $2 and sec = $3)
as temp2
on temp1.slot = temp2.slot and temp2.day = temp1.day 

) 
as temp3 
group by day,slot)
as temp4 where count = 3`,
      [st_id, code, section]
    );
    if (Count.rows.length > 0) {
      return res
        .status(401)
        .json("You Can't Add more than 3 course in the same slot of the day");
    }

    const NewUser = await pool.query(
      `insert into student_course(id, code,sec)
values
($1,$2,$3) RETURNING *;`,
      [st_id, code, section]
    );

    res.json(NewUser.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export { personalRoutine, Profile, studentCourseInsert };
