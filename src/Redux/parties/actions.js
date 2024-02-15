import { PARTIES_POST_FAILED, PARTIES_POST_REQUEST, PARTIES_POST_SUCCESS } from "./actionTypes";

const baseurl='https://ca-backend-api.onrender.com/65ccae24608012f092d9dc75/party'
const partiesReq=()=>({type:PARTIES_POST_REQUEST})
const partiesSucc=(payload)=>({type:PARTIES_POST_SUCCESS,payload})
const partiesFailed=()=>({type:PARTIES_POST_FAILED})
// -------------------------parties data post in server---------------------------------------

export const partiesPost=(formData)=>async(dispatch)=>{
dispatch(partiesReq());
return await axios.post(`${baseurl}`,formData).then((res)=>{
    dispatch(partiesSucc(res.data))
    console.log(res.data);
}).catch((err)=>{dispatch(partiesReq(err))});
}