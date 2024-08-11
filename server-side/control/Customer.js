import {
    getCustomer,updateCustomerDB,getCustomerAssetsDB,getCustomerContactDB
  } from '../models/customerDB.js';
async function getCustomerDetails(req, res){
    console.log("update")
    console.log(req)
    console.log(req.params.id)
    const customer_id=req.query.customer_id;
    console.log("customer_id",customer_id)
    const customer = await getCustomer(req.params.id)

    .then((table) => {
      if (table[0].length === 0) {
        return res.status(401).send({ error: "user doesn't exists." });
      }
      console.log("i get the customer")
    //   console.log(table)
      const customer = table[0][0]
    //   console.log(customer)
      res.statusCode = 200;
      return res.status(200).json({
        customer
        
      });
    })
    .catch((err) => console.log(err));
}
async function updateCustomer(req, res) {
    const updatedCustomer = req.body;
    
    console.log('Received update request:', updatedCustomer);

    try {
        const result = await updateCustomerDB(updatedCustomer);
        console.log("Customer updated successfully");
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Customer doesn't exist." });
        }

        console.log("Customer updated successfully");
        res.status(200).json({ message: "Customer updated successfully" });
    } catch (err) {
        console.error('Error during update:', err);
        res.status(500).send({ error: 'Server error' });
    }
}

async function getCustomerAssets(req,res) {
  const customerId=req.params.customerId;
  console.log('Received getCustomerAssets customer id: ', customerId);
  console.log(req.params.customerId)
  const customer_assets = await getCustomerAssetsDB(req.params.customerId)
  .then((table) => {
    if (table[0].length === 0) {
      return res.status(401).send({ error: "user doesn't exists." });
    }
    console.log("i get the customer assets")
  //   console.log(table)
    const customer_assets = table[0]
  //   console.log(customer)
    res.statusCode = 200;
    return res.status(200).json({
      customer_assets
      
    });
  })
}
async function getCustomerContact(req,res){
  const customerId=req.params.customerId;
  console.log('Received getCustomerContact customer id: ', customerId);
  console.log(req.params.customerId)
  const customer_contact = await getCustomerContactDB(req.params.customerId)
  .then((table) => {
    if (table[0].length === 0) {
      return res.status(401).send({ error: "user doesn't exists." });
    }
    console.log("i get the customer contact")
  //   console.log(table)
    const customer_contact = table[0]
  //   console.log(customer)
    res.statusCode = 200;
    return res.status(200).json({
      customer_contact      
    });
  })
}
export {getCustomerDetails, updateCustomer,getCustomerAssets,getCustomerContact}