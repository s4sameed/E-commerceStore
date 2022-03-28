import {API} from "../../backend"


export const signup = (user) => {
    return fetch(`${API}/auth/sign_up`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err))
}



export const signin = (user) => {
    return fetch(`${API}/auth/sign_in`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
    }
    next();
}



export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();
        
        return fetch(`${API}/auth/sign_out`,{
            method: "GET"
        })
        .then(response => console.log("Sign Out Successful"))
        .catch(err => console.log(err))
    }
    
}



export const isAuthenticated = () => {
    if(typeof window === "undefined"){
        return false;
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}