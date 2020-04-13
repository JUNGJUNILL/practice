import React from 'react'
import {Form, Button,Input}from 'antd'



const dummy = {
    isLoggedIn : true,  
    mainPosts : [
                   {User : {
                       id:1,
                       nickname:'정준일',
                      
                   }, 
                   img:'http://zzalbang.kr/wp-content/uploads/2019/06/944afa44ly1g3bon5dh4kj20u0140gvl-851x1024.jpg',
                   content:'요즘 핫한 배우', 

                }
               
                ,
                {User : {
                    id:2,
                    nickname:'정준이',
                    
                }, 
                img:'https://i.pinimg.com/236x/94/c7/82/94c7822c6c5c33cd442c3b8d4fe524c6.jpg',
                content:'김근식 군 추천배우', 

             }
             ,
                {User : {
                    id:3,
                    nickname:'정준삼',
                    
                }, 
                img:'http://simg.donga.com/ugc/MLBPARK/Board/15/18/54/29/1518542968657.jpg',
                content:'아스카짱!', 

             }


    ],
    imagePaths : [],
}

const PostForm = () =>{

    return(
                <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data">               
                        <Input.TextArea maxLength={140} placeholder="어떤일이 있었나요?"/>
                        <div>
                            <input type="file" multiple hidden />
                            <Button>이미지 업로드</Button>
                            <Button type="primary" style={{float:'right'}} htmlType="submit">짹짹</Button>
                        </div>
                        <div>
                        {dummy.imagePaths.map((v,i)=>{
                            return (

                                <div key={i} style={{display:'inline-block'}}>
                                <img src={v} style={{width:'200px' }} alt={v} />
                                <div>
                                    <Button>제거</Button>
                                </div>
                                </div>
                            )
                        })}
                        </div>
                </Form>
            )
}
export default PostForm; 