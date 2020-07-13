import PropTypes from 'prop-types'
import {useEffect,useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PostCard from '../components/PostCard'
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';

const Hashtag = ({tag})=>{

    const dispatch = useDispatch(); 
    const {mainPosts,hasMorePost} = useSelector(state=>state.post); 

    const onScroll = useCallback(() =>{
        //window.scrollY + document.documentElement.clientHeight = document.documentElement.scrollHeight
    console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight); 

    if(hasMorePost){//스크롤 할 때 마다 서버로 요청보내면 서버 뒤질 수 도 있음 방지
                    //reducer 잘 보면 이해가 가능할 것이다. 
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
            dispatch({
                type:LOAD_HASHTAG_POSTS_REQUEST,
                lastId : mainPosts[mainPosts.length - 1].id,
                data : tag,
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


    return(
        <div>
            {mainPosts.map((v,i)=>(
                <PostCard key={i} post={v} />
            ))}
        </div>
    )
}

Hashtag.propTypes = {
    tag : PropTypes.string.isRequired, 
}

        //next에서 제공하는 기능
        //_app.js에서 NodeBird.getInitialProps 추가 되어야 가능(_app.js에서 가장 먼저 선행 되어야 한다.)
        //_app.js에서 context가 이 Hashtag의 실행 문맥이 된다.
Hashtag.getInitialProps = async (context) =>{
    
    const tag = context.query.tag; 
    console.log(context.query.tag);

    context.store.dispatch({
        type:LOAD_HASHTAG_POSTS_REQUEST,
        data:tag,
    }); 

    return { tag }; 
}

export default Hashtag; 