import {
    getEmployeeDB,updateEmployeeDB,registerCustomerDB,EmployeeInventoryUpdateDB,getEmployeeTaskDetailsDB,orderDB
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

// async function registerCustomer(req, res) {
//   const { customer_personal_details, customer_asset, user } = req.body;

//   // Now you can use these objects as needed
//   console.log('Personal Details:', customer_personal_details);
//   console.log('Asset Details:', customer_asset);
//   console.log('user:', user);  

//   try {
//       const result = await registerCustomerDB(customer_personal_details,customer_asset,user);
//       console.log("Employee registered successfully");
//       if (result.affectedRows === 0) {
//           return res.status(404).send({ error: "Employee doesn't exist." });
//       }

//       console.log("Employee updated successfully");
//       res.status(200).json({ message: "Employee updated successfully" });
//   } catch (err) {
//       console.error('Error during update:', err);
//       res.status(500).send({ error: 'Server error' });
//   }
// }
async function EmployeeInventoryUpdate(req,res) {
  console.log("i am in EmployeeInventoryUpdate func")
  const items = req.body
  console.log(items)
  try{
    const result= await EmployeeInventoryUpdateDB(items);
    console.log("inventories successfully");
    if (result.affectedRows === 0) {
        return res.status(404).send({ error: "inventories faild" });
    }

    console.log("inventories successfully");
    return res.status(200).json({ message: "inventories successfully" });
  } catch (err) {
      console.error('Error during update:', err);
      res.status(500).send({ error: 'Server error' });
  }
}
async function order(req,res) {
  console.log("i am in order func")
  const items = req.body
  console.log(items)
  try{
    const result= await orderDB(items);
    console.log("order successfully");
    if (result.affectedRows === 0) {
        return res.status(404).send({ error: "order faild" });
    }

    console.log("order successfully");
    return res.status(200).json({ message: "order successfully" });
  } catch (err) {
      console.error('Error during order:', err);
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
async function getEmployeeTaskDetails(req, res) {
  try {
    console.log("i am in getEmployeeTaskDetails func");
    console.log(req.params.id);

    const employee = await getEmployeeDB(req.params.id);
    
    if (employee[0].length === 0) {
      return res.status(401).send({ error: "User doesn't exist." });
    }

    console.log("I got the employee");
    const employeeDetails = employee[0][0];

    const tasks = await getEmployeeTaskDetailsDB(employeeDetails.team);
    
    if (tasks[0].length === 0) {
      return res.status(401).send({ error: "No tasks found for this employee." });
    }

    return res.status(200).json({ tasks });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "An error occurred while fetching task details." });
  }
}

export{getEmployeeDetails,updateEmployee,registerCustomer,EmployeeInventoryUpdate,getEmployeeTaskDetails,order}