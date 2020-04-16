//next에서 제공하는 최상위 컴포넌트 파일 (_app.js로 직접 만들어야 한다. )
//페이지들의 공통적인 부분기여주기 

import AppLayout from '../components/AppLayout'; 
import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

// 모든 컴포넌트는 _app.js를 공유한다. 
// redux는 state의 중앙통제실 역할을 하므로 모든 컴포넌트의 state를 컨트롤 하기 위해
// _app.js에다가 redux를 연결해 주는 작업이 필요하다. 

//--react, redux 연결하기 
import {Provider} from 'react-redux'; //redux state 제공, 이것으로 전체 컴포넌트의 state를 관리 할 수 있다. 
import reducer from '../reducers'; 
import {createStore, compose, applyMiddleware} from 'redux'
import withRedux from 'next-redux-wrapper'


//리덕스 사가 
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const NodeBird = ({Component,store}) =>{
                    //▲ next에서 제공하는 props

        return (
        <Provider store={store}> {/*이 store가 redux state이다. 이 store가 전체 컴포넌트 state를 다 받는다. */}
            <div>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.min.css"/>
            </Head>
            <AppLayout >
                <Component />
            </AppLayout>  
            </div>
        </Provider>

        )

}
NodeBird.propTypes = {
    Component: PropTypes.elementType,
    store    : PropTypes.object, 
}

//하이오더 컴포넌트 
/*
hello(Component); 
const hello = (Component) => ()=>{
    return (
        <Component good="i'm a good person"/>
    )
}
*/

//제로초가 그냥 외우라고함... 
export default withRedux((initialState,options)=>{

    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [sagaMiddleware];
                     
                      
    const enhancer =  process.env.NODE_ENV ==='production' 
                                ? compose(
                               
                                applyMiddleware(...middleWares),
                    
                                )
                                : compose(
                               
                                    applyMiddleware(...middleWares),
                                    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION !== 'undefined'? window.__REDUX_DEVTOOLS_EXTENSION__() : (f)=>f,
                                    //브라우저에 REDUX DEVTOOLS 설치시 
                                    //window객체애 해당 변수(__REDUX_DEVTOOLS_EXTENSION)가 생성됨, __REDUX_DEVTOOLS_EXTENSION__()해당 함수를 사용할 수 있게됨
    
                                    )
    const store = createStore(reducer,initialState,enhancer); 
    sagaMiddleware.run(rootSaga);
    return store; 
})(NodeBird); 