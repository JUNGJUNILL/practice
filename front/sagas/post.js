import {all,fork,takeLatest, put, delay,call} from 'redux-saga/effects'; 
import axios from 'axios'; //한번 불러온 모듈을 캐싱이 되므로 user.js에서 
                           //axios.defaults.baseURL='http://captainryan.gonetis.com:3065/api'; 해 놓은게 post.js에서도 적용이 된다. 

import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE, LOAD_HASHTAG_POSTS_REQUEST, LOAD_USER_POSTS_FAILURE, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_REQUEST, LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE } from '../reducers/post';
import { ADD_POST_TO_ME} from '../reducers/user'


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


function loadHashtagPostsAPI(tag){

    return axios.get(`/hashtag/${encodeURIComponent(tag)}`); 
}


function* loadHashtagPosts(action){

    try{
           const result = yield call(loadHashtagPostsAPI,action.data);     
           yield put({
               type:LOAD_HASHTAG_POSTS_SUCCESS,
               data: result.data,
           })  
          

    }catch(e){
        console.error(e); 
        yield put({
            type:LOAD_HASHTAG_POSTS_FAILURE,
            error: e,
        })
      
    }


}


function loadUserPostsAPI(id){

    return axios.get(`/user/${id}/posts`); 
}


function* loadUserPosts(action){

    try{
           const result = yield call(loadUserPostsAPI,action.data);    
           yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        })  
          
          

    }catch(e){
        console.error(e); 
        yield put({
            type:LOAD_USER_POSTS_FAILURE,
            error: e,
        })
      
    }


}



function* addPost(action){

    try{
            const result = yield call(addPostAPI,action.data);
 
            yield put({
                type:ADD_POST_SUCCESS,
                data:result.data,

            });


            yield put({
                type: ADD_POST_TO_ME,
                data : result.data.id,
            });

    }catch(e){
        console.error('ADD_POST_FAILURE==>' ,e); 
        yield put({
            type:ADD_POST_FAILURE,
            error: e,
        })
      
    }


}


function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
      withCredentials: true,
    });
  }

  function* addComment(action) {
    try {
      const result = yield call(addCommentAPI, action.data);
      yield put({
        type: ADD_COMMENT_SUCCESS,
        data: {
          postId: action.data.postId,
          comment: result.data,
        },
      });
    } catch (e) {
      
      console.error(e);
      yield put({
        type: ADD_COMMENT_FAILURE,
        error: e,
      });
    }
  }



function loadCommentstAPI(postId){

    return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action){

    try{
        const result = yield call(loadCommentstAPI,action.data);
        yield put({
            type:LOAD_COMMENTS_SUCCESS,
            data:{
                postId:action.data,
                comments:result.data,
            },
        });

}catch(e){
    console.log(e); 
    yield put({
        type:LOAD_COMMENTS_FAILURE,
        error: e,
    })
  
}


}



function upLoadImagesAPI(formData){
    return axios.post('/post/images',formData,{withCredentials:true}); 
}

function* upLoadImages(action){

    try{
        const result = yield call(upLoadImagesAPI,action.data);
        console.log('upLoadImages result ===>' , result); 
        yield put({
            type:UPLOAD_IMAGES_SUCCESS,
            data: result.data,  //이미지가 저장된 주소를 가져온다. 
        });

}catch(e){
    console.log(e); 
    yield put({
        type:UPLOAD_IMAGES_FAILURE,
        error: e,
    })
  
}

}


function likePostAPI(postId){
    return axios.post(`/post/${postId}/like`,{},{withCredentials:true}); 
}

function* likePost(action){
        console.log('post saga likePost==>' , action); 
    try{
        const result = yield call(likePostAPI,action.data);
        yield put({
            type:LIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            }
        });

}catch(e){
    console.log(e); 
    yield put({
        type:LIKE_POST_FAILURE,
        error: e,
    })
  
}

}





function unLikePostAPI(postId){
    return axios.delete(`/post/${postId}/like`,{withCredentials:true}); 
}

function* unLikePost(action){
    try{
        const result = yield call(unLikePostAPI,action.data);
        yield put({
            type:UNLIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            }
        });

}catch(e){
    console.log(e); 
    yield put({
        type:UNLIKE_POST_FAILURE,
        error: e,
    })
  
}

}







function reTweetAPI(postId){
    return axios.post(`/post/${postId}/retweet`,{},{withCredentials:true}); 
}

function* reTweet(action){
    try{
        const result = yield call(reTweetAPI,action.data);
        yield put({
            type:RETWEET_SUCCESS,
            data: result.data,
        });

}catch(e){
    console.log(e); 
   alert(e); 
    yield put({
        type:RETWEET_FAILURE,
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


function* whatchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment); 
    
}

function* watchLoadHashtagPosts(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST,loadHashtagPosts); 
}

function* watchLoadUserPosts(){
    yield takeLatest(LOAD_USER_POSTS_REQUEST,loadUserPosts); 
}

function* watchLoadComments(){
    yield takeLatest(LOAD_COMMENTS_REQUEST,loadComments);
}

function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST,upLoadImages);
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST,likePost);

}

function* watchUnLikePost(){
        yield takeLatest(UNLIKE_POST_REQUEST,unLikePost)
}

function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST,reTweet); 
}

export default function* postSaga() {

 yield all([
     fork(watchLoadMainPosts),
     fork(whatchAddPost), 
     fork(whatchAddComment), 
     fork(watchLoadComments),
     fork(watchLoadHashtagPosts),
     fork(watchLoadUserPosts),
     fork(watchUploadImages),
     fork(watchLikePost),
     fork(watchUnLikePost),
     fork(watchRetweet),
 ]); 

}