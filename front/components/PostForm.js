import React,{useEffect, useCallback, useState, useRef} from 'react'
import {Form, Button,Input}from 'antd'

import {useDispatch ,useSelector} from 'react-redux'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';



const PostForm = ({userInfo}) =>{

    const dispatch=useDispatch();
    const [text,setText] = useState(''); 
    const {imagePaths, isAddingPost, postAdded} = useSelector(state=>state.post);
    const imageInput = useRef();

    useEffect(()=>{
        setText(''); 
    },[postAdded === true])

    const onSubmitForm = useCallback((e)=>{
        //e.preventDefault();
        if(!text || !text.trim()){
            alert('게시글을 입력해 주세요'); 
            return; 
        }
        dispatch({
                type:ADD_POST_REQUEST,
                data: {
                  content : text,
                  UserId  : userInfo.id,
                    },
            });

    },[text]); 
    


    const onChangeText =useCallback( (e)=>{
        setText(e.target.value); 
    },[]); 

    const onChangeImages =useCallback((e)=>{

        console.log('읭??',e.target.files); 
        const imageFormData = new FormData(); //브라우저에서 제공 
                                              //express bodyParser로 전송 불가능
                                              //muter 미들웨어로 처리해야 한다.
        //와... 무슨 문법이냐??? 
        [].forEach.call(e.target.files,(f)=>{
            imageFormData.append('image',f); 
        });

        dispatch({
            type : UPLOAD_IMAGES_REQUEST,
            data : imageFormData,
        });
    
      
    },[]); 

    const onClickImageUpload = useCallback(() =>{

        imageInput.current.click(); 
    },[imageInput.current])


    //고차함수 패턴임.. 정확히는 잘 모르겠음 
    const onRemoveImage = useCallback((index)=>()=>{
            dispatch({
                type:REMOVE_IMAGE,
                index,
            }); 
    },[])

    return(
            
                <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmitForm}>               
                        
                        <Input.TextArea maxLength={140} placeholder="어떤일이 있었나요?" value={text} onChange={onChangeText} />
                        <div>
                            <input type="file" multiple ref={imageInput} onChange={onChangeImages} hidden />
                            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                            <Button type="primary" style={{float:'right'}} htmlType="submit" loading={isAddingPost}>짹짹</Button>
                        </div>
                        <div>
                        {imagePaths.map((v,i)=>{
                            return (

                                <div key={v} style={{display:'inline-block'}}>
                                 <img src={`http://captainryan.gonetis.com:3065/${v}`} style={{width:'200px' }} alt={v} />
                                <div>
                                    <Button onClick={onRemoveImage(i)}>제거</Button>
                                </div>
                                </div>
                            )
                        })}
                        </div>
                </Form>
            )
}
export default PostForm; 