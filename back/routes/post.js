const express = require('express'); 
const db      =require('../models'); 
const router = express.Router(); 
const {isLoggedIn}= require('./middleware');
const multer =require('multer'); 
const path   =require('path');


router.post('/',isLoggedIn, async (req,res ,next)=>{

    try{

            const hashtags = req.body.content.match(/#[^\s]+/g); 
            const newPost = await db.Post.create({
                content : req.body.content,
                UserId  :  req.body.UserId,
            }); 

            if(hashtags){
                const result = await Promise.all(hashtags.map(tag=> db.Hashtag.findOrCreate({
                    where:{name : tag.slice(1).toLowerCase()} , 
                }))); 
                console.log(result); 
                await newPost.addHashtags(result.map(r=>r[0])); 
            }

            /*
            post의 사용자 정보까지 같이 가져오기 위해서... 
            01
            const User = await newPost.getUser(); 
            newPost.User = User; 
            res.json(newPost); 
            */

            //02
           const fullPost =  await db.Post.findOne({
                            where:{id : newPost.id},
                            include    :[{
                                model : db.User,
                            }],
            });
            res.json(fullPost); 
     

    }catch(e){
        console.error(e);
        console.log('에러발생함 무슨 에러냐?',e);  
        next(e); 
    }
}); 




//게시글 댓글가져오기 
router.get('/:id/comments' ,async (req,res,next)=>{

    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
          return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
          where: {
            PostId: req.params.id,
          },
          order: [['createdAt', 'ASC']],
          include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
          }],
        });
        res.json(comments);
      } catch (e) {
        console.error(e);
        next(e);
      }
}); 


//게시글 댓글 입력
router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // POST /api/post/1000000/comment
    try {
      const post = await db.Post.findOne({ where: { id: req.params.id } });
      if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
      }
      const newComment = await db.Comment.create({
        PostId: post.id,
        UserId: req.user.id,
        content: req.body.content,
      });
      await post.addComment(newComment.id);
      const comment = await db.Comment.findOne({
        where: {
          id: newComment.id,
        },
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }],
      });
      return res.json(comment);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  });


  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext); // 제로초.png, ext===.png, basename===제로초
        done(null, basename + new Date().valueOf() + ext);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
  });
  
  

  //이미지 업로드
                               //none
                               //fields
                               //single
  router.post('/images',upload.array('image'),(req,res)=>{
      console.log('이미지 업로드 라우터!!!'); 
      console.log(req.files); 
      return res.json(req.files.map(v=>v.filename)); 

  }); 


module.exports = router; 