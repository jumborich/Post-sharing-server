const __schema = (sequelize, DataTypes) =>{

  const attributes ={
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
  
    postText:{
      type:DataTypes.TEXT,
      allowNull:false
    },

    username:{
      type:DataTypes.STRING,
      allowNull:false
    }
  };

 return sequelize.define('Posts', attributes, {sequelize});
}

module.exports = __schema;
