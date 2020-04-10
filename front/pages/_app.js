//next에서 제공하는 최상위 컴포넌트 파일 (_app.js로 직접 만들어야 한다. )
//페이지들의 공통적인 부분기여주기 
import AppLayout from '../components/AppLayout'; 
import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

const NodeBird = ({Component}) =>{
                    //▲ next에서 제공하는 props

        return (
         <div>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.min.css"/>
            </Head>
            <AppLayout >
                <Component />
            </AppLayout>  
            </div>

        )

}

NodeBird.PropTypes = {
    Component: PropTypes.elementType,

}



export default NodeBird; 