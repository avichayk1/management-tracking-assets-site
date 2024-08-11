import express from 'express';
import { getUserByPassword } from '../control/User.js';
import {getCustomerDetails,updateCustomer,getCustomerAssets,getCustomerContact} from '../control/Customer.js'
import { checkReqLogInData } from '../middleware/middleware.js';
import{getEmployeeDetails} from '../control/Employee.js';

const router = express.Router();

router.use(express.json());
console.log()
router.post('/logIn', checkReqLogInData, getUserByPassword);
router.get(`/customer-details/:id`, getCustomerDetails); // New route for user details
router.get(`/customer-assets/:customerId`,getCustomerAssets)
router.get('/customer-contact/:customerId',getCustomerContact)
router.get(`/employee-details/:id`,getEmployeeDetails);
// Route to handle customer updates
router.put('/updateCustomer/:id',updateCustomer)
// router.get(`/customer-details/:id`, (req,res)=>{console.log(req.params)}); // New route for user details

export default router;
