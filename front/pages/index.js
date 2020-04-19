
import React, {useEffect} from 'react'; 
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {useDispatch ,useSelector} from 'react-redux'
import { LOG_IN_REQUEST, loginAction, LOG_IN_SUCCESS } from '../reducers/user';




const Home = ()=>{

    const dispatch = useDispatch(); 
                                //dispatch() 는 useState 의 setState라고 생각하면 편하다.

    const {user,isLoggedIn} = useSelector(state => state.user);
                                //리덕스 STATE를 가져오기 위해서는 userSelector 
    const {mainPosts} =useSelector(state => state.post); 
  
    useEffect(()=>{
     //   dispatch(loginAction);
     dispatch({
         type:'HELLO_SAGA', 
     })
     dispatch({
        type:'HELLO_SAGA', 
    })
    dispatch({
        type:'HELLO_SAGA', 
    })

    },[])

    return (
      
            <div>
            {user ? <div>로그인됨</div> : <div>로그인 안됨</div>}
                {isLoggedIn && <PostForm />}
                {mainPosts.map((v,i)=>{
                    return (
                            <PostCard key={v.User.id} post={v} />
                    )
                })}
            </div>
        )

}

export default Home;