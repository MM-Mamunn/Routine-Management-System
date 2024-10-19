import pool from "../db.js";

const courseLookLike = async (req, res) => {
  //   const { section  } = req.body;

  const course = req.params.slug;

  try {
    const courses = await pool.query(
      `SELECT * 
         FROM course
         WHERE LOWER(code) LIKE '%' || LOWER($1) || '%'`,
      [course]
    );
    console.log("in");

    return res.status(200).json({ rows: courses.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const sectionLookLike = async (req, res) => {
  //   const { section  } = req.body;

  const section = req.params.slug;

  try {
    const sections = await pool.query(
      `SELECT * 
           FROM section
           WHERE LOWER(sec) LIKE '%' || LOWER($1) || '%'`,
      [section]
    );

    return res.status(200).json({ rows: sections.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const facultyLookLike = async (req, res) => {

  const faculty = req.params.slug;

  try {
    const faculties = await pool.query(
      `SELECT * 
           FROM faculty
           WHERE LOWER(code) LIKE '%' || LOWER($1) || '%'`,
      [faculty]
    );

    return res.status(200).json({ rows: faculties.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


export { courseLookLike, sectionLookLike,facultyLookLike };
