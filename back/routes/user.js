const express = require('express'); 
const router = express.Router(); 
const db = require('../models'); 
const bcrypt = require('bcrypt'); 



router.get('/', (req,res)=>{
        res.send('usersss'); 
}); 

//회원가입
router.post('/',async (req,res,next)=>{

        try{
                const exUser = await db.User.findOne({
                        where : {
                                userId: req.body.userId, 

                        },
                }); 

                if(exUser){
                        return res.status(403).send('이미 사용중인 아이디입니다.'); 
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

router.get('/api/user/:id',(req,res)=>{
//:id 
//req.param.id 로 가져올 수 있다.


}); 


router.post('/api/user/:id/logout',(req,res)=>{

}); 

router.post('/api/user/:id/login',(req,res)=>{

}); 

router.get('/api/user/:id/follow',(req,res)=>{

}); 

router.post('/api/user/:id/follow',(req,res)=>{

}); 

router.delete('/api/user/:id/follow',(req,res)=>{

}); 

router.delete('/api/user/:id/follower',(req,res)=>{

}); 

router.get('/api/user/:id/posts',(req,res)=>{

}); 




module.exports = router; 
