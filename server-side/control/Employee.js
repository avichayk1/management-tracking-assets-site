import {
    getEmployeeDB
  } from '../models/employeeDB.js';
async function getEmployeeDetails(req, res){
    console.log("i am in getEmployeeDetails")
    console.log(req.params.id)
    const employee = await getEmployeeDB(req.params.id)
    .then((table) => {
      if (table[0].length === 0) {
        return res.status(401).send({ error: "user doesn't exists." });
      }
      console.log("i get the employee")
    //   console.log(table)
      const employee = table[0][0]
    //   console.log(customer)
      res.statusCode = 200;
      return res.status(200).json({
        employee
        
      });
    })
    .catch((err) => console.log(err));
}
export{getEmployeeDetails,}