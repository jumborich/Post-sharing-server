
module.exports = (sequelize, DataTypes) =>{

  return sequelize.define("Comments", {
    comment:{
      type:DataTypes.TEXT,
      allowNull:false
    },

    username:{
      type:DataTypes.STRING,
      allowNull:false
    },

    postId:{
      type:DataTypes.INTEGER,
      references:{
        model:"Posts",
        key:"id"
      }
    }
  }, { sequelize })
}