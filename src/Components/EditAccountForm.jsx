import { useState } from "react";

export default function EditAccountForm(){
    // Holds the state of the form to make it controlled.
    let [form, setForm] = useState({"name":"", "password":""});

    // Handle the changing of any part of the form.
    function handleInput(e){
        setForm({     
            ...form,       
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" id="FeatureColumn">

        <form className="p-2">
          <div className="form-group mb-2">
            <input type="email" name="email" value={form.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" placeholder="Email"/>
          </div>

          <div className="form-group mb-2">
            <input type="password" name="password" value={form.password} onChange={handleInput} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>

          <button type="submit" className="btn btn-primary w-100">Edit</button>
        </form>
      </div>
    )
}