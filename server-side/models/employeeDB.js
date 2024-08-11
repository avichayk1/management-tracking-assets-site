import { pool } from "./connection.js";
async function getEmployeeDB(id) {
    console.log("in function getEmployee from db");
    console.log(id +"in employeeDB")
    const sql = `SELECT * FROM Employees where user_id="${id}" `;
    const res = pool.query(sql);
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }
  export{getEmployeeDB,}