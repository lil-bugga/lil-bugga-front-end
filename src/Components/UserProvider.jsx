import React, {createContext, useState, useEffect } from 'react';
import axios from "axios"

export const UserContext = createContext();

export default function UserProvider({children}){
    const [user, setUser] = useState({});
    const prefix = "http://localhost:3000/api/v1/";

    // On render, if user exists, extract it and set it to state.
    // Calls the API to check jwt is still valid
    useEffect(()=> {
        let store = localStorage.getItem("user");

        if(store){
            
            let saved_user = JSON.parse(store);

            axios.get(`${prefix}projects`, {headers: {"Authorization": `Bearer ${saved_user.jwt}`}})
            .then(res => {
                if(res.data){
                // JWT is good!
                    setUser(saved_user);
                }else {
                // JWT is expired
                    setUser({});
                    localStorage.removeItem("user");
                }
                // setUser(saved_user)
            })
            .catch(err =>{
                if(saved_user.username === "Sample User"){
                    setUser(saved_user);
                } else {
                    setUser({});
                    localStorage.removeItem("user");
                }
                })
            }

    }, [])

    function userLogin(username, email, jwt){
        console.log(`Logging in as ${email}.`);
        setUser({"username":username, "email":email, "jwt":jwt })
        localStorage.setItem("user", JSON.stringify({"username":email, "email":email, "jwt":jwt }));
    }

    // On login to sample user, save user so they persist throughout page. (jwt, email, name)
    function handleSampleLogin(e){
        console.log("Logging in as sample user")
        e.preventDefault();
        setUser({"username": "Sample User", "email":"sample@user.com", "jwt":"asdfasdfasdf;lk;lkj;lkj"})

        localStorage.setItem("user", JSON.stringify({"username": "Sample User", "email":"sample@user.com", "jwt":"asdfasdfasdf;lk;lkj;lkj"}));
    }

    // Sign out functionality.
    function userSignOut(e){
        e.preventDefault();
        setUser({});
        localStorage.removeItem("user");
    }

    // The value to be exported for use.
    let [value, setValue] = useState({user, handleSampleLogin, userLogin, prefix, userSignOut})

    // When user state changes, change tha value.
    useEffect(() => {
        setValue({user, handleSampleLogin, userLogin, prefix, userSignOut});
    }, [user, prefix])
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}