const passport = require('passport'); 
const db       = require('../models'); 
const local    = require('./local'); 
module.exports = () =>{

    passport.serializeUser((user,done)=>{  // 서버에 [{ id : 3 , cookie :'asdfsadfsadf'] 에 저장됨
       
        return done(null,user.id); 

    }); 

    //매 요청하다 실행된다.(db 요청 1번씩 실행됨)
    //실무에서는 deserializeUser 결과물 캐싱함. 
    passport.deserializeUser( async (id,done)=>{

        try{
            const user =await db.User.fineOne({
                where :{id},
            }); 
         
            return done(null,user); 
        }catch(error){
            console.error(error); 
            return done(error); 
        }

    }); 

    local(); 

};

//프론트에서는 쿠키만 보낸다. 
//서버가 cookieParser , expressSession으로 검증하여 id 값 찾음 
//id값이 deserializeUser에 들어감. 
//req.user에 user 정보 저장 됨 