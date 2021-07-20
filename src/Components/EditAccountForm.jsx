import { useState } from "react";
import axios from 'axios';
import {useContext} from 'react'
import {UserContext} from './UserProvider'


export default function EditAccountForm(props){

  const { user, prefix, userLogin } = useContext(UserContext)
  const current_user = user;

  // Holds the state of the form to make it controlled.
  let [form, setForm] = useState({"username":"", "email":"", "password":"", "password_confirmation":""});

  // Handle the changing of any part of the form.
  function handleInput(e){
      setForm({     
          ...form,       
          [e.target.name]: e.target.value
      })
  } 

  //Handle sign in.
  function logIn(){

    let user = {
      email: form.email,
      password: form.password
    }
    
    axios.post(`${prefix}users/signin`, { user })
    .then(res => {
      userLogin(res.data.username, res.data.email, res.data.jwt);
    })
    .catch(err => {
      console.log(err);
      setForm({"email":"", "password":""});

    })
  }

  // Close the Modal
  function closeModal(){
    document.querySelector("div.fade.modal.show").click();
  }
  
  function handleEdit(e){
    e.preventDefault();

    const user = {
      username: form.username,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    }

    if(user){
      axios.post(`${prefix}users/update`, { user }, {headers: {"Authorization": `Bearer ${current_user.jwt}`}})
      .then(res => {
        console.log("Something changed!")
      })
      .then(body => {
        logIn();
        closeModal();
      })
      .catch(err => {
        console.log(err);
        setForm({"username":"", "email":"", "password":"", "password_confirmation": ""});
      })
    }
  }

  return (
      <div className="d-flex flex-column align-items-center justify-content-center" id="FeatureColumn">

      <form className="p-2">

        <div className="form-group mb-2">
          <input type="text" name="username" value={form.username} onChange={handleInput} className="form-control" placeholder="Username"/>
        </div>

        <div className="form-group mb-2">
          <input type="email" name="email" value={form.email} onChange={handleInput} className="form-control" placeholder="Email"/>
        </div>

        <div className="form-group mb-2">
          <input type="password" name="password" value={form.password} onChange={handleInput} className="form-control" placeholder="Password"/>
        </div>

        <div className="form-group mb-2">
          <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleInput} className="form-control" placeholder="Password Confirmation"/>
        </div>

        <button type="submit" onClick={handleEdit} className="btn btn-primary w-100">Edit</button>
      </form>
    </div>
  )
}