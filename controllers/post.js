const { Posts } = require("./../models");


// Get Single Post
exports.getPost = async(req, res, next) =>{
  try{
    const post = await Posts.findByPk(parseInt(req.params.id));
    res.status(200).json(post);
  }
  catch(error){
    console.log("getPost_ERR: ",error);
    next(error);
  }
};


// Get All Posts
exports.getAllPosts = async(req, res, next) =>{
  try{
    const posts = await Posts.findAll({
      order:[
        ["createdAt", "DESC"]
      ]
    });

    res.json({posts: posts});
  } 
  catch(error){
    next(error);
  }
};

// Create Post 
exports.createPost = async(req, res, next) =>{
  try{
    const post = {
      title:req.body?.title,
      postText:req.body?.postText,
      username:req.body?.username
      // posterId:req.body?.posterId
    };
    
    await Posts.create(post);
    res.status(200).json({
      status:"OK",
      message:"Post created successfully."
    });
  } 
  catch(error){
    console.log("createPost: ", error);
    next(error);
  }
}