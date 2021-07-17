import { Redirect } from "react-router-dom"
import {useContext, useEffect} from 'react'
import {UserContext} from './UserProvider'

export default function UserRedirect(){

    const { user } = useContext(UserContext);

    useEffect(() => {
        if(user.name){
            console.log(`You are logged in as ${user.name}`);
        } else {
            console.log("You are not logged in!");
        }
    }, [user])

    return (
        <>
            { user.name ? <Redirect to="/dashboard"></Redirect> : <></>}
        </>
    ) 
}