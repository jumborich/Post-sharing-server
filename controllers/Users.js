const { Users } = require("./../models");
const { ErrorStack } = require("./error");

// Get user
exports.getUser = async(req, res, next) =>{
  try{
    if(!req.params.userId) return next("User Id is required");
    const user = await Users.findByPk(req.params.userId);
    res.status(200).json(user);
  } 
  catch(error){
    next(new ErrorStack(error));
  }
};

// Get Users
exports.getUsers = async(req, res, next) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};