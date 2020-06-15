//next에서는 아직(?) 동적으로 요청

const express = require('express'); 
const next = require('next'); 
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser'); 
const expressSession = require('express-session'); 
const dotenv = require('dotenv'); 

//express와 next를 연결하는 방법-----------------------------------
const dev = process.env.NODE_ENV !== 'production'; 
const app  = next({dev});
const handle = app.getRequestHandler(); //get요청 처리기 
//---------------------------------------------------------------
dotenv.config()

app.prepare().then(()=>{

    const server = express(); 

    server.use(morgan('dev'));
    server.use(express.json()); 
    server.use(express.urlencoded({extended:true}));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave : true,
        saveUninitialized : false, 
        secret : process.env.COOKIE_SECRET,
        cookie:{
            httpOnly : true,
            secure : false, 
        },
    }));


    server.get('/hashtag/:tag',(req,res)=>{

        return app.render(req,res,'/hashtag',{tag:req.params.tag}); 
    }); 


    server.get('/user/:id',(req,res)=>{

        return app.render(req,res,'/user',{id:req.params.id}); 
    });


    server.get('*',(req,res)=>{

        return handle(req,res); 

    }); 

    server.listen(3060,()=>{
        console.log('next + express ruuning on port 3060'); 
    })
}); 