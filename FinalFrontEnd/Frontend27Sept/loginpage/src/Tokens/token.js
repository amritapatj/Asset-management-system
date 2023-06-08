import { useState } from "react"
//import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

//let navigate = useNavigate();

export const isLoggedIn=()=>{
    // let navigate = useNavigate();
    // const [logininfo, setlogininfo]=useState()

    let data=localStorage.getItem("data")
    console.log(data)
    console.log("isloggedinfunc")
    if (data===null){
        return false
    }else{
        return true
    }

}

export const doLogin=(data,next)=>{
    console.log(data)
     localStorage.setItem("data",JSON.stringify(data))
     console.log(localStorage)
     console.log("dologinfunc")
     next()
}

export const doLogout = (next) => {
    // localStorage.removeItem(data);
    window.location.reload()

    localStorage.clear();
    Navigate("/");
}

export const tokenkey = JSON.parse(localStorage.getItem("data"))?.token

export const getRole = () => {
    if(isLoggedIn) {
        let role =JSON.parse(localStorage.getItem("data"))?.employee?.roles[0]?.roleId;
        return role;
    }else {
        return null;
    }

}

export const getCurrentUser = () => {
    if(isLoggedIn) {
        return JSON.parse(localStorage.getItem("data")).user;
    }else {
        return undefined;
    }
}