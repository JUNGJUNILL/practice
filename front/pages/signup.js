import React ,{ useState ,useCallback}from 'react'
import {Form, Input, Checkbox,Button} from 'antd'
import PropTypes from 'prop-types'

import {useDispatch ,useSelector} from 'react-redux'

const TextInput = ({value}) =>{
    return (
    <div>{value}</div>
    )
}

TextInput.propTypes = {
  value: PropTypes.string
}

 
export const useInput = (initValue = null)=>{
  const [value,setter] = useState(initValue);
  const handler = useCallback((e) =>{

      console.log(e.target.value)
      setter(e.target.value)

  } ,[]);
  return [value,handler];  
}
const SignUp = () =>{

  //setState 실행 시 해당 컴포넌트 전체가 리렌더링 됨을 잊지 마라. 
  const [nick,setNick]  = useState('')
  const [password,setPassword] = useState('')
  const [passwordCheck,setPasswordCheck] = useState('')
  const [term,setTerm] =useState('')
  const [passwordError, setPasswordError] = useState(false) 
  const [termError, setTermError] = useState(false)

  const onSubmit = useCallback((e) =>{
      
    e.preventDefault();
    
    if(password !== passwordCheck){
        return setPasswordError(true); 
    }

    if(!term){
        return setTermError(true); 
    }



},[password,passwordCheck,term]);

  //id인풋만 커스텀 훅으로
  //-------------------------------

  const [id,onChangeId] = useInput('')
  //-------------------------------

  const onChangeNick = (e)=>{

    setNick(e.target.value)
  }
  const onChangePassword = (e)=>{

    setPassword(e.target.value)
  } 

  const onChangepasswordCheck = useCallback((e)=>{
    setPasswordError(e.target.value !== password); 
    setPasswordCheck(e.target.value)
  },[password]); 

  const onChangeTerm = useCallback((e)=>{
    setTermError(false); 
    setTerm(e.target.checked)
  },[]); 



    return(
        
        <>
            <Form onSubmit={onSubmit} style={{padding:10}}>
            <TextInput value={'124'}></TextInput>
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
            </Form>
         </>

      
    )
}

export default  SignUp; 