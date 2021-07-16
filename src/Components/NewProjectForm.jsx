import { useState } from "react";

export default function NewProjectForm(){
    // Holds the state of the form to make it controlled.
    let [form, setForm] = useState({"name":"", "description":""});

    // Handle the changing of any part of the form.
    function handleInput(e){
        setForm({     
            ...form,       
            [e.target.name]: e.target.value
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

          <button type="submit" className="btn btn-primary w-100">Create</button>
        </form>
    )
}