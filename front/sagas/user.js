import {all ,fork, takeLatest, call, put, delay,takeEvery,take }from 'redux-saga/effects'; 
//이 외에도
// race, cancel, select, throttle, debounce 등 도 있다. 
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from '../reducers/user';
import axios from 'axios';

//call : 함수 동기적 호출   (순서를 지켜서 실행해야 하는 경우)
//fort : 함수 비동기적 호출  
//---------------------------둘 다 함수를 실행시켜준다.

//put  : 액션 , 사가의 dispatch
//take : 해당 액션이 dispatch되면 제너레이터를 next하는 이펙트 
//all  : 여러 이펙트를 동시에 실행 할 수 있게 합니다.

export const HELLO_SAGA = 'HELLO_SAGA'; 



function* loginAPI(){
//서버에 요청하는 부분 

}

function* login(action){
    console.log('login data =>' + action.data); 
    try{
        
        //yield call(loginAPI);
        yield delay(2000); 
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
    console.log('watchLogin'); 
    yield takeEvery(LOG_IN_REQUEST,login); 
}




function* signUpAPI(signUpData){
    console.log('signUpData ==>' ,signUpData)
    return axios.post('http://captainryan.gonetis.com:3065/api/user/',signUpData); 
}

function* signUp(action){

    try{
        console.log('action.data-->' + action.data); 
      //  yield call(signUpAPI);
        yield call(signUpAPI,action.data);  

        yield put({
                type: SIGN_UP_SUCCESS,
            })

    }catch(e){
        console.error(e); 
        yield put({
            type:SIGN_UP_FAILURE,
        });
    }

}



function* watchSignUp(){
    console.log('뭐여 왜 안되는겨???'); 
    yield takeEvery(SIGN_UP_REQUEST,signUp)
}


function* hello(){

    yield delay(1000); 
    yield put({
        type:'Bye Saga'
    })
}

function* watchHello(){
     yield takeLatest(HELLO_SAGA, hello); 
}
//이 기능을 takeLatest , takeEvery 로 대체할 수 있다. 
// function* watchHello(){
//     console.log('before saga'); 
//     while(true){
//         yield take(HELLO_SAGA); 
//         console.log('hello saga'); 
//     }
// }



export default function* userSaga() {

    yield all([
        fork(watchHello),
        fork(watchSignUp),
        fork(watchLogin), 
    ]);

}