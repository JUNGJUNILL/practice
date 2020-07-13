import React, { useEffect, useCallback,useState } from 'react';
import { Button, List, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {StopOutlined } from '@ant-design/icons';
import NicknameEditForm from '../components/NicknameEditForm';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, followingList, followerList, hasMoreFollowing  } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  const onUnfollow = useCallback(userId => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  const onRemoveFollower = useCallback(userId => () => {
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: userId,
    });
  }, []);

  const loadMoreFollings = useCallback(()=>{
    dispatch({
      type:LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    })

  },[followingList.length])

  const loadMoreFollowers = useCallback(()=>{

    dispatch({
      type:LOAD_FOLLOWERS_REQUEST, 
      offset: followerList.length,
    })

  },[followerList.length])

  return (
    <div>
      <NicknameEditForm />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={hasMoreFollowing && <Button style={{ width: '100%' }} onClick={loadMoreFollings}>더 보기</Button>}
        bordered
        dataSource={followingList}
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card actions={[<StopOutlined onClick={onUnfollow(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
       
      />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: '100%' }} onClick={loadMoreFollowers}>더 보기</Button>}
        bordered
        dataSource={followerList}
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card actions={[<StopOutlined onClick={onRemoveFollower(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map(c => (
          <PostCard key={+c.createdAt} post={c} />
        ))}
      </div>
    </div>
  );
};


Profile.getInitialProps = async (context) =>{

  const state = context.store.getState(); 

    //이 직전에 LOAD_USERS_REQUEST -> LOAD_USERS_SUCCESS 해야만 me가 생성되므로.. 
    context.store.dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      data: state.user.me && state.user.me.id, // 이부분은 null 일 것이다.
    });

    context.store.dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      data: state.user.me && state.user.me.id, // 이부분은 null 일 것이다.
    });

    context.store.dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: state.user.me && state.user.me.id, // 이부분은 null 일 것이다.
    });

    //이 부분에서 LOAD_USERS_SUCCESS 되어서 me가 생김 이 전에는 me 는 null 일것이다.
    //저 부분이 null 인 이유 , 

    //__app.js에서    
    
    /*
    const state  = ctx.store.getState(); 
    if(!state.user.me){
      ctx.store.dispatch({
          type: LOAD_USER_REQUEST
      });
     }
      에서 me를 먼저 load 한 후에 me가 생성되기 때문에 id default 값을 0으로 설정하여 
      0인 경우는 내 정보 이므로, 해당 파라메터를 서버로 넘거 0인 경우는 내 프로필을 조회 한 것이다
      라고 약속을 정해서 0인 경우는 내 정보 보기 이다. 라고 약속 해 놓은 것이다.
  
    */




}

export default Profile;