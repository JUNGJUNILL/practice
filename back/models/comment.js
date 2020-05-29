module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      content: {
        type: DataTypes.TEXT, // 긴 글
        allowNull: false,
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //한글이 저장되게...
    });
    Comment.associate = (db) => {
      db.Comment.belongsTo(db.User);
      db.Comment.belongsTo(db.Post);
    };
    return Comment;
  };