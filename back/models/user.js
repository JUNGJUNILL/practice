module.exports = (sequelize , DataTypes) =>{

    const User = sequelize.define('User',{
        nickname : {
            type: DataTypes.STRING(20), 
            allowNull: false,  //not null 
        },

        userId : {
            type:DataTypes.STRING(20), 
            allowNull:false,
            unique:true, 
        },

        password : {
            type:DataTypes.STRING(100), 
            allowNull:false, 
        },
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글이 저장되게...  
    }); 

    User.associate = (db) =>{
        //hasMany :  1:M
        db.User.hasMany(db.Post , {as :'Posts'}); 
        db.User.hasMany(db.Comment); 
        db.User.belongsToMany(db.Post, {through : 'Like'   , as : 'Liked'});
        db.User.belongsToMany(db.User, {through :'Follow'  , as : 'Followers'}); 
        db.User.belongsToMany(db.User, {through :'Follow'  , as : 'Followings'}); 
      
    };

    return User;

};