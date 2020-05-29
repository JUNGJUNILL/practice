const express = require('express'); 
const router = express.Router(); 
const db = require('../models'); 
const bcrypt = require('bcrypt'); 

const passport = require('passport'); 


router.get('/', (req,res)=>{
        console.log('req.user==>',req.user); 
        if(!req.user){
                return res.status(401).send('로그인이 필요합니다.'); 
        }
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

                console.log(newUser); 
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
router.post('/logout',(req,res)=>{
        req.logout(); 
        req.session.destroy();
        res.send('logout 성공'); 
}); 

router.get('/api/user/:id',(req,res)=>{
//:id 
//req.param.id 로 가져올 수 있다.


}); 






// router.get('/api/user/:id/follow',(req,res)=>{

// }); 

// router.post('/api/user/:id/follow',(req,res)=>{

// }); 

// router.delete('/api/user/:id/follow',(req,res)=>{

// }); 

// router.delete('/api/user/:id/follower',(req,res)=>{

// }); 

// router.get('/api/user/:id/posts',(req,res)=>{

// }); 




module.exports = router; 