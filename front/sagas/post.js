import {all,fork,takeLatest, put, delay} from 'redux-saga/effects'; 
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../reducers/post';

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

function* whatchAddComment(){
    
}


export default function* postSaga() {

 yield all([
     fork(whatchAddPost), 
 ]); 

}