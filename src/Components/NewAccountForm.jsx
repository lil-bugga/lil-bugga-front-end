import { useState } from "react";
import axios from 'axios';
import {useContext} from 'react'
import {UserContext} from './UserProvider'

export default function NewAccountForm(props){

  const { userLogin, prefix } = useContext(UserContext)

  // Holds the state of the form to make it controlled.
  let [form, setForm] = useState({"username":"", "email":"", "password":"", "password_confirmation":""});

  // handleCreate
  function handleCreate(e){
    e.preventDefault();

    const user = {
      username: form.username,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    }

    axios.post(`${prefix}users/signup`, { user })
    .then(res => {
      userLogin(res.data.username, res.data.email, res.data.jwt);
    })
    .catch(err => {
      console.log(err.message)
      if(form.email.length < 1 || form.password.length < 1 || form.username.length < 1 || form.password_confirmation.length < 1){
        alert(`${err.message}\nOne or more login field is empty!`);
      } else {
        alert(`${err.message}`);
      }
      setForm({"username":"", "email":"", "password":"", "password_confirmation": ""});
    })
  }

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
          <input type="string" name="username" value={form.username} onChange={handleInput} className="form-control"placeholder="Name"/>
        </div>

        <div className="form-group mb-2">
          <input type="email" name="email" value={form.email} onChange={handleInput} className="form-control"placeholder="Email"/>
        </div>

        <div className="form-group mb-2">
          <input type="password" name="password" value={form.password} onChange={handleInput} className="form-control" placeholder="Password"/>
        </div>

        <div className="form-group mb-2">
          <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleInput} className="form-control" placeholder="Confirm Password"/>
        </div>

        <button type="submit" onClick={handleCreate} className="btn btn-primary w-100">Create</button>
      </form>
    </div>
  )
}