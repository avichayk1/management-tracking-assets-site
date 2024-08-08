function checkReqLogInData(req, res, next) {
    console.log("in function checkReqUserData");
    console.log(req.body)
    const { user_name, password } = req.body;
    console.log(user_name, password, "fffff");
    if (!user_name || !password) {
      return res.status(400).json({ error: "not all the data were submitted" });
    }
    next();
  }
  // function checkUserName(req,res,next){
  //   // const { id } = req.quary; // Extract id from URL parameters
    
  //   // console.log(id)
  //   console.log("in function checkUserName");
  //   if(!user_name){
  //     return res.status(400).json({ error: "This user name is not exist" });
  //   }
  //   next();
  // }
  export {
    checkReqLogInData
  };
