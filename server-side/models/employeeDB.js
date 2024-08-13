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
  export{getEmployeeDB,updateEmployeeDB,registerCustomerDB,}