import { useState, useContext } from "react";
import axios from 'axios'
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "./UserProvider";

export default function EditProjectForm(props){

  const {prefix, user} = useContext(UserContext)
  const {id} = useParams();

  let history = useHistory();

  // Holds the state of the form to make it controlled.
  let [form, setForm] = useState({"name":"", "description":""});

  // Handle the changing of any part of the form.
  function handleInput(e){
      setForm({     
          ...form,       
          [e.target.name]: e.target.value
      })
  }

  // Edit projects
  function editProject(e){
    e.preventDefault();

    const project = {
      user_id: 2,
      status: 0,
      project_detail_attributes: {
        project_name: form.name,
        description: form.description
      }
    }

    axios.patch(`${prefix}projects/${id}`, {project} ,{headers: {"Authorization": `Bearer ${user.jwt}`}})
    .then(res => {
      console.log("Project was successfully edited!");
      // Redirect to the project\
      history.push(`/project/${res.data.id}`)
    })
    .catch(err => {
      console.log("Project was NOT successfully edited!")
      setForm({"name":"", "description":""});
    })
  }

  // Delete project
  function deleteProject(e){
    e.preventDefault();

    axios.delete(`${prefix}projects/${id}` ,{headers: {"Authorization": `Bearer ${user.jwt}`}})

  }

  return (
      <form className="p-2">
        <div className="form-group mb-2">
          <input type="name" name="name" value={form.name} onChange={handleInput} className="form-control" placeholder="Project Name"/>
        </div>

        <div className="form-group mb-2">
          <input type="description" name="description" value={form.description} onChange={handleInput} className="form-control" placeholder="Project Description"/>
        </div>

        <button type="submit" onClick={editProject} className="btn btn-primary w-100 mb-2">
          Edit Project
        </button>

        <button onClick={deleteProject} className="btn btn-danger w-100">
          Delete Project
        </button>
      </form>
  )
}