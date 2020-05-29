import {all, call}from 'redux-saga/effects'; 

//한번 불러온 모듈은 캐싱이 된다고 한다.(노드에서)
import axios from 'axios'; 
import user from './user'
import post from './post'


axios.defaults.baseURL='http://captainryan.gonetis.com:3065/api';

export default function* rootSaga(){
    yield all([
        call(user),
        call(post),
    ]);
}