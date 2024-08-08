import { pool } from "./connection.js";
// function checkUser(req, res) {
//     const { user_name, password } = req.body;
//     console.log("Connected!");
  
//     const sql = `SELECT * FROM Users  where user_name="${user_name}" and password="${password}"`;
  
//     con.query(sql, function (err, results, fields) {
//       if (err) throw err;
//       console.log("query done");
//       console.log(results);
//       if (results.length === 0) {
//         res.status(401).json({ error: "Invalid email or password" });
//       } else {
//         console.log(results[0].user_name);
//         const user = { user_name: user_name };
  
//         res.statusCode = 200;
//         res.status(200).json({user_name: user_name });
//       }
//     });
//   }
  async function getUser(user) {
    console.log("in function getUser from db");
    console.log(user)
    const sql = `SELECT * FROM Users  where user_name="${user.user_name}" and user_password="${user.password}"`;
    const res = pool.query(sql);
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }
  export{getUser}