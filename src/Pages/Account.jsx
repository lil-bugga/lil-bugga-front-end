export default function Account() {
    return (
        <div className="container-fluid page">
            <div className="d-flex align-items-center flex-column container center_chunk py-5">

                <h1>User Name</h1>

                <form className="py-2">
                    <div className="form-group mb-2">
                        <label for="Email">Email address</label>
                        <input type="email" className="form-control" id="Email" placeholder="sample@user.com"/>
                    </div>

                    <div className="form-group mb-2">
                        <label for="Password">Password</label>
                        <input type="password" className="form-control" id="Password" placeholder="sample_password"/>
                    </div>

                    <div className="form-group mb-2">
                        <label for="ConfirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="ConfirmPassword" placeholder="sample_password"/>
                    </div>

                    <button type="submit" className="btn btn-danger w-100">Change Details </button>
                </form>

            </div>
        </div>
    )
}