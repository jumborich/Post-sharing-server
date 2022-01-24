
class ErrorStack extends Error {
  constructor(message, code){
    super(message);

    this.statusCode = code || 500;
  };
}

const errorHandler = (err, req, res, next) =>{

  if(err.statusCode === 500) err.message = "Server error";

  res
  .status(err.statusCode)
  .send({message:err.message, status:err.statusCode});
};

module.exports = {
  ErrorStack, errorHandler
}