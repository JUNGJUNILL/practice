
import React, {useState,useCallback} from 'react'
import Link from 'next/link';
import {Form,Input,Button} from 'antd'
import {useInput} from '../pages/signup'

import {useDispatch ,useSelector} from 'react-redux'
import { LOG_IN, loginAction } from '../reducers/user';

const LoginForm = () =>{


    
    const [id,onChangId] = useInput(''); 
    const [password,onChangPassword] = useInput(''); 
    const dispatch = useDispatch(); 

    const onSubmitForm =useCallback((e) =>{
     //   e.preventDefault(); 
        dispatch(loginAction); 

        console.log({
            id,
            password
        })
    },[id,password]); 

        return(
            <>
                <Form onFinish={onSubmitForm} style={{padding:'10px'}}>
                        <div>
                                <label htmlFor="user-id">아이디</label>
                                <br />
                                <Input name="user-id" value={id} onChange={onChangId} required />
                        </div>
                        <div>
                                <label htmlFor="user-password">비밀번호</label>
                                <br />
                                <Input name="user-password" value={password} onChange={onChangPassword} required />

                        </div>
                        <div style={{marginTop: '10px'}}>
                            <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                        </div>
                </Form>
     </>
     )

}

export default LoginForm