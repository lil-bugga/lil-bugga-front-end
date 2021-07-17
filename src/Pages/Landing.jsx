import React from "react"
import {useState, useContext} from 'react';
import SampleUserModal from "./../Components/SampleUserModal"
import Button from "react-bootstrap/Button"
import axios from 'axios'
import CreateAccountModal from "./../Components/CreateAccountModal"
import {UserContext} from "./../Components/UserProvider"

function Landing() {

  const { userLogin,  prefix } = useContext(UserContext)

  const [sampleUserModalShow, setSampleUserModalShow] = React.useState(false);
  const [createUserModalShow, setCreateUserModalShow] = React.useState(false);

  // Holds the state of the form to make it controlled.
  let [form, setForm] = useState({"email":"", "password":""});

  // Handle the changing of any part of the form.
  function handleInput(e){
      setForm({     
          ...form,       
          [e.target.name]: e.target.value
      })
  }

  //Handle sign in.
  function logIn(e){
    e.preventDefault();

    let user = {
      email: form.email,
      password: form.password
    }

    axios.post(`${prefix}users/signin`, { user })
    .then(res => {
      userLogin(res.data.username, res.data.jwt);
    })
    .catch(err => {
      console.log(err);
      setForm({"email":"", "password":""});

    })
  }

  return (
    <div className="d-flex justify-content-end p-0 m-0" id="Landing">

      <h1 className="w-100">lil bugga</h1>

      <div className="d-flex flex-column align-items-center justify-content-center" id="FeatureColumn">
        <h3 className="text-center w-100">Login</h3>

        <form className="p-2">
          <div className="form-group mb-2">
            <input type="email" name="email" value={form.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" placeholder="Email"/>
          </div>

          <div className="form-group mb-2">
            <input type="password" name="password" value={form.password} onChange={handleInput} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>

          <button type="submit" onClick={logIn} className="btn btn-primary w-100 mb-2">Login</button>

          <Button className="w-100 mb-2" variant="primary" onClick={() => setCreateUserModalShow(true)}>
            Create an Account!
          </Button>

          <Button className="w-100 mb-2" variant="primary" onClick={() => setSampleUserModalShow(true)}>
            Log in Sample User
          </Button>
        </form>
      </div>

      <SampleUserModal
        show={sampleUserModalShow}
        onHide={() => setSampleUserModalShow(false)}
      />

      <CreateAccountModal
        show={createUserModalShow}
        onHide={() => setCreateUserModalShow(false)}
      />
    </div>
  );
}

export default Landing;