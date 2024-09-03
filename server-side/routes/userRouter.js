import express from 'express';
import { getUserByPassword } from '../control/User.js';
import {getCustomerDetails,updateCustomer,getCustomerAssets,getCustomerContact,getCustomerOpinions,getCustomerOpinionsByid,updateCustomerOpinion} from '../control/Customer.js'
import { checkReqLogInData } from '../middleware/middleware.js';
import{getEmployeeDetails,updateEmployee,registerCustomer,EmployeeInventoryUpdate,getEmployeeTaskDetails,order} from '../control/Employee.js';
import {getManagerDetails,addTask,addSurvey,getItems,updateItemAmount} from '../control/Manager.js'
const router = express.Router();

router.use(express.json());
console.log()
router.post('/logIn', checkReqLogInData, getUserByPassword);
router.get(`/customer-details/:id`, getCustomerDetails); // New route for user details
router.get(`/customer-assets/:customerId`,getCustomerAssets)
router.get('/customer-contact/:customerId',getCustomerContact)
router.get(`/employee-details/:id`,getEmployeeDetails);
router.get(`/manager-details/:id`,getManagerDetails);
router.get(`/employee-task-details/:id`, getEmployeeTaskDetails )
router.get(`/customer-opinions/:customerId`,getCustomerOpinions)
router.get(`/customer-opinions-by-opinion_id/:opinion_id`,getCustomerOpinionsByid)
router.get('/items/',getItems)
// Route to handle customer updates
router.put('/updateCustomer/:id',updateCustomer)
router.put('/updateEmployee/:id',updateEmployee)
router.put('/registerCustomer/:id',registerCustomer)
router.put('/EmployeeInventoryUpdate/:id',EmployeeInventoryUpdate)
router.put(`/addTask/:id`, addTask)
router.put(`/addSurvey/:customer_id`,addSurvey)
router.put(`/updateOpinion/:opinion_id`,updateCustomerOpinion)
router.put('/order-items/',updateItemAmount)
router.put('/order/',order)

// router.get(`/customer-details/:id`, (req,res)=>{console.log(req.params)}); // New route for user details

export default router;
