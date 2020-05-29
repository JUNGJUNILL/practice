const express = require('express'); 
const router = express.Router(); 


router.post('/',async (req,res ,next)=>{

    try{

            const hashtags = req.body.content.match(/#[^\s]+/g); 
            const newPost = await db.Post.create({
                content : req.body.content,
              
            }); 

            if(hashtags){
                const result = await Promise.all(hashtags.map(tag=> db.Hashtag.findOrCreate({
                    where:{name : tag.slice(1).toLowerCase()} , 
                }))); 
                console.log(result); 
                await newPost.addHashtags(result.map(r=>r[0])); 
            }

            /*
            post의 사용자 정보까지 같이 가져오기 위해서... 
            01
            const User = await newPost.getUser(); 
            newPost.User = User; 
            res.json(newPost); 
            */

            //02
           const fullPost =  await db.Post.fineOne({
                            where:{id : newPost.id},
                            include    :[{
                                model : db.User,
                            }],
            });
            res.json(fullPost); 
     

    }catch(e){
        console.error(e);
        console.log('에러발생함 무슨 에러냐?',e);  
        next(e); 
    }
}); 



router.post('/images',(req,res)=>{

}); 



module.exports = router; 