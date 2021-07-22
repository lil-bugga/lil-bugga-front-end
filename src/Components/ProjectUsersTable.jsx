import axios from 'axios'
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from './UserProvider';

function myRole(id, usersArray){
    return usersArray.reduce((a,i) => i[0] === id ? i[1] : a, -1)
}

// Can person a promote b.
function validCommand(roleA, roleB){
    // User must be at least admin to change others roles.
    if(roleA !== "owner" || roleA !== "admin"){
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
  
  // Handle Role Edit

  // Handle Adding User

  // Handle Removing User from Project
  function removeUser(e){

    const project = {
        "project_users_attributes": [
            {
                "user_id": e.target.parentElement.parentElement.getAttribute("name"),
                "role": e.target.parentElement.parentElement.querySelectorAll("td")[1].textContent
            }
        ]
    }

    if(user.jwt){
        axios.delete(`${prefix}projects/${id}/users`,{data: {project}, headers: {"Authorization": `Bearer ${user.jwt}`}})
        .then(res => res.body)
        .then(body => {
            history.push("/dashboard")
        })
        .catch(err => console.log(err))
    }
  }

  return (
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
            {props.users.map((u, idx) => {
                return (
                    // Users id is put in name for handle functions.
                    <tr name={u[0]} key={`proj_${idx + 1}`}> 
                        <td>{u[0]}</td>
                        <td>{u[1]}</td>
                        <td>{validCommand(myRole(props.user_id, props.users), u[1]) ? <p className="btn btn-primary m-0">+</p> : ""}</td>
                        <td>{validCommand(myRole(props.user_id, props.users), u[1])  ? <p className="btn btn-primary m-0">-</p> : ""}</td>
                        <td>{true ? <p onClick={removeUser} className="btn btn-primary m-0">X</p> : ""}</td>
                    </tr>
                )
            })}            
        </tbody>
    </table>
  )
}