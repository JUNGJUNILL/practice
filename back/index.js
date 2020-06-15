const express = require('express'); 
const db = require('./models');
const cors = require('cors'); 
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser'); 
const expressSession = require('express-session'); 
const dotenv = require('dotenv');
const passport = require('passport'); 
const passportConfig = require('./passport');
const app= express(); 
dotenv.config(); 
db.sequelize.sync(); //dbConnection 
passportConfig();    


const userAPIRouter = require('./routes/user'); 
const postAPIRouter = require('./routes/post'); 
const postsAPIRouter = require('./routes/posts'); 
const hashtagAPIRouter = require('./routes/hashtag'); 


app.get('/',(req,res)=>{
    res.send('hello server'); 
})

app.use(morgan('dev')); 
app.use('/',express.static('uploads')); 
app.use(cors({
    origin: true, 
    credentials:true,
    //--프론트와 백엔드간에 쿠키 주고 받기 위함
}));
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); //form 데이터 처리 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave : false,             //매번 세션 강제 저장
    saveUninitialized : false,  //빈 값도 저장
    secret: process.env.COOKIE_SECRET, 
    cookie :{
        httpOnly : true, 
        secure: false, //https 시 true
      //  maxAge : 1000*60*60,
    },
    name:'rnbck',

}));
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use('/api/user',userAPIRouter); 
app.use('/api/post',postAPIRouter); 
app.use('/api/posts',postsAPIRouter); 
app.use('/api/hashtag',hashtagAPIRouter); 

app.listen(3065,()=>{

    console.log('server ing Running in 3065 port'); 
})