import { pool,con } from "./connection.js";
async function getEmployeeDB(id) {
    console.log("in function getEmployee from db");
    console.log(id +"in employeeDB")
    const sql = `SELECT * FROM Employees where user_id="${id}" `;
    const res = pool.query(sql);
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }

  async function updateEmployeeDB(updatedEmployee) {
    console.log("in function updateEmployeeDB");
    console.log(updatedEmployee ,"in EmployeeDB")
    const sql = `UPDATE Employees
SET
    employee_f_name = ?,
    employee_l_name = ?,
    employee_phone = ?,
    employee_mail = ?,
    employee_adress = ?
WHERE
    employee_id = ?; `;
    const params = [
      updatedEmployee.employee_f_name,
      updatedEmployee.employee_l_name,
      updatedEmployee.employee_phone,
      updatedEmployee.employee_mail,
      updatedEmployee.employee_adress,
      updatedEmployee.employee_id
    ];
    const res = pool.query(sql,params);
    console.log("heree")
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }
  async function registerCustomerDB(customer_personal_details,customer_asset,user) {
    console.log("in function registerCustomerDB");
    console.log('Personal Details:', customer_personal_details);
    console.log('Asset Details:', customer_asset);
    console.log('user:', user);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    let userId; // Declare userId outside of the try block
    let res; // Declare res outside so it can be reused
    let customer_id;
    console.log("formattedDate",formattedDate); // Outputs something like "2024-08-12"
     // SQL Query to insert or update user details (e.g., for authentication)
     const sqlUser = `
     INSERT INTO Users (
         user_name,
         user_password,
         user_type
     )
     VALUES (?, ?, ?)`;

    const params = [
      user.user_name, // Assuming 'user' contains the username
      user.user_password,// Assuming 'user' contains password information
      "customer"
    ];
    try {
      // Execute the insert query
      [res] = await pool.query(sqlUser, params);

      // Retrieve the auto-incremented user_id
      userId = res.insertId; // 'insertId' contains the last inserted ID
      console.log("New user ID:", userId);
      console.log(res)
      // return res;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
  }
    // SQL Query to insert or update employee details (as customer)
    const sqlCustomer = `
        INSERT INTO customers (
            customer_f_name,
            customer_l_name,
            customer_phone,
            customer_mail,
            customer_adress,
            user_id,
            customer_d_join
        )
        VALUES (?, ?, ?, ?, ?, ?,?)`;

    const customerParams = [
        customer_personal_details.customer_f_name,
        customer_personal_details.customer_l_name,
        customer_personal_details.customer_phone,
        customer_personal_details.customer_mail,
        customer_personal_details.customer_adress,
        userId,
        formattedDate
    ];
    try {
      [res] = await pool.query(sqlCustomer, customerParams);
      customer_id = res.insertId; // 'insertId' contains the last inserted ID
      console.log("New customer ID:", customer_id);
      console.log(res)
    } catch (error) {
        console.error("Error during user registration:", error);
        throw error;
    }
        // SQL Query to insert or update asset details
        const sqlAsset = `
        INSERT INTO assets (
            customer_id,
            asset_adress,
            asset_district,
            asset_path,
            asset_cost,
            starting_date,
            asset_registration,
            ending_date,
            team,
            size
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const assetParams = [
        customer_id, // Assuming this is the foreign key to Employees table
        customer_asset.asset_adress,
        customer_asset.asset_district,
        customer_asset.asset_path,
        customer_asset.asset_cost,
        formattedDate,
        formattedDate,
        customer_asset.ending_date,
        customer_asset.team,
        customer_asset.size
    ];

    try {
      [res] = await pool.query(sqlAsset, assetParams);
      const assetId = res.insertId; // 'insertId' contains the last inserted ID
      console.log("New asset Id:", assetId);
      console.log(res)
      return res;

    } catch (error) {
        console.error("Error during user registration:", error);
        throw error;
    }
  }
  async function EmployeeInventoryUpdateDB(items) {
    console.log("in function EmployeeInventoryUpdateDB");
    console.log('items: ', items);
    // Transform items into an array of values arrays
    const values = items.map(item => [
      item.date, // order_date
      item.amount, // amount
      item.item_name, // item_name
      item.action_type, // action_type
      item.employee_id, // employee_id
      (() => { // Convert urgency to numeric value
          switch (item.urgency) {
              case "Low":
                  return 0; // Numeric value
              case "Medium":
                  return 1; // Numeric value
              case "High":
                  return 2; // Numeric value
              default:
                  return 0; // Default value
          }
      })()
  ]);
     // SQL Query to insert or update user details (e.g., for authentication)
     const sqlInventoryUpdate = `
     INSERT INTO stockorders (
         order_date,
         amount,
         item_name,
         action_type,
         employee_id,
         urgency
     )
     VALUES ?`; // Using VALUES ? to insert multiple rows

     try {
      // Execute the insert query with multiple rows
      const [result] = await pool.query(sqlInventoryUpdate, [values]);

      // Check the result
      console.log("Items were added successfully.");
      console.log("Result:", result);
      console.log(`Number of affected rows: ${result.affectedRows}`);
      return result;
    } catch (error) {
        console.error("Error during inventory update:", error);
        throw error;
    }
  }
  // async function orderDB(items) {
  //   console.log("in function orderDB");
  //   console.log('items: ', items);
  //   // Prepare the SQL query for updating multiple rows
  //   // This example assumes you have a table `inventory` with columns `item_id` and `item_amount`
  //   let sqlOrder = `
  //    UPDATE Items
  //       SET item_amount = CASE
  //           WHEN item_amount - ? < 0 THEN 0
  //           ELSE item_amount - ?
  //       END
  //       WHERE item_id = ?;
  //   `;
  //   await con.beginTransaction();

  //   try {
  //     for (const item of items) {
  //         // Check if the row data is valid before updating
  //         // You might want to validate here; for example, check if item.item_id exists

  //         // Execute the update query
  //         await con.query(sqlInventoryUpdate, [item.item_amount, item.item_id,item.item_amount]);
  //     }

  //     // Commit the transaction
  //     await con.commit();
  //     console.log("Items were updated successfully.");
  //   } catch (error) {
  //     // Rollback the transaction in case of an error
  //     await con.rollback();
  //     console.error("Error during inventory update:", error);
  //     throw error;
  //   }finally {
  //     // Optional: release the connection if using a pool
  //     con.end();
  //   }
  // }


  async function orderDB(items) {
    console.log("in function orderDB");
    console.log('items: ', items);
    let totalAffectedRows=0
    const sqlOrder = `
      UPDATE items
      SET item_amount = CASE
          WHEN item_amount - ? < 0 THEN 0
          ELSE item_amount - ?
      END
      WHERE item_name = ?;
    `;
    console.log("item_order",items)
    items.forEach((item, index) => {
      console.log("item in for each",item)
      const amount = parseInt(item.amount, 10);
      const res=pool.query(sqlOrder,[amount,amount,item.item_name])
      totalAffectedRows += res.affectedRows;

    })
    return({ affectedRows: totalAffectedRows }); // Resolve with affected rows

  }
  
  
  async function getEmployeeTaskDetailsDB(team) {
    console.log("in function getEmployeeTaskDetailsDB");
    console.log('team: ', team);
    const sql = `SELECT * FROM journals where team="${team}" `;
    const res =await pool.query(sql);
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res[0];
  }
  export{getEmployeeDB,updateEmployeeDB,registerCustomerDB,EmployeeInventoryUpdateDB,getEmployeeTaskDetailsDB,orderDB}