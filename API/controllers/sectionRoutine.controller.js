import pool from "../db.js";

//authorizeentication

const sectionRoutine = async (req, res) => {
  //   const { section  } = req.body;
  const section = req.params.slug;

  try {
    const user = await pool.query(
      `
select
STRING_AGG(sec, ', ' ORDER BY sec) AS sec,
    STRING_AGG(code, ', ' ORDER BY code) AS code,
    STRING_AGG(faculty, ', ' ORDER BY faculty) AS faculty,
    day, 
    slot,
    STRING_AGG(room, ', ' ORDER BY room) AS room,
    STRING_AGG(class_id::TEXT, ', ' ORDER BY class_id) AS class_id
     from 
(select * from class where sec = $1) as t
group by day,slot order by day,slot`,
      [section]
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

export { sectionRoutine };
