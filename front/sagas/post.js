import {all,fork,takeLatest, put, delay} from 'redux-saga/effects'; 
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../reducers/post';

function addPostAPI(){

}
function* addPost(){

    try{
            yield delay(2000);
            yield put({
                type:ADD_POST_SUCCESS,
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
     fork(whatchAddPost), 
     fork(whatchAddComment), 
 ]); 

}