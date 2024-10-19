
import pool from "../../db.js";

//authorizeentication

const sectionRoutine = async (req, res) => {
  //   const { section  } = req.body;
  const section = req.params.slug;

  try {
    const user = await pool.query(
      "SELECT * FROM class WHERE sec = $1 order by day , slot",
      [section]
    );
    let final = []
    for ( let i = 0; i < user.rows.length; i++)
    {
      let temp = user.rows[i];
      let cnt = 1;
      while( (i + 1) < user.rows.length && user.rows[i + 1].day == temp.day && user.rows[i + 1].code == temp.code && user.rows[i + 1].room == temp.room && user.rows[i + 1].faculty == temp.faculty  )
      {
        ++i;
        ++cnt;
      }
      let temp2 = {...temp,"count" : cnt};
      final.push(temp2);
    }
    return res.status(200).json({ rows: final });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export { sectionRoutine };
