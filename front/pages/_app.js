//next에서 제공하는 최상위 컴포넌트 파일 (_app.js로 직접 만들어야 한다. )
//페이지들의 공통적인 부분기여주기 

import AppLayout from '../components/AppLayout'; 
import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'; 


// 모든 컴포넌트는 _app.js를 공유한다. 
// redux는 state의 중앙통제실 역할을 하므로 모든 컴포넌트의 state를 컨트롤 하기 위해
// _app.js에다가 redux를 연결해 주는 작업이 필요하다. 

//--react, redux 연결하기 
import {Provider} from 'react-redux'; //redux state 제공, 이것으로 전체 컴포넌트의 state를 관리 할 수 있다. 
import reducer from '../reducers'; 
import {createStore, compose, applyMiddleware} from 'redux'
import withRedux from 'next-redux-wrapper'

import withReduxSaga from 'next-redux-saga' //next 용 redux saga
                                            //서버 사이드 랜더링을 위한 준비물

//리덕스 사가 
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

const NodeBird = ({Component,store,pageProps}) =>{
                    //▲ next에서 제공하는 props

        return (
        <Provider store={store}> {/*이 store가 redux state이다. 이 store가 전체 컴포넌트 state를 다 받는다. */}
            <div>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.min.css"/>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout >
                <Component {...pageProps} />
            </AppLayout>  
            </div>
        </Provider>

        )

}
NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store    : PropTypes.object.isRequired, 
    pageProps: PropTypes.object.isRequired,
}
        //next에서 제공하는 기능

        //해당 pages의 페이지들이 맨 처음에 실행될 때 서버에서도 실행된다고 한다.
        //그렇기 때문에 서버로부터 데이터를 받아 올 수 있다.
NodeBird.getInitialProps = async (context)=>{
                                  //▲ next에서 제공해줌
    console.log('context===>',context); 
    const { ctx,Component } = context; 
                //▲컴포넌트들(페이지들))
    let pageProps ={}; 

    //ctx.isServer 서버 환경이냐 아니냐
    const cookie = ctx.isServer ? ctx.req.headers.cookie : ''; 
    if(ctx.isServer && cookie){
        //클라이언 환경에서는 브라우저가 쿠키를 넣어주고, 
        //SSR일 때는 우리가 직접 넣어줘야 한다. 
        axios.defaults.headers.Cookie = cookie; 

       
    }
   

    const state  = ctx.store.getState(); 
    if(!state.user.me){
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST
        }); 
    }

    if(Component.getInitialProps){
        pageProps =  await Component.getInitialProps(ctx); 
    }
 

    return {pageProps}; 
    
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
const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware,(store)=>(next)=>(action)=>{
        console.log(action)
        next(action); 
        //리덕스 사가 에러 찾아내는 방식 (커스텀 미들웨어)
    }];
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
      );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask =  sagaMiddleware.run(rootSaga);   
    //서버사이드 랜더링
    return store;
  };
  
  export default withRedux(configureStore)(withReduxSaga(NodeBird));

