const express = require('express'); 
const db      =require('../models'); 
const router = express.Router(); 
const {isLoggedIn}= require('./middleware');
const multer =require('multer'); 
const path   =require('path');



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



router.post('/',isLoggedIn, upload.none(), async (req,res ,next)=>{

    try{

            const hashtags = req.body.content.match(/#[^\s]+/g); 
            const newPost = await db.Post.create({
                content : req.body.content,
                UserId  :  req.user.id,
            }); 

            if(hashtags){
                const result = await Promise.all(hashtags.map(tag=> db.Hashtag.findOrCreate({
                    where:{name : tag.slice(1).toLowerCase()} , 
                }))); 
                await newPost.addHashtags(result.map(r=>r[0])); 
            }

            if(req.body.image){
              if(Array.isArray(req.body.image)){
                  const images = await Promise.all(req.body.image.map((image)=>{
                    return db.Image.create({src:image}); 
                  })); 
                  await db.Image.addImages(images); 
                }else{

                  const image = await db.Image.create({src:req.body.image}); 
                  await newPost.addImages(image); 

              }
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
                            },{
                              model:db.Image,
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

  //이미지 업로드
                               //none
                               //fields
                               //single
  router.post('/images',upload.array('image'),(req,res)=>{
      console.log('이미지 업로드 라우터!!!'); 
      console.log(req.files); 
      return res.json(req.files.map(v=>v.filename)); 

  }); 

  //게시글 좋아요
  router.post('/:id/like', isLoggedIn, async (req, res, next)=>{

    try{
        const post = await db.Post.findOne({where:{id: req.params.id}}); 

        if(!post){
          return res.status(404).send('포스트가 존재하지 않습니다.'); 
        }

        await post.addLiker(req.user.id); 
        res.json({userId:req.user.id});

    }catch(e){

      console.log(e); 
      next(e); 

    }

  });

  //게시글 좋아요 취소
  router.delete('/:id/like', isLoggedIn, async (req, res, next)=>{


    
    try{
      const post = await db.Post.findOne({where:{id: req.params.id}}); 

      if(!post){
        return res.status(404).send('포스트가 존재하지 않습니다.'); 
      }

      await post.removeLiker(req.user.id); 
      res.json({userId:req.user.id});

  }catch(e){

    console.log(e); 
    next(e); 

  }

  });



  //리트윗 라우터 
  router.post('/:id/retweet',isLoggedIn , async (req,res,next)=>{


    try{
      const post = await db.Post.findOne({
        
        where:{id: req.params.id},
            include:[{
              model:db.Post,
              as :  'Retweet',
            }],

          }); 

      if(!post){
        return res.status(404).send('포스트가 존재하지 않습니다.'); 
      }

      if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
        return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
      }

      const retweetTargetId = post.RetweetId || post.id;

      const exPost = await db.Post.findOne({
        where:{
          UserId: req.user.id,
          RetweetId : retweetTargetId,
        },
      });

      if(exPost){
        return res.status(403).send('이미 리트윗 한 게시물은 리트윗 할 수 없다.'); 
      }

      const retweet = await db.Post.create({
        UserId : req.user.id,
        RetweetId : retweetTargetId,
        content : 'retweet',

      }); 

      const retweetWithPrevPost = await db.Post.findOne({
        where:{ id : retweet.id},
        include:[{
          model:db.User,
          attributes:['id','nickname'],
        },{
          model:db.Post,
          as : 'Retweet',
          include:[{
            model: db.User,
            attributes:['id','nickname'],
          },{
            model:db.Image,
          }],
        }],
      });
          res.json(retweetWithPrevPost);
    }catch(e){

      console.error(e); 
      next(e); 

    }

  })



module.exports = router; 