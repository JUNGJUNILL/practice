//user의 store 

//초기 state
const dummyUser = {
    nickname:'정준일', 
    Post:['정','준'],
    Followings:['정','준'],
    Followers:['정','준'],
    isLoggedIn: false, 
}
export const initialState = {

    isLoggedIn : false, 
    user: null, 
};

export const SIGN_UP='SIGN_UP'; 
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'; 
export const LOG_IN = 'LOG_IN'; 
export const LOG_OUT = 'LOG_OUT'; 

//실제 액션 


export const loginAction = {
    type:LOG_IN,
    data:{
        nickname:'주닐정', 
    }, 
}

export const logOutAction = {
    type:LOG_OUT,
}

const reducer = (state = initialState , action)=>{

    switch(action.type){
        
        case LOG_IN:{
            return {
                ...state,
                isLoggedIn:true,
                user:dummyUser,
            };
        }
        case LOG_OUT:{
            return {
                ...state,
                isLoggedIn:false,
                user:null,
            }
        }
        case SIGN_UP:{
            return{
                ...state,
                signUpData:action.data,
            }
        }


        default : {
            return {
                ...state,
            }
        }

    }


};



export default reducer; 