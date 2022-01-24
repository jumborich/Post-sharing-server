const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { Users } = require("./../models");
const { ErrorStack } = require("./error");

// Generate authorization token 
signToken = (payload, callback) =>{
  const options = { expiresIn:process.env.JWT_EXPIRES_IN };
  return jwt.sign(
    payload,
    process.env.JWT_SECRET, 
    options, 
    callback
  )
};

// Check if user is authenticated
exports.protectRoutes = async(req, res, next) =>{
  // console.log("req.cookies: ",req.cookies)
  // Verify user's token
  // const id = req?.cookies?.web_token;
  const auth_token = req.body?.auth_token || req.query?.auth_token;
  // console.log("tokenObj: ",tokenObj)

  if(!auth_token) return next(new ErrorStack("Unauthorized user", 401));

  jwt.verify(auth_token, process.env.JWT_SECRET, async(err,token) =>{

    const user = await Users.findByPk(parseInt(token.id));
    if(!user) return next(new ErrorStack("User not found", 404));
    res.locals.user = user;
    next();
  });
}

// Create user
exports.createUser = async(req, res, next) =>{
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password
    };

    // Hash password 
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create user
    const user = await Users.create({...userData, password: hashedPassword});

    // Sign user with jwt
    signToken({ id:user.id, username:user.username},function(err,token){

      if(err) return next(new ErrorStack("Server error", 500));

      res.cookie("web_token", token);

      res.status(201).json({
        user,
        token, // should use cookies while in production
        status: 'success', 
        message: 'User created successfully!'
      });

    });
  } 
  catch (error) {
    console.log(error);
    next(new ErrorStack(error));
  }
};

// Login
exports.login = async(req, res, next) =>{
  try{
    const { username, password } = req.body;
    
    // Get user by username
    const user = await Users.findOne({ where:{username} });

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return next(new ErrorStack("User does not exist", 401));

    signToken({ id:user.id, username:user.username },function(err,token){
      if(err) return next(new ErrorStack("Server error", 500));

      res
      .cookie("web_token", token)
      .status(200)
      .json({
        status:"success",
        user,
        token, // should use cookies while in production
      })
    });

  }
  catch(error){
    console.log(error);
    next(new ErrorStack(error));
  }
};