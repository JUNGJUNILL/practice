import React ,{ useState ,useCallback}from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import {Form, Input, Checkbox,Button} from 'antd'

const SignUp = () =>{


  const [nick,setNick]  = useState('')
  const [password,setPassword] = useState('')
  const [passwordCheck,setPasswordCheck] = useState('')
  const [term,setTerm] =useState('')
  const [passwordError, setPasswordError] = useState(false) 
  const [termError, setTermError] = useState(false)

  const onSubmit = (e) =>{
      
    e.preventDefault();
    
    if(password !== passwordCheck){
        return setPasswordError(true); 
    }

    if(!term){
        return setTermError(true); 
    }

    



};

  //id인풋만 커스텀 훅으로
  //-------------------------------
 
  const useInput = (initValue = null)=>{
      const [value,setter] = useState(initValue);
      const handler = useCallback((e) =>{
          console.log('sex'); 
          console.log(e.target.value)
        setter(e.target.value)
      } ,[]);
      return [value,handler];  
  }
  const [id,onChangeId] = useInput('')
  //-------------------------------

  const onChangeNick = (e)=>{

    setNick(e.target.value)
  }
  const onChangePassword = (e)=>{

    setPassword(e.target.value)
  }          
  const onChangepasswordCheck = (e)=>{
    setPasswordError(e.target.value !== password); 
    setPasswordCheck(e.target.value)
  }
  const onChangeTerm = (e)=>{
    setTermError(false); 
    setTerm(e.target.checked)
  }



    return(
        
        <>
        <Head>
            <title>NodeBird</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
        </Head>
        <AppLayout>
            <form onSubmit={onSubmit} style={{padding:10}}>
           
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId}/>
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nick} required onChange={onChangeNick}/>                
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value={password} required onChange={onChangePassword}/>
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" value={passwordCheck} required onChange={onChangepasswordCheck}/>
                    {passwordError && <div style={{color:'red'}}>비밀번호가 다릅니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의 합니다.</Checkbox>
                    {termError && <div style={{color:'red'}}>약관에 동의 해야 합니다.</div>}
                </div>

                <div style={{marginTop:10}}>
                     <Button type="primary" htmlType="submit">가입하기</Button>
                     <input type="submit" value="rkdlq"></input>
                </div>
            </form>
        </AppLayout>
         </>

      
    )
}

export default  SignUp; 