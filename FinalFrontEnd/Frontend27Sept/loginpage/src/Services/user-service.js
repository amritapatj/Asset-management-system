import { myAxios } from "./helper";
import { tokenkey } from "../Tokens/token";

const login=(user)=>{
    return myAxios.post('/api/auth/login',user).then(res=>res.data);
    console.log(user)
    console.log("loginfunc")
};

// export const SignUp=(user)=>{
//     const headers = {

//         'Authorization': `Bearer ${tokenkey}`,

//     };
//     const body = user;

// //    const headers= { "Authorization": `Bearer ${token}` }
//     const config = {

//         headers: { "Authorization": `Bearer ${tokenkey}` },

//         body : user

//     };

//     return myAxios.post('/addEmployee',body,{headers})

//     .then((response)=>response.data)

// }
export default login;