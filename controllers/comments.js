const { Comments } = require("./../models");

exports.createComment = async(req, res, next) =>{
  try{
    const { comment, username, postId } = req.body;
    await Comments.create({ comment, username, postId });

    res.status(201).json({status: 'success', message: 'Comment created successfully!'})
  } 
  catch (error) {
    next(error);
  }
};

exports.getComments = async(req, res, next) => {
  try{
    if(!req.params.postId) return next("Invalid postId.")
    const comments = await Comments.findAll({
      where:{
        postId:parseInt(req.params.postId)
      },
      order:[
        ["createdAt", "DESC"]
      ]
    });

    res.status(200).json({
      status:"success",
      comments
    })
  } 
  catch (error){
    next(error);
  }
}