import React ,{useState,useCallback}from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const PostCardContent = ({postData})=>{

    return (
        (<div>{postData.split(/(#[^\s]+)/g).map((v)=>{
            if(v.match(/#[^\s]+/)){
                return(
                    <Link href={{pathname:'/hashtag', query:{tag : v.replace(/#/g,"")}}} 
                          as={`hashtag/${v.replace(/#/g,"")}`}/*href={`/hashtag/${v.replace(/#/g,"")}`}*/ 
                          key={v}>
                          <a>{v}</a>
                    </Link>
                );
            }
          
                return v; 
          
        })}</div>
        )

    )

}
export default PostCardContent; 

PostCardContent.propTypes = {

    postData : PropTypes.string.isRequired,

}
