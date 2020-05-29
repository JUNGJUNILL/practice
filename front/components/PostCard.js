
import React,{useState,useCallback,useEffect}  from 'react'
import {Card , Button, Avatar,Form, Input, List, Comment}from 'antd'
import {RetweetOutlined ,
        HeartOutlined ,
        MessageOutlined,
        EllipsisOutlined 
} from '@ant-design/icons';
import PropTypes from 'prop-types'

import {useDispatch ,useSelector} from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({post}) =>{
    
    const [commentFormOpend,setCommentFormOpend] = useState(false); 
    const [commentText, setCommentText] = useState(''); 
    const { me } = useSelector(state=> state.user); 
    const {commentAdded, isAddingComment}  = useSelector(state=>state.post); 
    const dispatch = useDispatch(); 

    const onToggleComment = useCallback(() =>{
        setCommentFormOpend(preve => !preve); 
    },[]);

    const onSubmitComment =useCallback((e)=>{
        
        if(!me){
            return alert('로그인이 필요합니다.'); 
        }
        
        return dispatch({type:ADD_COMMENT_REQUEST,
                         data:{
                            postId:post.id,
                         }
        })

    },[me && me.id]); 

        //댓글을 쓰고 새로 load해야 할 터이니...
        useEffect(()=>{
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
                avatar={<Avatar>{"정준일"}</Avatar>}
                title={post.User.nickname}
                description={post.content}
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
                 header={`${post.Comments? post.Comments.length : 0 } 댓글${post.id}`}
                 itemLayout="horizontal"
                 dataSource={post.Comments || []}
                 renderItem={item=>(
                     <li>
                      <Comment 
                        author={item.User.nickname}
                        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
            createdAt:PropTypes.object
    })
}

export default PostCard; 