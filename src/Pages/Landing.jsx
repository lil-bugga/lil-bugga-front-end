import React from "react"
import {useState} from 'react';
import SampleUserModal from "./../Components/SampleUserModal"
import Button from "react-bootstrap/Button"

function Landing(props) {
  
  const [modalShow, setModalShow] = React.useState(false);

  // Holds the state of the form to make it controlled.
  let [form, setForm] = useState({"email":"", "password":""});

  // Handle the changing of any part of the form.
  function handleInput(e){
      setForm({     
          ...form,       
          [e.target.name]: e.target.value
      })
  }

  return (
    <div className="d-flex justify-content-end p-0 m-0" id="Landing">

      <h1 className="w-100">lil bugga</h1>

      <div className="d-flex flex-column align-items-center justify-content-center" id="FeatureColumn">
        <h3 className="text-center w-100">Create an Account</h3>

        <form className="p-2">
          <div className="form-group mb-2">
            <input type="email" name="email" value={form.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" placeholder="Email"/>
          </div>

          <div className="form-group mb-2">
            <input type="password" name="password" value={form.password} onChange={handleInput} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>

          <button type="submit" className="btn btn-primary w-100">Create</button>
        </form>

        <Button variant="primary" onClick={() => setModalShow(true)}>
          Log in Sample User
        </Button>
      </div>

      <SampleUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        sampleUserLogin={props.sampleUserLogin}
      />
    </div>
  );
}

export default Landing;