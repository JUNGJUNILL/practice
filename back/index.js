const express = require('express'); 
const db = require('./models');
const cors = require('cors'); 
const morgan = require('morgan'); 
const app= express(); 
db.sequelize.sync(); 


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
app.use('/api/user',userAPIRouter); 
app.use('/api/post',postAPIRouter); 
app.use('/api/posts',postsAPIRouter); 

app.listen(3065,()=>{

    console.log('server ing Running in 3065 port'); 
})