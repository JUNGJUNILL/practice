export const initialState = {

    mainPosts : [  {User : {
                            id:1,
                            nickname:'정준일',
                        
                        }, 
                        img:'http://zzalbang.kr/wp-content/uploads/2019/06/944afa44ly1g3bon5dh4kj20u0140gvl-851x1024.jpg',
                        content:'요즘 핫한 배우', 

                    },

                    {User : {
                        id:2,
                        nickname:'정준이',
                        
                    }, 
                    
                    img:'https://i.pinimg.com/236x/94/c7/82/94c7822c6c5c33cd442c3b8d4fe524c6.jpg',
                    content:'김근식 군 추천배우', 

                    },
                    {User : {
                        id:3,
                        nickname:'정준삼',
                        
                    }, 
                    img:'http://simg.donga.com/ugc/MLBPARK/Board/15/18/54/29/1518542968657.jpg',
                    content:'아스카짱!', 

                    }
                ], 


     imagePaths : [],

};


const ADD_POST = 'ADD_POST'; 
const ADD_DUMMY = 'ADD_DUMMY'; 


const addPost = {

    type:ADD_POST,

}

const addDummy ={
    type:ADD_DUMMY, 
    data : {
        content : 'Hello', 
        UserId : 1, 
        User : {
            nickname:'정준일', 
        },
    },
}


const reducer = (state = initialState , action) =>{

    switch(action.type){
        case ADD_POST : {
            return {
                ...state,
            }
        }
        
        case ADD_DUMMY:{
            return {
                ...state,
                mainPosts:[action.data, ...state.mainPosts]
            }
        }
        
        default : {
            return {
                ...state
            }
        }
    
    }


}

export default reducer; 