import {all ,fork, takeLatest, call, put, delay,takeEvery,take }from 'redux-saga/effects'; 
//이 외에도
// race, cancel, select, throttle, debounce 등 도 있다. 
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

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
    console.log('watchLogin'); 
    yield take(LOG_IN);
          //takeLatest가 LOG_IN 액션이 dispatch되길 기다려서 
          // dispatch될 때 login 제너레이터를 호출한다. 

    yield put({
        type:LOG_IN_SUCCESS,
    });
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
        fork(watchLogin), 
    ]);

}