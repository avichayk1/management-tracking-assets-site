import {
    getUser
  } from '../models/userDB.js';
  
  
  async function getUserByPassword(req, res) {
    console.log('in function getUserByEmailAndPassword');
    const userForDb = req.body;
    const user = await getUser(userForDb)
      .then((table) => {
        if (table[0].length === 0) {
          return res.status(401).send({ error: "user doesn't exists." });
        }
        console.log("i get the user")
        console.log(table)
        const user = table[0][0]
        console.log(user)
        res.statusCode = 200;
        return res.status(200).json({
          user
          
        });
      })
      .catch((err) => console.log(err));
  }


  



  export {
    getUserByPassword,
  };