import {
    getEmployeeDB,updateEmployeeDB,registerCustomerDB
  } from '../models/employeeDB.js';
async function getEmployeeDetails(req, res){
    console.log("i am in getEmployeeDetails")
    console.log(req.params.id)
    const employee_id=req.query.employee_id;
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

async function updateEmployee(req, res) {
    const updatedEmployee = req.body;
    
    console.log('Received update request:', updatedEmployee);

    try {
        const result = await updateEmployeeDB(updatedEmployee);
        console.log("Employee updated successfully");
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Employee doesn't exist." });
        }

        console.log("Employee updated successfully");
        res.status(200).json({ message: "Employee updated successfully" });
    } catch (err) {
        console.error('Error during update:', err);
        res.status(500).send({ error: 'Server error' });
    }
}

async function registerCustomer(req, res) {
  const { customer_personal_details, customer_asset, user } = req.body;

  // Now you can use these objects as needed
  console.log('Personal Details:', customer_personal_details);
  console.log('Asset Details:', customer_asset);
  console.log('user:', user);  

  try {
      const result = await registerCustomerDB(customer_personal_details,customer_asset,user);
      console.log("Employee registered successfully");
      if (result.affectedRows === 0) {
          return res.status(404).send({ error: "Employee doesn't exist." });
      }

      console.log("Employee updated successfully");
      res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
      console.error('Error during update:', err);
      res.status(500).send({ error: 'Server error' });
  }
}

export{getEmployeeDetails,updateEmployee,registerCustomer,}