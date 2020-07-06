import {useEffect} from 'react'
import PropTypes from 'prop-types';
import  { Card,Avatar } from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import PostCard from '../components/PostCard'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import userSaga from '../sagas/user';
import { LOAD_USER_REQUEST } from '../reducers/user';

const User = ({id})=>{

    const dispatch = useDispatch(); 
    const {mainPosts} = useSelector(state=>state.post); 
    const {userInfo}  = useSelector(state=>state.user); //남의 정보 


    return (
        <div>
        {userInfo
            ?(  <Card
                actions={[
                  <div key="twit">
                    짹짹
                    <br />
                    {userInfo.Posts}
                  </div>,
                  <div key="following">
                    팔로잉
                    <br />
                    {userInfo.Followings}
                  </div>,
                  <div key="follower">
                    팔로워
                    <br />
                    {userInfo.Followers}
                  </div>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                  title={userInfo.nickname}
                />
              </Card>)  
            :null
        }
        {mainPosts.map((v,i)=>(
            <PostCard key={i} post={v} />
        ))}
        </div>
    );
}

User.propTypes = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = async (context) => {
  const id = parseInt(context.query.id,10); 
  console.log('user getInitialProps', id);

  context.store.dispatch({
      type:LOAD_USER_REQUEST,
      data:id,
  }); 

  context.store.dispatch({
    type:LOAD_USER_POSTS_REQUEST,
    data:id,

  });
  return { id };
};

export default User; 
