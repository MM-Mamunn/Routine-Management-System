import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()

function jwtGenerator(user_id,user_type) {
  const payload = {
    user: {
      id: user_id,
      type: user_type
    }
  };


  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

export { jwtGenerator};