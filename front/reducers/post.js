import { ConsoleSqlOutlined } from "@ant-design/icons";

export const initialState = {

    mainPosts : [  {
                    id:1,
                    User : {
                            id:1,
                            nickname:'정준일',
                        
                        }, 
                        img:'http://zzalbang.kr/wp-content/uploads/2019/06/944afa44ly1g3bon5dh4kj20u0140gvl-851x1024.jpg',
                        content:'요즘 핫한 배우', 
                        Comments:[],

                    },

                    {
                    id:2,    
                    User : {
                        id:2,
                        nickname:'정준이',
                        
                    }, 
                    
                    img:'https://i.pinimg.com/236x/94/c7/82/94c7822c6c5c33cd442c3b8d4fe524c6.jpg',
                    content:'김근식 군 추천배우', 
                    Comments:[],

                    },
                    {
                    id:3,
                    User : {
                        id:3,
                        nickname:'정준삼',
                        
                    }, 
                    img:'https://img.extmovie.com/files/attach/images/197/785/981/025/882889a567914626e514406aa0759382.png',
                    content:'아스카짱!', 
                    Comments:[],

                    }
                ],  //화면에 보일 POST들 


     imagePaths : [], //미리보기 이미지 경로 
     addPostErrorReason : false, // POST 업로드 실패 사유 
     isAddingPost : false, //post업로드중 
     postAdded : false, 
     isAddingComment: false,
     addCommentErrorReason:'',
     commentAdded: false,


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


const dummyPost = {
    id:4,
    User: {
        id:1,
        nickname:'주닐정', 

    }, 
    content:'나는 더미 입니다.', 
    Comments:[], 
}

const dummyComment = {
                        id:1,
                        User: {
                            id:1,
                            nickname:'주닐정',

                        }, 
                        createdAt: new Date(),
                        content : '더미 댓글 입니다...',

}

//const ADD_DUMMY = 'ADD_DUMMY'; 


const addPost = {

    type:ADD_POST_REQUEST,

}

// const addDummy ={
//     type:ADD_DUMMY, 
//     data : {
//         content : 'Hello', 
//         UserId : 1, 
//         User : {
//             nickname:'정준일', 
//         },
//     },
// }


const reducer = (state = initialState , action) =>{

    switch(action.type){
        case ADD_POST_REQUEST : {
            return {
                ...state,
                isAddingPost:true, 
                addPostErrorReason:'', 
                postAdded: false, 
            }
        }

        case ADD_POST_SUCCESS : {
            console.log('action.data ==>' , action);
            return {
                ...state,
                isAddingPost:false,
                mainPosts:[dummyPost, ...state.mainPosts],
                postAdded:true, 
            }
        }
        case ADD_POST_FAILURE : {
            return {
                ...state,
                addPostErrorReason :action.error,
            }
        }

 //---------댓글 달기 액션    

        case ADD_COMMENT_REQUEST : {
            console.log('ADD_COMMENT_REQUEST==>' , ADD_COMMENT_REQUEST); 
            return {
                ...state,
                isAddingComment : true,
                addCommentErrorReason:'',
                commentAdded: false, 

            }
        }

        case ADD_COMMENT_SUCCESS : {
            const postIndex = state.mainPosts.findIndex(v=>v.id===action.data.postId); 
            const post = state.mainPosts[postIndex]; 
            const Comments = [...post.Comments,dummyComment]; 
            const mainPosts = [...state.mainPosts]; 
            mainPosts[postIndex] = {...post,Comments}; 

            return {
                ...state,
                isAddingComment : false, 
                mainPosts,
                commentAdded: true, 

            }
        }
        case ADD_COMMENT_FAILURE : {
            return {
                ...state,
                isAddingComment:false, 
                addCommentErrorReason:action.error,

            }
        }
//---------댓글 달기 액션
        
        default : {
            return {
                ...state
            }
        }
    
    }


}

export default reducer; 