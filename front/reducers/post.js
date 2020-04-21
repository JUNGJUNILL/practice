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
                ],  //화면에 보일 POST들 


     imagePaths : [], //미리보기 이미지 경로 
     addPostErrorReason : false, // POST 업로드 실패 사유 
     isAddingPost : false, //post업로드중 


};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST'; 
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS'; 
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE'; 

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST'; 
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS'; 
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE'; 

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'; 
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'; 
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'; 

export const REMOVE_IMAGE = 'REMOVE_IMAGE'; 

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'; 
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'; 
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'; 

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'; 
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'; 
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'; 

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'; 
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'; 
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'; 

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST ='RETWEET_REQUEST'; 
export const RETWEET_SUCCESS ='RETWEET_SUCCESS'; 
export const RETWEET_FAILURE ='RETWEET_FAILURE'; 

export const REMOVE_POST_REQUEST='REMOVE_POST_REQUEST'; 
export const REMOVE_POST_SUCCESS='REMOVE_POST_SUCCESS'; 
export const REMOVE_POST_FAILURE='REMOVE_POST_FAILURE'; 


const ADD_DUMMY = 'ADD_DUMMY'; 


const addPost = {

    type:ADD_POST_REQUEST,

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
        case ADD_POST_REQUEST : {
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