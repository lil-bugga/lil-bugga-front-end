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
    const [mounted, setMounted] = useState(true);
    const history = useHistory();

    // Map projects to array format.
    function mapProjects(projects){
        return projects.reduce((out, row) => {
            return out.concat([[row.project_detail.project_name, `project/${row.project_detail.id}`]])
        }, [])
    }

    // On page load, load in projects, save mapped to state.
    useEffect(()=>{
        if(user.jwt){
            axios.get(`${prefix}/projects`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.data)
            .then(body => {
                mounted && setProjects([["Projects", "Link"], ...mapProjects(body)]);
                }
            )
            .catch(err => {
                alert(`${err.message}\nProject didn't load.`);
            })
        }
    }, [prefix, user.jwt, mounted])

    // Set unmounted when unmounting to prevent unwanted state change.
    
    useEffect(() => {
        return () => {
            setMounted(false);
        }
    }, [])

    // Handle table links
    function handleLink(e){   
        history.push(`/${e.target.getAttribute("name")}`);
    }

    // Minimize Side Bar 
    function handleCollapse(e){
        e.preventDefault();
        document.querySelector("div#EntireSidePanel").style.height = "50px";
        document.querySelector("div#SideBar").style.display = "none";
        document.querySelector("h4#SideTitle").style.display = "none";
        document.querySelector("button#SideCollapse").style.display = "none";
        document.querySelector("button#SideOpen").style.display = "block";
        document.querySelector("div.side_panel").style.height = "0vh";
    }

    // Minimize Side Bar 
    function handleExpand(e){
        e.preventDefault();
        document.querySelector("div#EntireSidePanel").style.height = "fit-content";
        document.querySelector("div#SideBar").style.display = "block";
        document.querySelector("h4#SideTitle").style.display = "block";
        document.querySelector("button#SideCollapse").style.display = "block";
        document.querySelector("button#SideOpen").style.display = "none";
        document.querySelector("div.side_panel").style.height = "40vh";
        
    }

    return (
        <div id="EntireSidePanel">
            <button id="SideOpen" onClick={handleExpand} className="btn btn-primary rounded-0">
                <p className="text-white">Open</p>
            </button>
            <button id="SideCollapse"  onClick={handleCollapse} className="btn btn-primary rounded-0">
                <p className="text-white">Collapse</p>
            </button>
            <div className="side_panel m-0">
                <h4 id="SideTitle" className="text-center text-white p-1">Projects</h4>
                <div id="SideBar" className="scrollable-wrapper-sidebar">
                    <table className="table">
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
                </div>
            </div>
        </div>
    )
}