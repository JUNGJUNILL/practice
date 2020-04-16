import {all ,fork, takeLatest, call, put }from 'redux-saga/effects'; 
import { LOG_IN, LOGIN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';


function* loginAPI(){

}

function* login(){

    try{
        
        yield call(loginAPI); 
        yield put({
            type: LOGIN_SUCCESS,
        })

    }catch(e){
        console.error(e); 
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