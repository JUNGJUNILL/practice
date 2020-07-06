const express = require('express'); 
const db      =require('../models'); 
const router = express.Router(); 


router.get('/' , async (req,res)=>{ 

        try{
           const posts =  await db.Post.findAll({
                include:[{
                    model:db.User,
                    as:'User',
                    attributes:['id','nickname'], 
                },{
                    model:db.Image,
                  },{
                      model:db.User,
                      through : 'Like',
                      as : 'Likers',
                      attributes:['id'],
                  },{
                      model : db.Post,
                      as :'Retweet',
                      include:[{
                          model:db.User,
                          attributes: ['id','nickname'],
                      },{
                          model:db.Image,
                      }]

                  }],
                order :[['createdAt','DESC']],
                //2차원 배열인 이유는 ORDER DY stockinday, storeCode 이런식으로 해 줄 수 있기 때문이다.
              
           }); 

           res.json(posts); 



        }catch(e){
            console.error('무슨 에런데 ㅅㅂ==>' , e); 
            next(e); 

        }
}); 





module.exports = router; 