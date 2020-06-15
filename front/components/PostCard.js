
import React,{useState,useCallback,useEffect}  from 'react'
import {Card , Button, Avatar,Form, Input, List, Comment}from 'antd'
import {RetweetOutlined ,
        HeartOutlined ,
        MessageOutlined,
        EllipsisOutlined 
} from '@ant-design/icons';
import PropTypes from 'prop-types'
import Link from 'next/link'

import {useDispatch ,useSelector} from 'react-redux'
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST } from '../reducers/post';

const PostCard = ({post}) =>{
    
    const [commentFormOpend,setCommentFormOpend] = useState(false); 
    const [commentText, setCommentText] = useState(''); 
    const { me } = useSelector(state=> state.user); 
    const {commentAdded, isAddingComment}  = useSelector(state=>state.post); 
    const dispatch = useDispatch(); 

    const onToggleComment = useCallback(() =>{
        setCommentFormOpend(preve => !preve); 
        if(!commentFormOpend){
            dispatch({
                type:LOAD_COMMENTS_REQUEST,
                data:post.id,
            });
        }
    },[]);

    const onSubmitComment =useCallback((e)=>{
        
        if(!me){
            return alert('로그인이 필요합니다.'); 
        }
        
        return dispatch({type:ADD_COMMENT_REQUEST,
                         data:{
                            postId:post.id,
                            content:commentText,
                         }
        })

    },[me && me.id,commentText]); 
    
        //댓글을 쓰고 새로 load해야 할 터이니...
        useEffect(()=>{
            console.log('post===>' , post); 
            setCommentText('');
        },[commentAdded ===true]); 

    const onChangeCommentText = useCallback((e)=>{
        setCommentText(e.target.value); 
    },[]); 



    return (
        <div>
        <Card
            //key={post.}
            cover={post.img && <img alt="example" src={post.img} style={{width:'100px'}}/>}
            actions={[
                <RetweetOutlined />,
                <HeartOutlined />,
                <MessageOutlined  onClick={onToggleComment} />,
                <EllipsisOutlined />,
            ]}
            extra={<Button>팔로우</Button>}
             >
            <Card.Meta 
                avatar={<Link href={{pathname:'/user', query:{id : post.User.id} }} as={`user/${post.User.id}`}/*href={`/user/${post.User.id}`}*/><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                title={post.User.nickname}
                description={(<div>{post.content.split(/(#[^\s]+)/g).map((v)=>{
                    if(v.match(/#[^\s]+/)){
                        return(
                            <Link href={{pathname:'/hashtag', query:{tag : v.replace(/#/g,"")}}} as={`hashtag/${v.replace(/#/g,"")}`}/*href={`/hashtag/${v.replace(/#/g,"")}`}*/ key={v}><a>{v}</a></Link>
                        );
                    }
                  
                        return v; 
                  
                })}</div>
                )}
                //next 사용시 <a> 태그 말고 Link 를 사용해야 한다.
            />
        </Card>
        {commentFormOpend && (
            <>
            <Form onFinish={onSubmitComment}>
                <Form.Item>
                    <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
            </Form>
            <List 
                 header={`댓글 ${post.Comments? post.Comments.length : 0 }`}
                 itemLayout="horizontal"
                 dataSource={post.Comments || []}
                 renderItem={item=>(
                     <li>
                      <Comment 
                        author={item.User.nickname}
                        avatar={<Link href={{pathname:'/user', query:{id : item.User.id} }} as={`user/${item.User.id}` }><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                        content={item.content}
                      />
                      </li>
                 )}
            />
            </>

        )}
        </div>
    )
     
}

PostCard.propTypes = {
                    //shape을 써서 객체의 각 props의 상세 타입을 지정할 수 있다.
    post : PropTypes.shape({
            User: PropTypes.object,
            content : PropTypes.string,
            img:PropTypes.string,
           // createdAt:PropTypes.object
    })
}

export default PostCard; 