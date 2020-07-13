import React,{useEffect} from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'

import {useDispatch ,useSelector} from 'react-redux'
import { LOG_IN_REQUEST, LOAD_USER_REQUEST } from '../reducers/user';

const AppLayout = ({children}) =>{

    const {me} = useSelector(state=>state.user); 



        return(
           <div>
                <Menu mode="horizontal">
                    <Menu.Item key="home"><Link href="/"><a>노드 버드</a></Link></Menu.Item>
                    <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                    <Menu.Item key="mail">
                        <Input.Search enterButton style={{verticalAlign:'middle'}}/>
                    </Menu.Item>
                </Menu>
                
                {!me && <Link href="signup"><a><Button>회원가입</Button></a></Link>}
                <Row gutter={10}>
                    <Col xs={24} md={6}>
                    {me
                     ? <UserProfile />
              
                     :
                        <LoginForm />
                    }
                    </Col>
                    <Col xs={24} md={12}>
                        {children}
                    </Col>
                    <Col xs={24} md={6}>세번쨰</Col>
                </Row>
              
           </div>

        ); 
}

AppLayout.propTypes = {
    children : PropTypes.node,
}

export default AppLayout; 