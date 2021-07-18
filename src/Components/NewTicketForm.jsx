import { useState } from "react";

export default function NewTicketForm(){
    // Holds the state of the form to make it controlled.
    let [form, setForm] = useState({"name":"", "description":"", "importance":""});

    // Handle the changing of any part of the form.
    function handleInput(e){
        setForm({     
            ...form,       
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100" id="FeatureColumn">

        <form className="p-2">
          <div className="form-group mb-2">
            <input type="name" name="name" value={form.name} onChange={handleInput} className="form-control"placeholder="Ticket Name"/>
          </div>

          <div className="form-group mb-2">
            <input type="description" name="description" value={form.description} onChange={handleInput} className="form-control" placeholder="Ticket Description"/>
          </div>

          <div className="form-group mb-2">
            <input type="importance" name="importance" value={form.importance} onChange={handleInput} className="form-control" placeholder="Ticket Importance"/>
          </div>

          <button type="submit" className="btn btn-primary w-100">Edit</button>
        </form>
      </div>
    )
}