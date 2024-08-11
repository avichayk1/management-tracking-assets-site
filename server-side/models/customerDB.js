import { pool } from "./connection.js";
async function getCustomer(id) {
    console.log("in function getCustomer from db");
    console.log(id +"in customerDB")
    const sql = `SELECT * FROM Customers where user_id="${id}" `;
    const res = await pool.query(sql);
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }
  async function updateCustomerDB(updatedCustomer) {
    console.log("in function updateCustomerDB");
    console.log(updatedCustomer ,"in customerDB")
    const sql = `UPDATE Customers
SET
    customer_f_name = ?,
    customer_l_name = ?,
    customer_phone = ?,
    customer_mail = ?,
    customer_adress = ?
WHERE
    customer_id = ?; `;
    const params = [
      updatedCustomer.customer_f_name,
      updatedCustomer.customer_l_name,
      updatedCustomer.customer_phone,
      updatedCustomer.customer_mail,
      updatedCustomer.customer_adress,
      updatedCustomer.customer_id
    ];
    const res = pool.query(sql,params);
    console.log("heree")
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }
  async function getCustomerAssetsDB(id) {
    console.log("in function getCustomer assets from db");
    console.log("customer id: ",id ,"in customerAssetsDB")
    const sql = `SELECT * FROM assets where customer_id="${id}" `;
    const res = await pool.query(sql);
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }
  async function getCustomerContactDB(id){
    console.log("in function get Customer contact from db");
    console.log("customer id: ",id ,"in CustomerContactDB")
    const sql = `SELECT * FROM contacts where customer_id="${id}" `;
    const res = await pool.query(sql);
    //   console.log(JSON.parse(res[0]));
    console.log(res)
    return res;
  }
  export{getCustomer,updateCustomerDB,getCustomerAssetsDB,getCustomerContactDB,}