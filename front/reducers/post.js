import { ConsoleSqlOutlined } from "@ant-design/icons";

export const initialState = {

     mainPosts : [],  //화면에 보일 POST들 


     imagePaths : [], //미리보기 이미지 경로 
     addPostErrorReason : false, // POST 업로드 실패 사유 
     isAddingPost : false, //post업로드중 
     postAdded : false, 
     isAddingComment: false,
     addCommentErrorReason:'',
     commentAdded: false,
     hasMorePost : false, 


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
            return {
                ...state,
                isAddingPost:false,
                mainPosts:[action.data, ...state.mainPosts],
                postAdded:true, 
                imagePaths:[],
            }
        }
        case ADD_POST_FAILURE : {
            return {
                ...state,
                isAddingPost:false,
                addPostErrorReason :action.error,
            }
        }

 //---------댓글 달기 액션    

        case ADD_COMMENT_REQUEST : {
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
            const Comments = [...post.Comments,action.data.comment]; 
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

        case LOAD_COMMENTS_SUCCESS :{
            const postIndex = state.mainPosts.findIndex(v=>v.id===action.data.postId); 
            const post = state.mainPosts[postIndex]; 
            const Comments  = action.data.comments; 
            const mainPosts = [...state.mainPosts]; 
            mainPosts[postIndex] = {...post,Comments}; 
            return{
                ...state,
                mainPosts,
            };
        }


            case LOAD_MAIN_POSTS_REQUEST :
            case LOAD_HASHTAG_POSTS_REQUEST :
            case LOAD_USER_POSTS_REQUEST : {
                return {
                    ...state,
                    mainPosts:action.lastId === 0 ? [] : state.mainPosts,
                    hasMorePost : action.lastId ? state.hasMorePost : true,
                }
            }

            case LOAD_MAIN_POSTS_SUCCESS :
            case LOAD_HASHTAG_POSTS_SUCCESS :
            case LOAD_USER_POSTS_SUCCESS : {
            return {
                ...state,
                mainPosts:state.mainPosts.concat(action.data),
                hasMorePost : action.data.length === 3,

            }
        }

            case LOAD_MAIN_POSTS_FAILURE :
            case LOAD_HASHTAG_POSTS_FAILURE :
            case LOAD_USER_POSTS_FAILURE : {
            return {
                ...state,
            }
        }


//이미지 업로드------------------------------------------
        case UPLOAD_IMAGES_REQUEST : {
            return {
                ...state,
            }
        }

        case UPLOAD_IMAGES_SUCCESS : {
            return {
                ...state,
                imagePaths: [...state.imagePaths, ...action.data],
            }
        }
        case UPLOAD_IMAGES_FAILURE : {
            return {
                ...state,

            }
        }

        case REMOVE_IMAGE : {
            return{
                ...state,
                imagePaths:state.imagePaths.filter((v,i)=> i !== action.index),
            }
        }
//이미지 업로드------------------------------------------

//게시글 좋아요------------------------------------------
        case LIKE_POST_REQUEST : {


            return {
                ...state,
            }
        }

        case LIKE_POST_SUCCESS : {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = [{ id: action.data.userId }, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };
      return {
        ...state,
        mainPosts,
      };
    }
        case LIKE_POST_FAILURE : {
            return {
                ...state,
            }
        }
//게시글 좋아요------------------------------------------



//게시글 좋아요 취소------------------------------------------
        case UNLIKE_POST_REQUEST : {


            return {
                ...state,
            
            }
        }

        case UNLIKE_POST_SUCCESS : {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(v => v.id !== action.data.userId);
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };
            return {
              ...state,
              mainPosts,
            };
          }
        case UNLIKE_POST_FAILURE : {
            return {
                ...state,

            }
        }
//게시글 좋아요 취소------------------------------------------




//리트윗------------------------------------------
        case RETWEET_REQUEST : {


            return {
                ...state,
            
            }
        }

        case RETWEET_SUCCESS : {

            return {
                ...state,
                mainPosts : [action.data, ...state.mainPosts.PostId],
            };
        }
        case RETWEET_FAILURE : {
            return {
                ...state,

            }
        }
//리트윗------------------------------------------


//게시글 삭제------------------------------------------
        case REMOVE_POST_REQUEST : {


            return {
                ...state,
            
            }
        }

        case REMOVE_POST_SUCCESS : {
            
            console.log('REMOVE_POST_SUCCESS===>' , action.data);
            return {
                ...state,
                mainPosts : state.mainPosts.filter((v)=>v.id !== action.data), 
            };
        }
        case REMOVE_POST_FAILURE : {
            return {
                ...state,

            }
        }
//게시글 삭제------------------------------------------






        
        default : {
            return {
                ...state
            }
        }
    
    }


}

export default reducer; 