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


app.get('/',(req,res)=>{
    res.send('hello server'); 
})

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); //form 데이터 처리 
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave : false,             //매번 세션 강제 저장
    saveUninitialized : false,  //빈 값도 저장
    secret: process.env.COOKIE_SECRET, 
    cookie :{
        httpOnly : true, 
        secure: false, //https 시 true
    }

}));
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use('/api/user',userAPIRouter); 
app.use('/api/post',postAPIRouter); 
app.use('/api/posts',postsAPIRouter); 

app.listen(3065,()=>{

    console.log('server ing Running in 3065 port'); 
})