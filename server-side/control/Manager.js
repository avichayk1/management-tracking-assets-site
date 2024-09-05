import {
    getEmployeeDB,updateEmployeeDB,registerCustomerDB
  } from '../models/employeeDB.js';
import {getManagerDB,addTaskDB,addSurveyDB,getItemsDB,updatedItemDB,getAllTaskDetailsDB} from '../models/managerDB.js'
async function getManagerDetails(req, res){
    console.log("i am in getManagerDetails")
    console.log(req.params.id)
    const manager_id=req.query.manager_id;
    const manager = await getManagerDB(req.params.id)
    .then((table) => {
      if (table[0].length === 0) {
        return res.status(401).send({ error: "user doesn't exists." });
      }
      console.log("i get the manager")
    //   console.log(table)
      const manager = table[0][0]
      console.log("manager is: ", manager)
    //   console.log(customer)
      res.statusCode = 200;
      return res.status(200).json({
        manager
        
      });
    })
    .catch((err) => console.log(err));
}
async function getItems(req, res){
  console.log("i am in getItems")
  const items = await getItemsDB()
  .then((table) => {
    if (table[0].length === 0) {
      return res.status(401).send({ error: "no items" });
    }
    console.log("i get the items")
  //   console.log(table)
    const items = table[0]
    console.log("items: ", items)
  //   console.log(customer)
    res.statusCode = 200;
    return res.status(200).json({
      items
      
    });
  })
  .catch((err) => console.log(err));
}
async function updateItemAmount(req, res) {
  const updatedItem= req.body;
  
  console.log('Received update request:', updatedItem);

  try {
      const result = await updatedItemDB(updatedItem);
      console.log("item amount updated successfully");
      if (result.affectedRows === 0) {
          return res.status(404).send({ error: "Customer doesn't exist." });
      }

      console.log("item amount updated successfully");
      res.status(200).json({ message: "item amount updated successfully" });
  } catch (err) {
      console.error('Error during update:', err);
      res.status(500).send({ error: 'Server error' });
  }
}
async function addTask(req, res) {
    const newTask = req.body;
    
    console.log('Received update request:', newTask);

    try {
        const result = await addTaskDB(newTask);
        console.log("Task added successfully");
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Employee doesn't exist." });
        }

        console.log("Task added successfully");
        return res.status(200).json({ message: "Task added successfully" });
    } catch (err) {
        console.error('Error during update:', err);
        res.status(500).send({ error: 'Server error' });
    }
}

async function addSurvey(req, res) {
  const newTask = req.body;
  
  console.log('Received update request:', newTask);

  try {
      const result = await addSurveyDB(newTask);
      console.log("Survey added successfully");
      if (result.affectedRows === 0) {
          return res.status(404).send({ error: "Employee doesn't exist." });
      }

      console.log("Survey added successfully");
      return res.status(200).json({ message: "Survey added successfully" });
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
async function getEmployeeTaskDetails(req, res) {
  try {
    console.log("i am in getEmployeeTaskDetails func");
    console.log(req.params.id);


    const tasks = await getAllTaskDetailsDB();
    
    if (tasks[0].length === 0) {
      return res.status(401).send({ error: "No tasks found for this employee." });
    }

    return res.status(200).json({ tasks });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "An error occurred while fetching task details." });
  }
}
export{getManagerDetails,addTask,registerCustomer,addSurvey,getItems,updateItemAmount}