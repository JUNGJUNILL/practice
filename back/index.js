const express = require('express'); 
const db = require('./models');
const app= express(); 
db.sequelize.sync(); 



app.get('/',(req,res)=>{
    res.send('hello server'); 
})



app.listen(3065,()=>{

    console.log('server ing Running in 3065 port'); 
})