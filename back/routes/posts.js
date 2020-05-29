const express = require('express'); 
const db      =require('../models'); 
const router = express.Router(); 


router.get('/' , async (req,res)=>{ 

        try{
           const posts =  await db.Post.findAll({
               include:[{
                   model:db.User,
                   attributes:['id','nickname'],
               }]
           }); 

           console.log('posts 요청==>', posts); 
           res.json(posts); 



        }catch(e){
            console.error('무슨 에런데 ㅅㅂ==>' , e); 
            next(e); 

        }
}); 



module.exports = router; 