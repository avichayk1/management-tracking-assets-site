import {
    getCustomer,updateCustomerDB,getCustomerAssetsDB,getCustomerContactDB,getCustomerOpinionsDB,getCustomerOpinionsByidDB,updateCustomerOpinionDB
  } from '../models/customerDB.js';
async function getCustomerDetails(req, res){
    console.log("update")
    console.log(req)
    console.log(req.params.id)
    // const customer_id=req.query.customer_id;
    // console.log("customer_id",customer_id)
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
async function getCustomerOpinionsByid(req, res){
  console.log(" i am in getCustomerOpinionsByid ")
  console.log("update")
  console.log(req)
  console.log(req.params.opinion_id)
  // const customer_id=req.query.customer_id;
  // console.log("customer_id",customer_id)
  const customer = await getCustomerOpinionsByidDB(req.params.opinion_id)
  .then((table) => {
    if (table[0].length === 0) {
      return res.status(401).send({ error: "user doesn't exists." });
    }
    console.log("i get the opinion")
  //   console.log(table)
    const opinion = table[0][0]
  //   console.log(customer)
    res.statusCode = 200;
    return res.status(200).json({
      opinion
      
    });
  })
  .catch((err) => console.log(err));
}
async function getCustomerOpinions(req, res){
  console.log("in getCustomerOpinions")
  console.log(req)
  console.log(req.params.customerId)
  const customer_id=req.params.customerId;

  // const customer_id=req.query.customer_id;
  console.log("customer_id",customer_id)
  const customerOpinions = await getCustomerOpinionsDB(customer_id)
  .then((table) => {
    if (table[0].length === 0) {
      return res.status(401).send({ error: "no customer opinions" });
    }
    console.log("i get the opinions")
  //   console.log(table)
    const customerOpinions = table[0]
  //   console.log(customer)
    res.statusCode = 200;
    return res.status(200).json({
      customerOpinions
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
async function updateCustomerOpinion(req, res) {
  const updatedOpinion = req.body;
  
  console.log('Received update request:', updatedOpinion);

  try {
      const result = await updateCustomerOpinionDB(updatedOpinion);
      console.log("Opinion updated successfully");
      if (result.affectedRows === 0) {
          return res.status(404).send({ error: "Opinion doesn't exist." });
      }

      console.log("Opinion updated successfully");
      res.status(200).json({ message: "Opinion updated successfully" });
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
export {getCustomerDetails, updateCustomer,getCustomerAssets,getCustomerContact,getCustomerOpinions,getCustomerOpinionsByid,updateCustomerOpinion}