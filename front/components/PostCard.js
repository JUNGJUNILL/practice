
import React,{useState,useCallback,useEffect,memo}  from 'react'
import {Card , Button, Avatar,Form, Input, List, Comment , Popover}from 'antd'
import {
    RetweetOutlined, 
    HeartOutlined,
    MessageOutlined  ,
    EllipsisOutlined ,
} from '@ant-design/icons';

import PropTypes from 'prop-types'
import Link from 'next/link'
import PostImages from './PostImages'; 
import PostCardContent from './PostCardContent'; 


import {useDispatch ,useSelector} from 'react-redux'
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_REQUEST, RETWEET_REQUEST, REMOVE_POST_REQUEST } from '../reducers/post';
import {FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST} from '../reducers/user';

const PostCard = memo(({post}) =>{
    
    const [commentFormOpend,setCommentFormOpend] = useState(false); 
    const [commentText, setCommentText] = useState(''); 
    const { me } = useSelector(state=> state.user); 
    const {commentAdded, isAddingComment}  = useSelector(state=>state.post); 
    const dispatch = useDispatch(); 
    console.log('힝힝힝'); 
    const liked =me && post.Likers && post.Likers.find(v => v.id === me.id);
    
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
            setCommentText('');
        },[commentAdded ===true]); 

    const onChangeCommentText = useCallback((e)=>{
        setCommentText(e.target.value); 
    },[]); 


    const onToggleLike = useCallback(() => {
        if (!me) {
          return alert('로그인이 필요합니다!');
        }

        if (liked) { // 좋아요 누른 상태
          dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
          });

        } else { // 좋아요 안 누른 상태
          dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
          });
        }
      }, [me && me.id, post && post.id, liked]);


      const onRetweet = useCallback(()=>{

          if (!me) {
            return alert('로그인이 필요합니다!');
          }
  

        return  dispatch({
            type : RETWEET_REQUEST,
            data : post.id,
        });


      },[me && me.id , post && post.id]);


      const onUnfollow = useCallback(userId=>()=>{
            dispatch({
                type : UNFOLLOW_USER_REQUEST,
                data : userId,
            })
      },[])

      const onFollow  = useCallback(userId=>()=>{

        dispatch({
            type : FOLLOW_USER_REQUEST,
            data : userId,
        })

    },[])


    //게시글 삭제
    const onRemovePost = useCallback(postId=>()=>{

      console.log('postId===>' , postId); 
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:postId,
        });

    },[])



    return (
        <div>
        <Card
            //key={post.}
            cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={[
                <RetweetOutlined onClick={onRetweet} />,
                <HeartOutlined onClick={onToggleLike} />,
                <MessageOutlined  onClick={onToggleComment} />,
                <Popover
                key="more"
                content={(
                  <Button.Group>
                    {me && post.User.id === me.id
                      ? (
                        <>
                          <Button>수정</Button>
                          <Button type="danger"  onClick={onRemovePost(post.id)}>삭제</Button>
                        </>
                      )
                      : <Button>신고</Button>}
                  </Button.Group>
                )}
              >
                <EllipsisOutlined />
              </Popover>,
            ]}
            title={post.RetweetId && post.Retweet ? `${post.User.nickname} 님이 리트윗하셨습니다.` : ''}
            extra={!me || post.User.id === me.id
                ? null
                : me.Followings && me.Followings.find(v => v.id === post.User.id)
                  ? <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
                  : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
              }
             >

             {post.RetweetId && post.Retweet ?
               ( 
                <Card
                        cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                >
                    <Card.Meta 
                    
                    avatar={<Link href={{pathname:'/user', query:{id : post.User.id} }} as={`user/${post.User.id}`}/*href={`/user/${post.User.id}`}*/><a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a></Link>}
                    title={post.Retweet.User.nickname}
                    description={<PostCardContent postData={post.Retweet.content}/>}
                    //next 사용시 <a> 태그 말고 Link 를 사용해야 한다.
                    />
                </Card>
               )

            :( 
            <Card.Meta 
                avatar={<Link href={{pathname:'/user', query:{id : post.User.id} }} as={`user/${post.User.id}`}/*href={`/user/${post.User.id}`}*/><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content}/>}
                //next 사용시 <a> 태그 말고 Link 를 사용해야 한다.
            />
            )}
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
     
})

PostCard.propTypes = {
                    //shape을 써서 객체의 각 props의 상세 타입을 지정할 수 있다.
    post : PropTypes.shape({
            User: PropTypes.object,
            content : PropTypes.string,
            images:PropTypes.array,
           // createdAt:PropTypes.object
    })
}

export default PostCard;    