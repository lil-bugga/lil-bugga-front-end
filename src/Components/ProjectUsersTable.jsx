import axios from 'axios'
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserProvider';

function myRole(id, usersArray){
    return usersArray.reduce((a,i) => i[0] == id ? i[1] : a, -1)
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

    console.log(project);
    console.log(`${prefix}projects/${id}/users`)
    axios.delete(`${prefix}projects/${id}/users`, project, {headers: {"Authorization": `Bearer ${user.jwt}`}})
    .then(res => res.body)
    .then(body => console.log(body))
    .catch(err => console.log(err))
  }

  return (
    <table className="table">
        <thead>
            <th>User ID</th>
            <th>Role</th>
            <th>Promote</th>
            <th>Demote</th>
            <th>Remove</th>
        </thead>
        <tbody>
            {props.users.map(u => {
                return (
                    // Users id is put in name for handle functions.
                    <tr name={u[0]}> 
                        <td>{u[0]}</td>
                        <td>{u[1]}</td>
                        <td>{validCommand(myRole(props.user_id, props.users), u[1]) ? <a className="btn btn-primary m-0">+</a> : ""}</td>
                        <td>{validCommand(myRole(props.user_id, props.users), u[1])  ? <a className="btn btn-primary m-0">-</a> : ""}</td>
                        <td>{true ? <a onClick={removeUser} className="btn btn-primary m-0">X</a> : ""}</td>
                    </tr>
                )
            })}            
        </tbody>
    </table>
  )
}