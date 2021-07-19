// Accepts projects data from source as content.
// content = [ {}, {}, {}, ...{} ]

import axios from 'axios'
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserProvider";

export default function TableSideProjects() {

    // Important information for making API request.
    let {prefix, user} = useContext(UserContext);
    const [projects, setProjects] = useState([[]]);
    const [redirectPath, setRedirectPath] = useState("");
    const history = useHistory();

    // Map projects to array format.
    function mapProjects(projects){
        return projects.reduce((out, row) => {
            return out.concat([[row.project_detail.project_name, `project/${row.project_detail.id}`]])
        }, [])
    }

    // On page load, load in projects, save mapped to state.
    useEffect(()=>{
        axios.get(`${prefix}/projects`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
        .then(res => res.data)
        .then(body => {
            setProjects([["Projects", "Link"], ...mapProjects(body)])
            }
        )
        .catch(err => {
            console.log(err);
            setRedirectPath("/")
        })
    }, [])

    // Handle table links
    function handleLink(e){
        history.push(`/${e.target.getAttribute("name")}`);       
    }

    return (
        <table className="table">
            <thead>
                <tr key="tr_0">
                    <th class="text-center" scope="col" key={`te_0_0`}>{projects[0][0]}</th>
                </tr>
            </thead>
            <tbody>
                {projects.slice(1).map((row, idx) => {
                    return (
                        <tr key={`tr_${idx+1}`}>
                            <td onClick={handleLink} className="btn btn-primary w-100 mt-1" key={`te_${idx}_0`}  name={row[1]}>
                                {row[0]}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}