import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from './UserProvider';

function myRole(id, usersArray){
    return usersArray.reduce((a,i) => i[0] === id ? i[1] : a, -1)
}

// Get an array of users ids and the roles
function mapUsers(usersArray){
    return usersArray.reduce((out, user) => {
        return out.concat([[user.user_id, user.role]])
    }, [])
}

// Can person a promote b.
function validCommand(roleA, roleB){
    // User must be at least admin to change others roles.
    if(roleA !== "owner" && roleA !== "admin"){
        return false;
    }

    // User must out-rank the subject.
    if(!((roleA === "owner" && roleB !== "owner") || (roleA === "admin" && roleB !== "owner" && roleB !== "admin")) ){
        return false;
    }

    // Assuming User out-ranks the subject and is admin.
    return true;
}

export default function ProjectUsersTable(props){

    // Vital Information
    const {prefix, user} = useContext(UserContext)
    const {id} = useParams();
    const history = useHistory();
    const [userID, setUserID] = useState(-1);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [myProjectRole, setMyProjectRole] = useState("");

    // Handle Promote
    function promoteUser(e){

        let new_role = "";
        switch(e.target.parentElement.parentElement.querySelectorAll("td")[1].textContent){
            case "client":
                new_role = "developer"
                break;
            case "developer":
                new_role = "admin"
                break;
            default:
                new_role = "admin"
                break;
        }

        const project = {
            "project_users_attributes": [
                {
                    "user_id": e.target.parentElement.parentElement.getAttribute("name"),
                    "role": new_role
                }
            ]
        }

        if(user.jwt){
            axios.patch(`${prefix}projects/${id}/users`, {project}, { headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.body)
            .then(body => {
                console.log("User Promoted!")
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))
        }
    }


    // Handle Demote
    function demoteUser(e){

        let new_role = "";
        switch(e.target.parentElement.parentElement.querySelectorAll("td")[1].textContent){
            case "owner":
                new_role = "admin"
                break;
            case "admin":
                new_role = "developer"
                break;
            case "developer":
                new_role = "client"
                break;
            default:
                new_role = "client"
                break;
        }

        const project = {
            "project_users_attributes": [
                {
                    "user_id": e.target.parentElement.parentElement.getAttribute("name"),
                    "role": new_role
                }
            ]
        }

        if(user.jwt){
            axios.patch(`${prefix}projects/${id}/users`, {project}, { headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.body)
            .then(body => {
                console.log("User Demoted!")
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))
        }
    }

    // Handle Adding User
    function addUser(e){
        e.preventDefault();

        const project = {
            "project_users_attributes": [
                {
                    "email": form.email,
                    "role": "client"
                }
            ]
        }

        if(user.jwt){
            axios.post(`${prefix}projects/${id}/users`, { project }, { headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.body)
            .then(body => {
                console.log("User added!")
                setRefresh(!refresh);
            })
            .catch(err => console.log(err))
        }
    }

    // Handle Removing User from Project
    function removeUser(e){

        const subject_id = e.target.parentElement.parentElement.getAttribute("name");
        const subject_role = e.target.parentElement.parentElement.querySelectorAll("td")[1].textContent;

        const project = {
            "project_users_attributes": [
                {
                    "user_id": subject_id,
                    "role": subject_role
                }
            ]
        }

        if(user.jwt){
            axios.delete(`${prefix}projects/${id}/users`,{data: {project}, headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.body)
            .then(body => {
                console.log("User removed!")
                id === subject_id && history.push("/dashboard");
                setRefresh(!refresh);
            })
            .catch(err => console.log(err))
        }
    }

    // On page load, try to load project else redirect.
    useEffect(()=>{
        if(user.jwt){
            axios.get(`${prefix}projects/${id}`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.data)
            .then(body => {
                setUserID(body.user_id)
                setUsers(mapUsers(body.project_users));
            })
            .catch(err => {
                console.log("Project wasn't found!");
                history.push(`/projects`);
            })
        }
    }, [id, prefix, user, history, refresh])

    // When users change, find and set my role.
    useEffect(() => {
        setMyProjectRole(myRole(userID, users))
    }, [users, userID, refresh])

    // Holds the state of the form to make it controlled.
    let [form, setForm] = useState({"email":""});

    // Handle the changing of any part of the form.
    function handleInput(e){
        setForm({     
            ...form,       
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="w-100">
            <form className="p-0">
                <div className="form-group mb-2">
                    <input type="email" name="email" value={form.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                </div>

                <button type="submit" onClick={addUser} className="btn btn-primary w-100 mb-4">Add User</button>
            </form>
            <div className="scrollable-wrapper-sidebar">
                <table className="table">
                    <thead>
                        <tr key={"proj_0"}>
                            <th>User ID</th>
                            <th>Role</th>
                            <th>Promote</th>
                            <th>Demote</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => {
                            return (
                                // Users id is put in name for handle functions.
                                <tr name={u[0]} key={`proj_${idx + 1}`}> 
                                    <td>{u[0]}</td>
                                    <td>{u[1]}</td>
                                    <td>{validCommand(myProjectRole, u[1]) ? <p onClick={promoteUser} className="btn btn-primary m-0">+</p> : ""}</td>
                                    <td>{validCommand(myProjectRole, u[1]) ? <p onClick={demoteUser} className="btn btn-primary m-0">-</p> : ""}</td>
                                    <td>{validCommand(myProjectRole, u[1]) ? <p onClick={removeUser} className="btn btn-primary m-0">X</p> : ""}</td>
                                </tr>
                            )
                        })}            
                    </tbody>
                </table>
            </div>
        </div>
    )
}