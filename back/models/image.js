module.exports = (sequelize , DataTypes)=>{


const Image = sequelize.define('Image', {
    src : {
        type:DataTypes.STRING(200), 
        allowNull : false, 
    },
},{
    charset : 'utf-8', 
    collate : 'utf8_general_ci', //한글이 저장되게...  
}); 

    Image.associate=(db)=>{
        db.Image.belongsTo(db.Post); 
    }; 

    return Image;

}