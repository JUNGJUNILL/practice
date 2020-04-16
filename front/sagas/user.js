import {all ,fork, takeLatest, call, put }from 'redux-saga/effects'; 
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

//call : 함수 동기적 호출 
//fort : 함수 비동기적 호출 
//put  : 액션 , dispatch

function* loginAPI(){
//서버에 요청하는 부분 

}

function* login(){

    try{
        
        yield call(loginAPI); 
        yield put({
            type: LOG_IN_SUCCESS,
        })

    }catch(e){
        console.error(e); 
        yield put({
            type:LOG_IN_FAILURE,
        });
    }

}

function* watchLogin(){
    yield takeLatest(LOG_IN,login); 
          //takeLatest가 LOG_IN 액션이 dispatch되길 기다려서 
          // dispatch될 때 login 제너레이터를 호출한다. 

}

export default function* userSaga() {

 yield all([
     fork(watchLogin),
 ]); 

}