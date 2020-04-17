import {all ,fork, takeLatest, call, put, take }from 'redux-saga/effects'; 
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

//call : 함수 동기적 호출 
//fort : 함수 비동기적 호출 
//put  : 액션 , dispatch
//take : 해당 액션이 dispatch되면 제너레이터를 next하는 이펙트 

export const HELLO_SAGA = 'HELLO_SAGA'; 

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

function* hello(){
    try{
        yield put({
            type:'HELLO_TWO',
        }); 
        console.log('hello'); 

    }catch(e){
        console.error(e); 
    }
}

function* helloSaga(){
    console.log('before saga'); 
    yield take(HELLO_SAGA); 
    console.log('hello saga'); 

}

export default function* userSaga() {

    yield helloSaga(); 

}