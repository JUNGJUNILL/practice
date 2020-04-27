module.exports = (sequelize , DataTypes)=>{

    const Comment = sequelize.define('Comment',{
  
        content : {
        type:DataTypes.TEXT, 
        allowNull : false, 
    },

    },{
        charset : 'utf-8', 
        collate : 'utf8_general_ci', //한글이 저장되게... 
    }); 

    Comment.associate = (db)=>{
        db.Comment.belongsTo(db.User); 
        db.Comment.belongsTo(db.Post); 
    };

    return Comment; 

};
