//부모(root) reducer 
import {combineReducers} from 'redux' //자식 리듀서를 root reducer에서 묶어주는 라이브러리 
import user from './user'
import post from './post'

const rootReducer = combineReducers({
    user,
    post
}); 

export default rootReducer; 