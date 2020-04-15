
import React, {useEffect} from 'react'; 
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {useDispatch ,useSelector} from 'react-redux'
import { LOG_IN, loginAction } from '../reducers/user';


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

const Home = ()=>{

    const dispatch = useDispatch(); 
                                //dispatch() 는 useState 의 setState라고 생각하면 편하다.

    const {isLoggedIn , user} = useSelector(state => state.user);
                                //리덕스 STATE를 가져오기 위해서는 userSelector 
    useEffect(()=>{
        dispatch(loginAction);

    },[])

    return (
      
            <div>
            {user ? <div>로그인됨</div> : <div>로그인 안됨</div>}
                {dummy.isLoggedIn && <PostForm />}
                {dummy.mainPosts.map((v,i)=>{
                    return (
                            <PostCard key={v.User.id} post={v} />
                    )
                })}
            </div>
        )

}

export default Home;