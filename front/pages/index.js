
import React, {useEffect, useCallback} from 'react'; 
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
    const {mainPosts,hasMorePost} =useSelector(state => state.post); 


    const onScroll = useCallback(() =>{
            //window.scrollY + document.documentElement.clientHeight = document.documentElement.scrollHeight
        console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight); 

        if(hasMorePost){//스크롤 할 때 마다 서버로 요청보내면 서버 뒤질 수 도 있음 방지
                        //reducer 잘 보면 이해가 가능할 것이다. 
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                dispatch({
                    type:LOAD_MAIN_POSTS_REQUEST,
                    lastId : mainPosts[mainPosts.length - 1].id,
                }); 
            }
        }         
    },[hasMorePost , mainPosts.length]); 
  
    useEffect(()=>{
            window.addEventListener('scroll',onScroll); 

            return ()=>{
                window.removeEventListener('scroll',onScroll);
            }
    },[mainPosts.length])

    return (
      
            <div>
            
            {me ? <div>로그인됨</div> : <div>로그인 안됨</div>}
                {me && <PostForm userInfo={me} />}
                
                {mainPosts.map((v,i)=>{
                    return (
                            <PostCard key={v.id} post={v} />
                    )
                })}
            </div>
        )

}

Home.getInitialProps = async (context) =>{
    console.log(Object.keys(context)); 
    context.store.dispatch({

            type:LOAD_MAIN_POSTS_REQUEST, 

    });

};

export default Home;