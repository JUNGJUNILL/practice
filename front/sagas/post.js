import {all,fork,takeLatest, put, delay,call} from 'redux-saga/effects'; 
import axios from 'axios'; //한번 불러온 모듈을 캐싱이 되므로 user.js에서 
                           //axios.defaults.baseURL='http://captainryan.gonetis.com:3065/api'; 해 놓은게 post.js에서도 적용이 된다. 

import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE } from '../reducers/post';


function addPostAPI(postData){
    console.log('postData===>' , postData); 
    return axios.post('/post',postData,{withCredentials:true}); 
}

function loadMainPostsAPI(){

    return axios.get('/posts'); 
}


function* loadMainPosts(action){

    try{
           const result = yield call(loadMainPostsAPI);       

            yield put({
                type:LOAD_MAIN_POSTS_SUCCESS,
                data:result.data,

            });

    }catch(e){
        console.error(e); 
        yield put({
            type:LOAD_MAIN_POSTS_FAILURE,
            error: e,
        })
      
    }


}

function* addPost(action){

    try{
            const result = yield call(addPostAPI,action.data);
            const postData = yield result.then((resolve)=>{
                
                return resolve.data; 
            }); 
            console.log('postData===>',postData); 
            yield put({
                type:ADD_POST_SUCCESS,
                data:postData,

            });

    }catch(e){
        console.error(e); 
        yield put({
            type:ADD_POST_FAILURE,
            error: e,
        })
      
    }


}



function* whatchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost); 

}

function* watchLoadMainPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST,loadMainPosts); 
}




function addCommentAPI(){

}

function* addComment(action){

    try{
        console.log('action.data.postId==>' , action.data.postId); 
        yield delay(2000);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:{
                poSstId:action.data.postId,
            },
        });

}catch(e){
    console.log(e); 
    yield put({
        type:ADD_COMMENT_FAILURE,
        error: e,
    })
  
}


}

function* whatchAddComment(){
    console.log('whatchAddComment'); 
    yield takeLatest(ADD_COMMENT_REQUEST, addComment); 
    
}


export default function* postSaga() {

 yield all([
     fork(watchLoadMainPosts),
     fork(whatchAddPost), 
     fork(whatchAddComment), 
 ]); 

}