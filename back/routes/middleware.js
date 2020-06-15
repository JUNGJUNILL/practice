
exports.isLoggedIn = (req,res,next)=>{

        if(req.isAuthenticated()){
            next(); 
            //next()를 하면 다음 미들웨어로 간다. 
        }else{
            res.status(401).send('로그인이 필요합니다.'); 
        }


};



exports.isNotLoggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){
        next(); 
        //next()를 하면 다음 미들웨어로 간다. 
    }else{
        res.status(401).send('로그인 한 사용자는 접근할 수 없습니다.'); 
    }


};