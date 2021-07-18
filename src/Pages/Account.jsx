import { useState, useContext } from "react"
import {UserContext} from "./../Components/UserProvider"

export default function Account(props) {

    const {user} = useContext(UserContext);

    // Holds the state of the form to make it controlled.
    let [form, setForm] = useState({"email":"", "password":"", "confirm_password":""});

    // Handle the changing of any part of the form.
    function handleInput(e){
        setForm({     
            ...form,       
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container-fluid page d-flex align-items-center outer">
            <div className="d-flex align-items-center flex-column container center_chunk py-5">

                <h1>{user.name}</h1>

                <form className="py-2">
                    <div className="form-group mb-2">
                        <label htmlFor="Email">Email address</label>
                        <input type="email" value={form.email} onChange={handleInput} className="form-control" name="email" id="Email" placeholder={user.email}/>
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="Password">Password</label>
                        <input type="password" value={form.password} onChange={handleInput} className="form-control" name="password" id="Password" placeholder="Password"/>
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input type="password" value={form.confirm_password} onChange={handleInput} className="form-control" name="confirm_password" id="ConfirmPassword" placeholder="Confirm Password"/>
                    </div>

                    <button type="submit" className="btn btn-danger w-100">Change Details </button>
                </form>

            </div>
        </div>
    )
}