import { useState, useContext } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserProvider";

export default function EditProjectForm(props){

  const {prefix, user} = useContext(UserContext)

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

  // Create new projects
  function createProject(e){
    e.preventDefault();

    const project = {
      project_detail_attributes: {
        project_name: form.name,
        description: form.description
      }
    }

    axios.post(`${prefix}projects`, {project} ,{headers: {"Authorization": `Bearer ${user.jwt}`}})
    .then(res => {
      console.log("Project was successfully created!");
      // Redirect to the project\
      history.push(`/project/${res.data.id}`)
    })
    .catch(err => {
      console.log("Project was NOT successfully created!")
      setForm({"name":"", "description":""});
    })
  }

  return (
      <form className="p-2">
        <div className="form-group mb-2">
          <input type="name" name="name" value={form.name} onChange={handleInput} className="form-control" placeholder="Project Name"/>
        </div>

        <div className="form-group mb-2">
          <input type="description" name="description" value={form.description} onChange={handleInput} className="form-control" placeholder="Project Description"/>
        </div>

        <button type="submit" onClick={createProject} className="btn btn-primary w-100">Create</button>
      </form>
  )
}