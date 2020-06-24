import {all ,fork, takeLatest, call, put, delay,takeEvery,take }from 'redux-saga/effects'; 
//이 외에도
// race, cancel, select, throttle, debounce 등 도 있다. 
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_FAILURE, SIGN_UP_SUCCESS, LOG_OUT_REQUEST, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE } from '../reducers/user';
import axios from 'axios';

//call : 함수 동기적 호출   (순서를 지켜서 실행해야 하는 경우)
//fort : 함수 비동기적 호출  
//---------------------------둘 다 함수를 실행시켜준다.

//put  : 액션 , 사가의 dispatch
//take : 해당 액션이 dispatch되면 제너레이터를 next하는 이펙트 
//all  : 여러 이펙트를 동시에 실행 할 수 있게 합니다.


export const HELLO_SAGA = 'HELLO_SAGA'; 


//-----------------------------------API
function* loginAPI(loginData){
//서버에 요청하는 부분 
    return axios.post('/user/login',loginData,{withCredentials:true}); 
}
                                                                                          //▲백엔드와 프론트간에 쿠키를 주고 받을 수 있다.
                                                                               
function* signUpAPI(signUpData){
    
    return axios.post('/user/signUp',signUpData,{withCredentials:true}); 
}        


function* logoutAPI(){

    return axios.post('/user/logout',{},{withCredentials:true});
                                    //▲POST로 보낼 때, 데이터 없더라도 빈 객체라도 보내야 한다.
}

function* loadUserAPI(userId){

    return axios.get(userId? `/user/${userId}`:'/user/',{withCredentials:true}); 
}


function* followAPI(userId){

    return axios.post(`/user/${userId}/follow`,{},{withCredentials:true});
                                             //▲데이터 없더라도 빈 객체라도 보내야 한다.
}

function* unFollowAPI(userId){

    return axios.delete(`/user/${userId}/follow`, {
        withCredentials: true,
      });}
//-----------------------------------END API


//-----------------------------------WATCH
function* watchLogin(){
    console.log('watchLogin'); 
    yield takeEvery(LOG_IN_REQUEST,login); 
}

function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST,signUp)
}

function* watchLogout(){
    console.log('watchLogout'); 
    yield takeEvery(LOG_OUT_REQUEST,logout); 
}

function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST,loadUser); 
}


function* watchFollowUser(){

    yield takeEvery(FOLLOW_USER_REQUEST,follow); 
}

function* watchUnFollowUser(){
    yield takeLatest(UNFOLLOW_USER_REQUEST,unFollow); 
}


//-----------------------------------END WATCH 

function* login(action){
   
  
    try{
        
         const result    = yield call(loginAPI,action.data);  
         const loginInfo = yield result.then((resolve)=>{
            
            return resolve.data; 
            
         }); 

       
        yield  put({
            type: LOG_IN_SUCCESS,
            data: loginInfo,
        });

    }catch(e){
        console.error(e); 
        yield put({
            type:LOG_IN_FAILURE,
        });
    }

}

function* signUp(action){

    try{
    
       const result =  yield call(signUpAPI,action.data); 
     
        console.log('result----' , result); 
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

function* logout(){

    try{

        yield call(logoutAPI); 
        yield put({
            type:LOG_OUT_SUCCESS, 
        })

    }catch(e){
        console.error(e); 
        yield put({
            type:LOG_OUT_FAILURE, 
        });
    }
}


function* loadUser(action){

    try{

      
        const result   = yield call(loadUserAPI,action.data);  

        yield put({
                type: LOAD_USER_SUCCESS,
                data: result.data, 
          
            })

    }catch(e){
        console.error(e); 

        yield put({
            type:LOAD_USER_FAILURE,
            error:e,
        });
    }

}







function* follow(action){

    try{

      
        const result   = yield call(followAPI,action.data);  

        yield put({
                type: FOLLOW_USER_SUCCESS,
                data: result.data, 

            })

    }catch(e){
        console.error(e); 

        yield put({
            type:FOLLOW_USER_FAILURE,
            error:e,
        });
    }

}





function* unFollow(action){

    try{

      
        const result   = yield call(unFollowAPI,action.data);  

        yield put({
                type: UNFOLLOW_USER_SUCCESS,
                data: result.data, 

            })

    }catch(e){
        console.error(e); 

        yield put({
            type:UNFOLLOW_USER_FAILURE,
            error:e,
        });
    }

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
        fork(watchLogin), 
        fork(watchLogout),
        fork(watchLoadUser), 
        //fork(watchHello),
        fork(watchSignUp),
        fork(watchFollowUser), 
        fork(watchUnFollowUser), 
        
    ]);

}