import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PostCard from '../components/PostCard'
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';

const Hashtag = ({tag})=>{

    const dispatch = useDispatch(); 
    const {mainPosts} = useSelector(state=>state.post); 

    useEffect(()=>{

        dispatch({
            type:LOAD_HASHTAG_POSTS_REQUEST,
            data:tag,
        }); 
        
    },[])

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
    
    console.log(context.query.tag);
    return {tag:context.query.tag}; 
}

export default Hashtag; 