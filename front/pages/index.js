
import React, {useEffect} from 'react'; 
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {useDispatch ,useSelector} from 'react-redux'
import { LOG_IN_REQUEST, loginAction, LOG_IN_SUCCESS } from '../reducers/user';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';




const Home = ()=>{

    const dispatch = useDispatch(); 
                                //dispatch() 는 useState 의 setState라고 생각하면 편하다.

    const {me} = useSelector(state => state.user);
                                //리덕스 STATE를 가져오기 위해서는 userSelector 
    const {mainPosts} =useSelector(state => state.post); 
  
    useEffect(()=>{
     //   dispatch(loginAction);
     dispatch({
         type:LOAD_MAIN_POSTS_REQUEST, 
     });
    },[])

    return (
      
            <div>
            {me ? <div>로그인됨</div> : <div>로그인 안됨</div>}
                {me && <PostForm />}
                {mainPosts.map((v,i)=>{
                    console.log(v); 
                    return (
                            <PostCard key={v.id} post={v} />
                    )
                })}
            </div>
        )

}

export default Home;