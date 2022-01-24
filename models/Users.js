
module.exports = (sequelize, DataTypes) =>{

  const Users =  sequelize.define("Users",{
    username:{
      type:DataTypes.STRING,
      allowNull:false
    },
    
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },{sequelize, freezeTableName:true});

  Users.associate = (models) =>{
    Users.hasMany(models.Posts,{
      onDelete:"CASCADE"
    })
  };

  return Users;
};