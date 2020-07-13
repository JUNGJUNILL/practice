const express = require('express'); 
const router = express.Router(); 
const db = require('../models'); 
const bcrypt = require('bcrypt'); 
const {isLoggedIn}= require('./middleware')

const passport = require('passport'); 


router.get('/', isLoggedIn,(req,res)=>{

        const user = Object.assign({}, req.user.toJSON()); 
        delete user.password;
        return res.json(user); 
}); 

//회원가입
router.post('/signUp',async (req,res,next)=>{

        try{
                const exUser = await db.User.findOne({
                        where : {
                                userId: req.body.userId, 

                        },
                }); 

                if(exUser){
                        
                        
                        const alertJson = {error:'이미 사용중인 아이디 입니다.'};
                        
                        return res.status(403).json(alertJson)
                       // return res.json(alertJson); 
                        
                }
                
                const hashedPassword = await bcrypt.hash(req.body.password,12); 
                const newUser = await db.User.create({
                        nickname : req.body.nickName, 
                        userId   : req.body.userId, 
                        password : hashedPassword, 
                }); 

                return res.status(200).json(newUser); 

        }catch(e){
                console.error(e); 

                return next(e); //알아서 프론트에 에러가 났다고 넘김  
        }


        

}); 


//로그인
router.post('/login',(req,res,next)=>{

        passport.authenticate('local',(err,user,info)=>{
                //console.log('router/user/login==>',user); 
                if(err){
                        console.error(err); 
                        return next(err); 
                }

                if(info){
                        return res.status(401).send(info.reason); 
                }

                return req.login(user, async (loginErr)=>{
                //         if(loginErr){
                //                 console.error(loginErr); 
                //                 return next(loginErr); 
                //         }
                //         const filteredUser = Object.assign({},user.toJSON());
                //                                              //순수한 json 데이터로 만들겠다.  
                //         delete filteredUser.password; 
                //         console.log('user===>' , user.id); 
                //        console.log('filteredUser==>' , filteredUser); 
                //        return res.json(filteredUser); 
                try{
                        if(loginErr){
                                console.error(loginErr); 
                                return next(loginErr); 
                        }
                        const fullUser = await db.User.findOne({
                                where:{id:user.id},
                                include:[{
                                        model:db.Post,
                                        as: 'Posts',
                                        attributes:['id'],
                                },{
                                        model:db.User,
                                        as: 'Followings',
                                        attributes:['id'],
                                },{
                                        model:db.User,
                                        as:'Followers', 
                                        attributes:['id'],
                                }],
                                attributes:['id','nickname','userId'], 
                        }); 
                        return res.json(fullUser); 
                        
                }catch(e){
                        console.error(e);
                        next(e); 
                }
                });
        })(req,res,next); 

}); 

//로그아웃
router.post('/logout',isLoggedIn,(req,res)=>{
        req.logout(); 
        req.session.destroy();
        res.send('logout 성공'); 
}); 

// router.get('/api/user/:id',(req,res)=>{
// //:id 
// //req.param.id 로 가져올 수 있다.


// }); 


//작성자의 게시글 
router.get('/:id/posts',async (req,res,next)=>{


        try{
                const posts  = await db.Post.findAll({
                        where: {
                                UserId : parseInt(req.params.id,10) || (req.user && req.user.id) || 0, 
                                RetweetId : null,
                        },
                        include: [{
                                model: db.User,
                                attributes: ['id', 'nickname'],                        
                        },{
                                model:db.Image,
                         },{
                                model:db.User,
                                through : 'Like',
                                as : 'Likers',
                                attributes:['id'],
                            }], 
                }); 
                res.json(posts); 
        }catch(e){
                console.error(e)
                next(e); 
        }


}); 


//남의 정보 가져옴 
router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것 ex) /api/user/123
        try {
          const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
            include: [{
              model: db.Post,
              as: 'Posts',
              attributes: ['id'],
            }, {
              model: db.User,
              as: 'Followings',
              attributes: ['id'],
            }, {
              model: db.User,
              as: 'Followers',
              attributes: ['id'],
            },{
                model:db.Image,
              }],
            attributes: ['id', 'nickname'],
          });
          const jsonUser = user.toJSON();
          jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
          jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
          jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
          res.json(jsonUser);
        } catch (e) {
          console.error(e);
          next(e);
        }
      });
      





//팔로우
router.post('/:id/follow',isLoggedIn, async (req,res,next)=>{

        try{
                const me = await db.User.findOne({
                        where : {id : req.user.id}, 
                }); 

                await me.addFollowing(req.params.id); 
                res.send(req.params.id); 

        }catch(e){
                console.error(e); 
                next(e); 
        }

}); 


//언팔로우
router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
        try {
          const me = await db.User.findOne({
            where: { id: req.user.id },
          });

          
          await me.removeFollowing(req.params.id);
          res.send(req.params.id);


        } catch (e) {
          console.error(e);
          next(e);
        }
      });


//팔로잉 리스트 
router.get('/:id/followings',isLoggedIn, async (req,res)=>{

        try {
                const user = await db.User.findOne({
                  where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },

                });
                const followers = await user.getFollowings({
                  attributes: ['id', 'nickname'],
                  limit : parseInt(req.query.limit,10),
                  offset: parseInt(req.query.offset,10),
               
                
                });
                res.json(followers);
              } catch (e) {
                console.error(e);
                next(e);
              }

}); 



//팔로우 리스트 
router.get('/:id/followers',isLoggedIn,async (req,res)=>{


        
        try {
                const user = await db.User.findOne({
                        where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
 
                }); // req.params.id가 문자열 '0'
                const followers = await user.getFollowers({
                        attributes: ['id', 'nickname'],
                       // limit : parseInt(req.query.limit,10),
                       // offset: parseInt(req.query.offset,10),
                     
                      
        
                });
                res.json(followers);
                } catch (e) {
                console.error(e);
                next(e);
                }
         

        
}); 


//팔로워 삭제
 router.delete('/:id/follower',isLoggedIn,async (req,res)=>{

        try{

                const me = await db.User.findOne({
                        where : { id : req.user.id}, 
                }); 

                await me.removeFollower(req.params.id); 
                res.send(req.params.id); 

                
        }catch(e){
                console.error(e); 
                next(e); 
        }


 }); 


 //닉네임 수정 
 router.patch('/nickname', isLoggedIn, async (req,res,next)=>{


        try{
                await db.User.update({
                        nickname : req.body.nickname, 
                },{
                        where:{id:req.user.id}, 
                });

                res.send(req.body.nickname);



        }catch(e){
                console.error(e); 
                next(e); 
        };

        

 }); 






module.exports = router; 