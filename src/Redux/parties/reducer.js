import { PARTIES_POST_FAILED, PARTIES_POST_REQUEST, PARTIES_POST_SUCCESS } from "./actionTypes"


const initialState={
    partiesData:[],
    isLoading:false,
    isFailied:false
}

export const reducer=(state=initialState,{type,payload})=>{
switch(type){
    case PARTIES_POST_REQUEST:
        return {
         ...state,
            isLoading:true,
            isFailied:false
        }
    case PARTIES_POST_SUCCESS: 
       
        return {
             ...state,
             isLoading:false,
             partiesData: payload,
        }
        case PARTIES_POST_FAILED:
          return {...state, isLoading:false ,isFailied:true}
     default :return state;
}
}