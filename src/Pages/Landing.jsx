import {Link} from 'react-router-dom'
import SampleUserModal from '../Components/SampleUserModal';


function Landing() {
    
  return (
    <div className="d-flex justify-content-end p-0 m-0" id="Landing">

      <h1 className="w-100">lil bugga</h1>

      <div className="d-flex flex-column align-items-center justify-content-center" id="FeatureColumn">
        <h3 className="text-center w-100">Create an Account</h3>

        <form className="p-2">
          <div className="form-group mb-2">
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
          </div>

          <div className="form-group mb-2">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>

          <button type="submit" className="btn btn-primary w-100">Create</button>
        </form>

        <Link className="btn btn-primary w-75" to="/dashboard">Log in Sample User</Link>
        {/* Modal not working */}
        {/* <button className="btn btn-primary w-75" data-toggle="modal" data-target="#exampleModalCenter">Log in Sample User</button> */}
      </div>
      <SampleUserModal/>
    </div>
  );
}

export default Landing;