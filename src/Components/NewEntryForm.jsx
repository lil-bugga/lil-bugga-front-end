import { useState, useContext } from "react";
import axios from 'axios'
import { useParams} from "react-router-dom"
import { UserContext } from "./UserProvider";

export default function NewEntryForm(){

  // Vital information for this page.
  const {prefix, user} = useContext(UserContext)
  const {id, tid} = useParams();

  // Holds the state of the form to make it controlled.
  let [form, setForm] = useState({"subject":"", "body":""});

  // Handle the changing of any part of the form.
  function handleInput(e){
      setForm({     
          ...form,       
          [e.target.name]: e.target.value
      })
  }

  // Close the Modal
  function closeModal(){
    document.querySelector("div.fade.modal.show").click();
  }

  function createEntry(e){
    e.preventDefault();
    
    const entry = {
      subject: form.subject,
      body: form.body
    }

    if(user.jwt){
      axios.post(`${prefix}projects/${id}/tickets/${tid}/entries`, {entry} ,{headers: {"Authorization": `Bearer ${user.jwt}`}})
      .then(res => {
        console.log("Entry was added!");
        closeModal();
      })
      .catch(err => {
        console.log("Entry was not added!")
        if(form.subject.length < 1 || form.body.length < 1){
          alert(`${err.message}\nOne or more field is empty!`);
        } else {
          alert(`${err.message}`);
        }
        setForm({"subject":"", "body":""});
      })
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100" id="FeatureColumn">

      <form className="p-2">

        <div className="form-group mb-2">
          <input type="text" name="subject" value={form.subject} onChange={handleInput} className="form-control" placeholder="Entry Subject"/>
        </div>

        <div className="form-group mb-2">
          <textarea type="text" name="body" value={form.body} onChange={handleInput} className="form-control" placeholder="Entry Description"/>
        </div>

        <button type="submit" onClick={createEntry} className="btn btn-primary w-100">Create</button>
      </form>
    </div>
  )
}